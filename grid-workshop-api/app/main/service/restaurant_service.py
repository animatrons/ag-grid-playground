from app.main.util.strings import generate_id
from app.db.Models.restaurant import Restaurant, RestaurantGroup

from app.main.util.paginator import Paginator
from app.main.util.filter import build_query
from app.main.util.strings import generate_id

def get_restaurants(args, filters):
        # SORT
    sort_key = args.get('sort_field') or 'name'
    sort_acn = int(args.get('sort_order') or '0') or 1
    sort = {'$sort': {'_id': 1}}
    if sort_key:
        sort = {'$sort': {sort_key: sort_acn}}
    # PAGINATION
    page = args.get('page') or 0
    size = args.get('size') or 10
    skip = page * size
    
    query = {}
    queries = build_query(filters)
    print(queries)
    for q in queries:
        query.update(q)

    restaurants = Restaurant().db()
    cursor = restaurants.aggregate([
        {'$match': query},
        sort,
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

    new_group = RestaurantGroup()
    if not body.get('group_id'):
        new_group = RestaurantGroup(**{
            '_id': generate_id(),
        })

    restaurants_list = []

    if not ids and not is_all:
        return {'message': 'nothing'}, 500
    if not name or name == '':
        RestaurantGroup().db()
    
    if is_all:
        restaurants = Restaurant().db()
        cursor = restaurants.aggregate([
            {'$match': {'_id': {'$nin': all_except}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]
    else:
        restaurants = Restaurant().db()
        cursor = restaurants.aggregate([
            {'$match': {'_id': {'$in': ids}}},
        ])
        restaurants_list = [Restaurant(**entity) for entity in cursor]

    new_group.name = name
    new_group.restaurants = restaurants

    try:
        new_group.save()
        return {'message': 'OK'}, 201
    except Exception as e:
            return {'message': 'BAD', 'error': e}, 500

def get_restaurant_groups(args):
    data = []
    if not args.get('id'):
        restaurants = RestaurantGroup().db()
        cursor = restaurants.aggregate([
            {'$match': {}},
        ])
        data = [RestaurantGroup(**entity) for entity in cursor]
    else:
        data = [RestaurantGroup().db().find_one({'_id': args.get('_id')})]
    return data

def delete_restaurant_group(agrs):
    id = agrs.get('_id')
    RestaurantGroup().db().delete_one({'_id': id})
    return {'message': 'OK'}, 200
