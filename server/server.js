
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
app.use(express.json())

// cors settings
const cors = require('cors')
app.use(cors('http://localhost:3000'))

// connecting to database
const connectDB = require('./helpers/connectDB')
connectDB()

// Routes

app.use('/api/user',require('./routes/userRoute'))
app.use('/api/post',require('./routes/postRoute'))
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/serveruploads',express.static(path.join(__dirname,'../',  '/serveruploads')));
// creating server
app.listen(process.env.PORT,(err)=>err ? console.log(err) 
: console.log('server is running on port:',process.env.PORT))