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

    # rules to prevent recursion error
    serialize_rules = ('-posts.user',)

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

    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'
    
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
    date_posted = db.Column(db.DateTime, nullable=False)

    # foreign key to associate posts to a user - no unassociated posts allowed
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # relationship mapping the post to related user
    user = db.relationship('User', back_populates='posts')

    # rules to prevent recursion error
    serialize_rules = ('-user.posts',)

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
    
    @validates('date_posted')
    def validate_date_posted(self, key, date_posted):
        if not date_posted:
            raise ValueError("Post must have a date")
        return date_posted
    
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not user_id:
            raise ValueError("Post must have a user id")
        if not User.query.filter(User.id == user_id).first():
            raise ValueError("Post must have an existing user id")
        return user_id
    
    def __repr__(self):
        return f'<Post {self.id}, {self.title}, {self.date_posted}>'

