const multer = require('multer');
const {Resume} = require('../models/resume.model');
const path=require("path");
const cloudinary = require('../utils/cloudinary');
// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// // Route for uploading resume
// exports.uploadResume = async (req, res) => {
//   try {
//     upload.single('resume')(req, res, async (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ success: false, message: 'Error uploading file.' });
//       }

//       const resumeFile = req.file;

//       if (!resumeFile) {
//         return res.status(400).json({ success: false, message: 'No file uploaded.' });
//       }

//       // Save the uploaded file to the database
//       const newResume = new Resume({
//         fileName: resumeFile.originalname,
//         data: resumeFile.buffer,
//         contentType: resumeFile.mimetype,
//       });

//       await newResume.save();

//       return res.status(200).json({ success: true, message: 'Resume uploaded successfully.' });
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error.' });
//   }
// };

// // Async function to download a resume
// exports.downloadResume = async (req, res) => {
//     try {
//         const {
//             resumeId
//         }=req.params;
//       // Find the resume by ID
//       const resume = await Resume.findById(resumeId);
  
//       if (!resume) {
//         return res.status(404).json({ success: false, message: 'Resume not found.' });
//       }
  
//       // Set response headers for file download
//       res.setHeader('Content-Disposition', `attachment; filename=${resume.fileName}`);
//       res.setHeader('Content-Type', resume.contentType);
  
//       // Stream the file data to the response
//       res.send(resume.data);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: 'Internal Server Error.' });
//     }
// }
//uploading resume image using cloudinary
exports.uploadResume= async (req, res) => {
  try {
          
          if (!req.files)
              return res.status(400).json({
                  success: false,
                  message: "Please upload a photo",
              });
          else {
              const file = req.files.photo;
              if (!file.mimetype=="application/pdf")
                  return res.status(400).json({
                      success: false,
                      message: "please upload a pdf file",
                  });
              file.name = `photo_${req.params.id}${
                path.parse(file.name).ext
              }`;
                  cloudinary.uploader
                      .upload(file.tempFilePath)
                      .then(async(result) => {
                          const body = {
                              profile: result.secure_url,
                              cloudinary_id: result.public_id,
                          };
                          const resume=new Resume({
                            image:body.profile,
                            cloudinary_id:body.cloudinary_id
                          })
                          await resume.save();
                          return res.status(200).json({
                              success: true,
                              message: 'Resume uploaded',
                              data: resume,
                            });
                      })
                      .catch((err) => console.log("cloudinary", err));
          };
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: "Internal server error",
      });
  }
};

//get single project
exports.getResume=async(req,res)=>{
  const {
      id
  }=req.params
  const data=await Resume.findById(id);
  if(data){
      return res.status(200).json({
          success:true,
          status:200,
          message:"resume fetched",
          data
      })
  }
  else{
      return res.status(404).json({
          success:false,
          status:404,
          message:"No resume found"
      })
  }
}