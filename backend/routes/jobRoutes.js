const express = require('express');
const Job = require('../models/Job');
const Application = require('../models/Application');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const job = new Job({ title, description, employer: req.userId });
    await job.save();
    res.status(201).json(job);
});

router.get('/', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

router.get('/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.json(job);
});

router.put('/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job.employer.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    job.title = req.body.title;
    job.description = req.body.description;
    await job.save();
    res.json(job);
});

router.delete('/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job.employer.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await job.remove();
    res.json({ message: 'Job listing deleted' });
});

router.post('/applications', async (req, res) => {
    const { jobId } = req.body;
    const application = new Application({ job: jobId, jobSeeker: req.userId });
    await application.save();
    res.status(201).json(application);
});

router.get('/applications/:jobId', async (req, res) => {
    const applications = await Application.find({ job: req.params.jobId }).populate('jobSeeker');
    res.json(applications);
});

router.put('/applications/:id', async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application.jobSeeker.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = req.body.status;
    await application.save();
    res.json(application);
});

module.exports = router;
