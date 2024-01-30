
import React, { useState } from 'react';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/PostForm.css';

// allows logged in user to create a post
function PostForm( { onPost }) {
    // postError state
    const [postError, setPostError] = useState("");

    // error message in response disappears after time interval
    setTimeout(() => {
        setPostError("");
    }, 5000);

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(50),
        content: yup.string().required("Must enter content")
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
                    response.json().then(post => onPost(post));
                } else {
                    response.json().then(err => setPostError(err.error));
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
                            type='text'
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
                            type='text'
                            placeholder='content'
                            onChange={formik.handleChange}
                            value={formik.values.content}
                            autoComplete='off'
                        />
                        <p>{formik.errors.content}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm;