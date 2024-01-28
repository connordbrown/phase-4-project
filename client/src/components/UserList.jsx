import React from 'react';
// styling
import './styling/UserList.css';
// child component
import UserItem from './UserItem';

// displays list of users
function UserList({ users }) {

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <UserItem user={user} key={user.id} />
                ))}
            </ul> 
        </div>
    )
}

export default UserList;