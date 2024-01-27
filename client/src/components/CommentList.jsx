import React from 'react';
import './styling/CommentList.css';
import CommentItem from './CommentItem.jsx';

function CommentList({ comments, loggedIn, currentUser, onUpdateCommentClick, onDeleteCommentClick }) {

    // display comment list
    return (
            <div className='comments'>
                <h4>Comments</h4>
                <ul className='comment-list'>
                    {comments.map(comment => (
                        <CommentItem comment={comment}
                                     loggedIn={loggedIn} 
                                     currentUser={currentUser} 
                                     onUpdateCommentClick={onUpdateCommentClick} 
                                     onDeleteCommentClick={onDeleteCommentClick} 
                        />
                    ))}
                </ul>
            </div>
    )
}

export default CommentList;