const express = require('express')
const Workout = require('../models/workout')
const router = express.Router()
const authenticate = require('../middleware/authenticate')


// <><><> Routes <><><>
router.use(authenticate)

// <><><> Create <><><>
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

// <><><> Index <><><>
router.get('/', async (req, res) =>{
    try{
        const workouts = await Workout.find({user: req.user._id}).populate('user').sort({ createdAt: 'desc'})
    res.status(200).json(workouts)
    }catch(err){
        res.status(500).json(err)
    }
})

// <><><> Show <><><>
router.get('/:workoutId', async (req,res)=>{
    try{
        const workout = await Workout.findById(req.params.workoutId).populate(['user','progress'])
        res.status(200).json(workout)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

// <><><> Update <><><>
router.put('/:workoutId', async (req,res)=>{
    try{
        const workout = await Workout.findById(req.params.workoutId)
        if(!workout.user.equals(req.user._id)){
            return res.status(403).send("User Not Authorized!")
        }

        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.workoutId,
            req.body,
            {new: true}
        )
        updatedWorkout._doc.user = req.user
        res.status(200).json(updatedWorkout)

    }catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})

// <><><> Delete <><><>
router.delete('/:workoutId', async (req,res)=>{
    try{
        const workout = await Workout.findById(req.params.workoutId)

        if(!workout.user.equals(req.user._id)){
            return res.status(403).send("User Not Authorized")
        }

        const removedWorkout = await Workout.findByIdAndDelete(req.params.workoutId)
        res.status(200).json(removedWorkout)

    }catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})

router.post('/:workoutId/progress', async (req,res)=>{
    try{
        req.body.user = req.user._id
        const workout = await Workout.findById(req.params.workoutId)
        workout.progress.push(req.body)
        await workout.save()
      
        const entryProgress = workout.progress[workout.progress.length - 1]

        entryProgress._doc.author = req.user
        res.status(201).json(entryProgress)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router