const express = require('express')
const { addComment, deleteComment } = require('../controllers/commentController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()




router.post('/newComment/:postId',middleware,addComment)
router.delete('/:postId/:commentId',middleware,deleteComment)



module.exports = router