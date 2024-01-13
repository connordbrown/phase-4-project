import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function SignUpForm() {
    const [users, setUsers] = useState([{}]);
    const [refreshPage, setRefreshPage] = useState(false);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(15),
        age: yup.number().positive().integer().required("Must enter age").typeError("Please enter an integer").max(125),
        email: yup.string().email("Invalid email").required("Must enter email"),
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
    })

    return (
        <div>
            <h1>User Sign Up Form</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>
                <label htmlFor='name'>Name</label>
                <br />
                <input
                    id='name'
                    name='name'
                    placeholder='Enter your name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: 'red' }}> {formik.errors.name}</p>
                <label htmlFor='age'>Age</label>
                <br />
                <input
                    id='age'
                    name='age'
                    placeholder='Enter your age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />
                <p style={{ color: 'red' }}> {formik.errors.age}</p>
                <label htmlFor='email'>Email</label>
                <br />
                <input
                    id='email'
                    name='email'
                    placeholder='Enter your email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p style={{ color: 'red' }}> {formik.errors.email}</p>
                <label htmlFor='password'>Password</label>
                <br />
                <input
                    id='password'
                    name='password'
                    placeholder='Enter a password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: 'red' }}> {formik.errors.password}</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;