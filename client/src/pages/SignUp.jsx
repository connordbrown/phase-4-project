import React from 'react';
import SignUpForm from '../components/SignUpForm';

// display description of application and any other useful information
function SignUp({ onAddUser }) {
    return (
        <div>
            <h2>Create New User</h2>
            <SignUpForm onAddUser={onAddUser}/>
        </div>
    )
}

export default SignUp;