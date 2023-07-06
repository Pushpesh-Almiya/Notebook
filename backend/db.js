const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/notebook')
.then(()=>{
    console.log("Connected with mongoDB successfully✅✅")
}).catch((e)=>{
    console.log("Not connected ❌❌ "+ e)
})