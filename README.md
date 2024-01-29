# PostMaker

PostMaker is a Full Stack React-Flask web application for making posts and comments!

The back end is a RESTful API that uses a SQLite database to store three tables: users, posts, and comments. The database contains one many-to-many relationship, and three one-to-many relationships: a user has many posts through comments, a user has many comments, a post has many comments, and a user has many posts. Currently, the application contains Create and Read methods for both users and posts, and full CRUD (Create, Read, Update, and Delete) methods available for comments. The front end makes interaction with the database simple and straightforward.

The front end is a React application that serves as a user-friendly test rig for the back end.

## Main Files

**server:**

- *instance* - contains app.db, the SQLite database used to run the API
- *migrations* - contains the Flask migration versions of app.db and associated files
- *app.py* - main server program; contains CRUD methods for the API endpoints for each database model: User, Post, Comment
- *config.py* - contains configuration for the entire Flask back end
- *models.py* - contains the models, relationships, and validations for each table in app.db
- *seed.py* - clears the database, then seeds it with sample data

**client:**

- *main.jsx* - for creating/rendering React application
- *App.jsx* - contains routes and state for main React application
- *index.html* - for creating/rendering React application

**client/components:**

- *CommentForm.jsx* - allows logged in user to create a comment
- *CommentItem.jsx* - displays comment details
- *CommentList.jsx* - displays list of comments
- *CommentUpdateForm.jsx* - allows logged in user to update a comment
- *LoginForm.jsx* - allows existing user to log in
- *Logout.jsx* - allows user to log out
- *NavBar.jsx* - enables navigation between pages/client-side routes
- *PostForm.jsx* - allows logged in user to create a post
- *PostItem.jsx* - displays post details
- *PostList.jsx* - displays list of posts
- *SignUpForm.jsx* - allows a user to sign up to use application
- *UserItem.jsx* - displays user details
- *UserList.jsx* - displays list of users

**client/pages:**

- *About.jsx* - contains description of the application
- *ErrorPage.jsx* - displays error message if user tries to navigate to nonexistent endpoint
- *Home.jsx* - displays list of posts, list of users, and login/logout feature
- *PostInfo.jsx* - displays specific post and associated comments
- *SignUp.jsx* - contains form for creating a new user

## Operation

**Back End:**

This application uses Python 3.9. It has dependencies that require a virtual environment. If the virtual environment is not already set up, use the following command:
```bash
pipenv --python 3.9
```

If pipenv is not installed, use this command:
```bash
pip install pipenv
```

Otherwise, install dependencies and run the virtual environment:

```bash
pipenv install
pipenv shell
```

Then, seed the database:
```bash
python server/seed.py
```

Finally, run the server:
```bash
python server/app.py
```

---

**Front End:**

In a separate command line window from the back end, install dependencies:
```bash
npm install
```
Then, run the React app in the browser:
```bash
npm run dev
```

## Usage

**Back End:**

The RESTful Flask API contains the following endpoints for http://127.0.0.1:5555:

 - */* - Home
 - */users* - Users resource (GET, POST)
 - */login* - Login resource (POST)
 - */logout* - Logout resource (DELETE)
 - */check_session* - Check if user logged in (GET)
 - */posts* - Posts resource (GET, POST)
 - */posts/:post_id* - Specific post resource (GET)
 - */posts/:post_id/comments* - All comments for a specific post (GET, POST)
 - */posts/:post_id/comments/:comment_id* - Specific comment for a specific post (PATCH, DELETE)

All ID numbers are integers. The client makes requests using the prefix */api* before the specific endpoint.

---

**Front End:**

1. Home: 
    - When the application first loads, the user will see the Home page. It contains: a navigation bar, which allows the user to move between different features and pages, a list of posts, which any user can view and a logged in user can contribute to, a list of users, which anyone can join using the SignUp page, and a login/logout feature, which signed-up users can use. When a user clicks on one of the posts, the app takes the user to that post's page.

2. About: 
    - When the user clicks on the About button on the nav bar, the page will display a description of the application.

3. PostInfo: 
    - The page of a specific post. All users can view the specific post and its comments. If logged in, users can make, update, and delete their own comments.

4. SignUp:
    - A form for signing up for the application. Once submitted, the new user can log in and make posts and comments.

## Contributing

Pull requests are not accepted at this time.

## Authors and Acknowledgement

The original application was designed and built by Connor D. Brown in 2024.
