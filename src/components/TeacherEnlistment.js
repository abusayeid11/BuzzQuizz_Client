import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles/TeacherEnlistment.css';

export default function TeacherEnlistment() {
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        fetchTeachers();
        fetchCourses();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/teachers');
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
            await axios.put(`http://localhost:8000/api/course/${selectedCourse}/assign`, {
                TeacherID: selectedTeacher,
            });
            alert('Teacher assigned to course successfully.');
            setSelectedTeacher('');
            setSelectedCourse('');
        } catch (error) {
            console.error('Error assigning teacher:', error);
        }
    };

    return (
        <div className="teacher-enlistment_body">
            <h1 className=' text-white'>Teacher Enlistment</h1>
            <div className="enlistment_form">
                <h2 className=' text-white'> Assign Teacher to Course:</h2>
                <div>
                    <label htmlFor="teacher-select" className=' text-white'>Select Teacher:</label>
                    <select
                        id="teacher-select"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option value="" className='text-black'>-- Select Teacher --</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.UserID} value={teacher.UserID}>
                                {teacher.FirstName} {teacher.LastName} (ID: {teacher.UserID})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="course-select" className=' text-white'>Select Course:</label>
                    <select
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="" className='text-black'>-- Select Course --</option>
                        {courses.map((course) => (
                            <option key={course.CourseID} value={course.CourseID}>
                                {course.CourseName} (ID: {course.CourseID})
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={assignTeacherToCourse} className=' text-white'>Assign Teacher</button>
            </div>
        </div>
    );
}
