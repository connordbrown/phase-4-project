import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import LogoutForm from '../components/Logout';
import PostForm from '../components/PostForm';
import '../App.css';

function Home({ users, posts, currentUser, loggedIn, onLogin, onLogout, onPost }) {
    const [postFormVisible, setPostFormVisible] = useState(false);

    function handlePostFormVisible() {
        setPostFormVisible(!postFormVisible);
    }

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <Link to={`/posts/${post.id}`} key={post.id} className='post-link'>
                        <li className='posts'>
                            <span>
                                 {post.title} - <em>{post.user['username']}</em>
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>
            {postFormVisible ? <button id='hide-post' onClick={handlePostFormVisible}>Hide post form</button> : null}
            {postFormVisible ? <PostForm onPost={onPost} setPostFormVisible={setPostFormVisible} /> : <button id='create-post' onClick={handlePostFormVisible}>Make a post</button>}
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