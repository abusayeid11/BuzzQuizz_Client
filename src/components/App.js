import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Result from './Result';
import Register from './Register';
import Login from './Login';
import Course from './Course';
import QuestionCreator from './Question';
import AllCourses from './Course_dashborad';
import CreateQuizForm from './Create_Quiz.js';
import AllQuizzes from './Quiz_dashboard.js';
import { useSelector } from 'react-redux';

import {
    CheckUserStudent,
    CheckUserTeacher,
    CheckUserExist,
    CheckUserAdmin,
} from '../helper/helper.js';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
    },
    {
        path: '/quiz',
        element: (
            <CheckUserStudent>
                <Quiz />
            </CheckUserStudent>
        ),
    },
    {
        path: '/result',
        element: (
            <CheckUserStudent>
                <Result />
            </CheckUserStudent>
        ),
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/course',
        element: (
            <CheckUserAdmin>
                <Course />
            </CheckUserAdmin>
        ),
    },
    {
        path: '/create_questions',
        element: (
            <CheckUserTeacher>
                <QuestionCreator />
            </CheckUserTeacher>
        ),
    },
    {
        path: '/course_view',
        element: (
            <CheckUserExist>
                <AllCourses />
            </CheckUserExist>
        ),
    },
    {
        path: '/create_quiz',
        element: (
            <CheckUserTeacher>
                <CreateQuizForm />
            </CheckUserTeacher>
        ),
    },
    {
        path: '/quiz_view',
        element: (
            <CheckUserStudent>
                <AllQuizzes />
            </CheckUserStudent>
        ),
    },
]);

function App() {
    const state = useSelector((state) => state);
    console.log(state);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
