import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/Logout';

function Home({ users }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)

    function handleLogin(user) {
        setCurrentUser(user);
        setLoggedIn(true);
    }
  
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
            {loggedIn ? <p style={{'color': 'green'}}>LOGGED IN: {currentUser.username}</p> : <p style={{'color': 'red'}}>LOGGED OUT</p>}
            <LoginForm onLogin={handleLogin}/>
            <LogoutForm />
        </div>
    )
    }

export default Home;