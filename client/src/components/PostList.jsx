import React from 'react';
import './styling/PostList.css';
import PostItem from './PostItem';

function PostList({ posts }) {

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <PostItem post={post} />
                ))}
            </ul>
        </div>
    )
}

export default PostList;