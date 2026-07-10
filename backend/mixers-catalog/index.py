import json
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'

# Группа «Планетарные миксеры» — вкладка 1
GROUP_PLANETARY = {'367', '526', '744'}
# Группа «Тестомесы» — вкладка 2
GROUP_DOUGH = {'258'}
TARGET_CATEGORY_IDS = GROUP_PLANETARY | GROUP_DOUGH

CACHE: dict[str, Any] = {'data': None, 'ts': 0}

NSK_TZ = timezone(timedelta(hours=7))
REFRESH_HOUR_NSK = 11
REFRESH_MINUTE_NSK = 30


def last_scheduled_refresh_ts() -> float:
    now_nsk = datetime.now(NSK_TZ)
    today_mark = now_nsk.replace(hour=REFRESH_HOUR_NSK, minute=REFRESH_MINUTE_NSK, second=0, microsecond=0)
    if now_nsk < today_mark:
        today_mark = today_mark - timedelta(days=1)
    return today_mark.timestamp()


def cache_is_fresh(cache_ts: float) -> bool:
    if not cache_ts:
        return False
    return cache_ts >= last_scheduled_refresh_ts()


def fetch_feed(url: str) -> list[dict]:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        raw = resp.read()
    root = ET.fromstring(raw)

    categories_node = root.find('.//categories')
    cat_map: dict[str, str] = {}
    if categories_node is not None:
        for c in categories_node.findall('category'):
            cid = c.get('id') or ''
            cat_map[cid] = (c.text or '').strip()

    offers_node = root.find('.//offers')
    items: list[dict] = []
    if offers_node is None:
        return items

    for offer in offers_node.findall('offer'):
        cat_id = (offer.findtext('categoryId') or '').strip()
        if cat_id not in TARGET_CATEGORY_IDS:
            continue

        params: dict[str, str] = {}
        for p in offer.findall('param'):
            name = p.get('name') or ''
            if name and name.lower() != 'guid':
                val = (p.text or '').strip()
                if val:
                    params[name] = val

        pictures = [pic.text.strip() for pic in offer.findall('picture') if pic.text and pic.text.strip()]
        vendor = (offer.findtext('vendor') or '').strip()

        group = 'planetary' if cat_id in GROUP_PLANETARY else 'dough'

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
            'group': group,
            'params': params,
        })
    return items


def handler(event: dict, context) -> dict:
    '''Каталог миксеров и тестомесов из фида t-sib.ru. Категории 367,526,744 (планетарные) и 258 (тестомесы). Обновление в 11:30 по Новосибирску.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    qs = event.get('queryStringParameters') or {}
    force = qs.get('refresh') == '1'
    now = time.time()

    try:
        if not force and CACHE['data'] and cache_is_fresh(CACHE['ts']):
            items = CACHE['data']
        else:
            items = fetch_feed(FEED_URL)
            CACHE['data'] = items
            CACHE['ts'] = now
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'feed_error: {str(e)[:300]}'}, ensure_ascii=False),
        }

    planetary = [it for it in items if it['group'] == 'planetary']
    dough = [it for it in items if it['group'] == 'dough']

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps(
            {
                'planetary': planetary,
                'dough': dough,
                'total': len(items),
            },
            ensure_ascii=False,
        ),
    }
