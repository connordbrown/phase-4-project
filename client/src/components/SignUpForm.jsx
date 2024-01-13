import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

function SignUpForm() {


    return (
        <div>
            <h1>User Sign Up Form</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>
                <label htmlFor='name'>Name</label>
                <br />
                <input
                    id='name'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: 'red' }}> {formik.errors.name}</p>
                <label htmlFor='age'>Age</label>
                <br />
                <input
                    id='age'
                    name='age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />
                <p style={{ color: 'red' }}> {formik.errors.age}</p>
                <label htmlFor='email'>Email</label>
                <br />
                <input
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p style={{ color: 'red' }}> {formik.errors.email}</p>
                <label htmlFor='password'>Password</label>
                <br />
                <input
                    id='password'
                    name='password'
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