const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    workoutId: {
       type: mongoose.Schema.Types.ObjectId, ref: 'Workout'
    },
    date: {
        type: Date,
    },
    weightsLifted: {
        type: Number,
    },
    notes: String,
})


const workoutSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
        enum:['Aerobics','Strength Training','Stretching','Calisthenics'],
    },
    title: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,

    },
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    progress: [progressSchema],
}, { timestamps: true }
)

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout