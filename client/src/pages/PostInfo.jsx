import React, { useState, useEffect } from 'react';
// for finding data that matches url endpoint parameter
import { useParams } from 'react-router-dom';
import '../App.css';

function PostInfo() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // get specific endpoint - useParams() returns string
    const params = useParams();

    // fetch post data
    useEffect(()=> {
        fetch(`/api/posts/${params.id}`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPost(data);
                    setIsLoaded(true);
                })
            } else {
                response.json().then(err => console.log(err.error))
            }
        })
    }, [])

    // fetch comment data
    useEffect(() => {
        fetch(`/api/posts/${params.id}/comments`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => setComments(data))
            } else {
                response.json().then(err => console.log(err.error))
            }
        })
    }, [])

    if (!isLoaded) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }

    // display post details and comments
    return (
        <div>
            <h2>{post.title}</h2>
            <span>by {post.user.username} - {post.timestamp}</span>
            <p>{post.content}</p>
            <div className='comments'>
                <h4>Comments</h4>
                <ul className='comment-list'>
                    {comments.map(comment => (
                        <li className='comment' key={comment.id}>
                            <span>
                                {comment.user.username} : {comment.content} - {comment.timestamp}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

    }

    export default PostInfo;