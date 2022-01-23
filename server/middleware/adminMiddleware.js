const User = require('../models/userModel');
const adminMiddleware = async(req,res,next)=>{
    try {
 const user = await User.findById( req.userId)
  if (user.role === 'admin') next() 
  else res.status(401).json({ msg:'you are not authorized'})
    
    } catch (error) {
        res.status(400).json({msg: `invalid token ${error}`})
    }
}

module.exports = adminMiddleware