from faker import Faker

from config import app, db
from models import User

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()

    fake = Faker()

    ### User seed data ###
    print("Creating users...")
    users = []
    usernames = []
    emails = []

    for i in range(10):
      # ensure usernames are unique
      username = fake.first_name()
      while username in usernames:
        username = fake.first_name()
      usernames.append(username)

      email = fake.email()
      while email in emails:
        email = fake.email()
      emails.append(email)

      user = User(
        username=username,
        age=fake.random_int(min=10, max=120),
        email=email,
      )
      user._password_hash = username + 'password'

      users.append(user)

    db.session.add_all(users)






    db.session.commit()
    print("Complete.")
