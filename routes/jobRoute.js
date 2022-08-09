const express = require('express')
const app = express.Router()

const {
    getAllJobs,
    addNewJob,
    getOneJob,
    updateOneJob,
    deleteOneJob
} = require('../controllers/jobController')
const router = require('./userRoute')

router.route('/').get(getAllJobs).post(addNewJob)
router.route('/:id').get(getOneJob).patch(updateOneJob).delete(deleteOneJob)

module.exports = router