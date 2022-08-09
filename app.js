require('dotenv').config()
require('express-async-errors')
const ErrorHandlerMiddleware = require('./middleware/error-handler')
const NotFoundMiddleware = require('./middleware/not-found')
const authMiddleware = require('./middleware/auth')

const express = require('express')
const app = express()
const connectDB = require('./database/connect')

const authRoute = require('./routes/userRoute')
const jobsRoute = require('./routes/jobRoute')


app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/jobs', authMiddleware ,jobsRoute)

app.use(ErrorHandlerMiddleware)
app.use(NotFoundMiddleware)



const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is ON listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }

}

start()