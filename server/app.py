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
    
    def post(self):
        username = request.json.get('username')
        age = request.json.get('age')
        email = request.json.get('email')
        password = request.json.get('password')

        if not username or not age or not email or not password:
            return make_response({'errors': ['validation errors']}, 400)
        if not (10 <= int(age) <= 120):
            return make_response({'errors': ['validation errors']}, 400)
        if ('@' or '.') not in email:
            return make_response({'errors': ['validation errors']}, 400)
        
        new_user = User(
            username=username,
            age=age,
            email=email
        )

        # password encrypted by setter
        new_user._password_hash = password

        try:
            db.session.add(new_user)
            db.session.commit()
            # get user id with data
            new_user_data = db.session.get(User, new_user.id)
            return make_response(new_user_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422: Unprocessable Entity'}, 422)
  
api.add_resource(Users, '/users')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
