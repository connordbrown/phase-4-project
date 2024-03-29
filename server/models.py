from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

##### User Model #####
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    # relationship mapping user to related posts
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    # relationship mapping user to related comments
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')

    # rules to prevent recursion error
    serialize_rules = ('-posts.user', '-comments.user', '-comments.post',)

    # association proxy to get posts commented on by this user through comments
    commented_posts = association_proxy('comments', 'post', creator=lambda post_obj: Comment(post=post_obj))

    # object representation
    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'

    # validation for attributes
    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError("User must have a username")
        if User.query.filter(User.username == username).first():
            raise ValueError(f"Username '{username}' is already taken")
        return username
    
    @validates('age')
    def validate_age(self, key, age):
        if not age:
            raise ValueError("User must have an age")
        if not isinstance(age, int):
            raise ValueError("Age must be an integer")
        if not (10 <= age <= 120):
            raise ValueError("User age must be between ages of 10 and 120 years")
        return age
    
    @validates('email')
    def validate_email(self, key, email):
        if ('@' and '.') not in email:
            raise ValueError("User must have valid email")
        if User.query.filter(User.email == email).first():
            raise ValueError(f"Email '{email}' is already taken")
        return email
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password access denied.")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
##### Post Model #####
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # foreign key to associate posts to a user - no unassociated posts allowed
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # relationship mapping the post to related user
    user = db.relationship('User', back_populates='posts')
    # relationship mapping post to related comments
    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')

    # rules to prevent recursion error
    serialize_rules = ('-user.posts', '-comments.post', '-comments.user',)

    # association proxy to get users who commented on this post through comments
    commenting_users = association_proxy('comments', 'user', creator=lambda user_obj: Comment(user=user_obj))

    # object representation
    def __repr__(self):
        return f'<Post {self.id}, {self.title}, {self.timestamp}>'

    # validation for attributes
    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Post must have a title")
        return title
    
    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError("Post must have content")
        return content
    
    @validates('timestamp')
    def validate_timestamp(self, key, timestamp):
        if not timestamp:
            raise ValueError("Post must have a timestamp")
        return timestamp
    
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise ValueError("Post must have a user id")
        if not isinstance(user_id, int):
            raise ValueError("User ID must be an integer")
        if not User.query.filter(User.id == user_id).first():
            raise ValueError("Post must have an existing user id")
        return user_id
    

##### Comment Model #####
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)
    
    # foreign keys to associate comments to a user and a post - no unassociated comments allowed
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    # relationship mapping comment to related user
    user = db.relationship('User', back_populates='comments')
    # relationship mapping comment to related post
    post = db.relationship('Post', back_populates='comments')

    # rules to prevent recursion error
    serialize_rules = ('-user.comments', '-post.comments',)

    # object representation
    def __repr__(self):
        return f'<Comment {self.id}, User {self.user_id}, Post {self.post_id}, {self.timestamp}'
    
    # validation for attributes
    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError("Comment must have content")
        return content
    
    @validates('timestamp')
    def validate_date_posted(self, key, timestamp):
        if not timestamp:
            raise ValueError("Comment must have a timestamp")
        return timestamp
    
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise ValueError("Post must have a user ID")
        if not isinstance(user_id, int):
            raise ValueError("User ID must be an integer")
        if not User.query.filter(User.id == user_id).first():
            raise ValueError("Comment must have an existing user ID")
        return user_id
    
    @validates('post_id')
    def validate_post_id(self, key, post_id):
        if not post_id:
            raise ValueError("Comment must have a post ID")
        if not isinstance(post_id, int):
            raise ValueError("Post ID must be an integer")
        if not Post.query.filter(Post.id == post_id).first():
            raise ValueError("Comment must have an existing post ID")
        return post_id