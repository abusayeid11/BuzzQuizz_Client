// import React, { useEffect, useState } from 'react';
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

//     useEffect(() => {
//         console.log(state);
//         dispatch(updateResult({ trace, checked }));
//     }, [checked]);

//     function onSelect(i) {
//         onChecked(i);
//         setChecked(i);
//         dispatch(updateResult({ trace, checked }));
//     }
//     if (isLoading) return <h3 className="text-light">isLoading</h3>;
//     if (serverError)
//         return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>;
//     return (
//         <div className="mcq_body">
//             <h2 className="question_title">{questions?.QuestionText}</h2>
//             <ul key={questions?.QuestionID}>
//                 {questions?.Options.map((option, i) => (
//                     <li key={option.OptionID}>
//                         <input
//                             type="radio"
//                             value={false}
//                             name="options"
//                             id={`q${option.OptionID}-option`}
//                             onChange={() => onSelect(option.OptionID)}
//                         />
//                         <label
//                             className="radio_lable"
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios for API requests
import '../styles/Mcq.css';
import { useFetchQuizData } from '../hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../hooks/setResult';

export default function Mcq({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const [{ isLoading, serverError }] = useFetchQuizData();
    const trace = useSelector((state) => state.questions.trace);
    const result = useSelector((state) => state.result.result);
    const dispatch = useDispatch();
    const questions = useSelector(
        (state) => state.questions.queue[state.questions.trace]
    );
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.user.userId); // Get the user ID from the store
    const quizId = useSelector((state) => state.other.quizId); // Get the quiz ID from the store

    useEffect(() => {
        console.log(state);
        dispatch(updateResult({ trace, checked }));
    }, [checked, dispatch, trace]);

    const submitResponse = async (questionId, chosenOption, isCorrect) => {
        try {
            // Fetch the AnswerText from the Option table using chosenOption (OptionID)
            const optionResponse = await axios.get(`http://localhost:8000/api/options/${chosenOption}`);
            const answerText = optionResponse.data.OptionText;  // Assuming 'OptionText' is the field name for answer text
    
            // Now submit the response with the fetched AnswerText
            const response = await axios.post('http://localhost:8000/api/response/', {
                UserID: userId,
                QuizID: quizId,
                QuestionID: questionId,
                ChosenOption: chosenOption,
                AnswerText: answerText,  // Use the fetched answer text
                IsCorrect: isCorrect,
            });
    
            console.log('Response submitted successfully', response.data);
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };
    

    function onSelect(optionId) {
        onChecked(optionId);
        setChecked(optionId);

        const isCorrect = questions.Options.find(option => option.OptionID === optionId)?.IsCorrect;

        // Submit response to the backend
        submitResponse(questions.QuestionID, optionId, isCorrect);

        // Dispatch the result to update the state
        dispatch(updateResult({ trace, checked: optionId }));
    }

    if (isLoading) return <h3 className="text-light">Loading...</h3>;
    if (serverError) return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>;

    return (
        <div className="mcq_body">
            <h2 className="question_title">{questions?.QuestionText}</h2>
            <ul key={questions?.QuestionID}>
                {questions?.Options.map((option) => (
                    <li key={option.OptionID}>
                        <input
                            type="radio"
                            value={false}
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
                            className={`check ${
                                result[trace] === option.OptionID
                                    ? 'checked'
                                    : ''
                            }`}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
