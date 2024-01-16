import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/Logout.css';

function LogoutForm( { onLogout }) {
    const [error, setError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setError("");
    }, 4000);


    return (
        <div>
            {error ? <p style={{'color' : 'red'}}>{error}</p> : null}
            <div className='button-container'>
                <label id='logout-label' htmlFor='logout'>User Logout:</label>
                <button id='logout' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default LogoutForm;