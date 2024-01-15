require("dotenv").config()
const jwt = require("jsonwebtoken");
const {userDetails}= require("../models/userModel")

module.exports.createToken= async(_id)=>{
    try {
        const token = jwt.sign(_id.toString(),process.env.TOKEN_SECRET_KEY)
        await userDetails.findOneAndUpdate(
            { _id },
            { $push: { tokens: { token } } },
            { new: true }
        );
        return token
    } catch (error) {
        console.log("error on genereating token")
        console.log(error)
        
    }
}



