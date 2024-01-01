const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
// mongoose Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
})
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Courses'}]
})
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// mongoose models
const Users = mongoose.model('Users',userSchema) //The first argument, 'User', is the singular name of the collection your model is for. 
const Admins = mongoose.model('Admins',adminSchema)//Mongoose automatically looks for the plural, lowercase version of your model name in your MongoDB database. 
const Courses = mongoose.model('Courses',courseSchema)//So, in this case, the corresponding collection in your database should be 'users'.
 
//Connect to mongodb
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("connection established with mongoose")})
.catch((err)=> console.log("error connecting to mongoose",err));

module.exports = {
    Users,
    Admins,
    Courses
}
