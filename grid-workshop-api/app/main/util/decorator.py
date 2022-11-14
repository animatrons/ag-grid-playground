from functools import wraps

from flask import request

from app.main.service.auth_helper import Auth


def token_required(authority=None):
    def authority_decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            data, status = Auth.get_logged_in_user(request)

            if data['status'] == 'fail':
                return data

            authorities = data.get('data')['role']['authorities']

            token = data.get('data')
            if not token:
                return data, status

            elif (authority is not None) and (not authority in authorities):
                response_object = {
                    'status': 'fail',
                    'message': 'Access denied.'
                }
                return response_object, 401

            return f(*args, **kwargs)

        return decorated

    return authority_decorator


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        data, status = Auth.get_logged_in_user(request)
        token = data.get('data')

        if not token:
            return data, status

        role = token.get('role')
        if role['role'] != 'ADMIN':
            response_object = {
                'status': 'fail',
                'message': 'admin token required'
            }
            return response_object, 401

        return f(*args, **kwargs)

    return decorated
