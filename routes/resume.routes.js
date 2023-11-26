const express=require("express");
const { uploadResume, downloadResume} = require("../controller/resume.controller");
const { protect } = require("../utils/protect");
const router=express.Router()
router.post("/api/v1/resumeUpload",protect,uploadResume)
router.get("/api/v1/resume/download/:resumeId",downloadResume)
module.exports.Resume=router;