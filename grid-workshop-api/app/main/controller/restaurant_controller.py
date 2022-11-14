from flask import request
from flask_restplus import Resource, reqparse

from ..util.dto import RestaurantDto
from ..service.restaurant_service import get_restaurants


api = RestaurantDto.api
_restaurant = RestaurantDto.restaurant
restaurant_page = RestaurantDto.restaurant_page

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
        filters = request.json
        print(filters)
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, location='args')
        parser.add_argument('size', type=int, location='args')
        parser.add_argument('sort_field', location='args')
        parser.add_argument('sort_order', location='args')
        args = parser.parse_args()
        data = get_restaurants(args, filters)
        return data
