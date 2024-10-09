import React, { useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { clearUser, setUser } from '../redux/user_reducer';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userName, userRole, isLoggedIn } = useSelector(
        (state) => state.user
    );
    // const state = useSelector((state) => state);

    useEffect(() => {
        const verifyUser = async () => {
            // Check if the user is logged in
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('userId');

            if (token && id) {
                try {
                    // Make a request to the /verify endpoint to get the user data
                    const response = await axios.get(
                        `http://localhost:8000/api/user/${id}`,
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        }
                    );

                    const user = response.data;

                    dispatch(
                        setUser({
                            userId: user.UserID,
                            userName: user.Username,
                            userRole: user.UserRole,
                        })
                    );
                } catch (error) {
                    console.error('Error verifying token:', error);
                    dispatch(clearUser());
                }
            } else {
                dispatch(clearUser());
            }
        };

        verifyUser();
    }, [dispatch]);

    function handleLogout() {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        console.log('loggedout');
        dispatch(clearUser());
        navigate('/');
    }

    function navigateToQuiz() {
        navigate('/course_view');
    }
    function navigateToLogin() {
        navigate('/login');
    }
    function handleCourse() {
        navigate('/course');
    }
    return (
        <div className="home_body">
            <div className="header_body">
                <div className="app_title"> BuzzQuizz</div>
                {isLoggedIn ? (
                    <div class="user-menu">
                        <div class="user-info">
                            {userName}
                            <div class="dropdown-icon">
                                <ArrowDropDownIcon></ArrowDropDownIcon>
                            </div>
                        </div>
                        <div class="dropdown-content">
                            <span>{userRole}</span>
                            {userRole === 'admin' && (
                                <button
                                    className="course"
                                    onClick={handleCourse}
                                >
                                    Courses
                                </button>
                            )}
                            <button className="logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button onClick={navigateToLogin}>Log In</button>
                    </div>
                )}
            </div>
            <div className="body_layout">
                <div className="title_body">
                    Give Your Academic Exams
                    <br /> with <br />
                    BuzzQuizz
                </div>
                <div className="exam_btn">
                    <button onClick={navigateToQuiz}>Take Exam</button>
                </div>
            </div>
        </div>
    );
}
