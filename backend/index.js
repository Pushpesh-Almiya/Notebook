const express = require('express')
require('./db')
const app = express()
const port = 8000;
const authPath = require("./routes/auth")
const notesPath = require("./routes/notes")

//Available routes
app.use(express.json());
app.use(authPath)
app.use(notesPath)

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})