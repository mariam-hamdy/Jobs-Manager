const Job = require('../models/job')
const NotFoundError = require('../errors/not-found')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require('../errors/unauthenticat')
const {StatusCodes} = require('http-status-codes')


const getAllJobs = async(req,res) => {
    const userId = req.user.userId
    const jobs = await Job.find({createdBy: userId})
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const addNewJob = async(req,res) => {
    req.body.createdBy = req.user.userId
    const {company, position} = req.body
    if(!company || !position) {
        throw new BadRequestError('please provide company or position')
    }
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({msg:'success', job})
}

const getOneJob = async(req,res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    const job = await Job.findOne({_id:jobId, createdBy: userId})
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updateOneJob = async(req,res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    const {company,position} = req.body
    if(!company || !position) {
        throw new BadRequestError('please provide company or position')
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId},req.body,{
        new:true,
        runValidators: true
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const deleteOneJob = async(req,res) => {
    const jobId = req.params.id
    const userId = req.user.userId
    const job = await Job.findByIdAndRemove({_id: jobId, createdBy:userId})
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({msg: 'success'})
}

module.exports = {
    getAllJobs,
    addNewJob,
    getOneJob,
    updateOneJob,
    deleteOneJob
}