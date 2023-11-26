const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }
})
//hashing password 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//compare password with bcrypt
userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
module.exports.User=mongoose.model("User",userSchema);