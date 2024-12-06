const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 3000

const usersRouter = require('./controllers/users')
const workoutsRouter = require('./controllers/workouts')


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
app.use(express.json())
app.use(cors())


// <><><><> ROUTES <><><><>
app.use('/users', usersRouter)
app.use('/workouts', workoutsRouter)



app.listen(port,() => {
    console.log(`Listening on server... ${port}(lbs) 🏋🏽‍♂️`)
})