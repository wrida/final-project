const express = require('express')
const {addPost, getPosts} = require('../controllers/postController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()
const multer = require('multer')


const storage = multer.diskStorage({
    destination:'./server/uploads/',
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname)
    }
  })
  const upload = multer({ storage: storage })


router.post('/addPost',middleware,upload.single('picture'),addPost)
router.get('/getposts',getPosts)


module.exports = router