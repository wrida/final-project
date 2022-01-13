const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name :String,
    userName:{
        type:String,
        required:true,
    },
    email:{type:String,
           unique:true},
    password:{
        type:String,
        required:true,
        minlength:8
    },
    role:{
        type: String,
        enum: ["user", "repairman"],
    },
    logo: String,
    portofolio: String,
    lastDelievery: Date,
    Member_Since: Date,
})

module.exports =mongoose.model('user',userSchema)