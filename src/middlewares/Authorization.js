require("dotenv").config()
const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const {userDetails}=require("../models/userModel")



module.exports.authorization= async(req,res,next)=>{
   try {
    let getCookie;
    try {
    getCookie = await req.cookies.userSignedIn;
    } catch (error) {
        if(!getCookie){
            req.authData={
                foundCookie:false
            }
            next();
        }
    }
    const getToken = jwt.verify(getCookie,process.env.TOKEN_SECRET_KEY);
    const getData = await userDetails.findOne({_id:getToken});
    req.authData={
        userData:getData,
        foundCookie:true 
    }
    next();
   } catch (error) {
    console.error("Authorization error:", error);
    req.authData = {
        foundCookie: true,
        userData: null
    };
    next();
   }
}
