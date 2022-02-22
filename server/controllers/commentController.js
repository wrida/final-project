const Post = require('../models/postModel');



//@desc add a new comment
//@route POST /api/comment/newComment/:postId
//@access PRIVATE/user
  const addComment = async(req,res) => {
  try {
     const { desc } = req.body;
     await Post.findByIdAndUpdate(req.params.postId,{$push:{comments:{ desc,commentOwner:req.userId}}
    }) 
     res.json({msg:'comment added'})
    } catch (error) {
     res.status(500).json({msg: `something went wrong ${error}`})  
    }
}
module.exports = { addComment }