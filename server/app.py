from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from config import app, db, api
from models import User, Post, Comment

@app.route('/')
def home():
    return 'Welcome to PostMaker!'


##### User Resources #####
class Users(Resource):
    def get(self):
      if users_dict_list := [u.to_dict() for u in User.query.all()]:
        return make_response(users_dict_list, 200)
      return make_response({'error': '404: Users Not Found'}, 404)
    
    def post(self):
        username = request.json.get('username')
        # age received as string - must convert to int
        age = int(request.json.get('age'))
        email = request.json.get('email')
        password = request.json.get('password')

        # input validations
        if not username:
            return make_response({'error': '400: User must have a username'}, 400)
        if not age:
            return make_response({'error': '400: User must have an age'}, 400)
        if not email:
            return make_response({'error': '400: User must have an email'}, 400)
        if not password:
            return make_response({'error': '400: User must have a password'}, 400)
        if not isinstance(age, int):
            return make_response({'error': 'Age must be an integer'}, 400)
        if not (10 <= age <= 120):
            return make_response({'error': 'Age must be between 10 and 120 years'}, 400)
        if ('@' or '.') not in email:
            return make_response({'error': 'Invalid email'}, 400)
        
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
            # get user id with response data
            new_user_data = db.session.get(User, new_user.id)
            return make_response(new_user_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422: Unprocessable Entity'}, 422)
api.add_resource(Users, '/users')


##### Login Resources #####
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


##### Post Resources #####
class Posts(Resource):
    def get(self):
        if posts_dict_list := [p.to_dict() for p in Post.query.all()]:
            return make_response(posts_dict_list, 200)
        return make_response({'error': '404: Posts Not Found'}, 404)
    
    def post(self):
        # user must be logged in to make a Post
        if not session.get('user_id'):
            return make_response({'error': '401: User not logged in'}, 401)
        title = request.json.get('title')
        content = request.json.get('content')
        timestamp = datetime.now()
        # id from logged in user
        user_id = session.get('user_id')

        # input validations
        if not title:
            return make_response({'error': '400: Invalid title'}, 400)
        if not content:
            return make_response({'error': '400: Invalid content'}, 400)
        if not user_id:
            return make_response({'error': '400: Invalid user ID'}, 400)
        if not isinstance(user_id, int):
            return make_response({'error': 'User ID must be an integer'}, 400)
        
        new_post = Post(
            title=title,
            content=content,
            timestamp=timestamp,
            user_id=user_id
        )

        try:
            db.session.add(new_post)
            db.session.commit()
            # get post id with response data
            new_post_data = db.session.get(Post, new_post.id)
            return make_response(new_post_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422: Unprocessable Entity'}, 422)
api.add_resource(Posts, '/posts')


class PostByID(Resource):
    def get(self, id):
        if post := Post.query.filter(Post.id == id).first():
            return make_response(post.to_dict(), 200)
        return make_response({'error': '404: Post Not Found'}, 404)
api.add_resource(PostByID, '/posts/<int:id>')


##### Comment Resources #####
class Comments(Resource):
    def get(self, post_id):
        # filter to get correct comments
        if comment_dict_list := [c.to_dict() for c in Comment.query.filter(Comment.post_id == post_id).all()]:
            return make_response(comment_dict_list, 200)
        return make_response({'error': '404: Comments Not Found'}, 404)

    def post(self, post_id):
        # user must be logged in to make a comment
        if not session.get('user_id'):
            return make_response({'error': '401: User not logged in'}, 401)
        content = request.json.get('content')
        timestamp = datetime.now()
        # id from logged in user
        user_id = session.get('user_id')
        # ensure correct post_id value by reassigning to current view_arg
        post_id = request.view_args.get('post_id')

        # input validations
        if not content:
            return make_response({'error': '400: Invalid content'}, 400)
        if not user_id:
            return make_response({'error': '400: Invalid user ID'}, 400)
        if not post_id:
            return make_response({'error': '400: Invalid post ID'}, 400)
        if not isinstance(user_id, int):
            return make_response({'error': '400: User ID must be an integer'}, 400)
        if not isinstance(post_id, int):
            return make_response({'error': '400: Post ID must be an integer'}, 400)
        
        new_comment = Comment(
            content=content,
            timestamp=timestamp,
            user_id=user_id,
            post_id=post_id
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            # get comment id with response data
            new_comment_data = db.session.get(Comment, new_comment.id)
            return make_response(new_comment_data.to_dict(), 201)
        except IntegrityError:
            return make_response({'error': '422: Unprocessable Entity'}, 422)
# comments are associated with a specific post view        
api.add_resource(Comments, '/posts/<int:post_id>/comments')

class CommentByID(Resource):
    def patch(self, id, post_id):
        # user must be logged in to edit a comment
        if not session.get('user_id'):
            return make_response({'error': '401: User not logged in'}, 401)
        # check for comment using multiple conditions
        if comment := Comment.query.filter(Comment.id == id, Comment.post_id == post_id).first():
            if not request.json.get('content'):
                return make_response({'error': '400: Invalid content'}, 400)
            # update comment attribute (content)
            for attr in request.json:
                setattr(comment, attr, request.json.get(attr))
            # ensure correct post_id value by reassigning to current view_arg
            post_id = request.view_args.get('post_id')
            comment.post_id = post_id
            # assign new timestamp for edited comment
            comment.timestamp = datetime.now()
            try:
                db.session.add(comment)
                db.session.commit()
                return make_response(comment.to_dict(), 200)
            except IntegrityError:
                return make_response({'error': '422 Unprocessable Entity'})
        return make_response({'error': '404: Comment not found'}, 404)
    
    def delete(self, id, post_id):
        # user must be logged in to delete a comment
        if not session.get('user_id'):
            return make_response({'error': '401: User not logged in'}, 401)
        # check for comment using multiple conditions
        if comment := Comment.query.filter(Comment.id == id, Comment.post_id == post_id).first():
            db.session.delete(comment)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': '404: Comment not found'}, 404)
# comments are associated with a specific post view    
api.add_resource(CommentByID, '/posts/<int:post_id>/comments/<int:id>')


if __name__ == "__main__":
    app.run(port=5555, debug=True)
