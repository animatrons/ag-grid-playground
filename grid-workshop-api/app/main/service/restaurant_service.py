from app.main.util.strings import generate_id
from app.db.Models.restaurant import Restaurant, RestaurantGroups

from app.main.util.paginator import Paginator
from app.main.util.filter import build_query
from app.main.util.strings import generate_id
from bson.objectid import ObjectId

def get_restaurants(args, sorts_param, filters):
    # SORT
    sorts_param = sorts_param or [{'sort_field': '_id', 'sort_order': 1}]
    sorts = []
    for sort in sorts_param:
        sorts.append({'$sort': {sort.get('sort_field'): sort.get('sort_order')}})
    # PAGINATION
    page = args.get('page') or 0
    size = args.get('size') or 10
    skip = page * size
    
    query = {}
    queries = build_query(filters)
    for q in queries:
        query.update(q)

    restaurants = Restaurant().db()
    cursor = restaurants.aggregate([
        {'$match': query},
        *sorts,
        {'$skip': skip},
        {'$limit': size},
    ])

    data = [Restaurant(**entity) for entity in cursor]
    total = restaurants.find(query, {'_id': 1}).count()

    return Paginator(data, page, size, total), 200

def save_restaurant(body):
    if body['id']:
        _id = ObjectId(body['id']) if body['id'] else ObjectId(generate_id())
    if body['name'] and body['address']:
        resto = Restaurant(**dict(
            _id = _id,
            URL = body['URL'],
            name = body['name'],
            address = body['address'],
            address_line_2 = body['address_line_2'],
            outcode = body['outcode'],
            postcode = body['postcode'],
            rating = body['rating'],
            type_of_food = body['type_of_food'],
        ))
        resto.save()
        return {'msg': 'Saved'}, 200
    else:
        return {'msg': 'Not enough info provided'}, 400

def delete_restaurant(id):
    Restaurant().db().delete_one({'_id': ObjectId(id)})
    return {'msg': 'Deleted'}, 200

def save_restaurant_group(body):
    ids = body.get('ids')
    name = body.get('name')
    is_all = body.get('is_all') or False
    all_except = body.get('all_except') or []
    filters = body.get('filters') or []

    if not body.get('group_id'):
        group_id = generate_id()
    else:
        group_id = body.get('group_id')
    
    if not ids and not is_all:
        return {'message': 'nothing'}, 500

    rest_groups = RestaurantGroups().db()
    cursor = rest_groups.aggregate([{
        '$group': {
            '_id': '' ,
            'names': {
                '$addToSet': '$group_name'
            }  
        }
    }])
    # groups_names = []
    cur_list = list(cursor)
    if len(cur_list) == 0:
        groups_names = []
    else:
        groups_names = cur_list[0].get('names') or []

    if not name or name == '':
        dafault_names = filter(lambda name: name.find('New Group ') != -1, groups_names)
        if len(list(dafault_names)) == 0:
            name = 'New Group 0'
        else:
            max_index = 0
            for def_name in list(dafault_names):
                str_num = def_name.replace('New Group ', '').strip()
                if str_num.isdigit() and int(str_num) >= max_index:
                    max_index = int(str_num)
            max_index = str(max_index)
            name = 'New Group ' + max_index
        
    if name in groups_names:
        return {'message': 'Group with name' + body.get('name') + ' exists'}, 500
    
    query = {}
    queries = build_query(filters)
    for q in queries:
        query.update(q)
        
    if is_all:
        restaurants = Restaurant().db()
        cursor = restaurants.aggregate([
            {'$match': query},
            {'$match': {'_id': {'$nin': [ObjectId(id) for id in all_except]}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]
    else:
        restaurants = Restaurant().db()        
        cursor = restaurants.aggregate([
            {'$match': query},
            {'$match': {'_id': {'$in': [ObjectId(id) for id in ids]}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]
    
    group = []
    for resto in restaurants_list:
        rest_dict = resto.to_dict()
        rest_id = rest_dict.get('_id')
        del rest_dict['_id']
        rest_dict['restaurant_id'] = str(rest_id)
        group.append(
            RestaurantGroups(**{
                'group_id': group_id,
                'group_name': name,
                **rest_dict
            })
        )
        
    try:
        RestaurantGroups().db().delete_many({'group_id': group_id})
        RestaurantGroups().db().insert_many([rest.to_dict() for rest in group])
        return {'message': 'OK'}, 201
    except Exception as e:
        return {'message': 'BAD', 'error': e}, 500

def get_restaurant_group_page(args, sorts_param, filters):
    data = []
    # SORT
    sorts_param = sorts_param or [{'sort_field': '_id', 'sort_order': 1}]
    sorts = []
    for sort in sorts_param:
        sorts.append({'$sort': {sort.get('sort_field'): sort.get('sort_order')}})
    # PAGINATION
    page = args.get('page') or 0
    size = args.get('size') or 10
    skip = page * size

    group_id = args.get('group_id')

    if not group_id:
        return {'message': 'No group id provided!'}, 400

    query = {'group_id': group_id}
    queries = build_query(filters)
    for q in queries:
        query.update(q)

    restaurants = RestaurantGroups().db()
    cursor = restaurants.aggregate([
        {'$match': query},
        *sorts,
        {'$skip': skip},
        {'$limit': size},
    ])

    data = [RestaurantGroups(**entity) for entity in cursor]
    total = restaurants.find(query, {'_id': 1}).count()

    return Paginator(data, page, size, total), 200

def get_restaurant_groups(args):
    restaurants = RestaurantGroups().db()
    cursor = restaurants.aggregate([
        {'$group': {
            '_id': '$group_id',
            'name': {
                '$first': '$group_name'
            }
        }},
    ])
    return list(cursor)

def delete_restaurant_group(agrs):
    group_id = agrs.get('group_id')
    RestaurantGroups().db().delete_many({'group_id': group_id})
    return {'message': 'DELETED OK'}, 200
