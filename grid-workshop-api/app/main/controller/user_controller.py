from flask import request
from flask_restplus import Resource, reqparse

from app.main.util.decorator import token_required
from ..util.dto import UserDto
from ..service.user_service import save_new_user, verify_password, get_all_users, get_a_user, delete_user, update_user, \
    update_password, get_user_by_email

api = UserDto.api
_user = UserDto.user
page_user = UserDto.page_user


@api.route('/')
class UserList(Resource):
    @api.doc(
        'list_of_registered_users',
        params=dict(
            sort_key="Sort Field", sort_acn="Sort Direction",
            page="Page", size="Size"
        )
    )
    @token_required(authority="USERS")
    @api.marshal_list_with(page_user)
    def get(self):
        """List all registered users"""
        filters = request.json
        parser = reqparse.RequestParser()
        parser.add_argument('sort_key', location='args')
        parser.add_argument('sort_order', location='args')
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        args = parser.parse_args()
        return get_all_users(args, filters)

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully created.')
    @token_required(authority="USERS")
    @api.doc('create a new user')
    def post(self):
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully updated.')
    @token_required(authority="USERS")
    @api.doc('update user')
    @api.marshal_with(_user)
    def put(self):
        """Creates a new User """
        data = request.json
        return update_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(_user)
    @token_required(authority="USERS")
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_a_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user

    @api.doc('Delete User')
    @api.marshal_with(_user)
    @token_required(authority="USERS")
    def delete(self, public_id):
        """get a user given its identifier"""
        return delete_user(public_id)


@api.route('/verify-password')
class VerifyUserPassword(Resource):
    @token_required()
    @api.doc('Check password')
    def post(self):
        return verify_password(request)


@api.route('/change-password')
class UserPassword(Resource):
    @token_required()
    @api.doc('Reset password')
    def put(self):
        return update_password(request)


@api.route('/search')
class UserMail(Resource):
    @token_required(authority="USERS")
    @api.doc('get a user by email')
    @api.response(201, 'User Found')
    def post(self):
        """get a user given its email"""
        data = request.json
        return get_user_by_email(data.get('email'))
