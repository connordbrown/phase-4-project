import React from 'react';
import { Link } from 'react-router-dom';
import './styling/PostList.css';

function PostList({ posts }) {

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
        </div>
    )
}

export default PostList;