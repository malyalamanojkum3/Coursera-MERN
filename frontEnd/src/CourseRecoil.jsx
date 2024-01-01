import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Typography, TextField, Button, Card,Grid } from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from './atoms/coursestate';
import { isLoadingState } from './selectors/coursestate';
import { titleState,descriptionState,imageLinkState,publishedState } from './selectors/coursestate';

function Course(){
    let {courseId} = useParams();
    const setCourse= useSetRecoilState(courseState)
    const isLoading = useRecoilValue(isLoadingState)

    useEffect(()=>{
        let findCourse = async(courseId) => {
            let response = await fetch(`${process.env.REACT_APP_API_URL}admin/courses/${courseId}`,{
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            let data = await response.json()
            if(data.course){
            setCourse({isLoading:false,course:data.course})
            }
        }
        findCourse(courseId)
    },[])
    if(isLoading){
        return<>Loading</>
    }
    return(
        <div>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
            <UpdatedCard courseId = {courseId} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
            <Coursecard />
            </Grid>
        </Grid>
    </div>
    )
}
function GrayTopper() {
    const title = useRecoilValue(titleState)
    return (<div style={{height: 200, background: "#212121",  width: "100vw", zIndex: 0}}>
    <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <div>
            <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                {title}
            </Typography>
        </div>
    </div>
</div>
    );
}

let UpdatedCard = (props) => {
    const [courseDetails,setCourse] = useRecoilState(courseState);

    const [title, setTitle] = useState(courseDetails.course.title);
    
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [published, setPublished] = useState(courseDetails.course.published);

    let callback1 = async() => {
        let updatedCourse = {}
        if(title) updatedCourse.title = title;
        if(description) updatedCourse.description = description;
        if (image) updatedCourse.imageLink = image;
        let response = await fetch(`${process.env.REACT_APP_REACT_APP_API_URL}admin/courses/${props.courseId}`,{
            "method" : "PUT",
            "body" : JSON.stringify(updatedCourse),
            "headers" : {
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        })
        setCourse((prevCourse) => {
                    return {
                      isLoading: false,
                      course: {
                        ...prevCourse.course,
                        ...updatedCourse,
                      },
                    };
                  });
        console.log(courseDetails)
        setImage("");
    }

    return (
        <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
          <Typography variant="h6" align="center">{title}</Typography>
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
              onClick={() => callback1()}>Update Course</Button>
          </Card>
          </div>
    )
}
 let Coursecard = () => {
    const title = useRecoilValue(titleState);
    const description = useRecoilValue(descriptionState);
    const published = useRecoilValue(publishedState);
    const imageLink = useRecoilValue(imageLinkState)

    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15
    }}>
        <img src={imageLink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">title : {title}</Typography>
            <Typography variant="h5" style={{color: "gray"}}>
            description : {description}
            </Typography>
            <Typography variant="subtitle1">
                <b>published : {published ? "true" : "false"} </b>
            </Typography>
        </div>
    </Card>
    </div>
 }

 
export default Course