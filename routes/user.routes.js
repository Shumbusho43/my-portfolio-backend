const express = require('express');
const { createUser, login } = require('../controller/User.controller');
const router = express.Router();
router.post('/api/v1/account/signup', createUser);
router.post("/api/v1/account/login", login)
module.exports.UserRoutes=router;