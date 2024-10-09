import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Course_dashboard.css';
import { setQuizID } from '../redux/other_reducer';

const AllQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { courseId } = useSelector((state) => state.other);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/quiz/course/${courseId}`
                );
                setQuizzes(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizId = (quizzId) => {
        // Dispatch the setCourseId action with courseId as the payload
        dispatch(setQuizID(quizzId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="courses-container">
            <h2>All Quizzes</h2>
            <div className="grid-container">
                {quizzes?.map((quizz) => (
                    <div key={quizz?.QuizID} className="course-card">
                        <h3>{quizz?.QuizTitle}</h3>
                        <Link
                            to={`/quiz`}
                            className="btn"
                            onClick={() => handleQuizId(quizz.QuizID)}
                        >
                            Take Exam
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllQuizzes;
