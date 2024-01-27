import React from 'react';
import './styling/CommentItem.css';

function CommentItem({ comment, loggedIn, currentUser, onUpdateCommentClick, onDeleteCommentClick }) {

    // display comment details
    return (
            <div>
                <li className='comment' key={comment.id}>
                    <span className='comment-container'>
                    {comment.user.username} : {comment.content} - {comment.timestamp}
                    {loggedIn && comment.user_id === currentUser.id && (
                    <>
                        <button className='edit-button' onClick={() => onUpdateCommentClick(comment.id)}>edit</button>
                        <button className='delete-button' onClick={() => onDeleteCommentClick(comment.id, comment.post_id)}>delete</button>
                    </>
                    )}
                    </span>
                </li>
            </div>
    )
}

export default CommentItem;