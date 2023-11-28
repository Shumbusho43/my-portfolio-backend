const express=require("express");
const { uploadResume,getResume} = require("../controller/resume.controller");
const { protect } = require("../utils/protect");
const router=express.Router()
router.post("/api/v1/resumeUpload",protect,uploadResume)
router.get("/api/v1/resume/:id",getResume)
module.exports.Resume=router;