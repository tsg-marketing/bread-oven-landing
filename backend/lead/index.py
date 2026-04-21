import json

LEADS: list[dict] = []


def handler(event: dict, context) -> dict:
    '''Приём заявок с форм лендинга (квиз, КП, контакты)'''
    method = event.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'method_not_allowed'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    name = (body.get('name') or '').strip()[:120]
    phone = (body.get('phone') or '').strip()[:40]
    email = (body.get('email') or '').strip()[:120]
    source = (body.get('source') or 'form').strip()[:40]
    payload = body.get('payload') or {}

    if not phone and not email:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'phone_or_email_required'}, ensure_ascii=False),
        }

    lead = {
        'name': name,
        'phone': phone,
        'email': email,
        'source': source,
        'payload': payload,
        'request_id': getattr(context, 'request_id', ''),
    }
    LEADS.append(lead)

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'ok': True, 'message': 'Заявка принята. Перезвоним в течение 15 минут.'}, ensure_ascii=False),
    }
