import React from 'react';
import './styling/UserItem.css';

// displays user information
function UserItem({ user }) {

    return (
        <div>
            <li>
                <span>
                {user.username}, age: {user.age}, email: {user.email}
                </span>
            </li>
        </div>
    )
}

export default UserItem;