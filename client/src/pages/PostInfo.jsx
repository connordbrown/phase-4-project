import React, { useState, useEffect } from 'react';
// for finding data that matches url endpoint parameter
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import '../App.css';

function PostInfo({ loggedIn, currentUser }) {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [postsLoaded, setPostsLoaded] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    // get specific endpoint - useParams() returns string
    const params = useParams();

    // fetch post data
    useEffect(()=> {
        fetch(`/api/posts/${params.id}`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPost(data);
                    setPostsLoaded(true);
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
                response.json().then(data => {
                    setComments(data);
                    setCommentsLoaded(data);
                })
            } else {
                response.json().then(err => console.log(err.error))
            }
        })
    }, [])

    function handleAddComment(newComment) {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    }

    if (!postsLoaded) {
        return <div>Loading posts...</div>; // Show a loading state while data is being fetched
    }

    if (!commentsLoaded) {
        return <div>Loading comments...</div>
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
                            <span className='comment-container'>
                                {comment.user.username} : {comment.content} - {comment.timestamp}
                                {loggedIn && comment.user_id === currentUser.id && (
                                <>
                                    <button className='edit-button'>edit</button>
                                    <button className='delete-button'>delete</button>
                                </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <CommentForm onComment={handleAddComment} />
        </div>
    )

    }

    export default PostInfo;