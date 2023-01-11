from flask import request
from flask_restplus import Resource, reqparse

from ..util.dto import RestaurantDto
from ..service.restaurant_service import get_restaurants, save_restaurant_group, get_restaurant_groups, get_restaurant_group_page, delete_restaurant_group


api = RestaurantDto.api
_restaurant = RestaurantDto.restaurant
restaurant_page = RestaurantDto.restaurant_page
restaurant_group = RestaurantDto.restaurant_group

@api.route('')
class RestaurantList(Resource):
    parser = api.parser()

    @api.doc(
        'list_of_restaurants',
        params=dict(
            sort_field="Sort Field", sort_order="Sort Direction",
            page="Page", size="Size"
        )
    )
    @api.expect(parser)
    @api.marshal_list_with(restaurant_page)
    def post(self):
        filters = request.json.get('filters')
        # print(filters)
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        parser.add_argument('sort_field', location='args')
        parser.add_argument('sort_order', location='args')
        args = parser.parse_args()
        data = get_restaurants(args, filters)
        return data

@api.route('/groups')
class RestaurantGroups(Resource):
    parser = api.parser()

    @api.doc('Group Pagination')
    @api.expect(parser)
    @api.marshal_list_with(restaurant_page)
    def post(self):
        filters = request.json.get('filters')
        sorts = request.json.get('sorts')
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        args = parser.parse_args()
        data = get_restaurant_group_page(args, sorts, filters)
        print(data)

    @api.expect(restaurant_group)
    @api.doc('Save a restaurant group')
    def put(self):
        data = request.json
        return save_restaurant_group(data=data)
    
    @api.doc('List all restaurant groups')
    def get(self):
        args = request.args
        return get_restaurant_groups(args)

    @api.doc('Delete restaurant groups')
    def delete(self):
        args = request.args
        return delete_restaurant_group(args)
