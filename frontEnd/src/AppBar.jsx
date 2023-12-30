import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userInfoState } from './selectors/userState';
import { userState } from './atoms/userState';
import { isLoadingState } from './selectors/isLoading';

function AppBar(){
    
    const navigate = useNavigate();
    const userInfo = useRecoilValue(userInfoState)
    const setUser = useSetRecoilState(userState)
    const isLoadding = useRecoilValue(isLoadingState)

    if(isLoadding){
    return(<></>)
    } 
    if(userInfo){
        return(<>
            <div style ={{ display:"flex", justifyContent:"space-between"}}> 
            <Typography style ={{ marginLeft :'5px', marginTop :'5px' }}>Coursera</Typography>
            <div style ={{ display:"flex", justifyContent:"space-between"}}>
            <Typography style ={{ marginLeft :'5px', marginTop :'5px', marginRight : '5px' }}>{userInfo}</Typography>
            <Button
                            onClick={() => {
                                navigate("/Addcourse")
                            }}
                        >Add course</Button>
                    

                    <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                navigate("/Courses")
                            }}
                        >Courses</Button>
                    </div>
            <Button  variant="outlined" style ={{ marginRight :'5px',marginTop :'2px'}}
                onClick={() => {   
                    localStorage.removeItem("token");
                    setUser({userInfo:null})
                    navigate("/")
                }}>Log out</Button>
                </div>
            </div>
            </>
        )
    }
return (
    <div style ={{ display:"flex", justifyContent:"space-between"}}> 
    <Typography style ={{ marginLeft :'5px', marginTop :'5px' }}>Coursera</Typography>
    <div>
    <Button  variant="outlined" style ={{ marginRight :'5px',marginTop :'2px'}}
        onClick={() => { 
            navigate('/SignUp')
        }}>SIGNUP</Button>
    <Button  variant="outlined" style ={{ marginRight :'5px',marginTop :'2px'}}
        onClick={() => {
            navigate('/SignIn')
        }}>SIGNIN</Button>
    </div>
    </div>
)
}
export default AppBar;