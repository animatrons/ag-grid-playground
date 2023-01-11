

def build_query(filters):
    queries = []
    for filter in filters:
        field = filter.get('filter_field', None)
        value = filter.get('filter_value', None)
        operator = filter.get('operator', None)
        if not field or not value:
            continue
        expression = map_operation(operator, value)
        queries.append({field: expression})

    return queries

def map_operation(source_op, value):
    if source_op == 'contains':
        return {"$regex": "(?i).*" + value + ".*"}
    if source_op == 'notContains':
        return {"$regex": "(?i)^((?!" + value + ").)*$"}
    if source_op == 'equals':
        return {"$eq": value}
    if source_op == 'notEquals':
        return {"$ne": value}
    if source_op == 'lessThan':
        return {"$lt": value}
    if source_op == 'lessThanOrEqual':
        return {"$lte": value}
    if source_op == 'greaterThan':
        return {"$gt": value}
    if source_op == 'greaterThanOrEqual':
        return {"$gte": value}
    if source_op == 'inRange':
        return {"$gte": value['from'], "$lt": value['to']}
    
    print('Operator not mapped!', source_op)
    print('Using raw value')
    return value
    