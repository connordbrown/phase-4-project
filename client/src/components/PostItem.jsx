import React from 'react';
import { Link } from 'react-router-dom';
import './styling/PostItem.css';

function PostItem({ post }) {

    return (
        <div>
            <Link to={`/posts/${post.id}`} key={post.id} className='post-link'>
                <li className='posts'>
                    <span>
                        {post.title} - <em>{post.user['username']}</em>
                    </span>
                </li>
            </Link>
        </div>
    )
}

export default PostItem;