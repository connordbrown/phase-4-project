import React, { useState } from 'react';
import './styling/Logout.css';

function LogoutForm( { onLogout }) {
    const [logoutError, setLogoutError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setLogoutError("");
    }, 4000);

    function submitLogoutRequest() {
        fetch("/api/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                onLogout();
            } else {
                response.json().then(err => setLogoutError(err.error));
            }
        })
    }

    return (
        <div>
            {logoutError ? <p style={{'color' : 'red'}}>{logoutError}</p> : null}
            <div className='button-container'>
                <label id='logout-label' htmlFor='logout'>User Logout:</label>
                <button id='logout' onClick={submitLogoutRequest}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutForm;