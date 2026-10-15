import json
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'

TARGET_CATEGORY_IDS = {
    '378', '379', '380', '512', '513', '514', '515', '516', '517',
    '518', '519', '520', '521', '522', '523', '553',
}

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

        items.append({
            'id': offer.get('id') or '',
            'name': (offer.findtext('name') or offer.findtext('model') or '').strip(),
            'vendor': vendor,
            'price': (offer.findtext('price') or '').strip(),
            'currency': (offer.findtext('currencyId') or 'RUR').strip(),
            'url': (offer.findtext('url') or '').strip(),
            'description': (offer.findtext('description') or '').strip(),
            'picture': pictures[0] if pictures else '',
            'pictures': pictures,
            'categoryId': cat_id,
            'categoryName': cat_map.get(cat_id, ''),
            'available': offer.get('available') != 'false',
            'group': 'dough',
            'params': params,
        })

    items.sort(key=lambda it: price_num(it['price']), reverse=True)

    counts: dict[str, int] = {}
    for it in items:
        counts[it['categoryId']] = counts.get(it['categoryId'], 0) + 1
    categories = [
        {'id': cid, 'name': cat_map.get(cid, ''), 'count': counts[cid]}
        for cid in sorted(counts, key=lambda x: -counts[x])
    ]
    return {'items': items, 'categories': categories}


def handler(event: dict, context) -> dict:
    '''Каталог тестомесильного оборудования из фида t-sib.ru (категория 378 и подкатегории). Сортировка по цене по убыванию.'''
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
