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

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('userId');

            if (token && id) {
                try {
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
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
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
        <div className="home_body min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* Header */}
            <div className="header_body w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between bg-white shadow-md">
                <div className="app_title text-2xl font-bold text-blue-600">
                    BuzzQuizz
                </div>
                {isLoggedIn ? (
                    <div className="user-menu relative group">
                        {/* User Info (trigger) */}
                        <div className="user-info flex items-center cursor-pointer">
                            <span className="text-lg font-semibold text-blue-600 ">{userName}</span>
                            <ArrowDropDownIcon className="ml-2" />
                        </div>
                        
                        {/* Dropdown content */}
                        <div className="dropdown-content absolute right-0 mt-0 bg-white shadow-lg rounded-md z-20 w-48 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 ease-in-out">
                            <span className="block px-4 py-2 text-gray-700 capitalize">{userRole}</span>
                            {userRole === 'admin' && (
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleCourse}
                                >
                                    Courses
                                </button>
                            )}
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={navigateToLogin}
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>

            {/* Main Body */}
            <div className="body_layout mt-16 text-center">
                <div className="title_body text-4xl font-bold text-gray-800 mb-8">
                    Give Your Academic Exams <br />
                    with <span className="text-blue-500">BuzzQuizz</span>
                </div>
                <div className="exam_btn">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg"
                        onClick={navigateToQuiz}
                    >
                        Take Exam
                    </button>
                </div>
            </div>
        </div>
    );
}
