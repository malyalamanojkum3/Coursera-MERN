const express = require('express')
const mongoose = require('mongoose');
const { Users,Admins,Courses } = require('../database/index.js');
const {generateJwt,adminAuthentication} = require('../middlewares/authentication.js');
const router = express.Router()

// Admin routes  
// get admin details
router.get('/me',adminAuthentication, (req, res) => {
  const admin = Admins.findOne({username : req.admin.username})
  if(!admin){
    res.status(400).json("admin not found")
  }
  res.status(200).json(req.admin.username)
})

router.post('/signup', async(req, res) => {
    const {username, password} = req.body;
    const admin = await Admins.findOne({ username })
    if(!admin){
      const obj = {username,password}
      const newAdmin = new Admins(obj);
      await  newAdmin.save()
      const token = generateJwt(newAdmin);
      res.status(200).json({ message: 'Admin created successfully', token : token})
    }
    else {
      res.status(400).send("admin already exists");
    }
  });
  
  router.post('/login', async(req, res) => {
    const {username, password} = req.headers;
    const admin = await Admins.findOne({ username,password })
    if(admin){
      const token  = generateJwt(admin);
      res.status(200).json({message: 'Logged in successfully', token : token})
    }
    else {
      res.status(400).send("login unsuccessfull");
    }
  });
  /*
  router.post('/courses',adminAuthentication, async(req, res) => {
    const newcourse = new Courses(req.body);
    await newcourse.save()
    res.json({ message: 'Course created successfully', courseId: newcourse.id });
  });
  */
  router.post('/courses',adminAuthentication, async(req, res) => {
    const newcourse = new Courses(req.body);
    await newcourse.save()
    const admin = await Admins.findOne({username:req.admin.username})
    if(admin){
      admin.createdCourses.push(newcourse);
      await admin.save();
      res.status(200).json({message: 'Course created successfully', courseId: newcourse.id })
    }
    else{
      res.status(400);
    }
  });
  router.get('/courses',adminAuthentication, async(req,res) => {
    const admin = await Admins.findOne({username:req.admin.username}).populate('createdCourses')
    if(admin){
      res.status(200).json({courses:admin.createdCourses})
    }
    else {
      res.status(404).json({ message: 'No courses created' });
    }
  })
  router.get('/courses/:id',adminAuthentication, async(req,res) => {
    const course = await Courses.findOne({_id : req.params.id})
    res.status(200).json({course})
  })
  router.put('/courses/:courseId',adminAuthentication, async(req, res) => {
    // logic to edit a course
    try{
      const course = await Courses.findByIdAndUpdate(req.params.courseId, req.body, {new : true});
    if(course){
      res.json({ message: 'Course updated successfully' });
    }
    else {
      res.status(404).json({ message: 'Course not found' });
    }
    }
    catch(err) {
      console.error(err);
      res.status(500).send("An internal server error occurred");
    }
  });
  /*
  router.get('/courses',adminAuthentication, async(req, res) => {
    const courses = await Courses.find({});
    res.status(200).json({courses})
  });
  */
  
  
  module.exports = router;