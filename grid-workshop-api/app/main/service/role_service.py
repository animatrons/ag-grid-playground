from app.db.Models.role import Role
from app.db.Models.user import User
from app.main.util.strings import generate_id, time_now


def save_role(data):
    dict = Role(**data).load()

    if not dict.id:
        new_dict = Role(**{**data, **{
            'id': generate_id(),
            'created_on': time_now(),
        }})
        dict = new_dict

    dict.name = data.get('name', None)
    dict.authorities = data.get('authorities', None)
    dict.sites = data.get('sites', None)
    dict.modified_on = time_now()

    if Role().db().find_one({'_id': {'$ne': dict.id}, 'name': dict.name}):
        return {"status": 'fail', "message": 'Role already exist'}, 409

    dict.save()

    update_users_role(dict, data)

    return {"status": "success", "message": "Role saved"}, 201


def get_roles():
    data = Role.get_all({})
    return data


def update_users_role(old_role, new_role):
    users = User().get_all({"role.id": old_role.id})

    if len(users) > 0:
        for user in users:
            user.role = new_role
            user.save()
