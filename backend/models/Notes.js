const mongoose= require('mongoose')
const notesSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    },
    title:{
        type: String,
        required: true,
        minlength :[3, "Title should be atleast 3 letters"]

    },
    description:{
        type: String,
        required: true,
        minlength :[5, "Description should be atleast 5 letters"]
    },
    tag:{
        type: String,
        required: true,
        minlength :[3, "Tag  should be atleast 3 letters"]
    },
    date:{
        type : Date,
        default: Date.now
    }
})

const Notes = mongoose.model("Notes", notesSchema)
module.exports = Notes;