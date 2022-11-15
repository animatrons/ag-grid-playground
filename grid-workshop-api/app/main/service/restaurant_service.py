from app.main.util.strings import generate_id
from app.db.Models.restaurant import Restaurant

from app.main.util.paginator import Paginator
from app.main.util.filter import build_query

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
