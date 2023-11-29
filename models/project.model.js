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
  image: {
    type: String,
    default: null
},
Link:{
  type: String,
  required: true
},
cloudinary_id: {
    type: String,
    default: null
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Project Model
const Project = mongoose.model('Projects', projectSchema);

module.exports.Project = Project;
