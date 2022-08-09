const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type:String,
        required: [true, 'please provide the company'],
        minlength: 5,
        maxlength: 30
    },
    position: {
        type:String,
        required: [true, 'please provide the company'],
        minlength: 5,
        maxlength: 30
    },
    status: {
        type: String,
        enum: ['pending', 'internship', 'fulltime', 'rejected', 'accepted'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide the user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job', JobSchema)