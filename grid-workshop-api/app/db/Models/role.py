from app.db.document import Document


class Role(Document):
    __TABLE__ = "roles"

    name = None
    authorities = []
    sites = []
    created_on = None
    modified_on = None
