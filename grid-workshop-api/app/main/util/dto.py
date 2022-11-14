from flask_restplus import Namespace, fields


class NullableString(fields.String):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable string'


class NullableDatetime(fields.DateTime):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable Datetime'

class RestaurantDto:
    api = Namespace('restaurant', description='restaurant related operations')
    restaurant = api.model('restaurant', {
        'URL': fields.String(required=True, description='URL'),
        'name': fields.String(required=True, description='name'),
        'address': fields.String(required=True, description='address'),
        'address_line_2': NullableString(required=True, description='address'),
        'outcode': NullableString(required=True, description='outcode'),
        'postcode': NullableString(required=True, description='postcode'),
        'type_of_food': NullableString(required=True, description='type_of_food'),
        'rating': fields.Float(required=True, description='rating'),
        'id': NullableString(description='user Identifier')
    }) 

    restaurant_page = api.model('restaurant page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(restaurant)),
    })

class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'first_name': fields.String(required=True, description='user email address'),
        'last_name': fields.String(required=True, description='user email address'),
        'email': fields.String(required=True, description='user email address'),
        'password': NullableString(required=True, description='user password'),
        # 'created_on': NullableDatetime(description='Created on'),
        # 'modified_on': NullableDatetime(description='Modified on'),
        'role': fields.Raw(),
        'id': NullableString(description='user Identifier')
    })

    page_user = api.model('flow page', {
        'page': fields.Integer,
        'size': fields.Integer,
        'total': fields.Integer,
        'content': fields.List(fields.Nested(user)),
    })


class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })


class Role:
    api = Namespace('Role')
    role_data = api.model('Role', {
        'id': NullableString(description=''),
        'name': fields.String(required=True, description=''),
        'sites': fields.Raw(),
        'authorities': fields.List(fields.String()),
    })
