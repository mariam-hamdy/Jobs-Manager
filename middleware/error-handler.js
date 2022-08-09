const {StatusCodes} = require('http-status-codes')


const ErrorHandlerMiddleware = (err, req, res, next) => {
    

    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({err: err.message})
}

module.exports = ErrorHandlerMiddleware