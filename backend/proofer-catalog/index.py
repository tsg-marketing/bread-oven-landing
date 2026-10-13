import json
import re
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'

TARGET_CATEGORY_IDS = {'376'}

TYPE_NAMES = {
    'compact': 'Под конвекционную печь',
    'cabinet': 'Шкафы на противни',
    'trolley': 'Под тележки',
    'stand': 'Подставки под печи',
}

TYPE_ORDER = ['compact', 'cabinet', 'trolley', 'stand']

BRAND_RULES = [
    (('шрт', 'пк-'), 'Abat'),
    (('шр-2', 'шр-3'), 'ИРТЫШ'),
    (('иртыш',), 'ИРТЫШ'),
    (('элси',), 'ЭлСи'),
    (('ps68', 'ps78'), 'RADAX'),
]


def type_of(name: str) -> str:
    n = name.lower()
    if 'подставк' in n:
        return 'stand'
    if 'шрт' in n or 'ps68' in n or 'ps78' in n:
        return 'compact'
    if any(k in n for k in ('шр-2', 'шр-3', 'элси', 'x-2c', 'proofer')):
        return 'trolley'
    return 'cabinet'


def brand_of(name: str, vendor: str, params: dict) -> str:
    v = (vendor or params.get('Бренд', '')).strip()
    if v:
        return re.sub(r'\s*\(.*?\)\s*', '', v).strip()
    n = name.lower()
    for keys, brand in BRAND_RULES:
        if any(k in n for k in keys):
            return brand
    return ''


def plural(n: int, one: str, few: str, many: str) -> str:
    if n % 10 == 1 and n % 100 != 11:
        return f'{n} {one}'
    if 2 <= n % 10 <= 4 and not 12 <= n % 100 <= 14:
        return f'{n} {few}'
    return f'{n} {many}'


def first_int(text: str) -> int:
    m = re.search(r'\d+', text or '')
    return int(m.group()) if m else 0


def capacity_group(t: str, num: int) -> str:
    if t == 'stand':
        return ''
    if t == 'trolley' or num >= 100:
        return 'trolley'
    if not num:
        return ''
    return 'small' if num <= 8 else 'large'


def capacity_of(name: str, params: dict, desc: str, t: str) -> tuple[str, int]:
    if t == 'stand':
        n = first_int(params.get('Количество вмещаемых гастроемкостей (шт.)', ''))
        return (f'{n} гастроёмкостей' if n else ''), n
    for k in ('Вместимость тележек (шт)', 'Единовременная загрузка тележек (шт)'):
        if params.get(k):
            n = first_int(params[k])
            return f'{n} тележки', n * 100
    if t == 'trolley':
        m = re.search(r'(\d+)\s*тележ', desc)
        return (f'{m.group(1)} тележки', int(m.group(1)) * 100) if m else ('', 0)
    if params.get('Вместимость по хлебным формам №7 (шт)'):
        n = first_int(params['Вместимость по хлебным формам №7 (шт)'])
        return f'{n} хлебных форм', 0
    for k in ('Количество противней (шт)', 'Количество устанавливаемых противней', 'Количество уровней'):
        if params.get(k):
            n = first_int(params[k])
            return f'{n} противней' if 'противн' in k.lower() else plural(n, 'уровень', 'уровня', 'уровней'), n
    m = re.search(r'(\d+)\s*(?:-ми|-и)?\s*(уровн|противн|лотк|решет)', desc)
    if m:
        n = int(m.group(1))
        word = {'уровн': 'уровней', 'противн': 'противней', 'лотк': 'лотков', 'решет': 'уровней'}[m.group(2)]
        return f'{n} {word}', n
    m = re.search(r'шрт[\s-]*(\d+)', name.lower())
    if m:
        return plural(int(m.group(1)), 'уровень', 'уровня', 'уровней'), int(m.group(1))
    m = re.search(r'\((\d+)\s*уровн', name)
    if m:
        return plural(int(m.group(1)), 'уровень', 'уровня', 'уровней'), int(m.group(1))
    return '', 0


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
        name = name[:1].upper() + name[1:]
        description = (offer.findtext('description') or '').strip()
        plain = re.sub(r'<[^>]+>', ' ', description)
        t = type_of(name)
        cap_label, cap_num = capacity_of(name, params, plain, t)
        vendor = brand_of(name, vendor, params)
        items.append({
            'id': offer.get('id') or '',
            'name': name,
            'vendor': vendor,
            'price': (offer.findtext('price') or '').strip(),
            'currency': (offer.findtext('currencyId') or 'RUR').strip(),
            'url': (offer.findtext('url') or '').strip(),
            'description': description,
            'capacity': cap_label,
            'capacityNum': cap_num,
            'capacityGroup': capacity_group(t, cap_num),
            'picture': pictures[0] if pictures else '',
            'pictures': pictures,
            'categoryId': t,
            'categoryName': TYPE_NAMES[t],
            'feedCategoryId': cat_id,
            'available': offer.get('available') != 'false',
            'group': 'proofer',
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
    '''Каталог расстоечных шкафов из фида t-sib.ru (категория 376): тип, бренд и вместимость. Сортировка по цене по убыванию.'''
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
