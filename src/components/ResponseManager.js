import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResponseManager = () => {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { quizId } = useSelector((state) => state.other);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/response/quiz/${quizId}`);
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

    if (loading) return <h3 className="text-center text-gray-500">Loading...</h3>;
    if (error) return <h3 className="text-center text-red-500">Error: {error}</h3>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Responses</h2>
            {responses.length === 0 ? (
                <p className="text-gray-600">No responses found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-4 text-left">User</th>
                                <th className="py-3 px-4 text-left">Question</th>
                                <th className="py-3 px-4 text-left">Chosen Option</th>
                                <th className="py-3 px-4 text-left">Answer Text</th>
                                <th className="py-3 px-4 text-left">Is Correct</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map(response => (
                               
                                <tr
                                    key={response.ResponseID}
                                    className="border-b hover:bg-gray-100 text-gray-700"
                                >
                                    <td className="py-3 px-4">
                                        {response.FirstName} {response.LastName}
                                    </td>
                                    <td className="py-3 px-4">{response.QuestionText}</td>
                                    <td className="py-3 px-4">{response.ChosenOption}</td>
                                    <td className="py-3 px-4">{response.AnswerText}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`py-1 px-3 rounded-full text-sm ${
                                                response.IsCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                                            }`}
                                        >
                                            {response.IsCorrect ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleDelete(response.ResponseID)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
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
