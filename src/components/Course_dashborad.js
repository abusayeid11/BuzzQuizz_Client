import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Course_dashboard.css';
import { setCourseId } from '../redux/other_reducer';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setRole] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/course/all'
                );
                setCourses(response.data);

                setRole(user.userRole);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseId = (courseId) => {
        dispatch(setCourseId(courseId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-screen font-serif" style={{ backgroundImage: `url(bg.jpg)` }}>
            <div className='flex justify-center pt-3 pb-3'>
                <h2 className='pt-3 font-semibold pb-3 text-2xl border-2 border-white bg-blue-300 w-1/6 flex justify-center rounded-md'>
                    All Courses
                </h2>
            </div>

            {/* Updated grid layout */}
            <div className="grid grid-cols-5 gap-4 w-full pr-10">
                {courses?.map((course) => (
                    <div key={course?.CourseID} className="bg-blue-300 flex flex-col gap-2 justify-center items-center border-2 border-white rounded-md pt-3 pb-3">
                        <h3 className="text-center font-semibold">{course?.CourseName}</h3>
                        {userRole === 'teacher' && (
                            <Link
                                to={'/create_quiz'}
                                className="btn bg-yellow-300 hover:bg-yellow-400 text-center p-2 rounded"
                                onClick={() => handleCourseId(course.CourseID)}
                            >
                                Create Exam
                            </Link>
                        )}
                        {userRole === 'student' && (
                            <Link
                                to={'/quiz_view'}
                                className="btn bg-green-300 hover:bg-green-400 text-center p-2 rounded"
                                onClick={() => handleCourseId(course.CourseID)}
                            >
                                Take Exam
                            </Link>
                        )}
                        {userRole === 'admin' && (
                            <Link
                                to={'/teacher_enlist'}
                                className="btn bg-white hover:bg-blue-500 text-center p-2 rounded"
                                onClick={() => handleCourseId(course.CourseID)}
                            >
                                Enlist Teacher
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCourses;