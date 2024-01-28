import React, { useState, useEffect } from 'react';
// for finding data that matches url endpoint parameter
import { useParams } from 'react-router-dom';
// comments and comment create/update tools for current post
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import CommentUpdateForm from '../components/CommentUpdateForm';
// styling
import '../App.css';

// displays current post, associated comments, and comment creation tool
function PostInfo({ loggedIn, currentUser }) {
    // current post
    const [post, setPost] = useState({});
    // associated comments
    const [comments, setComments] = useState([]);

    // loading states
    const [postLoaded, setPostLoaded] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    // for updating comments
    const [updatingComment, setUpdatingComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});

    // get specific endpoint - useParams() returns string
    const params = useParams();

    // fetch post data
    useEffect(()=> {
        fetch(`/api/posts/${params.id}`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPost(data);
                    setPostLoaded(true);
                })
            } else {
                response.json().then(err => console.log(err.error));
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
                    setCommentsLoaded(true);
                })
            } else {
                response.json().then(err => {
                    console.log(err.error);
                    setComments([]);
                    setCommentsLoaded(true);
                })
            }
        })
    }, [])

    // add a new comment
    function handleAddComment(newComment) {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    }

    // find comment to update, change create form to update form
    function configureUpdateComment(commentID) {
        const commentToUpdate = comments.find(comment => comment.id === commentID);
        setSelectedComment(commentToUpdate);
        setUpdatingComment(true);
    }

    // update comment
    function handleUpdateComment(updatedComment) {
        const updatedComments = comments.map(comment => {
            if (comment.id === updatedComment.id) {
                return updatedComment;
            }
            return comment;
        })
        setComments(updatedComments);
        setSelectedComment({});
        setUpdatingComment(false);
    }

    // delete comment
    function handleDeleteComment(commentID, postID) {
        fetch(`/api/posts/${postID}/comments/${commentID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                const updatedComments = comments.filter(comment => {
                    return comment.id !== commentID;
                })
                setComments(updatedComments);
            } else {
                response.json().then(err => console.log(err.error));
            }
        })
    }

    // Show a loading state while post data are being fetched
    if (!postLoaded) {
        return <div>Loading posts...</div>;
    }

        // Show a loading state while comments data are being fetched
    if (!commentsLoaded) {
        return <div>Loading comments...</div>
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <span>by {post.user.username} - {post.timestamp}</span>
            <p>{post.content}</p>
            <CommentList comments={comments}
                         loggedIn={loggedIn}
                         currentUser={currentUser}
                        onUpdateCommentClick={configureUpdateComment} 
                        onDeleteCommentClick={handleDeleteComment}
            />
            {updatingComment ? <CommentUpdateForm selectedComment={selectedComment} onUpdate={handleUpdateComment}/> : <CommentForm onComment={handleAddComment} />}
        </div>
    )

}

export default PostInfo;