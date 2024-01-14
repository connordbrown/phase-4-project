from config import app, db
from models import User

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()

    print("Adding user...")
    user = User(
      username="James123456",
      age=33,
      email="james1@emailcom",
    )

    user._password_hash = 'password'

    db.session.add(user)
    db.session.commit()
    print("Complete.")
    # remove pass and write your seed data
