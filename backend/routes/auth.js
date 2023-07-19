const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config()
const jwt = require("jsonwebtoken")
const secretKey = process.env.REACT_APP_SECRETE_KEY
const fetchUser = require("../middleware/Getuser")

//JWT-token
//  create a user>>>
router.post("/api/auth/createuser", async (req, res) => {
  try{
    success=false
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send("This user is already exists");
      alert("This user is already exists")
    } else {
      const createUser = new User(req.body);
      await createUser.save();
      const authToken = jwt.sign(createUser.id, secretKey)
      success=true
      res.status(201).json({success, authToken,createUser});
      console.log(createUser)
    }
  } catch (error) {
    success=false
    res.status(400).send("Some error occurs " + error);
  }
});

//Login EndPoint.... Authenticate user......
router.post("/api/auth/login", async(req,res)=>{
  let success=false
  try {
    // let email = req.body.email;
    // let password = req.body.password;
    const {email, password} = req.body //De-structuring....
    let userData = await User.findOne({email})
    const ismatch = await bcrypt.compare(password, userData.password)
    if(ismatch){
      authToken = jwt.sign(userData.id, secretKey)
      success=true
      res.status(201).json({success,authToken,userData});
    }else{
      res.status(400).send("Please enter valid cradentials")
      alert("Please enter valid cradentials")
    }
  } catch (error) {
    success=false
    res.status(500).send(success, "Internal server error!!")
  }
})


//Get logged in user details...
router.get("/api/auth/getuser", fetchUser,  async(req,res)=>{
  try {
    let userId = req.user.id;
    const finduser = await User.findById(userId)
    res.status(200).send(finduser)
  } catch (error) {
    res.status(400).send("Please enter valid cradentials")
  }
})
module.exports = router;
