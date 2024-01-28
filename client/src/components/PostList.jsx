import React from 'react';
// styling
import './styling/PostList.css';
// child component
import PostItem from './PostItem';

// displays list of posts
function PostList({ posts }) {

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
    )
}

export default PostList;