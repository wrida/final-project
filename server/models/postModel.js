const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
 title :{
     type:String,
     required:true
 },   
 desc:{
    type:String,
    required:true
}, 
 image: {
    type:String,
    required:true
 },
 owner: {
   type:mongoose.Schema.Types.ObjectId,
   ref:"user" 
 },
 createdAt: {
    type:Date,
    default:new Date
 }
})
   
module.exports =mongoose.model('post',postSchema)