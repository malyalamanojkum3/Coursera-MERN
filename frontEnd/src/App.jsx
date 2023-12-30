import { BrowserRouter as Router, Routes, Route} from 'react-router-dom' // 'react-router-dom' is a library install it to use 
import SignUp from './SignUp';
import AppBar from './AppBar';
import Signin from './Signin';
import AddCourse from './AddCourse';
import Courses from './Courses';
import Course from './Course';
import CourseRecoil from './CourseRecoil'
import { Landing } from './LandingPage';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import { useEffect } from 'react';
import { userState } from './atoms/userState';


function App() {
  return (<>
    <RecoilRoot>
    <Router>
      <AppBar />
      <Init />
      <Routes>
        <Route path = "/AddCourse" element={<AddCourse />} />
        <Route path = "/SignUp" element={<SignUp />} />
        <Route path = "/SignIn" element={<Signin />} />
        <Route path = "/Courses" element={<Courses />} />
        <Route path = "/Course/:courseId" element={<Course />} />
        <Route path = "/CourseRecoil/:courseId" element={<CourseRecoil />} />
        <Route path = "/" element = {<Landing />} />
      </Routes>
    </Router>
    </RecoilRoot>
    </>
  )
}
const Init = ()=>{
  const setUser = useSetRecoilState(userState);
  useEffect(()=>{
    try{
    let callback2 = async(token)=>{
        let response = await fetch("http://localhost:3000/admin/me",{
        method : "GET",
        headers : {
            "Content-type"  : "application/json",
            "authorization" : "Bearer "+ token
        }
        })
        if(response.ok){
            let data = await response.json();  
            //setUserInfo(data)
            setUser({ isLoading : false,
                      userInfo : data })

        }
        else{
            setUser({ isLoading : false,
            userInfo : null })
        }
    }
    let token = localStorage.getItem("token");
    if(token){
        callback2(token);
    }
    else{
      setUser({ isLoading : false,
        userInfo : null })
    }
  }
  catch(e){
    setUser({ isLoading : false,
              userInfo : null })
  }
},[])
return (<></>)
}

export default App
