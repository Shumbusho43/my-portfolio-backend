const express=require("express");
const { createProject, getAllProject, getSingleProject, updateProject, deleteProject } = require("../controller/projects.controller");
const { protect } = require("../utils/protect");
const router=express.Router();
router.post("/api/v1/project",protect,createProject)
router.get("/api/v1/project",getAllProject)
router.get("/api/v1/project/:id",getSingleProject)
router.put("/api/v1/project/:id",protect,updateProject)
router.delete("/api/v1/project/:id",protect,deleteProject)
module.exports.Project=router;