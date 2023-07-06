const mongoose= require('mongoose')
const validator = require("validator")
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength :[3, "Atleast 3 letters name should required"]
    },
    email:{
        type: String,
        required: true,
        unique : [true, "This Eamil already exists"],
        validate(vlaue){
            if(!validator.isEmail(vlaue)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type: String,
        require: true,
        minlength :[5, "Atleast 5 letters name should required"]
    },
    date:{
        type : Date,
        default: Date.now
    }
})

const Users = mongoose.model("Users", userSchema)
module.exports = Users;