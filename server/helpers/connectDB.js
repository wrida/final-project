const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,(err)=>err ? console.log(err)
    : console.log("database connected"))
}

module.exports = connectDB