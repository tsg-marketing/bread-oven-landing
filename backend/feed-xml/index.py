import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from typing import Any
from xml.sax.saxutils import escape as xml_escape

FEED_URL = 'https://t-sib.ru/upload/catalog.xml'
TARGET_CATEGORY_IDS = {'530', '372', '371', '549', '365', '370', '373', '547', '548', '550', '551', '552'}

LANDING_BASE = 'https://pekarnoe.t-sib.ru/'
IMAGE_PROXY_URL = 'https://functions.poehali.dev/a59d06d8-db13-4f74-8103-bb11abba3397'

CACHE: dict[str, Any] = {'xml': None, 'ts': 0}

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


def product_anchor_url(offer_id: str) -> str:
    return f'{LANDING_BASE}#product-{offer_id}'


def proxy_image_url(src: str) -> str:
    if not src:
        return src
    try:
        parsed = urllib.parse.urlparse(src)
        host = (parsed.hostname or '').lower()
        if host.startswith('www.'):
            host = host[4:]
        if host == 't-sib.ru':
            return f'{IMAGE_PROXY_URL}?url={urllib.parse.quote(src, safe="")}'
    except Exception:
        pass
    return src


def serialize_offer(offer: ET.Element) -> str:
    offer_id = offer.get('id') or ''
    parts: list[str] = []
    attrs = ' '.join(f'{k}="{xml_escape(v)}"' for k, v in offer.attrib.items())
    parts.append(f'<offer {attrs}>' if attrs else '<offer>')
    for child in list(offer):
        tag = child.tag
        if tag == 'url':
            parts.append(f'<url>{xml_escape(product_anchor_url(offer_id))}</url>')
            continue
        if tag == 'picture':
            src = (child.text or '').strip()
            if src:
                parts.append(f'<picture>{xml_escape(proxy_image_url(src))}</picture>')
            continue
        parts.append(ET.tostring(child, encoding='unicode'))
    parts.append('</offer>')
    return ''.join(parts)


def build_yml() -> str:
    req = urllib.request.Request(FEED_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        raw = resp.read()
    root = ET.fromstring(raw)

    shop_src = root.find('.//shop')
    if shop_src is None:
        raise RuntimeError('shop_not_found')

    def text_of(parent: ET.Element, tag: str, default: str = '') -> str:
        node = parent.find(tag)
        if node is None or node.text is None:
            return default
        return node.text.strip()

    shop_name = text_of(shop_src, 'name', 'ООО «Техно-Сиб Групп»')
    shop_company = text_of(shop_src, 'company', 't-sib.ru')
    shop_platform = text_of(shop_src, 'platform', 'BSM/Yandex/Market')
    shop_version = text_of(shop_src, 'version', '2.5.6')

    cats_src = root.find('.//categories')
    cat_map: dict[str, dict] = {}
    if cats_src is not None:
        for c in cats_src.findall('category'):
            cid = c.get('id') or ''
            cat_map[cid] = {
                'id': cid,
                'name': (c.text or '').strip(),
                'parentId': c.get('parentId') or '',
            }

    needed_cat_ids: set[str] = set()
    offers_kept: list[ET.Element] = []
    offers_src = root.find('.//offers')
    if offers_src is not None:
        for offer in offers_src.findall('offer'):
            cat_id = (offer.findtext('categoryId') or '').strip()
            if cat_id not in TARGET_CATEGORY_IDS:
                continue
            offers_kept.append(offer)
            needed_cat_ids.add(cat_id)
            parent = cat_map.get(cat_id, {}).get('parentId', '')
            while parent:
                needed_cat_ids.add(parent)
                parent = cat_map.get(parent, {}).get('parentId', '')

    date_str = datetime.now(timezone(timedelta(hours=3))).strftime('%Y-%m-%dT%H:%M:%S+03:00')

    out: list[str] = []
    out.append('<?xml version="1.0" encoding="utf-8"?>')
    out.append('<!DOCTYPE yml_catalog SYSTEM "shops.dtd">')
    out.append(f'<yml_catalog date="{date_str}">')
    out.append('<shop>')
    out.append(f'<name>{xml_escape(shop_name)}</name>')
    out.append(f'<company>{xml_escape(shop_company)}</company>')
    out.append(f'<url>{xml_escape(LANDING_BASE)}</url>')
    out.append(f'<platform>{xml_escape(shop_platform)}</platform>')
    out.append(f'<version>{xml_escape(shop_version)}</version>')
    out.append('<currencies><currency id="RUR" rate="1"/></currencies>')

    out.append('<categories>')
    for cid in sorted(needed_cat_ids, key=lambda x: int(x) if x.isdigit() else 0):
        c = cat_map.get(cid)
        if not c:
            continue
        if c['parentId']:
            out.append(f'<category id="{xml_escape(c["id"])}" parentId="{xml_escape(c["parentId"])}">{xml_escape(c["name"])}</category>')
        else:
            out.append(f'<category id="{xml_escape(c["id"])}">{xml_escape(c["name"])}</category>')
    out.append('</categories>')

    out.append('<offers>')
    for offer in offers_kept:
        out.append(serialize_offer(offer))
    out.append('</offers>')

    out.append('</shop>')
    out.append('</yml_catalog>')
    return ''.join(out)


def handler(event: dict, context) -> dict:
    '''YML-фид товаров лендинга. Ссылки на товары — на pekarnoe.t-sib.ru с якорем #product-{id}. Обновляется в 11:30 по Новосибирску (GMT+7).'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
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
    now = time.time()

    try:
        if not force and CACHE['xml'] and cache_is_fresh(CACHE['ts']):
            xml_body = CACHE['xml']
        else:
            xml_body = build_yml()
            CACHE['xml'] = xml_body
            CACHE['ts'] = now
    except Exception as e:
        return {
            'statusCode': 502,
            'headers': {
                'Content-Type': 'text/plain; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
            },
            'isBase64Encoded': False,
            'body': f'feed_error: {str(e)[:300]}',
        }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=600',
        },
        'isBase64Encoded': False,
        'body': xml_body,
    }
