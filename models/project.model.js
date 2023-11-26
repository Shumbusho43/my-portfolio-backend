const mongoose = require('mongoose');

// Define the Project Schema
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the Project Model
const Project = mongoose.model('Projects', projectSchema);

module.exports.Project = Project;
