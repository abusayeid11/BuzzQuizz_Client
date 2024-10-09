import React, { useEffect } from 'react';
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { attempts_Number, earn_points, flag_result } from '../helper/helper';
import { resetOther } from '../redux/other_reducer';

export default function Result() {
    const dispatch = useDispatch();
    const {
        questions: { queue, answers },
        result: { result, userId },
    } = useSelector((state) => state);

    useEffect(() => {
        console.log(earnPoints);
    });

    const totalpoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earn_points(result, answers);
    const flag = flag_result(totalpoints, earnPoints);
    function onRestart() {
        console.log('Restart the exam');
        dispatch(resetAllAction());
        dispatch(resetResultAction());
        dispatch(resetOther());
    }
    return (
        <div className="container">
            <h1 className="title text-light">Quiz Application</h1>
            <div className="result flex-center">
                <div className="flex">
                    <span>Username</span>
                    <span className="bold">{userId}</span>
                </div>
                <div className="flex">
                    <span>Total Quiz Points : </span>
                    <span className="bold">{totalpoints}</span>
                </div>
                <div className="flex">
                    <span>Total Questions : </span>
                    <span className="bold">{queue.length}</span>
                </div>
                <div className="flex">
                    <span>Total Attempts : </span>
                    <span className="bold">{attempts}</span>
                </div>
                <div className="flex">
                    <span>Total Earn Points : </span>
                    <span className="bold">{earnPoints}</span>
                </div>
                <div className="flex">
                    <span>Quiz Result</span>
                    <span
                        style={{ color: `${flag ? '#01440d' : '#ff2a66'}` }}
                        className="bold"
                    >
                        {flag ? 'Passed' : 'Failed'}
                    </span>
                </div>
            </div>
            <div className="start">
                <Link className="btn" to={'/'} onClick={onRestart}>
                    Restart
                </Link>
            </div>
            {/* <div className="container">
                {/* result table */}
            {/* <ResultTable></ResultTable>
            </div> */}{' '}
        </div>
    );
}
