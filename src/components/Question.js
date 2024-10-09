import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Question.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetOther } from '../redux/other_reducer';
const QuestionCreator = () => {
    const [questionType, setQuestionType] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const { quizId } = useSelector((state) => state.other);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
        setOptions(['', '', '', '']);
        setCorrectOption('');
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCorrectOptionChange = (e) => {
        setCorrectOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the question in the database
            const response = await axios.post(
                'http://localhost:8000/api/question/',
                {
                    QuestionText: question,
                    QuestionType: questionType,
                    QuizID: quizId,
                }
            );
            const { questionId } = response.data;

            // Create the options for the question
            const optionPromises = options.map((optionText) => {
                const isCorrect = optionText === correctOption;
                return axios.post('http://localhost:8000/api/options/', {
                    OptionText: optionText,
                    IsCorrect: isCorrect,
                    QuestionID: questionId,
                });
            });

            await Promise.all(optionPromises);

            // Reset the form fields
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption('');
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };
    const handleFinish = () => {
        dispatch(resetOther());
        navigate('/');
    };

    const renderQuestionForm = () => {
        switch (questionType) {
            case 'multiple-choice':
                return (
                    <div className="mcq_body">
                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        ))}
                        <select
                            value={correctOption}
                            onChange={handleCorrectOptionChange}
                        >
                            <option value="">Select Correct Option</option>
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    Option {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 'true/false':
                return (
                    <div className="single_question">
                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                        <select
                            value={correctOption}
                            onChange={handleCorrectOptionChange}
                        >
                            <option value="">Select Correct Option</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>
                );
            case 'short answer':
                return (
                    <div className="short_question">
                        <input
                            type="text"
                            placeholder="Question"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                        <input
                            type="text"
                            placeholder="Correct Answer"
                            value={correctOption}
                            onChange={handleCorrectOptionChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="type_body">
            <h1>Create Questions</h1>
            <select value={questionType} onChange={handleQuestionTypeChange}>
                <option value="">Select Question Type</option>
                <option value="multiple-choice">
                    Multiple Choice Question
                </option>
                <option value="true/false">True/False Question</option>
                <option value="short answer">Short Answer Question</option>
            </select>
            {renderQuestionForm()}
            <button onClick={handleSubmit}>Create Question</button>
            <button onClick={handleFinish}>Finish</button>
        </div>
    );
};

export default QuestionCreator;
