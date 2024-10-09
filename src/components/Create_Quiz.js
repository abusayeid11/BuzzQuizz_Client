import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Create_Quiz.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizID } from '../redux/other_reducer';

const CreateQuizForm = () => {
    const navigate = useNavigate();
    const { courseId } = useSelector((state) => state.other);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        QuizTitle: '',
        Description: '',
        Duration: '',
        TeacherID: '',
        CourseID: courseId,
        StartTime: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/quiz/',
                formData
            );
            const { quizId } = response.data;

            dispatch(setQuizID(quizId));
            navigate('/create_questions');
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div className="create_quiz_body">
            <h1>Create Quiz</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-label">Quiz Title:</div>
                    <input
                        type="text"
                        name="QuizTitle"
                        value={formData.QuizTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-label">Description:</div>
                    <textarea
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-label">Duration:</div>
                    <input
                        type="number"
                        name="Duration"
                        value={formData.Duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-label">Teacher ID:</div>
                    <input
                        type="text"
                        name="TeacherID"
                        value={formData.TeacherID}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <div className="form-label">Start Time:</div>
                    <input
                        type="datetime-local"
                        name="StartTime"
                        value={formData.StartTime}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuizForm;
