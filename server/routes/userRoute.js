const express = require('express')

const {register,login, loadUserInfo} = require('../controllers/userController')
const middleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get("/loadUser",middleware,loadUserInfo)



module.exports = router