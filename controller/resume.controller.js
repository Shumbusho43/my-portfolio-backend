const multer = require('multer');
const {Resume} = require('../models/resume.model');

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading resume
exports.uploadResume = async (req, res) => {
  try {
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'Error uploading file.' });
      }

      const resumeFile = req.file;

      if (!resumeFile) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
      }

      // Save the uploaded file to the database
      const newResume = new Resume({
        fileName: resumeFile.originalname,
        data: resumeFile.buffer,
        contentType: resumeFile.mimetype,
      });

      await newResume.save();

      return res.status(200).json({ success: true, message: 'Resume uploaded successfully.' });
    });
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