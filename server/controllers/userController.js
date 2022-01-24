const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc register new user & return token
//@route POST /api/user/register
//@access public
const register = async(req,res) => {
    try {
        const photoPath = `http://localhost:5000/serveruploads/${req.file.filename}`;
        const {name,userName,email,password}= req.body
        const hashedPassword = await bcrypt.hash(password,10) 
        const newUser = await User.create({name,userName,email,password:hashedPassword,address,photo:photoPath})
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
        res.json({msg:'User created successfully',newUser,token})
    } catch (error) {
        res.status(500).json({msg: `something went wrong ${error}`})
    }
}
//@desc new user can login & return token
//@route POST /api/user/login
//@access public
const login = async(req,res) => {
    try {
       
        
        const {email,password}= req.body
        const existUser = await User.findOne({email})
        if(!existUser) return res.status(404).json({msg:"you should first register"})
      const verifyPasword = await bcrypt.compare(password,existUser.password)
      if(!verifyPasword) return res.status(401).json({msg:"wrong password"})
      const token = jwt.sign({id:existUser._id,email:email},process.env.JWT_SECRET)
      res.json({token})
    } catch (error) {
        res.status(500).json({msg: `something went wrong ${error}`})
    }
}
//@desc takes token & return user info
//@route GET /api/user/loadUser
//@access PRIVATE/user
const loadUserInfo = async(req, res) => {
try {
    const user = await User.findById(req.userId).select('-password')
    console.log(user)
    res.json(user)
} catch (error) {
    res.status(500).json({msg: `something went wrong ${error}`})
}
}


module.exports = {register,login,loadUserInfo}