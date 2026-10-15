import base64
import hashlib
import io
import os
import urllib.parse
import urllib.request

import boto3
from PIL import Image

ALLOWED_HOSTS = {'t-sib.ru', 'www.t-sib.ru'}
MAX_BYTES = 10 * 1024 * 1024
ALLOWED_WIDTHS = {400, 600, 800, 1200, 1600}
CACHE_HEADERS = 'public, max-age=31536000, immutable'

_s3 = None


def _client():
    global _s3
    if _s3 is None:
        _s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
    return _s3


def _cdn(key: str) -> str:
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"


def handler(event: dict, context) -> dict:
    '''Прокси для картинок товаров: скачивает фото с t-sib.ru, ужимает до нужной ширины в WebP, кэширует в хранилище и отдаёт ссылку на CDN'''
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
    raw_url = qs.get('url') or ''
    if not raw_url:
        return _err(400, 'missing url')

    decoded = urllib.parse.unquote(raw_url)
    parsed = urllib.parse.urlparse(decoded)
    if parsed.scheme not in ('http', 'https'):
        return _err(400, 'bad scheme')
    if (parsed.hostname or '').lower() not in ALLOWED_HOSTS:
        return _err(403, 'host not allowed')

    try:
        width = int(qs.get('w') or 800)
    except ValueError:
        width = 800
    if width not in ALLOWED_WIDTHS:
        width = 800

    key = f"img-cache/{hashlib.md5(decoded.encode()).hexdigest()}_{width}.webp"
    s3 = _client()

    try:
        s3.head_object(Bucket='files', Key=key)
        return _redirect(_cdn(key))
    except Exception:
        pass

    try:
        req = urllib.request.Request(
            decoded,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://t-sib.ru/',
                'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
            },
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read(MAX_BYTES + 1)
    except Exception as e:
        return _err(502, f'fetch_error: {str(e)[:200]}')

    if len(data) > MAX_BYTES:
        return _err(413, 'too large')

    try:
        img = Image.open(io.BytesIO(data))
        img = img.convert('RGBA') if img.mode in ('P', 'LA') else img
        if img.mode == 'RGBA':
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        if img.width > width:
            img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=80, method=4)
        out = buf.getvalue()
    except Exception:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'image/jpeg', 'Cache-Control': CACHE_HEADERS, 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': True,
            'body': base64.b64encode(data).decode('ascii'),
        }

    s3.put_object(Bucket='files', Key=key, Body=out, ContentType='image/webp', CacheControl=CACHE_HEADERS)
    return _redirect(_cdn(key))


def _redirect(url: str) -> dict:
    return {
        'statusCode': 302,
        'headers': {
            'Location': url,
            'Cache-Control': 'public, max-age=604800',
            'Access-Control-Allow-Origin': '*',
        },
        'body': '',
    }


def _err(code: int, msg: str) -> dict:
    return {
        'statusCode': code,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': '{"error":"' + msg + '"}',
    }
