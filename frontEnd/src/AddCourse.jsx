import Button from '@mui/material/Button'; // from material ui install before use
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCourse(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    let callback1 = ()=>{
        try{
            fetch(`${process.env.API_URL}admin/courses`,{
            method : "POST",
            body : JSON.stringify({
              title,
              description,
              imageLink : image,
              published : true
            }),
            headers : { 
                "Content-type" : "application/json",
                "authorization" : "Bearer " + localStorage.getItem("token")
            } 
          }).then((rep)=>{
            if(rep.ok){
              rep.json().then((data) => {
                console.log(data)
                alert("Course added")
                navigate('/Courses');
              })
            }
            else {
              rep.text().then((errorText) => {  //.text(): This method returns a promise that resolves with a string containing the entire response body, 
                console.log(errorText);     //interpreted as text. This can be used when you're expecting a textual or HTML response from a server.
              })                          // here we sent resonse as .send() which sends text response so .json() which parses  JSON doesnt work here
            }
          })
          }
          catch (error) {
            console.log("Fetch error: " + error);
        }
    }
return (
    <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height:'100vh',width: '100vw'}}>
      <Typography variant="h6" align="center">Add Course</Typography>
      <Card variant="outlined" style={{ maxWidth: '500px', width: '80%', margin: '10px auto', padding: '20px',backgroundColor:"#dbcbca"}}>
        <TextField  label="title" variant="outlined" fullWidth={true}
          onChange={(e) => setTitle(e.target.value)} />
        <br/><br/>
        <TextField label="description" variant="outlined" fullWidth={true}
        onChange={(e) => setDescription(e.target.value)} />
        <br/><br/>
        <TextField  label="Image Link" variant="outlined" fullWidth={true}
        onChange={(e) => setImage(e.target.value)} />
        <br/><br/>
        <Button variant="outlined" 
          onClick={() => callback1()}>Add Course</Button>
      </Card>
      </div>
)
}
export default AddCourse;