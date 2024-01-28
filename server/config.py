from flask import Flask
# connect Flask app to database
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
# password encryption
from flask_bcrypt import Bcrypt
# RESTful routes
from flask_restful import Api
# browser security
from flask_cors import CORS
# environment variables
from dotenv import load_dotenv
# access to API key and database URI
import os

# load environment variables from .env
load_dotenv()

naming_convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

# definitions of tables and associated schema constructs
metadata = MetaData(naming_convention=naming_convention)

# create Flask app instance
app = Flask(__name__)
# configure database URI and API key
app.secret_key = os.getenv("FLASK_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
# configure flag to disable modification tracking and use less memory
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# create Flask-SQLAlchemy extension
db = SQLAlchemy(app=app, metadata=metadata)

# create a Migrate object to manage schema modifications
migrate = Migrate(app=app, db=db)

# create a Bcrypt object to handle password encryption
bcrypt = Bcrypt(app=app)

# create an Api object to enable RESTful routes
api = Api(app=app)

# browser security feature - client can only make requests to default server
CORS(app)
