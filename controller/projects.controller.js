const { Project } = require("../models/project.model");
  module.exports.createProject=async(req,res)=>{
    const {
        title,
        description,
        technologies
    }=req.body
    try{
   const newProj=new Project({
    title,
    description,
    technologies
   })
   await newProj.save()
   return res.status(201).json({
    success:true,
    status:201,
    message:"project created",
    data:newProj
   })
}
catch(error){
    console.log(error);
}
}
//get all project
exports.getAllProject=async(req,res)=>{
    const data=await Project.find();
    if(data.length>0){
        return res.status(200).json({
            success:true,
            status:200,
            message:"All projects",
            data
        })
    }
    else{
        return res.status(404).json({
            success:false,
            status:404,
            message:"No projects found"
        })
    }
}
//get single project
exports.getSingleProject=async(req,res)=>{
    const {
        id
    }=req.params
    const data=await Project.findById(id);
    if(data){
        return res.status(200).json({
            success:true,
            status:200,
            message:"project fetched",
            data
        })
    }
    else{
        return res.status(404).json({
            success:false,
            status:404,
            message:"No project found"
        })
    }
}
//update
module.exports.updateProject=async(req,res)=>{
    const {
        title,
        description,
        technologies
    }=req.body
    const id=req.params.id;
    try{
    const updated=await Project.findByIdAndUpdate(id,{
        title,
        description,
        technologies
    },{
        new:true
    })
   return res.status(200).json({
    success:true,
    status:200,
    message:"project updated",
    data:updated
   })
}
catch(error){
    console.log(error);
}
}
//delete a project
exports.deleteProject=async(req,res)=>{
    try{
    const id=req.params.id;
   const projectExist=await Project.findById(id);
   if(projectExist){
    await Project.findByIdAndDelete(id);
    return res.status(200).json({
        success:true,
        status:200,
        message:"Project deleted"
    })
   }
   else{
    return res.status(404).json({
        success:false,
        status:404,
        message:"Project not found."
    })
   }
    }
    catch(error){
        console.log(error);
    }
}