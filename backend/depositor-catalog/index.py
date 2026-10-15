import json
import re
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'

TARGET_CATEGORY_IDS = {'369'}

PERF_LABELS = {
    'low': 'До 25 циклов/мин',
    'mid': '30–40 циклов/мин или до 200 кг/ч',
    'high': 'От 40 циклов/мин',
}
PERF_ORDER = ['low', 'mid', 'high']

BRAND_FIX = {
    "TODAY'S KING": "Today's King",
    'ПКО-СУРА': 'Сура',
}


def brand_of(vendor: str, params: dict) -> str:
    v = (vendor or params.get('Бренд', '')).strip()
    v = re.sub(r'\s*\(.*?\)\s*', '', v).strip()
    return BRAND_FIX.get(v, v)


def nums(text: str) -> list[int]:
    return [int(x) for x in re.findall(r'\d+', (text or '').replace(' ', ''))]


def perf_of(params: dict, desc: str) -> tuple[str, str]:
    for k, v in params.items():
        kl = k.lower()
        if 'производительн' in kl and 'цикл' in kl:
            n = max(nums(v) or [0])
            if not n:
                continue
            group = 'low' if n <= 25 else ('mid' if n <= 40 else 'high')
            return f'до {n} циклов/мин', group
    kg = [max(nums(v) or [0]) for k, v in params.items() if 'производительн' in k.lower() and 'кг' in k.lower()]
    if kg and max(kg):
        return f'до {max(kg)} кг/ч', 'mid'
    m = re.findall(r'до\s*(\d[\d\s]*)\s*шт\.?\s*/\s*ч', desc)
    if m:
        n = max(int(x.replace(' ', '')) for x in m)
        return f'до {n} шт/ч', 'high'
    return '', ''


def hoppers_of(name: str, params: dict) -> int:
    n = name.lower()
    if 'двухбункер' in n or '2 бункера' in n or 'universal' in n:
        return 2
    v = params.get('Количество бункеров для теста (шт)', '') or params.get('Количество бункеров', '')
    if v:
        if 'одно' in v:
            return 1
        return first_int(v) or 1
    return 1


def first_int(text: str) -> int:
    m = re.search(r'\d+', text or '')
    return int(m.group()) if m else 0


CACHE: dict[str, Any] = {'data': None, 'ts': 0}

NSK_TZ = timezone(timedelta(hours=7))
REFRESH_HOURS_NSK = (6, 13, 18)


def last_scheduled_refresh_ts() -> float:
    '''Метка последнего планового обновления — 06:00, 13:00 или 18:00 по Новосибирску (GMT+7).'''
    now_nsk = datetime.now(NSK_TZ)
    for hour in sorted(REFRESH_HOURS_NSK, reverse=True):
        mark = now_nsk.replace(hour=hour, minute=0, second=0, microsecond=0)
        if now_nsk >= mark:
            return mark.timestamp()
    prev_day = now_nsk - timedelta(days=1)
    return prev_day.replace(hour=max(REFRESH_HOURS_NSK), minute=0, second=0, microsecond=0).timestamp()


def cache_is_fresh(ts: float) -> bool:
    return bool(ts) and ts >= last_scheduled_refresh_ts()


def price_num(raw: str) -> float:
    try:
        return float(raw)
    except (TypeError, ValueError):
        return 0.0


def fetch_feed(url: str) -> dict:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        raw = resp.read()
    root = ET.fromstring(raw)

    cat_map: dict[str, str] = {}
    for c in root.iter('category'):
        cat_map[c.get('id') or ''] = (c.text or '').strip()

    items: list[dict] = []
    for offer in root.iter('offer'):
        cat_id = (offer.findtext('categoryId') or '').strip()
        if cat_id not in TARGET_CATEGORY_IDS:
            continue

        params: dict[str, str] = {}
        for p in offer.findall('param'):
            name = (p.get('name') or '').strip()
            val = (p.text or '').strip()
            if name and val and name.lower() != 'guid' and name not in params:
                params[name] = val

        pictures = [pic.text.strip() for pic in offer.findall('picture') if pic.text and pic.text.strip()]
        vendor = (offer.findtext('vendor') or '').strip() or params.get('Бренд', '')

        name = (offer.findtext('name') or offer.findtext('model') or '').strip()
        name = name[:1].upper() + name[1:]
        name = name.replace('отсадочна ', 'отсадочная ')
        description = (offer.findtext('description') or '').strip()
        plain = re.sub(r'<[^>]+>', ' ', description)
        perf, perf_group = perf_of(params, plain)
        vendor = brand_of(vendor, params)
        items.append({
            'id': offer.get('id') or '',
            'name': name,
            'vendor': vendor,
            'price': (offer.findtext('price') or '').strip(),
            'currency': (offer.findtext('currencyId') or 'RUR').strip(),
            'url': (offer.findtext('url') or '').strip(),
            'description': description,
            'performance': perf,
            'performanceGroup': perf_group,
            'hoppers': hoppers_of(name, params),
            'picture': pictures[0] if pictures else '',
            'pictures': pictures,
            'feedCategoryId': cat_id,
            'available': offer.get('available') != 'false',
            'group': 'depositor',
            'params': params,
        })

    items.sort(key=lambda it: (-price_num(it['price']), -len(it['pictures'])))

    counts: dict[str, int] = {}
    for it in items:
        if it['performanceGroup']:
            counts[it['performanceGroup']] = counts.get(it['performanceGroup'], 0) + 1
    performance = [{'id': g, 'name': PERF_LABELS[g], 'count': counts[g]} for g in PERF_ORDER if g in counts]
    return {'items': items, 'performance': performance}


def handler(event: dict, context) -> dict:
    '''Каталог отсадочных машин из фида t-sib.ru (категория 369): бренд, производительность, число бункеров.'''
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    qs = event.get('queryStringParameters') or {}
    force = qs.get('refresh') == '1'

    try:
        if not force and CACHE['data'] and cache_is_fresh(CACHE['ts']):
            data = CACHE['data']
        else:
            data = fetch_feed(FEED_URL)
            CACHE['data'] = data
            CACHE['ts'] = time.time()
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'feed_error: {str(e)[:300]}'}, ensure_ascii=False),
        }

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({**data, 'total': len(data['items'])}, ensure_ascii=False),
    }
