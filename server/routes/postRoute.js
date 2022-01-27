const express = require('express')
const {addPost, getPosts, deletePost} = require('../controllers/postController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/addPost',middleware,addPost)
router.get('/getposts',getPosts)
router.delete('/:posId',middleware,deletePost)

module.exports = router