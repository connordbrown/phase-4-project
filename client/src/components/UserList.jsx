import React from 'react';
import './styling/UserList.css';

function UserList({ users }) {

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    <span>
                    {user.username}, age: {user.age}, email: {user.email}
                    </span>
                </li>
                ))}
            </ul> 
        </div>
    )
}

export default UserList;