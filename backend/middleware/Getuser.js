const jwt = require("jsonwebtoken")
const User = require("../models/User")
require('dotenv').config()
const fetchUser = async (req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send("Please authenticate using a valid authtoken")
    }
    try {
    const verifyUser = jwt.verify(token,process.env.REACT_APP_SECRETE_KEY)
    // console.log(verifyUser)  if verify then throw a Id.
    const user = await User.findOne({_id: verifyUser})
    // console.log(user.name)
    req.user = user;
    req.token = token;
    next()
    } catch (error) {
        res.status(401).send("Please authenticate using a valid authtoken")
    }
}

//2nd way..

    // Get the user from the JWT webtoken....
    // const token = req.header("auth-token");
    // if(!token){
    //     res.status(401).send("Please authenticate using a valid authtoken")
    // }
    // try {
    //     const data = jwt.verify(token, process.env.REACT_APP_SECRETE_KEY)
    //     req.user = data.user
    //     next();
    // } catch (error) {
    //     res.status(401).send("Please authenticate using a valid authtoken")
    // }
module.exports = fetchUser;