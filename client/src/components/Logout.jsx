import React, { useState } from 'react';
import './styling/Logout.css';

function LogoutForm( { onLogout }) {
    const [error, setError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setError("");
    }, 4000);

    function handleLogout() {
    
    }

    return (
        <div>
            {error ? <p style={{'color' : 'red'}}>{error}</p> : null}
            <div className='button-container'>
                <label id='logout-label' htmlFor='logout'>User Logout:</label>
                <button id='logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutForm;