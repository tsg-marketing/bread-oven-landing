import json
import os
import urllib.request
import xml.etree.ElementTree as ET
from typing import Any

CACHE: dict[str, Any] = {'data': None, 'ts': 0}
CACHE_TTL = 600


def fetch_feed(url: str) -> list[dict]:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read()
    root = ET.fromstring(raw)
    offers_node = root.find('.//offers')
    categories_node = root.find('.//categories')
    cat_map: dict[str, str] = {}
    if categories_node is not None:
        for c in categories_node.findall('category'):
            cid = c.get('id') or ''
            cat_map[cid] = (c.text or '').strip()
    items: list[dict] = []
    if offers_node is None:
        return items
    for offer in offers_node.findall('offer'):
        params: dict[str, str] = {}
        for p in offer.findall('param'):
            name = p.get('name') or ''
            if name:
                params[name] = (p.text or '').strip()
        pictures = [pic.text for pic in offer.findall('picture') if pic.text]
        cat_id = (offer.findtext('categoryId') or '').strip()
        items.append({
            'id': offer.get('id') or '',
            'name': (offer.findtext('name') or offer.findtext('model') or '').strip(),
            'vendor': (offer.findtext('vendor') or '').strip(),
            'price': (offer.findtext('price') or '').strip(),
            'currency': (offer.findtext('currencyId') or 'RUB').strip(),
            'url': (offer.findtext('url') or '').strip(),
            'description': (offer.findtext('description') or '').strip()[:500],
            'picture': pictures[0] if pictures else '',
            'pictures': pictures,
            'category': cat_map.get(cat_id, ''),
            'categoryId': cat_id,
            'available': offer.get('available') == 'true',
            'params': params,
        })
    return items


def handler(event: dict, context) -> dict:
    '''Загрузка и парсинг YML/XML фида каталога печей с кешированием'''
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

    import time
    qs = event.get('queryStringParameters') or {}
    feed_url = qs.get('url') or os.environ.get('CATALOG_FEED_URL', '')
    force = qs.get('refresh') == '1'

    if not feed_url:
        sample = [
            {
                'id': 'sample-1',
                'name': 'Банная печь "Гейзер"',
                'vendor': 'ПечиПро',
                'price': '58900',
                'currency': 'RUB',
                'url': '#',
                'description': 'Компактная банная печь с закрытой каменкой до 18 м³',
                'picture': '',
                'pictures': [],
                'category': 'Банные печи',
                'categoryId': '1',
                'available': True,
                'params': {'Объём парной': '8-18 м³', 'Мощность': '15 кВт', 'Материал': 'Сталь 4 мм'},
            },
            {
                'id': 'sample-2',
                'name': 'Отопительная печь "Тайга"',
                'vendor': 'ПечиПро',
                'price': '42500',
                'currency': 'RUB',
                'url': '#',
                'description': 'Печь длительного горения для дома до 150 м²',
                'picture': '',
                'pictures': [],
                'category': 'Отопительные',
                'categoryId': '2',
                'available': True,
                'params': {'Площадь': 'до 150 м²', 'Мощность': '12 кВт', 'Время горения': '8 ч'},
            },
            {
                'id': 'sample-3',
                'name': 'Каминная печь "Вулкан"',
                'vendor': 'ПечиПро',
                'price': '74000',
                'currency': 'RUB',
                'url': '#',
                'description': 'Стильная чугунная печь-камин с панорамным стеклом',
                'picture': '',
                'pictures': [],
                'category': 'Камины',
                'categoryId': '3',
                'available': True,
                'params': {'Площадь': 'до 120 м²', 'Мощность': '9 кВт', 'Материал': 'Чугун'},
            },
            {
                'id': 'sample-4',
                'name': 'Печь промышленная "Титан-500"',
                'vendor': 'ПечиПро',
                'price': '185000',
                'currency': 'RUB',
                'url': '#',
                'description': 'Промышленная печь для цехов и производственных помещений',
                'picture': '',
                'pictures': [],
                'category': 'Промышленные',
                'categoryId': '4',
                'available': True,
                'params': {'Площадь': 'до 500 м²', 'Мощность': '45 кВт', 'Топливо': 'Дрова/уголь'},
            },
            {
                'id': 'sample-5',
                'name': 'Варочная печь "Хозяюшка"',
                'vendor': 'ПечиПро',
                'price': '36400',
                'currency': 'RUB',
                'url': '#',
                'description': 'Печь с варочной панелью и духовкой для дачи',
                'picture': '',
                'pictures': [],
                'category': 'Варочные',
                'categoryId': '5',
                'available': True,
                'params': {'Площадь': 'до 80 м²', 'Мощность': '7 кВт', 'Духовка': 'Есть'},
            },
            {
                'id': 'sample-6',
                'name': 'Банная печь "Жар-птица"',
                'vendor': 'ПечиПро',
                'price': '67200',
                'currency': 'RUB',
                'url': '#',
                'description': 'Премиум-печь с сеткой-каменкой и теплообменником',
                'picture': '',
                'pictures': [],
                'category': 'Банные печи',
                'categoryId': '1',
                'available': True,
                'params': {'Объём парной': '12-24 м³', 'Мощность': '22 кВт', 'Теплообменник': 'Есть'},
            },
        ]
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'items': sample, 'source': 'sample', 'total': len(sample)}, ensure_ascii=False),
        }

    now = time.time()
    if not force and CACHE['data'] and (now - CACHE['ts']) < CACHE_TTL:
        items = CACHE['data']
    else:
        try:
            items = fetch_feed(feed_url)
            CACHE['data'] = items
            CACHE['ts'] = now
        except Exception as e:
            return {
                'statusCode': 502,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': f'feed_error: {str(e)[:200]}'}, ensure_ascii=False),
            }

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'items': items, 'source': 'feed', 'total': len(items)}, ensure_ascii=False),
    }
