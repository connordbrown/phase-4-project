import React from 'react';
import SignUpForm from '../components/SignUpForm';

// allows user to sign up 
function SignUp({ onAddUser }) {
    return (
        <div>
            <h2>Create New User</h2>
            <SignUpForm onAddUser={onAddUser}/>
        </div>
    )
}

export default SignUp;