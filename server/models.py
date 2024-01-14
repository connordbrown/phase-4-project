from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

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