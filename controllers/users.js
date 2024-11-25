const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const SALT_LENGTH = 12

router.post('/signup', async (req,res) =>{
     try{
        const userInDb = await User.findOne({username: req.body.username, email: req.body.email})
        if(userInDb){
            return res.status(400).json({err: 'Username or email already taken'})
        }
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        const token = jwt.sign(
            { username: user.username, 
              email: user.email,
              _id: user._id
            }, process.env.JWT_SECRET
        )
        res.status(200).json({ user, token})
      
     }catch(err){
        res.status(400).json({err: err.message})
     }
})







module.exports = router