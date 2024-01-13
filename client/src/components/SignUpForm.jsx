import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styling/SignUpForm.css';

function SignUpForm() {
    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(15),
        age: yup.number().positive().integer().required("Must enter an age").typeError("Please enter an integer").max(125),
        email: yup.string().email("Invalid email").required("Must enter an email"),
        password: yup.string().required("Must enter a password")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
          },   
    })

    return (
        <div>
            <h2>User Sign Up Form</h2>
            <div className='form-container'>
                <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>
                    <div className='form-inputs'>
                        <br />
                        <input
                            id='name'
                            name='name'
                            placeholder='user name'
                            onChange={formik.handleChange}
                            value={formik.values.name}
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