const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI)

const usersRouter = require('./controllers/users')

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
app.use(express.json())


// <><><><> ROUTES <><><><>
app.use('/users', usersRouter)






app.listen(3000,() => {
    console.log('Listening on server... 3000(lbs) 🏋🏽‍♂️')
})