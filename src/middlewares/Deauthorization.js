require("dotenv").config()
const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const {userDetails}=require("../models/userModel")



module.exports.deleteCookies= async(req,res,next)=>{
   try { 
    let getCookie = await req.cookies.userSignedIn;
    const getToken = jwt.verify(getCookie,process.env.TOKEN_SECRET_KEY);
    const getData = await userDetails.findOne({_id:getToken});
    getData.tokens=getData.tokens.filter((element)=>{
        return element.token !== getCookie
    })
    await getData.save();
    next();
   } catch (error) {
    console.error("Deauthorization error:", error);
   }
}
