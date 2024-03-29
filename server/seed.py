from faker import Faker
from datetime import datetime

from config import app, db
from models import User, Post, Comment

if __name__ == "__main__":
  with app.app_context():
    print("Deleting all records...")
    User.query.delete()
    Post.query.delete()
    Comment.query.delete()

    fake = Faker()


    ##### User seed data #####
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
      user.password_hash = user.username + 'password'

      users.append(user)

    db.session.add_all(users)


    ##### Post seed data #####
    print("Creating posts...")
    posts = []

    start_date = datetime(2024, 1, 1, 14, 24, 32)
    end_date = datetime(2024, 1, 18, 20, 46, 51)

    for i in range(10):
      title = fake.sentence(nb_words=5)
      content = fake.paragraph(nb_sentences=2) + " " + fake.emoji()
      timestamp = fake.date_time_between(start_date, end_date)
      user_id = fake.random_int(min=1, max=10)

      post = Post(
        title=title,
        content=content,
        timestamp=timestamp,
        user_id=user_id,
      )

      posts.append(post)

    # sort posts by date created
    sorted_posts = sorted(posts, key=lambda x: x.timestamp)
    db.session.add_all(sorted_posts)


    ##### Comment seed data #####
    print("Creating comments...")
    comments = []

    start_date = datetime(2024, 1, 1, 14, 24, 32)
    end_date = datetime(2024, 1, 18, 20, 46, 51)

    for i in range(50):
      content = fake.sentence(nb_words=5)
      timestamp = fake.date_time_between(start_date, end_date)
      user_id = fake.random_int(min=1, max=10)
      post_id = fake.random_int(min=1, max=10)

      comment = Comment(
        content=content,
        timestamp=timestamp,
        user_id=user_id,
        post_id=post_id,
      )

      comments.append(comment)
    
    # sort comments by date created
    sorted_comments = sorted(comments, key=lambda x: x.timestamp)
    db.session.add_all(sorted_comments)


    db.session.commit()
    print("Seeding complete.")
