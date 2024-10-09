import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        console.log(state);
        dispatch(updateResult({ trace, checked }));
    }, [checked]);

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({ trace, checked }));
    }
    if (isLoading) return <h3 className="text-light">isLoading</h3>;
    if (serverError)
        return <h3 className="text-light">{serverError || 'Unknown Error'}</h3>;
    return (
        <div className="mcq_body">
            <h2 className="question_title">{questions?.QuestionText}</h2>
            <ul key={questions?.QuestionID}>
                {questions?.Options.map((option, i) => (
                    <li key={option.OptionID}>
                        <input
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${option.OptionID}-option`}
                            onChange={() => onSelect(option.OptionID)}
                        />
                        <label
                            className="radio_lable"
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
