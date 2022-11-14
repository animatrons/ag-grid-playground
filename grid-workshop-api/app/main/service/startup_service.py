from app.db.Models.role import Role
from app.db.Models.user import User
from app.main.util.strings import time_now, generate_id


def save_role_up():
    role = {
        'id': generate_id(),
        "name": "ADMIN",
        "authorities": ["DASHBOARD", "ROLES", "USERS", "COLUMNS", "CONTACTS", "CAMPAIGNS", "FRONT_OFFICE",
                        "BACK_OFFICE", "REFERENTIELS"],
        "sites": [],
        'created_on': str(time_now()),
        'modified_on': str(time_now()),
    }
    dict = Role(**role)
    if not Role().db().find_one({'_id': {'$ne': dict.id}, 'name': dict.name}):
        dict.save()
        return role


def save_user_up(role):
    if role is not None:
        user = {
            'id': generate_id(),
            "email": "admin@admin.ma",
            "last_name": "admin",
            "first_name": "admin",
            "password": "admindbr",
            "role": role,
            'created_on': str(time_now()),
            'modified_on': str(time_now()),
        }

        dict = User(**user)

        if not User().db().find_one({'_id': {'$ne': dict.id}, 'email': dict.email}):
            dict.save()
