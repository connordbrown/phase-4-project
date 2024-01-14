from config import app, db
from models import User

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()

    db.session.commit()
    # remove pass and write your seed data
