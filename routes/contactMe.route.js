const express =require("express");
const { contactMe } = require("../controller/contactMe.controller");
const router=express.Router();
router.post("/api/v1/contactMe",contactMe)
module.exports.contactMe=router;