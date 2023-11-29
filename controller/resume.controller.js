const { Resume } = require('../models/resume.model');

// Async function to upload a resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const resumeFile = req.files.resume;

    // Ensure that `resumeFile.tempFilePath` contains the correct temporary file path
    const data = require('fs').readFileSync(resumeFile.tempFilePath);
    
    // Create the Resume instance
    const newResume = new Resume({
      fileName: resumeFile.name,
      data: data,
      contentType: resumeFile.mimetype,
      // Add Cloudinary upload logic here if needed
    });

    await newResume.save();

    return res.status(200).json({ success: true, message: 'Resume uploaded successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
};


// Async function to download a resume
exports.downloadResume = async (req, res) => {
    try {
        const {
            resumeId
        }=req.params;
      // Find the resume by ID
      const resume = await Resume.findById(resumeId);
  
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found.' });
      }
  
      // Set response headers for file download
      res.setHeader('Content-Disposition', `attachment; filename=${resume.fileName}`);
      res.setHeader('Content-Type', resume.contentType);
  
      // Stream the file data to the response
      res.send(resume.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
}