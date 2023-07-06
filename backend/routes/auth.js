const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//  create a user>>>
router.post("/api/auth/createuser", async (req, res) => {
  try{
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send("The user is already exists");
    } else {
      const createUser = new User(req.body);
      await createUser.save();
      res.status(201).send(createUser);
      console.log(req.body);
    }
  } catch (error) {
    res.status(400).send("Some error occurs " + error);
  }
});

//Login EndPoint.... Authenticate user......
router.post("/api/auth/login", async(req,res)=>{
  try {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await User.findOne({email:email})
    const ismatch = await bcrypt.compare(password, userData.password)
    if(ismatch){
      res.status(200).send(userData)
    }else{
      res.status(400).send("Please enter valid cradentials")
    }
  } catch (error) {
    res.status(500).send("Invalid login details")
  }
})

module.exports = router;
