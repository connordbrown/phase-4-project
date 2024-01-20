// add autocomplete to form
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/PostForm.css';

function PostForm( { onPost }) {
    const [postError, setPostError] = useState("");

    // error in response disappears after time interval
    setTimeout(() => {
        setPostError("");
    }, 4000);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a username").max(50),
        content: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(user => onPost(user));
                } else {
                    response.json().then(err => setLoginError(err.error));
                }
            })
            resetForm();       
        }   
    })

    return (
        <div>
            {postError ? <p style={{'color' : 'red'}}>{postError}</p> : null}
            <div className='form-container'>
                <form id='post-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='title'>Create a Post:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='title'
                            name='title'
                            placeholder='title'
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            autoComplete='on'
                        />
                        <p>{formik.errors.title}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='content'
                            name='content'
                            placeholder='password'
                            onChange={formik.handleChange}
                            value={formik.values.content}
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