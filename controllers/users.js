const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', (req,res) =>{
    res.json({message: "sucesso"})
})







module.exports = router