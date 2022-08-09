const Job = require('../models/job')

const getAllJobs = async(req,res) => {
    res.send('get all jobs')
}

const addNewJob = async(req,res) => {
    res.send('add new job')
}

const getOneJob = async(req,res) => {
    res.send('get one job')
}

const updateOneJob = async(req,res) => {
    res.send('update one job')
}

const deleteOneJob = async(req,res) => {
    res.send('delete one job')
}

module.exports = {
    getAllJobs,
    addNewJob,
    getOneJob,
    updateOneJob,
    deleteOneJob
}