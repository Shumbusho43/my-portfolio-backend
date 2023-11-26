const mongoose = require('mongoose');

// Define the Resume Schema
const resumeSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Resume Model
const Resume = mongoose.model('Resume', resumeSchema);

module.exports.Resume = Resume;