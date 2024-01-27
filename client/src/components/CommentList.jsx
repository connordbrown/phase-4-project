import React from 'react';
import './styling/CommentList.css';

function CommentList({ comments, loggedIn, currentUser }) {

    // display post details and comments
    return (
            <div className='comments'>
                <h4>Comments</h4>
                <ul className='comment-list'>
                    {comments.map(comment => (
                        <li className='comment' key={comment.id}>
                            <span className='comment-container'>
                                {comment.user.username} : {comment.content} - {comment.timestamp}
                                {loggedIn && comment.user_id === currentUser.id && (
                                <>
                                    <button className='edit-button' onClick={() => configureUpdateComment(comment.id)}>edit</button>
                                    <button className='delete-button' onClick={() => handleDeleteComment(comment.id, post.id)}>delete</button>
                                </>
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
    )

}

export default CommentList;