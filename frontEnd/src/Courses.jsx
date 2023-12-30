import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Courses(){
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    let CallCourse = (id) => {
        //navigate(`/Course/${id}`)
        navigate(`/CourseRecoil/${id}`)
    }
    useEffect(()=>{
    let CourseCall = async() => {
        let response = await fetch("http://localhost:3000/admin/courses",{
            "method" : "GET",
            headers : {
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        let data = await response.json()
        setCourses(data.courses)
    }
    CourseCall();
    },[])

    return (
        <div style = {{ display : "flex", flexWrap : "wrap", justifyContent : "center" }}>
            {courses.map(course => {
            return <Course course={course} key={course._id} id={course._id} CallCourse={CallCourse}/>
            })}
        </div>
    )
}

function Course(props){
    return (
        <Card style = {{
            width : 300, height : 400, margin: 10
        }}
        onClick = {() => props.CallCourse(props.id)} >
            <Typography textAlign={"center"} variant = "h4">{props.course.title}</Typography>
            <Typography textAlign={"center"} variant = "subtitle1">{props.course.description}</Typography>
            <img src={props.course.imageLink} style={{ width : 300 }}></img>
        </Card>
    )
}
export default Courses