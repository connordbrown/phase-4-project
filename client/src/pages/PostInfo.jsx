import React from 'react';
// for finding data that matches url endpoint parameter
import { useParams } from 'react-router-dom';

function PostInfo({ posts }) {
// get specific endpoint - useParams() returns string
const params = useParams();

// find data in posts that matches endpoint
const postData = posts.find(post => {
    return post.id === parseInt(params.id);
})

// destructure postData object
const {title, content, timestamp, user} = postData;

// display post details
return (
    <div>
        <h2>{title}</h2>
        <span>by {user['username']} - {timestamp}</span>
        <p>{content}</p>
    </div>
)

}

export default PostInfo;