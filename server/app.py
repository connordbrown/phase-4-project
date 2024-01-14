from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User

@app.route('/')
def home():
    return 'Welcome to Post Maker!'

class Users(Resource):
    def get(self):
      users_dict_list = [u.to_dict() for u in User.query.all()]
      return make_response(users_dict_list, 200)
  
api.add_resource(Users, '/users')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
