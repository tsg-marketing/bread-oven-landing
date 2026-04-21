import json
import time
import urllib.request
import xml.etree.ElementTree as ET
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'
TARGET_CATEGORY_IDS = {'530', '372', '371', '549', '365', '370'}

CACHE: dict[str, Any] = {'data': None, 'ts': 0}
CACHE_TTL = 600


def fetch_feed(url: str) -> tuple[list[dict], dict[str, dict]]:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        raw = resp.read()
    root = ET.fromstring(raw)

    categories_node = root.find('.//categories')
    cat_map: dict[str, dict] = {}
    if categories_node is not None:
        for c in categories_node.findall('category'):
            cid = c.get('id') or ''
            parent = c.get('parentId') or ''
            cat_map[cid] = {
                'id': cid,
                'name': (c.text or '').strip(),
                'parentId': parent,
            }

    offers_node = root.find('.//offers')
    items: list[dict] = []
    if offers_node is None:
        return items, cat_map

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
        performance = ''
        for k, v in params.items():
            kl = k.lower()
            if 'производ' in kl or 'выработ' in kl or 'кг/ч' in kl or 'кг/смен' in kl:
                performance = v
                break

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
            'categoryName': cat_map.get(cat_id, {}).get('name', ''),
            'available': offer.get('available') != 'false',
            'performance': performance,
            'params': params,
        })
    return items, cat_map


def handler(event: dict, context) -> dict:
    '''Парсинг YML-фида t-sib.ru — только категории 530, 372, 371, 549, 365, 370'''
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
        if not force and CACHE['data'] and (now - CACHE['ts']) < CACHE_TTL:
            items, cats = CACHE['data']
        else:
            items, cats = fetch_feed(FEED_URL)
            CACHE['data'] = (items, cats)
            CACHE['ts'] = now
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'feed_error: {str(e)[:300]}'}, ensure_ascii=False),
        }

    used_cats = []
    seen = set()
    for it in items:
        cid = it['categoryId']
        if cid in seen:
            continue
        seen.add(cid)
        if cid in cats:
            used_cats.append(cats[cid])

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps(
            {
                'items': items,
                'categories': used_cats,
                'total': len(items),
            },
            ensure_ascii=False,
        ),
    }
