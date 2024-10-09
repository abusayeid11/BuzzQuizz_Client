import React, { useState } from 'react';
import '../styles/Login.css';
import { Navigate, Link } from 'react-router-dom'; // Import Link from react-router-dom;
import axios from 'axios';

export default function Login() {
    const [values, setValues] = useState({
        userName: '',
        password: '',
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
        if (values.userName && values.password) {
            // Simulate login logic here, for now just dispatching username
            setValid(true);
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/user/login',
                    values
                );
                const { userId, token } = response.data;
                console.log(response.data);
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
        setSubmitted(true);
    };

    return (
        <div className="login_body">
            <h1>Log in</h1>
            <form className="login_form" onSubmit={handleSubmit}>
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
                    <button className="form_field" type="submit">
                        Login
                    </button>
                )}

                {/* Link to Register Component */}
                <div className="register-link">
                    <p>
                        Not registered?{' '}
                        <Link to="/register">Register here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
