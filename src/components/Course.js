import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Course.css';
import { useSelector } from 'react-redux';

export default function Course() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        CourseName: '',
        TeacherID: '',
    });
    const state = useSelector((state) => state);
    console.log(state);
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8000/api/course/all'
            );
            setCourses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const createCourse = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/course/',
                newCourse
            );
            const { courseId } = response.data;
            setNewCourse({ CourseName: '', TeacherID: '' });
            fetchCourses();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const updateCourse = async (courseId) => {
        try {
            const course = courses.find((c) => c.CourseID === courseId);
            await axios.put(
                `http://localhost:8000/api/course/${courseId}`,
                course
            );
            fetchCourses();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:8000/api/course/${courseId}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div className="course_body">
            <h1>Course Management</h1>
            <div className="create_course">
                <h2>Create Course :</h2>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.CourseName}
                    onChange={(e) =>
                        setNewCourse({
                            ...newCourse,
                            CourseName: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    placeholder="Teacher ID"
                    value={newCourse.TeacherID}
                    onChange={(e) =>
                        setNewCourse({
                            ...newCourse,
                            TeacherID: e.target.value,
                        })
                    }
                />
                <button onClick={createCourse}>Create Course</button>
            </div>
            <div className="course_table">
                <h2>Courses</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Teacher ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses?.map((course) => (
                            <tr key={course?.CourseID}>
                                <td>{course?.CourseID}</td>
                                <td>{course?.CourseName}</td>
                                <td>{course?.TeacherID}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            updateCourse(course.CourseID)
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteCourse(course.CourseID)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
