//user managment APIs
const { User } = require('../models/User.model');
const jwt =require("jsonwebtoken");
//create user
exports.createUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await new User({
            email,
            password
        });
        await user.save();
        return  res.status(200).json({
                status: "success",
                message: "Account created"
            });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}
//login
exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        //check if user exist
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials"
            })
        }
        //check if password is correct
        const isPasswordCorrect = await user.comparePassword(password, user.password);
        // console.log(isPasswordCorrect);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials"
            })
        }
        //create token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return res.status(200).json({
            status: "success",
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("internal server error")
    }
}