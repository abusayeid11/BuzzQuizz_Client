import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResponseManager = () => {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { quizId } = useSelector((state) => state.other); // Fetch quiz ID from Redux store

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/response/quiz/${quizId}`); // Adjust the endpoint accordingly
                setResponses(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            fetchResponses();
        }
    }, [quizId]);

    const handleDelete = async (responseID) => {
        try {
            await axios.delete(`http://localhost:8000/api/response/${responseID}`);
            setResponses(responses.filter(response => response.ResponseID !== responseID));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Error: {error}</h3>;

    return (
        <div className='bg-red-200'>
            <h2 className='text-black'>User Responses</h2>
            {responses.length === 0 ? (
                <p className='text-black'>No responses found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Question</th>
                            <th>Chosen Option</th>
                            <th>Answer Text</th>
                            <th>Is Correct</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-black bg-green-300'>
                        {responses.map(response => (
                            <tr key={response.ResponseID}>
                                <td>{response.FirstName} {response.LastName}</td>
                                <td>{response.QuestionText}</td>
                                <td>{response.ChosenOption}</td>
                                <td>{response.AnswerText}</td>
                                <td>{response.IsCorrect ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleDelete(response.ResponseID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ResponseManager;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ResponseManager = () => {
//     const [responses, setResponses] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch all responses on component mount
//         const fetchResponses = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8000/api/response/'); // Adjust the endpoint accordingly
//                 // Ensure the data is an array
//                 setResponses(Array.isArray(res.data) ? res.data : []);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchResponses();
//     }, []);

//     // Function to delete a response
//     const handleDelete = async (responseID) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/response/${responseID}`);
//             setResponses(responses.filter(response => response.ResponseID !== responseID));
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     if (loading) return <h3>Loading...</h3>;
//     if (error) return <h3>Error: {error}</h3>;

//     return (
//         <div className='bg-red-200'>
//             <h2 className='text-black'>User Responses</h2>
//             {responses.length === 0 ? (
//                 <p className='text-black'>No responses found.</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>User</th>
//                             <th>Question</th>
//                             <th>Chosen Option</th>
//                             <th>Answer Text</th>
//                             <th>Is Correct</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className='text-black bg-green-300'>
//                         {responses.map(response => (
//                             <tr key={response.ResponseID}>
//                                 <td>{response.FirstName} {response.LastName}</td>
//                                 <td>{response.QuestionText}</td>
//                                 <td>{response.ChosenOption}</td>
//                                 <td>{response.AnswerText}</td>
//                                 <td>{response.IsCorrect ? 'Yes' : 'No'}</td>
//                                 <td>
//                                     <button onClick={() => handleDelete(response.ResponseID)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default ResponseManager;
