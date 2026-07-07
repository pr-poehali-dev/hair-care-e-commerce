import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    '''Принимает заявку на заказ с сайта и отправляет уведомление в личные сообщения администратора ВКонтакте.
    Args: event с httpMethod, body (name, phone, product); context с request_id
    Returns: HTTP response dict с результатом отправки
    '''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body_str = event.get('body') or '{}'
    try:
        data = json.loads(body_str)
    except json.JSONDecodeError:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Некорректный JSON'})}

    name = str(data.get('name', '')).strip()
    phone = str(data.get('phone', '')).strip()
    product = str(data.get('product', '')).strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Укажите имя и телефон'})}

    vk_token = os.environ.get('VK_COMMUNITY_TOKEN')
    vk_user_id = os.environ.get('VK_ADMIN_USER_ID')

    if not vk_token or not vk_user_id:
        return {'statusCode': 500, 'headers': headers, 'body': json.dumps({'error': 'ВК не настроен'})}

    message_lines = ['Новый заказ с сайта!']
    if product:
        message_lines.append(f'Товар: {product}')
    message_lines.append(f'Имя: {name}')
    message_lines.append(f'Телефон: {phone}')
    message = '\n'.join(message_lines)

    params = {
        'user_id': vk_user_id,
        'message': message,
        'random_id': context.request_id.__hash__() if hasattr(context.request_id, '__hash__') else 0,
        'access_token': vk_token,
        'v': '5.199',
    }

    url = 'https://api.vk.com/method/messages.send?' + urllib.parse.urlencode(params)

    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            result = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': f'Ошибка связи с ВК: {str(e)}'})}

    if 'error' in result:
        return {'statusCode': 502, 'headers': headers, 'body': json.dumps({'error': result['error'].get('error_msg', 'Ошибка ВК')})}

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'success': True})}
