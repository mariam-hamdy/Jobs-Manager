const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide the name'],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'please provide the email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide the password'],
        minlength: 5
    }
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})

UserSchema.methods.generateToken = function() {
    return jwt.sign({userId: this._id, username: this.name}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatPassword) {

    const isSame = await bcrypt.compare(candidatPassword, this.password)
    return isSame
}

module.exports = mongoose.model('User', UserSchema)