import base64
import urllib.parse
import urllib.request
from typing import Any

ALLOWED_HOSTS = {'t-sib.ru', 'www.t-sib.ru'}
MAX_BYTES = 10 * 1024 * 1024


def handler(event: dict, context) -> dict:
    '''Прокси для картинок товаров — обходит hotlink-защиту по Referer и приводит всё к HTTPS'''
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
    raw_url = qs.get('url') or ''
    if not raw_url:
        return _err(400, 'missing url')

    try:
        decoded = urllib.parse.unquote(raw_url)
        parsed = urllib.parse.urlparse(decoded)
        if parsed.scheme not in ('http', 'https'):
            return _err(400, 'bad scheme')
        host = (parsed.hostname or '').lower()
        if host not in ALLOWED_HOSTS:
            return _err(403, 'host not allowed')
    except Exception:
        return _err(400, 'bad url')

    target = decoded
    try:
        req = urllib.request.Request(
            target,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://t-sib.ru/',
                'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
            },
        )
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read(MAX_BYTES + 1)
            content_type = resp.headers.get('Content-Type', 'image/jpeg')
    except Exception as e:
        return _err(502, f'fetch_error: {str(e)[:200]}')

    if len(data) > MAX_BYTES:
        return _err(413, 'too large')

    if not content_type.lower().startswith('image/'):
        content_type = 'image/jpeg'

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': content_type,
            'Cache-Control': 'public, max-age=86400, immutable',
            'Access-Control-Allow-Origin': '*',
        },
        'isBase64Encoded': True,
        'body': base64.b64encode(data).decode('ascii'),
    }


def _err(code: int, msg: str) -> dict:
    return {
        'statusCode': code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'isBase64Encoded': False,
        'body': '{"error":"' + msg + '"}',
    }
