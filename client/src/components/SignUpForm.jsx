import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/SignUpForm.css';

function SignUpForm( { onAddUser }) {

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(15),
        age: yup.number().positive().integer().required("Must enter an age").typeError("Please enter an integer").max(125),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            age: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(response => response.json())
            .then(newUser => onAddUser(newUser))
            
            resetForm();
        }   
    })

    return (
        <div>
     
            <div className='form-container'>
                <form id='signup-form' onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>
                <label htmlFor='username'>New User Sign Up:</label>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='username'
                            name='username'
                            placeholder='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <p>{formik.errors.name}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='age'
                            name='age'
                            placeholder='user age'
                            onChange={formik.handleChange}
                            value={formik.values.age}
                        />
                        <p>{formik.errors.age}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='email'
                            name='email'
                            placeholder='user email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <p>{formik.errors.email}</p>
                    </div>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='user password'
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

export default SignUpForm;