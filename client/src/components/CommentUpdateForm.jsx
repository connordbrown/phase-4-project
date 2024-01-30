import React, { useState } from 'react';
// for form creation
import { useFormik } from 'formik';
import * as yup from 'yup';
// styling
import './styling/CommentUpdateForm.css';

// allows user to update a comment
function CommentUpdateForm( { selectedComment, onUpdate }) {
    // updateError state
    const [updateError, setUpdateError] = useState("");

    // error message in response disappears after time interval
    setTimeout(() => {
        setUpdateError("");
    }, 5000);

    const formSchema = yup.object().shape({
        content: yup.string().required("Must enter content")
    })

    const formik = useFormik({
        initialValues: {
            content: selectedComment.content,
        },
        enableReinitialize: true,  // clear form when props change
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch(`/api/posts/${selectedComment.post_id}/comments/${selectedComment.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(updatedComment => {
                        onUpdate(updatedComment);
                    });
                } else {
                    response.json().then(err => setUpdateError(err.error));
                }
            })
            resetForm();    
        }   
    })

    return (
        <div>
            {updateError ? <p style={{'color' : 'red'}}>{updateError}</p> : null}
            <div className='form-container'>
                <form id='update-comment-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='content'>Update comment:</label>
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

export default CommentUpdateForm;