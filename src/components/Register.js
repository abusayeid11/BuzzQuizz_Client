import React, { useState } from 'react';
import '../styles/Register.css';
import { useDispatch } from 'react-redux';
import { setCourseName } from '../redux/question_reducer';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        courseName: '',
        userRole: 'student',
    });

    const handleInputChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            values.userName &&
            values.password &&
            values.firstName &&
            values.lastName &&
            values.email &&
            values.courseName
        ) {
            // Simulate registration logic here, for now just dispatching username and course name
            setValid(true);
            dispatch(setCourseName(values.courseName));
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/user/register',
                    values
                );
                const { userId, token } = response.data;
                // Store the userId and token in the client (e.g., local storage, Redux store)
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }
        setSubmitted(true);
    };

    return (
        <div className="register_body">
            <h1>Register</h1>
            <form className="register_form" onSubmit={handleSubmit}>
                {submitted && valid && (
                    <Navigate to={'/'} replace="true"></Navigate>
                )}
                {!valid && (
                    <input
                        className="form_field"
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.userName && (
                    <span id="username-error">Please enter a username</span>
                )}

                {!valid && (
                    <input
                        className="form_field"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.password && (
                    <span id="password-error">Please enter a password</span>
                )}

                {!valid && (
                    <input
                        className="form_field"
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.firstName && (
                    <span id="first-name-error">
                        Please enter your first name
                    </span>
                )}

                {!valid && (
                    <input
                        className="form_field"
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.lastName && (
                    <span id="last-name-error">
                        Please enter your last name
                    </span>
                )}

                {!valid && (
                    <input
                        className="form_field"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.email && (
                    <span id="email-error">Please enter your email</span>
                )}

                {!valid && (
                    <input
                        className="form_field"
                        type="text"
                        placeholder="Course Name"
                        name="courseName"
                        value={values.courseName}
                        onChange={handleInputChange}
                    />
                )}
                {submitted && !values.courseName && (
                    <span id="course-name-error">
                        Please enter a course name
                    </span>
                )}

                <select
                    className="form_field"
                    name="userRole"
                    value={values.userRole}
                    onChange={handleInputChange}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                {!valid && (
                    <button className="form_field" type="submit">
                        Register
                    </button>
                )}
            </form>
        </div>
    );
}
