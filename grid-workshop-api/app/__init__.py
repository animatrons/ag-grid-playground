from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.role_controller import api as role_ns

from .main.controller.restaurant_controller import api as restaurant_ns


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='DBR-V:1.0',
          version='1.0',
          description='Digital Board Room API'
          )

api.add_namespace(auth_ns, path='/auth')
api.add_namespace(user_ns, path='/user')
api.add_namespace(role_ns, path='/roles')

api.add_namespace(restaurant_ns, path='/restaurants')
