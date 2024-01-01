const express = require('express')
const mongoose = require('mongoose');
const { Users,Admins,Courses } = require('../database/index.js');
const { generateJwt,userAuthentication } = require('../middlewares/authentication.js')
const router = express.Router()

router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({username})
    if(!user){
      const newUser = new Users({username,password})
      await newUser.save();
      const token = generateJwt(newUser);
      res.status(200).json({ message: 'User created successfully', token : token})
    }
    else {
      res.status(400).send("user already exists");
    }
  
  });
  
router.post('/login', async(req, res) => {
    // logic to log in user
    const {username, password} = req.headers;
    const user = await Users.findOne({username,password})
    if(user){
      const token  = generateJwt(user);
      res.status(200).json({message: 'Logged in successfully', token : token})
    }
    else {
      res.status(400).send("login unsuccessfull");
    }
    
  });
  
router.get('/courses',userAuthentication, async(req, res) => {
    // logic to list all courses
    let filteredCourses = await Courses.find({published:true})
    res.status(200).json({ courses: filteredCourses });
  });
  
router.post('/courses/:courseId',userAuthentication, async(req, res) => {
    const course = await Courses.findById(req.params.courseId);
    if(course){
      const user = await Users.findOne({username:req.user.username})
      if(user){
        user.purchasedCourses.push(course);
        // here eventhough u pushed course id in purchasedCourses only its id is stored because in schema it type id 'ObjectId'
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      }
      else{
        res.status(403).json({ message: 'User not found' });
      }
    }
    else{
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
router.get('/purchasedCourses',userAuthentication, async(req, res) => {
    const user = await Users.findOne({username:req.user.username}).populate('purchasedCourses')
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
      //here even purchaseds courses have only ids but it sends whole courses due to 'populate'
    } else {
      res.status(404).json({ message: 'No courses purchased' });
    }
  });
  module.exports = router;