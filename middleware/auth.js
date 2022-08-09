const User = require('../models/user')
const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticat')

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('token not found')
    }
    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        //const {userId, username} = decode
        //console.log(decode)
        req.user = {userId: decode.userId, username: decode.username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
    
}

module.exports = authMiddleware