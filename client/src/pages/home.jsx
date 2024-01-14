import React, { useEffect, useState } from 'react';
import SignUpForm from '../components/SignUpForm';

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
    .then(response => response.json())
    .then(data => setUsers(data))
  }, [])

  return (
    <div>
    <h2>Posts</h2>
    <ul>
        {/* Posts go here! Include link to see post with comments */}
    </ul>
    <hr />
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
    <hr />
    <SignUpForm />
    </div>
  )
}

export default Home;