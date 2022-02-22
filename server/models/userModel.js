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
    address:{
        city: String,
        street: String,
        postalCode: String,

    },
    photo:{
        type:String,
    },
    prestations:{
        type:String,
        enum:['phone','pc',
        'tablet','printer'
    ]
    },
    role:{
        type: String,
        enum: ["user", "admin","repairman"],
    },
    logo: String,
    portofolio: String,
    lastDelievery: Date,
    Member_Since: Date,
})

module.exports = mongoose.model('user',userSchema)