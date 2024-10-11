import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
// import '../styles/Course_dashboard.css';
import { setCourseId } from '../redux/other_reducer'; 
 
const AllCourses = () => { 
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [userRole, setRole] = useState(null); 
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user); 
 
  useEffect(() => { 
    const fetchCourses = async () => { 
      try { 
        const response = await axios.get( 
          'http://localhost:8000/api/course/all' 
        ); 
        setCourses(response.data); 
 
        setRole(user.userRole); 
 
        setLoading(false); 
      } catch (error) { 
        console.error('Error fetching courses:', error); 
        setLoading(false); 
      } 
    }; 
 
    fetchCourses(); 
  }, []); 
 
  const handleCourseId = (courseId) => { 
    dispatch(setCourseId(courseId)); 
  }; 
 
  if (loading) { 
    return <div>Loading...</div>; 
  } 
 
  return ( 
    <div className="w-full h-screen font-serif bg-slate-200" > 
     <div className=" w-full grid grid-cols-5 gap-4 bg-slate-700"> 
        {courses?.map((course) => ( 
          <div key={course?.CourseID} className=" h-24 bg-white text-black"> 
            <h3 className="text-center font-semibold">{course?.CourseName}</h3> 
          </div> 
        ))} 
      </div> 
      <div className='flex justify-center pt-3 pb-3'> 
        <h2 className='pt-3 font-semibold pb-3 text-2xl border-2 border-white bg-blue-300 w-1/6 flex justify-center rounded-md'> 
          All Courses 
        </h2> 
      </div> 
 
      {/* Updated grid layout */} 
      {/* <div className="grid grid-cols-5 gap-4 w-full bg-slate-700"> 
        {courses?.map((course) => ( 
          <div key={course?.CourseID} className="w-full h-24 bg-white text-black"> 
            <h3 className="text-center font-semibold">{course?.CourseName}</h3> 
          </div> 
        ))} 
      </div>  */}
    </div> 
  ); 
}; 
 
export default AllCourses;