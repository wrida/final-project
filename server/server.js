
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
require('dotenv').config()
app.use(express.json())
const path = require('path')

// cors settings
const cors = require('cors')
app.use(cors('https://fathomless-brook-41247.herokuapp.com/'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// connecting to database
const connectDB = require('./helpers/connectDB')
connectDB()

// Routes

app.use('/api/user',require('./routes/userRoute'))
app.use('/api/post',require('./routes/postRoute'))
app.use('/api/comment',require('./routes/commentRoute'))
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/serveruploads',express.static(__dirname + '/serveruploads'));

// rendering the front end
app.use(express.static(path.join(__dirname,'../','client','build' )))
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'../','client','build','index.html'));
})
// creating server
app.listen(process.env.PORT,(err)=>err ? console.log(err) 
: console.log('server is running on port:',process.env.PORT))