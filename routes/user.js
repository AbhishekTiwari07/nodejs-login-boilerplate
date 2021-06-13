const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../auth/user')
const User = require('../models/user')
require('dotenv').config()

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.post('/register', async (req,res)=>{
    try{
        const user = new User(req.body)
        const result = await user.save()
        res.status(200).json(result)
    }
    catch(err){
        console.log(err.message)
    }
})

router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({
            email : req.body.email
        })

        if(!user)
            throw new Error('No User Found')
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if(!isMatch)
            throw new Error('Login Failed')
        
        const token = jwt.sign(user.email, process.env.TOKEN_SECRET)

        res.cookie('jwt',token)
        // res.cookie('jwt',token, { httpOnly: true })

        res.status(200).json({message : "LoggedIn"})
    }
    catch(err){
        res.status(400).json({
            error: err.message,
            message : "Some error occurred"})
    }
})

router.get('/dashboard', auth, (req,res)=>{
    res.send("Hello")
})

module.exports = router