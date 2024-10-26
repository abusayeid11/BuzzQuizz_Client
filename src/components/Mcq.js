import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import '../styles/Mcq.css';
import { useFetchQuizData } from '../hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../hooks/setResult.js';

export default function Mcq({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const [shortAnswerText, setShortAnswerText] = useState('');  // For short-answer text input
    const [{ isLoading, serverError }] = useFetchQuizData();
    const state = useSelector((state) => state);
    const trace = useSelector((state) => state.questions.trace);
    const result = useSelector((state) => state.result.result);
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.queue[state.questions.trace]);
=======
import axios from 'axios';  // Import axios for API requests
import '../styles/Mcq.css';
import { useFetchQuizData } from '../hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../hooks/setResult';
import { FaQuestion } from 'react-icons/fa';

export default function Mcq({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const [{ isLoading, serverError }] = useFetchQuizData();
    const trace = useSelector((state) => state.questions.trace);
    const result = useSelector((state) => state.result.result);
    const dispatch = useDispatch();
    const questions = useSelector(
        (state) => state.questions.queue[state.questions.trace]
    );
>>>>>>> e0b2abd79bd868a9ea6fec0d373c2c90635952e2
    const userId = useSelector((state) => state.user.userId); // Get the user ID from the store
    const quizId = useSelector((state) => state.other.quizId); // Get the quiz ID from the store

    useEffect(() => {
<<<<<<< HEAD
        console.log(state);
        dispatch(updateResult({ trace, checked }));
    }, [checked, dispatch, trace]);

    const submitResponse = async (questionId, chosenOption = null, isCorrect = null, answerText = '') => {
        try {
            // Conditionally fetch AnswerText if chosenOption is provided
            let finalAnswerText = answerText;
            if (chosenOption) {
                const optionResponse = await axios.get(`http://localhost:8000/api/options/${chosenOption}`);
                finalAnswerText = optionResponse.data.OptionText;  // Set OptionText as the answer
            }

            const response = await axios.post('http://localhost:8000/api/response/', {
=======
        if (checked !== undefined) {
            dispatch(updateResult({ trace, checked }));
        }
    }, [checked, dispatch, trace]);

    const submitResponse = async (questionId, chosenOption, isCorrect) => {
        try {
            // Fetch the AnswerText from the Option table using chosenOption (OptionID)
            const optionResponse = await axios.get(`http://localhost:8000/api/options/${chosenOption}`);
            const answerText = optionResponse.data.OptionText;  // Assuming 'OptionText' is the field name for answer text

            // Now submit the response with the fetched AnswerText
            await axios.post('http://localhost:8000/api/response/', {
>>>>>>> e0b2abd79bd868a9ea6fec0d373c2c90635952e2
                UserID: userId,
                QuizID: quizId,
                QuestionID: questionId,
                ChosenOption: chosenOption,
<<<<<<< HEAD
                AnswerText: finalAnswerText,  // Use answer text or fetched OptionText
                IsCorrect: isCorrect,
            });

            console.log('Response submitted successfully', response.data);
        } catch (error) {
            console.error('Error submitting response:', error);
=======
                AnswerText: answerText,  // Use the fetched answer text
                IsCorrect: isCorrect,
            });

            console.log('Response submitted successfully');
        } catch (error) {
            console.error('Error submitting response:', error.message || error);
>>>>>>> e0b2abd79bd868a9ea6fec0d373c2c90635952e2
        }
    };

    const onSelect = (optionId) => {
        onChecked(optionId);
        setChecked(optionId);
<<<<<<< HEAD
        const isCorrect = questions.Options.find(option => option.OptionID === optionId)?.IsCorrect;

        submitResponse(questions.QuestionID, optionId, isCorrect);
        dispatch(updateResult({ trace, checked: optionId }));
    };

    const onShortAnswerSubmit = () => {
        submitResponse(questions.QuestionID, null, null, shortAnswerText);  // Submit text answer
        dispatch(updateResult({ trace, checked: shortAnswerText }));
    };

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError) return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>;

    return (
        <div className="mcq_body">
            <h2 className="question_title">{questions?.QuestionText}</h2>
            {questions?.QuestionType === 'short answer' ? (
                <div>
                    <input
                        type="text"
                        value={shortAnswerText}
                        onChange={(e) => setShortAnswerText(e.target.value)}
                        placeholder="Type your answer here..."
                    />
                    <button onClick={onShortAnswerSubmit}>Submit</button>
                </div>
            ) : (
                <ul key={questions?.QuestionID}>
                    {questions?.Options.map((option) => (
                        <li key={option.OptionID}>
                            <input
                                type="radio"
                                name="options"
                                id={`q${option.OptionID}-option`}
                                onChange={() => onSelect(option.OptionID)}
                            />
                            <label
                                className="radio_label"
                                htmlFor={`q${option.OptionID}-option`}
                            >
                                {option.OptionText}
                            </label>
                            <div
                                className={`check ${result[trace] === option.OptionID ? 'checked' : ''}`}
                            ></div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';  // Import axios for API requests
// import '../styles/Mcq.css';
// import { useFetchQuizData } from '../hooks/FetchQuestion';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateResult } from '../hooks/setResult';

// export default function Mcq({ onChecked }) {
//     const [checked, setChecked] = useState(undefined);
//     const [{ isLoading, serverError }] = useFetchQuizData();
//     const trace = useSelector((state) => state.questions.trace);
//     const result = useSelector((state) => state.result.result);
//     const dispatch = useDispatch();
//     const questions = useSelector(
//         (state) => state.questions.queue[state.questions.trace]
//     );
//     const state = useSelector((state) => state);
//     const userId = useSelector((state) => state.user.userId); // Get the user ID from the store
//     const quizId = useSelector((state) => state.other.quizId); // Get the quiz ID from the store

//     useEffect(() => {
//         console.log(state);
//         dispatch(updateResult({ trace, checked }));
//     }, [checked, dispatch, trace]);

//     const submitResponse = async (questionId, chosenOption, isCorrect) => {
//         try {
//             // Fetch the AnswerText from the Option table using chosenOption (OptionID)
//             const optionResponse = await axios.get(`http://localhost:8000/api/options/${chosenOption}`);
//             const answerText = optionResponse.data.OptionText;  // Assuming 'OptionText' is the field name for answer text
    
//             // Now submit the response with the fetched AnswerText
//             const response = await axios.post('http://localhost:8000/api/response/', {
//                 UserID: userId,
//                 QuizID: quizId,
//                 QuestionID: questionId,
//                 ChosenOption: chosenOption,
//                 AnswerText: answerText,  // Use the fetched answer text
//                 IsCorrect: isCorrect,
//             });
    
//             console.log('Response submitted successfully', response.data);
//         } catch (error) {
//             console.error('Error submitting response:', error);
//         }
//     };
    

//     function onSelect(optionId) {
//         onChecked(optionId);
//         setChecked(optionId);

//         const isCorrect = questions.Options.find(option => option.OptionID === optionId)?.IsCorrect;

//         // Submit response to the backend
//         submitResponse(questions.QuestionID, optionId, isCorrect);

//         // Dispatch the result to update the state
//         dispatch(updateResult({ trace, checked: optionId }));
//     }

//     if (isLoading) return <h3 className="text-light">Loading...</h3>;
//     if (serverError) return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>;

//     return (
//         <div className="mcq_body">
//             <h2 className="question_title">{questions?.QuestionText}</h2>
//             <ul key={questions?.QuestionID}>
//                 {questions?.Options.map((option) => (
//                     <li key={option.OptionID}>
//                         <input
//                             type="radio"
//                             value={false}
//                             name="options"
//                             id={`q${option.OptionID}-option`}
//                             onChange={() => onSelect(option.OptionID)}
//                         />
//                         <label
//                             className="radio_label"
//                             htmlFor={`q${option.OptionID}-option`}
//                         >
//                             {option.OptionText}
//                         </label>
//                         <div
//                             className={`check ${
//                                 result[trace] === option.OptionID
//                                     ? 'checked'
//                                     : ''
//                             }`}
//                         ></div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
=======

        const isCorrect = questions?.Options.find(option => option.OptionID === optionId)?.IsCorrect;

        // Submit response to the backend
        if (questions) {
            submitResponse(questions.QuestionID, optionId, isCorrect);
        }
    };

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError) {
        console.error(serverError);
        return <h3 className="text-light">{serverError.message || 'Unknown Error'}</h3>;
    }

    return (
        <div className="w-50% h-50% bg-blue-300 border-2 border-white rounded-md pt-4  pl-4  ">
            <div className="qs flex gap-2">
                <FaQuestion size={30} />
                <h2 className="text-3xl underline flex items-center">
                    {questions?.QuestionText}
                </h2> 
            </div>
            <div>
            <ul key={questions?.QuestionID}>
                {questions?.Options.map((option) => (
                    <li key={option.OptionID} className="flex ">
                        {/* Hidden radio input */}
                        <input
                            type="radio"
                            name="options"
                            id={`q${option.OptionID}-option`}
                            onChange={() => onSelect(option.OptionID)}
                            className="hidden"
                        />

                        {/* Custom radio button */}
                        <label
                            className="text-black font-serif cursor-pointer flex flex-row gap-2 w-full"
                            htmlFor={`q${option.OptionID}-option`}
                        >
                            <span
                                className={`w-5 h-5  rounded-full border-2 transition duration-20  ${
                                    checked === option.OptionID ? 'bg-black border-2 border-black' : 'bg-white border-gray-400'
                                }`}
                            ></span>
                            <span className='text-black font-serif hover:text-gray-50'>
                            {option.OptionText}
                            </span>
                           
                        </label>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}
>>>>>>> e0b2abd79bd868a9ea6fec0d373c2c90635952e2
