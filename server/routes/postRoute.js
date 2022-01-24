const express = require('express')
const {addPost, getPosts} = require('../controllers/postController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/addPost',middleware,addPost)
router.get('/getposts',getPosts)

module.exports = router