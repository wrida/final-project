const Post = require('../models/postModel');




//@desc add a new post
//@route POST /api/post/addPost
//@access PRIVATE/user
const addPost = async(req,res) => {
  
  try {
      const imagePath = `http://localhost:5000/serveruploads/${req.file.filename}`;
      const title=req.body.title;
      const desc=req.body.desc;
      const newPost = await Post.create({title:title,desc:desc,image:imagePath,owner:req.userId})
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
      .populate('owner')
      .populate('comments')
      .populate('comments.commentOwner')
      res.json(posts)
    } catch (error) {
        res.status(500).json({msg: `something went wrong ${error}`})  
    }
  }
//@delete a post by id
//@route POST /api/post/:postId
//@access PRIVATE -owner
const deletePost = async(req,res) => {
  try {
    const post = await Post.findById(req.params.postId)
    console.log(String(post.owner._id))
    console.log(req.userId)
    if(String(post.owner._id)!==req.userId) return res.status(401).json({msg:'you are not authorized'})
    else await Post.findByIdAndDelete(req.params.postId)
    res.json({msg:`post deleted`})
  } catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
  }

}
//@update a post by id
//@route PUT /api/post/:postId
//@access PRIVATE -owner
const updatePost = async(req,res) => {
  try {
    const imagePath = `http://localhost:5000/serveruploads/${req.file.filename}`;
      const title=req.body.title;
      const desc=req.body.desc;

    const updatePost =await Post.findByIdAndUpdate(req.params.postId,{title:title,desc:desc,image:imagePath})
    console.log(updatePost)
    res.json(updatePost)
  } catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
  }
}
//@like & dislike a post
//@route PUT /api/post/like/:postId
//@access PRIVATE -user
const likePost = async(req,res) => {
  try {
    const postId = (req.params.postId)
    const post = await Post.findById(postId)
    const updatePost =await Post.findByIdAndUpdate(req.params.postId,{like:!post.like})
    res.json(updatePost)

    res.json({msg:'post liked'})
  } catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
  }
}
//@like & dislike a post
//@route PUT /api/post/like/:postId
//@access PRIVATE -user
const commentPost = async(req,res) => {
  try {
    const postId = req.params.postId
    const comment=req.body.comment;

    const post = await Post.findById(postId)
   var newtab=[...post.comments,...[{desc:comment}]]
   const updatePost =await Post.findByIdAndUpdate(req.params.postId,{comments:newtab})

    res.json(updatePost)
  } catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
  }
}
module.exports = {addPost,getPosts,deletePost,updatePost,likePost,commentPost}