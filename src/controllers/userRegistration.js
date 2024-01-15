const {userDetails}=require("../models/userModel")
const {securePassword} = require("../utils/Password");
const {uploadOnCloudinary}= require("../utils/cloudinary")
const path = require("path")
const {sendVerificationMail}= require("../utils/mailVerification")
const {createToken}= require("../utils/jwt")

// loadPage Controller
module.exports.loadPage = async(req,res)=>{
    if(req.authData.foundCookie){
        res.redirect("/profile")
    }
    res.render("register")
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
    });
    const saveData= await userData.save();
    if(saveData){
        sendVerificationMail(saveData.name,saveData.emailId,saveData._id);
        const token = await createToken(saveData._id)
        console.log("token get")
        res.cookie("userSignedIn",token,{
				httpOnly:true })
        console.log("cookie-sent")


    }
    res.redirect("/profile");

 }catch(err){
    console.log(err);
 }
}

// VERIFY MAIL
module.exports.isMailVerified = async(req,res)=>{
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