import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/Logout';

function Home({ users }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)

    function handleLogin(user) {
        setCurrentUser(user);
        setLoggedIn(true);
    }
  
    function handleLogout() {
        setCurrentUser(null)
        setLoggedIn(false);   
    }

    // make else more useful!
    useEffect(() => {
        fetch("/api/check_session")
        .then(response => {
            if (response.ok) {
                response.json().then(user => handleLogin(user))
            } else {
                response.json().then(err => console.log(err.error))
            }
        })
    }, [])

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
            <h2>{loggedIn ? "Log Out" : "Log In"}</h2>
            {loggedIn ? <p style={{'color': 'green'}}>LOGGED IN: {currentUser.username}</p> : <p style={{'color': 'red'}}>LOGGED OUT</p>}
            {loggedIn ? <LogoutForm onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}  
        </div>
    )
    }

export default Home;