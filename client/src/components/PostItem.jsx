import React from 'react';
// for routing to different page
import { Link } from 'react-router-dom';
// styling
import './styling/PostItem.css';

// displays basic post information and enables link to detailed information 
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