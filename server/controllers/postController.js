const Post = require('../models/postModel');




//@desc add a new post
//@route POST /api/post/addPost
//@access PRIVATE/user
const addPost = async(req,res) => {
  const newBody = JSON.parse(req.body.info);

  try {

      
      const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
      const{title,desc,image} = newBody
      const newPost = await Post.create({title:newBody.title,desc:newBody.desc,owner:req.userId,image:imagePath})
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
      const posts = await Post.find({}).populate('owner')
      res.json(posts)
    } catch (error) {
        res.status(500).json({msg: `something went wrong ${error}`})  
    }
  }
//@dlete a post by id
//@route POST /api/post/:postId
//@access PRIVATE -owner
const deletePost = async(req,res) => {
  try {
    const post = await Post.findById(req.params.postId)
    console.log(String(post.owner._id))
    console.log(req.userId)
    if(String(post.owner._id)!==req.userId) return res.status(401).json({msg:'you are not authorized'})
    await Post.findByIdAndDelete(req.params.postId)
    res.json({msg:`post deleted`})
  } catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
  }

}

module.exports = {addPost,getPosts,deletePost}