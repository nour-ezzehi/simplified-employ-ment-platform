const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Applied', 'Interview', 'Hired', 'Rejected'], default: 'Applied' },
    dateApplied: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
