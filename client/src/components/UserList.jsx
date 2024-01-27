import React from 'react';
import './styling/UserList.css';
import UserItem from './UserItem';

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