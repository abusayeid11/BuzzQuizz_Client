import Mcq from './Mcq';
import '../styles/Quiz.css';
/** redux store import */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/**import functions from hooks */
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom';
export default function Quiz() {
    const { queue, trace } = useSelector((state) => state.questions);
    const result = useSelector((state) => state.result.result);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [check, setCheck] = useState(undefined);
    useEffect(() => {
        console.log(state);
    });

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }
    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
        }
        /**reset value */
        setCheck(undefined);
    }
    function onChecked(check) {
        setCheck(check);
    }
    /**finished exam show result table */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate>;
    }
    return (
        <div className="quiz_body">
            <h1 className="course_title">{state.questions.courseName}</h1>
            <Mcq onChecked={onChecked} />

            <div className="grid">
                <button
                    className="btn prev"
                    onClick={onPrev}
                    disabled={trace <= 0 ? true : false}
                >
                    Prev
                </button>
                <button className="btn next" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
