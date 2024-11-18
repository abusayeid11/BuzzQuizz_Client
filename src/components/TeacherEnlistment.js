import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles/TeacherEnlistment.css';
import { FaClipboardCheck, FaMale, FaTasks} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function TeacherEnlistment() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    function handleCourse() {
        navigate('/course');
    }

    useEffect(() => {
        fetchTeachers();
        fetchCourses();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/response/teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/course/all');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const assignTeacherToCourse = async () => {
        if (!selectedTeacher || !selectedCourse) {
            alert('Please select both a teacher and a course.');
            return;
        }

        try {
            await axios.put(`http://localhost:8000/api/course/${selectedCourse}`, {
                TeacherID: selectedTeacher,
            });
            alert('Teacher assigned to course successfully.');
            setSelectedTeacher('');
            setSelectedCourse('');
            handleCourse();
        } catch (error) {
            console.error('Error assigning teacher:', error);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col   font-serif text-black pt-20"
        style = {{backgroundImage: `url(bg.jpg)` }}>
            <div className="title flex justify-center pb-10">
            <h1 className=' font-serif text-black border-2 border-white bg-blue-300 rounded-md font-semibold pt-4 pb-4 pr-2 pl-4'>Teacher Enlistment</h1>
            </div>
          <div className='flex justify-center w-50%'>
            <div className=" pl-10 pr-10 pb-10 pt-10 flex flex-col justify-center items-center gap-5 bg-white border-2 border-blue-700 rounded-md  ">
                <h2 className=' font-semibold border-2 border-blue-800 flex flex-row justify-center items-center bg-blue-300 rounded-md pt-4 pb-4 pr-2 pl-2 gap-1'>
                <FaClipboardCheck size={20} color='navy'/>
                Assign Teacher to Course:</h2>
                <div className='flex justify-center items-center gap-2'>
                <FaMale size={20} color='navy'/>
                    <label htmlFor="teacher-select" className=''>Select Teacher:</label>
                   
                    <select
                        className="border-2 h-10 w-70 rounded-md pl-2"
                        id="teacher-select"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        
                        <option value="" className='text-black'>-Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.UserID} value={teacher.UserID}>
                                {teacher.FirstName} {teacher.LastName} (ID: {teacher.UserID})
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-center items-center gap-4'>
                    <FaTasks size={20} color='navy'/>
                    <label htmlFor="course-select" className=' text-black '>Select Course:</label>
                   
                    <select
                       className="border-2 h-10 w-70 rounded-md"
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="" className='text-black'>-Select  Course</option>
                        {courses.map((course) => (
                            <option key={course.CourseID} value={course.CourseID}>
                                {course.CourseName} (ID: {course.CourseID})
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={assignTeacherToCourse} className=' text-black bg-blue-300 border-2 border-blue-700 rounded-md pb-2 pr-2 pl-2 pt-2'>Assign Teacher</button>
            </div> </div>
        </div>
    );
}
