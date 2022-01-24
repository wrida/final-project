const express = require('express')
const multer = require('multer')

const {register,login, loadUserInfo} = require('../controllers/userController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()

const storage = multer.diskStorage({
    destination:'./server/uploads/',
    filename: function (req, file, cb) {
        console.log('filename')
      cb(null,Date.now() + '-' + file.originalname)
    }
  })
  const upload = multer({ storage: storage })
router.post('/register',register,upload.single('photo'))
router.post('/login',login)
router.get("/loadUser",middleware,loadUserInfo)



module.exports = router