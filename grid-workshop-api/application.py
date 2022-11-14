import os
import unittest

from flask_script import Manager

from app import blueprint
from app.main import create_app
from app.main.service.startup_service import save_user_up, save_role_up

app = create_app(os.getenv('APP_ENV') or 'dev')
app.register_blueprint(blueprint)

app.app_context().push()

manager = Manager(app)


@app.before_first_request
def before_first_request():
    role = save_role_up()
    save_user_up(role)


@manager.command
def run():
    app.run()


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


if __name__ == '__main__':
    manager.run()
