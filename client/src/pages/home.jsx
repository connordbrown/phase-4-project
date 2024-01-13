import React from 'react';
import SignUpForm from '../components/SignUpForm';

function Home() {

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {/* Posts go here! Include link to see post with comments */}
            </ul>
            <hr />
            <h2>Users</h2>
            <ul>
                {/* Users go here! Include links to see comments/posts by user */}
            </ul>
            <hr />
            <SignUpForm />
        </div>
    )
}

export default Home;