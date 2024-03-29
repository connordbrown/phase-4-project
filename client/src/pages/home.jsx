import React, { useState } from 'react';
import PostList from '../components/PostList';
import UserList from '../components/UserList';
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import PostForm from '../components/PostForm';
import '../App.css';

// displays lists of posts and users, as well as login/logout feature
function Home({ users, posts, currentUser, loggedIn, onLogin, onLogout, onPost }) {
    // state for post form rendering
    const [postFormVisible, setPostFormVisible] = useState(false);

    // change post form visibility
    function handlePostFormVisible() {
        setPostFormVisible(!postFormVisible);
    }

    return (
        <div>
            <PostList posts= {posts} />
            {postFormVisible ? <button id='hide-post-form' onClick={handlePostFormVisible}>Hide post form</button> : null}
            {postFormVisible ? <PostForm onPost={onPost} /> : <button id='create-post' onClick={handlePostFormVisible}>Make a post</button>}
            <hr />
            <UserList users={users} />
            <hr />
            <h2>{loggedIn ? "Log Out" : "Log In"}</h2>
            {loggedIn ? <p style={{'color': 'green'}}>LOGGED IN: {currentUser.username}</p> : <p style={{'color': 'red'}}>LOGGED OUT</p>}
            {loggedIn ? <Logout onLogout={onLogout} /> : <LoginForm onLogin={onLogin} />}  
        </div>
    )
}

export default Home;