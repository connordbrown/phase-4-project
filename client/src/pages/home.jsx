import React from 'react';
import LoginForm from '../components/LoginForm';

function Home({ users }) {
  return (
    <div>
    <h2>Posts</h2>
    <ul>
        {/* Posts go here! Include link to see post with comments */}
    </ul>
    <hr />
    <h2>Users</h2>
    <ul>
        {users.map(user => (
        <li key={user.id}>
            <span>
            {user.username}, age: {user.age}, email: {user.email}
            </span>
        </li>
    ))}
    </ul>
    <hr />
    <h2>Log In</h2>
    <LoginForm />
    </div>
  )
}

export default Home;