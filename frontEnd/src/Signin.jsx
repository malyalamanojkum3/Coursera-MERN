import Button from '@mui/material/Button';// from material ui install before use
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from './atoms/userState';
import { useSetRecoilState } from 'recoil';

function Signin(){
  const [username,setUsername] = useState("");
  const [ password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  let callback = async() => {
    let res = await fetch(`https://coursera-mern.vercel.app/admin/login`,{
      method : "POST",
      headers : {
        "username" : username,
        "password" : password
      }
    });
    let data = await res.json();
    localStorage.setItem("token",data.token);
    setUser({ isLoading : false,
              userInfo : username })
    navigate('/AddCourse')
  }

    return (
      <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height:'100vh',width: '100vw'}}>
      <Typography variant="h6" align="center">Welcome to Coursera</Typography>
      <Card variant="outlined" style={{ maxWidth: '500px', width: '80%', margin: '10px auto', padding: '20px',backgroundColor:"#dbcbca"}}>
        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth={true}
        value = {username}
        onChange={(e) =>{setUsername(e.target.value)}}/>
        <br/><br/>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true}
        value = {password}
        onChange={(e) => {setPassword(e.target.value)}}/>
        <br/><br/>
        <Button variant="outlined"
        onClick={()=>callback()}
        >SIGNIN</Button>
      </Card>
      </div>
        )
  }
  export default Signin;