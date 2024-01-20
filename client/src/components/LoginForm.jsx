import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/LoginForm.css';

function LoginForm( { onLogin }) {
    const [loginError, setLoginError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setLoginError("");
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
                    response.json().then(err => setLoginError(err.error));
                }
            })
            resetForm();       
        }   
    })

    return (
        <div>
            {loginError ? <p style={{'color' : 'red'}}>{loginError}</p> : null}
            <div className='form-container'>
                <form id='login-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>User Login:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='username'
                            name='username'
                            type='text'
                            placeholder='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            autoComplete='on'
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
                            autoComplete='off'
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