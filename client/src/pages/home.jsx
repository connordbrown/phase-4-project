import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/Logout';

function Home({ users, currentUser, loggedIn, onLogin, onLogout }) {

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
            {loggedIn ? <LogoutForm onLogout={onLogout} /> : <LoginForm onLogin={onLogin} />}  
        </div>
    )
}

export default Home;