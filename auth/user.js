const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
require('dotenv').config()

const auth = async (req,res,next) =>{
        const token = req.cookies.jwt
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
    try{
        const user = await User.findOne({ email : decoded})
        console.log(user)
        if(!user){
            throw new Error("error")
        }
        req.token = token
        req.user = user
    }
    catch(e){
        return res.send({
            error : e.message,
            message : "Please Authenticate"})
    }
    next()
}

module.exports = auth
