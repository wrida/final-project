const Post = require('../models/postModel')





//@desc add a new post
//@route POST /api/post/addPost
//@access PRIVATE/user
const addPost = async(req,res) => {
  try {
    console.log(req.body.info)
      const newBody = JSON.parse(req.body.info);
      const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;

      const{title,desc,image} = newBody
      const newPost = await Post.create({title:newBody.title,desc:newBody.desc,image,owner:req.userId,image:imagePath})
      res.json(newPost)
    } catch (error) {
      console.error(error)
        res.status(500).json({msg: `something went wrong ${error}`})  
    }
}
//@desc get all posts
//@route POST /api/post/getposts
//@access public
const getPosts =async(req,res) => {
    try {
      const posts = await Post.find({})
      res.json(posts)
    } catch (error) {
        res.status(500).json({msg: `something went wrong ${error}`})  
    }
}

module.exports = {addPost,getPosts}