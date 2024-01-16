import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/LoginForm.css';

function LoginForm( { onLogin }) {
    const [error, setError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setError("");
    }, 4000);

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(15),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(user => onLogin(user));
                } else {
                    response.json().then(err => setError(err.error));
                }
            })
            resetForm();       
        }   
    })

    return (
        <div>
            {error ? <p style={{'color' : 'red'}}>{error}</p> : null}
            <div className='form-container'>
                <form id='login-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>User Login:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='username'
                            name='username'
                            placeholder='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <p>{formik.errors.username}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <p>{formik.errors.password}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;