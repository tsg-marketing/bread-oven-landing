import json
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'

TARGET_CATEGORY_IDS = {
    '381', '382', '383', '384', '533', '534', '535', '536', '537', '538',
}

SUBCAT_TYPES = {
    '533': 'noodle', '534': 'lavash', '535': 'hard', '536': 'floor', '537': 'hard', '538': 'noodle',
}

TYPE_NAMES = {
    'floor': 'Напольные',
    'table': 'Настольные',
    'auto': 'Автоматические',
    'hard': 'Для крутого теста',
    'noodle': 'Лапшерезки',
    'lavash': 'Для лаваша и пиццы',
}

TYPE_ORDER = ['floor', 'table', 'auto', 'hard', 'noodle', 'lavash']


def type_of(name: str, cat_id: str) -> str:
    n = name.lower()
    if 'лапшерез' in n:
        return 'noodle'
    if 'лаваш' in n or 'пицц' in n:
        return 'lavash'
    if 'автоматич' in n or cat_id == '382' or 'q-800' in n:
        return 'auto'
    if any(k in n for k in ('miratek kr', 'danler kf', 'danler kt', 'ym-')):
        return 'hard'
    if cat_id in SUBCAT_TYPES:
        return SUBCAT_TYPES[cat_id]
    if 'настольн' in n or cat_id == '384':
        return 'table'
    return 'floor'

CACHE: dict[str, Any] = {'data': None, 'ts': 0}

NSK_TZ = timezone(timedelta(hours=7))
REFRESH_HOUR_NSK = 11
REFRESH_MINUTE_NSK = 30


def last_scheduled_refresh_ts() -> float:
    now_nsk = datetime.now(NSK_TZ)
    mark = now_nsk.replace(hour=REFRESH_HOUR_NSK, minute=REFRESH_MINUTE_NSK, second=0, microsecond=0)
    if now_nsk < mark:
        mark = mark - timedelta(days=1)
    return mark.timestamp()


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
        t = type_of(name, cat_id)
        items.append({
            'id': offer.get('id') or '',
            'name': name,
            'vendor': vendor,
            'price': (offer.findtext('price') or '').strip(),
            'currency': (offer.findtext('currencyId') or 'RUR').strip(),
            'url': (offer.findtext('url') or '').strip(),
            'description': (offer.findtext('description') or '').strip(),
            'picture': pictures[0] if pictures else '',
            'pictures': pictures,
            'categoryId': t,
            'categoryName': TYPE_NAMES[t],
            'feedCategoryId': cat_id,
            'available': offer.get('available') != 'false',
            'group': 'rolling',
            'params': params,
        })

    items.sort(key=lambda it: price_num(it['price']), reverse=True)

    counts: dict[str, int] = {}
    for it in items:
        counts[it['categoryId']] = counts.get(it['categoryId'], 0) + 1
    categories = [
        {'id': t, 'name': TYPE_NAMES[t], 'count': counts[t]}
        for t in TYPE_ORDER if t in counts
    ]
    return {'items': items, 'categories': categories}


def handler(event: dict, context) -> dict:
    '''Каталог тестораскаточных машин из фида t-sib.ru (категория 381 и подкатегории). Сортировка по цене по убыванию.'''
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
