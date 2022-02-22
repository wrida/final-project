const express = require('express')
const { addComment } = require('../controllers/commentController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()




router.post('/newComment/:postId',middleware,addComment)




module.exports = router