const { Project } = require("../models/project.model");
const cloudinary = require('../utils/cloudinary');
const path=require("path");
  module.exports.createProject=async(req,res)=>{
    const {
        title,
        description,
        technologies,
        link
    }=req.body
    try{
   const newProj=new Project({
    title,
    description,
    technologies,
    link
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
//uploading project image using cloudinary
exports.projectPhotoUpload = async (req, res) => {
    try {
        //checking if user exists
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: `project with id: ${req.params.id} not found`,
            });
        } else {
            if (!req.files)
                return res.status(400).json({
                    success: false,
                    message: "Please upload a photo",
                });
            else {
                const file = req.files.photo;
                //make sure that uploaded file is an image
                if (!file.mimetype.startsWith("image"))
                    return res.status(400).json({
                        success: false,
                        message: "please upload an image file",
                    });
                file.name = `photo_${req.params.id}${
                  path.parse(file.name).ext
                }`;
                //checking if project has cloudinar id
                if (project.cloudinary_id == null) {
                    cloudinary.uploader
                        .upload(file.tempFilePath)
                        .then(async(result) => {
                            const body = {
                                profile: result.secure_url,
                                cloudinary_id: result.public_id,
                            };
                            //updating project
                           const updated=await Project.findByIdAndUpdate(req.params.id, {
                                    image: body.profile,
                                    cloudinary_id: body.cloudinary_id
                                }, {
                                    new: true
                                }
                            ).exec()
                            return res.status(200).json({
                                success: true,
                                message: 'Image updated',
                                data: updated,
                              });
                        })
                        .catch((err) => console.log("cloudinary", err));
                } else {
                    cloudinary.uploader
                        .destroy(project.cloudinary_id)
                        .then(() => {
                            cloudinary.uploader
                                .upload(file.tempFilePath)
                                .then(async(result) => {
                                    const body = {
                                        profile: result.secure_url,
                                        cloudinary_id: result.public_id,
                                    };
                                    const updatedProject=await Project.findByIdAndUpdate(req.params.id, {
                                            image: body.profile,
                                            cloudinary_id: body.cloudinary_id
                                        }, {
                                            new: true
                                        },
                                    ).exec()
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Image updated',
                                        data: updatedProject,
                                      });
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                }
            };

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
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