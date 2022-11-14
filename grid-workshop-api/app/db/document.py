from app.db.connection import get_next_sequence_value, mongo
from app.main.util.strings import generate_id


class Document:

    __TABLE__ = None
    __ID_COUNTER__ = None

    _id = None

    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__setattr__(k, v)

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    # @property
    def db(self, **kwargs):
        return mongo.db[self.__TABLE__]

    def save(self , **kwargs):
        self._id = self._id or generate_id()
        self._id = self.db(**kwargs).save(self.to_dict())
        return self

    def load(self, query=None, **kwargs):
        if not query:
            query = {'_id': self._id}
        self.from_dict(self.db(**kwargs).find_one(query))
        return self

    def delete(self, query=None, **kwargs):
        if self.id:
            if not query:
                query = {'_id': self._id}
            self.db(**kwargs).remove(query)

        return self

    def to_dict(self):
        return self.__dict__

    def from_dict(self, d):
        if d:
            self.__dict__ = d
        else:
            self.id = None
        return self

    @classmethod
    def get_all(cls, query={}, **kwargs):
        return [cls(**r) for r in cls().db(**kwargs).find(query)]

    @classmethod
    def drop(cls, **kwargs):
        return cls().db(**kwargs).drop()

