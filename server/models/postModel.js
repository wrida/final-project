const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
   desc:{
       type:String,
       required:true,
   },   
    commentOwner:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"user" 
      },
    createdAt: {
          type:Date,
          default:new Date
       },
  })
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
 like:{
   type:Boolean,
   default:false
 },
 createdAt: {
    type:Date,
    default:new Date
 },
 comments:[commentSchema],
    owner:{ 
       type:mongoose.Schema.Types.ObjectId,
       ref:"user" 
    }
})
   
module.exports =mongoose.model('post',postSchema)