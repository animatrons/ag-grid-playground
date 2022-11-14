from flask import request
from flask_restplus import Resource

from ..service.role_service import save_role, get_roles
from ..util.decorator import token_required
from ..util.dto import Role

api = Role.api
role_data = Role.role_data


@api.route('/')
class RoleData(Resource):
    @token_required(authority="ROLES")
    @api.doc('Create/Update Role')
    @api.response(201, 'Role successfully created/updated.')
    def post(self):
        post_data = request.json
        return save_role(data=post_data)

    @token_required(authority="ROLES")
    @api.doc('Get Role List')
    @api.marshal_list_with(role_data)
    def get(self):
        return get_roles()

