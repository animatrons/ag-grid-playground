from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from .config import config_by_name
from ..db.connection import mongo

flask_bcrypt = Bcrypt()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    CORS(app)

    mongo.init_app(app)

    flask_bcrypt.init_app(app)

    return app
