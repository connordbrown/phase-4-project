import React from 'react';
// styling
import './styling/CommentList.css';
// child component
import CommentItem from './CommentItem.jsx';

// displays list of comments
function CommentList({ comments, loggedIn, currentUser, onUpdateCommentClick, onDeleteCommentClick }) {

    return (
            <div className='comments'>
                <h4>Comments</h4>
                <ul className='comment-list'>
                    {comments.map(comment => (
                        <CommentItem key={comment.id}
                                     comment={comment}
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