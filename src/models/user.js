const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
    accountType: {
        type:String,
        required:true      
    },
    fullName: {
        type:String,
        required:true             
    },
    email: {
        type:String,
        unique:true,
        required:true     
    },
    password: {
        type:String,
        required:true      
    },
    isVerified:{
        type:Boolean,
        required:true
    },
    isActivated: {
        type:Boolean,
        required:true
    }   
})
user.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        // console.log(token);
        return token;        
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model("User",user);
module.exports = User;