import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { Typography, TextField, Button, Card, Grid } from "@mui/material";

function Course(){
    let {courseId} = useParams();
    const [course,setCourse]= useState(null);
    useEffect(()=>{
        let findCourse = async(courseId) => {
            let response = await fetch(`${process.env.REACT_APP_REACT_APP_API_URL}admin/courses/${courseId}`,{
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            let data = await response.json()
            console.log(data.course)
            setCourse(data.course)
        }
        findCourse(courseId)
    },[])
    if (!course) {
        return <div>Loading...</div>;
    }
    return(
        <div style={{ display : 'flex' }}>
            <Coursecard course = {course} />
                    <UpdatedCard course = {course} setCourse= {setCourse} />
        </div>
    )
}
let UpdatedCard = (props) => {
    const [title, setTitle] = useState(props.course.title);
    const [description, setDescription] = useState(props.course.description);
    const [image, setImage] = useState("");
    const [published, setPublished] = useState(null);

    let callback1 = async() => {
        let updatedCourse = {}
        if(title) updatedCourse.title = title;
        if(description) updatedCourse.description = description;
        if (image) updatedCourse.imageLink = image;
        let response = await fetch(`${process.env.REACT_APP_REACT_APP_API_URL}admin/courses/${props.course._id}`,{
            "method" : "PUT",
            "body" : JSON.stringify(updatedCourse),
            "headers" : {
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        props.setCourse((prevCourse)=>({
            ...prevCourse,
            ...updatedCourse
        }))
        setTitle("");
        setDescription("");
        setImage(""); 
    }

    return (
        <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
          <Typography variant="h6" align="center">Update Course</Typography>
          <Card variant="outlined" style={{maxWidth: '500px',margin: '10px auto',width: '80%',  padding: '20px',backgroundColor:"#dbcbca"}}>
            <TextField  label="title" variant="outlined" fullWidth={true} value={title}
              onChange={(e) => setTitle(e.target.value)} />
            <br/><br/>
            <TextField label="description" variant="outlined" fullWidth={true} value = {description}
            onChange={(e) => setDescription(e.target.value)} />
            <br/><br/>
            <TextField  label="Image Link" variant="outlined" fullWidth={true} value = {image}
            onChange={(e) => setImage(e.target.value)} />
            <br/><br/>
            <Button variant="outlined" 
              onClick={() => callback1(props.setCourse)}>Update Course</Button>
          </Card>
          </div>
    )
}
 let Coursecard = (props) => {
    const course = props.course;
    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15
    }}>
        <img src={course.imageLink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">title : {course.title}</Typography>
            <Typography variant="h5" style={{color: "gray"}}>
            description : {course.description}
            </Typography>
            <Typography variant="subtitle1">
                <b>published : {course.published ? "true" : "false"} </b>
            </Typography>
        </div>
    </Card>
    </div>
 }

export default Course