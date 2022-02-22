const express = require('express')
const {addPost, 
  getPosts, 
  deletePost,
  updatePost, 
  likePost,
  commentPost,
} = require('../controllers/postController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './server/serveruploads/',
  filename: function (req,file,cb){
    cb(null,Date.now() +'-' + file.originalname)
  },
})

const upload = multer({ storage })
router.post('/addPost',upload.single('picture'),middleware,addPost)
router.get('/',getPosts)
router.delete('/:postId',middleware,deletePost)
router.put('/:postId',middleware,upload.single('picture'),updatePost)
router.put('/like/:postId',middleware,likePost)
router.put('/comment/:postId',middleware,commentPost)
router.get('getusers',function(req, res){
    res.send("toto")
  })

module.exports = router