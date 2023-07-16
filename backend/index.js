const express = require('express')
require('./db')
const cors = require('cors')
const app = express()
const port = 8000;

//Available routes
const authPath = require("./routes/auth")
const notesPath = require("./routes/notes")
app.use(express.json())
app.use(cors());


// app.use(express.urlencoded({extended: false}))
app.use(authPath)
app.use(notesPath)
app.listen(port,()=>{
    console.log(`listening on http://127.0.0.1:${port}`)
})