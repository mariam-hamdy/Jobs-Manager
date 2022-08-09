const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticat')

const register = async (req,res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('please provide the full data')
    }
    
    const user = await User.create({...req.body})
    const token = user.generateToken()
    res.status(StatusCodes.CREATED).json({user:{name}, token})
}

const login = async(req, res) => {
    const  {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide email or password')
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('User Not Found')
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch) {
        throw new UnauthenticatedError('User Not Found')
    }
    const token = user.generateToken()
    
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}

module.exports = {
    register,
    login
}