from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from config import app, db, api
from models import User, Post

@app.route('/')
def home():
    return 'Welcome to Post Maker!'

class Users(Resource):
    def get(self):
      users_dict_list = [u.to_dict() for u in User.query.all()]
      return make_response(users_dict_list, 200)
    
    def post(self):
        username = request.json.get('username')
        # age received as string - must convert to int
        age = int(request.json.get('age'))
        email = request.json.get('email')
        password = request.json.get('password')

        if not username or not age or not email or not password:
            return make_response({'errors': ['validation errors']}, 400)
        if not isinstance(age, int):
            return make_response({'errors': ['validation errors']}, 400)
        if not (10 <= age <= 120):
            return make_response({'errors': ['validation errors']}, 400)
        if ('@' or '.') not in email:
            return make_response({'errors': ['validation errors']}, 400)
        
        new_user = User(
            username=username,
            age=age,
            email=email
        )

        # password encrypted by setter
        new_user.password_hash = password

        try:
            db.session.add(new_user)
            db.session.commit()
            # get user id with data
            new_user_data = db.session.get(User, new_user.id)
            return make_response(new_user_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422: Unprocessable Entity'}, 422)
api.add_resource(Users, '/users')

class Login(Resource):
    def post(self):
        if user := User.query.filter(User.username == request.json.get('username')).first():
            if user.authenticate(request.json.get('password')):
                session['user_id'] = user.id
                return user.to_dict(), 200
            return {'error': '401: Invalid Password'}, 401
        return {'error': '401: Invalid Username'}, 401
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': '401: User not logged in'}, 401
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        if user := User.query.filter(User.id == session.get('user_id')).first():
            return user.to_dict(), 200
        return {'error': '401: User not logged in'}, 401
api.add_resource(CheckSession, '/check_session')

class Posts(Resource):
    def get(self):
        posts_dict_list = [p.to_dict() for p in Post.query.all()]
        return make_response(posts_dict_list, 200)
    
    def post(self):
        title = request.json.get('title')
        content = request.json.get('content')       ### ADD AUTHORIZATION for POST
        timestamp = datetime.now()
        # id from logged in user
        user_id = session.get('user_id')

        if not title:
            return make_response({'errors': ['validation errors']}, 400)
        if not content:
            return make_response({'errors': ['validation errors']}, 400)
        if not user_id:
            return make_response({'errors': ['validation errors']}, 400)
        
        new_post = Post(
            title=title,
            content=content,
            timestamp=timestamp,
            user_id=user_id
        )

        try:
            db.session.add(new_post)
            db.session.commit()
            # get post id with data
            new_post_data = db.session.get(Post, new_post.id)
            return make_response(new_post_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422 Unprocessable Entity'}, 422)
api.add_resource(Posts, '/posts')

class PostByID(Resource):
    def get(self, id):
        post = Post.query.filter(Post.id == id).first()
        return make_response(post.to_dict(), 200)
api.add_resource(PostByID, '/posts/<int:id>')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
