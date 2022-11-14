import uuid
import datetime

from app.db.Models.user import User
from app.main.service.blacklist_service import save_token

from app.main.util.paginator import Paginator


def save_new_user(data):
    user = User().load({'email': data['email']})
    if not user.id:
        new_user = User(**dict(
            id=str(uuid.uuid4()),
            email=data['email'],
            last_name=data['last_name'],
            first_name=data['first_name'],
            password=data['password'],
            role=data['role'],
            created_on=datetime.datetime.utcnow(),
            modified_on=datetime.datetime.utcnow()
        ))
        save_changes(new_user)
        return generate_token(new_user)
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409


def update_user(data):
    user = get_a_user(data['id'])
    if user:
        user.email = data['email']
        user.last_name = data['last_name']
        user.first_name = data['first_name']
        user.role = data.get('role')
        user.password = data.get('password')
        user.modified_on = datetime.datetime.utcnow()
        save_changes(user)
        return user
    else:
        response_object = {
            'status': 'fail',
            'message': 'No user with provided id found.',
        }
        return response_object, 409


def get_all_users(args, filters):
    # SORT
    sort_key = args.get('sort_key') or 'name'
    sort_acn = int(args.get('sort_order')) or 1

    # PAGINATION
    page = args.get('page') or 0
    size = args.get('size') or 10
    skip = page * size

    query = {}
    if filters:
        _filter = filters.get('filter', None)
        value = filters.get('value', None)

        if value is not None and _filter is not None:
            query.update({_filter: {"$regex": ".*" + value + ".*"}})

    users = User().db()

    cursor = users.aggregate([
        {'$match': query},
        {'$sort': {sort_key: sort_acn}},
        {'$skip': skip},
        {'$limit': size},
    ])

    data = [User(**entity) for entity in cursor]

    total = users.find(query, {'_id': 1}).count()
    return Paginator(data, page, size, total)


def get_a_user(public_id):
    user = User().load({'_id': public_id})
    return user if user.id else None


def generate_token(user):
    try:
        # generate the auth token
        auth_token = User.encode_auth_token(user.id)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
            'Authorization': auth_token.decode()
        }
        return response_object, 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401


def save_changes(data):
    data.save()


def delete_user(public_id):
    user = get_a_user(public_id)
    if user:
        user.delete()
        return True
    else:
        return False


def verify_password(request):
    auth_token = request.headers.get('Authorization')
    password = request.json.get('password')
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        user = User().load({'_id': resp['token']})
        check_password = user.check_password(password)
        if check_password:
            response_object = {
                'status': 'success',
                'message': 'Password verified Successfully'
            }
            return response_object, 200
        else:
            response_object = {
                'status': 'fail',
                'message': 'Password is not valid'
            }
            return response_object, 401
    else:
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return response_object, 403


def update_password(request):
    token = request.headers.get('Authorization')
    password = request.json.get('password')
    resp = User.decode_auth_token(token)
    if token:
        if not isinstance(resp, str):
            user = User().load({'_id': resp['token']})
            user.password = password
            user.modified_on = datetime.datetime.utcnow()
            save_changes(user)
            save_token(token)
            return {
                       'status': 'success',
                       'message': 'Password updated Successfully.',
                   }, 200
        else:
            response_object = {
                'status': 'fail',
                'message': 'Error while updating the password.',
            }
            return response_object, 409
    else:
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return response_object, 403


def get_user_by_email(email):
    user = User().db().find_one({'email': email})
    if user:
        return True
    else:
        return False
