const express = require('express')
const Workout = require('../models/workout')
const router = express.Router()
const authenticate = require('../middleware/authenticate')


// <><><> Routes <><><>
router.use(authenticate)

router.post('/', async(req,res)=>{
    try{
        req.body.user = req.user._id
        const workout = await Workout.create(req.body)
        workout._doc.user = req.user
        res.status(201).json(workout)
    }catch(err){
        console.log(err)
        res.status(500).json(err)    
    }
})

module.exports = router