from app.db.document import Document


class Restaurant(Document):
    __TABLE__ = "restaurants"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.rating and type(self.rating) is str:
            self.rating = None

    URL = None
    name = None
    address = None
    address_line_2 = None
    outcode = None
    postcode = None
    rating = None
    type_of_food = None

    URL_type = 'string'
    name_type = 'string'
    address_type = 'string'
    address_line_2_type = 'string'
    outcode_type = 'string'
    postcode_type = 'string'
    rating_type = 'number'
    type_of_food_type = 'string'

    def parse_ints(self):
        if self.rating:
            self.rating = int(self.rating)

class RestaurantGroups(Document):
    __TABLE__ = "restaurant_groups"

    group_id = None
    group_name = None

    URL = None
    restaurant_id = None
    address = None
    address_line_2 = None
    outcode = None
    postcode = None
    rating = None
    type_of_food = None

    group_id_type = str
    group_name_type = str
    URL_type = str
    name_type = str
    address_type = str
    address_line_2_type = str
    outcode_type = str
    postcode_type = str
    rating_type = int
    type_of_food_type = str
