import Button from '@mui/material/Button'; // from material ui install before use
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from './atoms/userState';
import { useSetRecoilState } from 'recoil';

function SignUp(){
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();
const setUser = useSetRecoilState(userState)

let callback1 = async () => {
  try {
    const response = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password
      }),
      headers: { "Content-type": "application/json" } 
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.token) {
      throw new Error('No token received in response');
    }
    
    localStorage.setItem("token", data.token);
    setUser({ isLoading : false,
              userInfo : email })
    navigate('/AddCourse')
  } catch (error) {
    console.log("Fetch error: " + error);
    // Handle fetch error here
  }
}

    return (
      <div style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height:'100vh',width: '100vw'}}>
      <Typography variant="h6" align="center">Welcome to Coursera</Typography>
      <Card variant="outlined" style={{ maxWidth: '500px', width: '80%', margin: '10px auto', padding: '20px',backgroundColor:"#dbcbca"}}>
        <TextField id="username" label="Username" variant="outlined" fullWidth={true}
          onChange={(e) => setEmail(e.target.value)} />
        <br/><br/>
        <TextField  label="Password" variant="outlined" fullWidth={true}
        onChange={(e) => setPassword(e.target.value)} />
        <br/><br/>
        <Button variant="outlined" 
          onClick={() => callback1()}>Sign Up</Button>
      </Card>
      </div>
        )
  }
  export default SignUp;