const {userDetails}=require("../models/userModel")
const bcrypt = require("bcrypt");
const {uploadOnCloudinary}= require("../utils/cloudinary")
const path = require("path")
const {sendVerificationMail}= require("../utils/mailVerification")

// secure password by hashing
const securePassword = async(password)=>{
    const hasedPassword = await bcrypt.hash(password,10);
    return hasedPassword;
}

// loadPage Controller
module.exports.loadPage = async(req,res)=>{
    try{   res.render("register") }
    catch(err){ console.log(err);    }
}


// saveUserData Conroller
module.exports.saveUserData = async(req,res)=>{
 try{
    const localFilePath= path.join(__dirname,"../uploads/",req.file.filename)
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath)
    const s_password = await securePassword(req.body.password);
    const userData = new userDetails({
        name : req.body.name,
        emailId:req.body.emailId,
        mobile:req.body.mobNo,
        image:cloudinaryResponse.url,
        password:s_password,
        is_admin:0
    })
    const saveData= await userData.save();
    if(saveData){
        sendVerificationMail(saveData.name,saveData.emailId,saveData._id)
    }
    res.status(200).send("reg Succesful"+saveData+"verify yoyr email");

 }catch(err){
    console.log(err);
 }

}

// VERIFY MAIL
module.exports.verifyMail = async(req,res)=>{
    try{   
        await userDetails.findOneAndUpdate(
            { _id: req.query.id },
            { $set: { is_verified: 1 } },
            { new: true }
          );
       res.send("verified")
}
    catch(err){ console.log(err);  
      }
}