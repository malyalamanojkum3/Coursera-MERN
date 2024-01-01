const { secretKey } =  require('./secretKey');
const jwt = require('jsonwebtoken');


///generate token
const generateJwt = (person) => {
    const data = { username : person.username }
    return token = jwt.sign(data, secretKey,{ expiresIn : '1h'});
  }
  ///admin authentication
  const  adminAuthentication = (req, res, next) =>{
    const authId = req.headers.authorization;
    //HTTP headers are case-insensitive, but in JavaScript, property names are case-sensitive
    //.i.e if in headers it is Authorization here it comes as authorization. so for properties of headers take small letters
    if(authId){
      const token = authId.split(" ")[1];
      jwt.verify(token,secretKey,(err, admin)=>{
        if(err){
          res.status(400).send("error in authorization")
        }
        else {
          req.admin = admin;
          next();
        }
      })
    }
    else{
      res.status(400).send("no authorization id")
    }
  }

  //user authentication
const  userAuthentication = (req, res, next) =>{
    const authId = req.headers.authorization;
    if(authId){
      const token = authId.split(" ")[1];
      jwt.verify(token,secretKey,(err, user)=>{
        if(err){
          res.status(400).send("error in authorization")
        }
        else {
          req.user = user;
          next();
        }
      })
    }
    else{
      res.status(400).send("no authorization id")
    }
  }
  module.exports = {
    generateJwt,
    adminAuthentication,
    userAuthentication
  }