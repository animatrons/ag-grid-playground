from app.main.util.strings import generate_id
from app.db.Models.restaurant import Restaurant, RestaurantGroups

from app.main.util.paginator import Paginator
from app.main.util.filter import build_query
from app.main.util.strings import generate_id

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
    # print(queries)
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

def save_restaurant_group(body):
    ids = body.get('ids')
    name = body.get('name')
    is_all = body.get('is_all') or False
    all_except = body.get('all_except') or []
    filters = body.get('filters') or []

    if not body.get('group_id'):
        _id = generate_id()
    else:
        _id = body.get('group_id')
    
    if not ids and not is_all:
        return {'message': 'nothing'}, 500

    rest_groups = RestaurantGroups().db()
    cursor = rest_groups.aggregate([{
        '$group': {
            '_id': '$name'   
        }
    }])
    print('names')
    print(list(cursor))
    groups_names = list(cursor)

    if not name or name == '':
        name = 'New Group 99'
        # logic for new name with incremented index
    if name in groups_names:
        return {'message': 'Group with name' + body.get('name') + ' exists'}, 500

    query = {}
    queries = build_query(filters)
    # print(queries)
    for q in queries:
        query.update(q)
    
    if is_all:
        restaurants = Restaurant().db()
        cursor = restaurants.aggregate([
            {'$match': query},
            {'$match': {'_id': {'$nin': all_except}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]
    else:
        restaurants = Restaurant().db()
        cursor = restaurants.aggregate([
            {'$match': {'_id': {'$in': ids}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]
    
    group = []
    for resto in restaurants_list:
        group.append(
            RestaurantGroups(**{
                'group_id': _id,
                'name': name,
                **resto
            })
        )
    
    try:
        RestaurantGroups().db().delete_many({'group_id': _id})
        RestaurantGroups().db().insert_many(group)
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

    query = {'goup_id': group_id}
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
                '$first': '$$ROOT.name'
            }
        }},
    ])

    print('all groups')
    print(list(cursor))

def delete_restaurant_group(agrs):
    group_id = agrs.get('group_id')
    RestaurantGroups().db().delete_one({'group_id': group_id})
    return {'message': 'DELETED OK'}, 200
