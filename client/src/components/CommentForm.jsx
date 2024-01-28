import React, { useState } from 'react';
// for finding data that matches url endpoint parameter
import { useParams } from 'react-router-dom';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/CommentForm.css';

// allows logged in user to create a comment
function CommentForm( { onComment }) {
    // commentError state
    const [commentError, setCommentError] = useState("");

    // get specific endpoint - useParams() returns string
    const params = useParams();

    // error in response disappears after time interval
    setTimeout(() => {
        setCommentError("");
    }, 5000);

    const formSchema = yup.object().shape({
        content: yup.string().required("Must enter content")
    })

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch(`/api/posts/${params.id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(newComment => onComment(newComment));
                } else {
                    response.json().then(err => setCommentError(err.error));
                }
            })
            resetForm();    
        }   
    })

    return (
        <div>
            {commentError ? <p style={{'color' : 'red'}}>{commentError}</p> : null}
            <div className='form-container'>
                <form id='comment-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='content'>Add a comment:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='content'
                            name='content'
                            type='text'
                            placeholder='comment...'
                            onChange={formik.handleChange}
                            value={formik.values.content}
                            autoComplete='off'
                        />
                        <p>{formik.errors.content}</p>
                    </div>
                    <div id='button'>
                        <button type='submit'><span id='comment-button'>Submit</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommentForm;