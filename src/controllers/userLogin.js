const {userDetails}=require("../models/userModel")
const {verifyPassword}= require("../utils/Password")


module.exports.loadPagelogin = async (req,res)=>{
    if(req.authData.foundCookie){
        res.redirect("/profile")
    }
    res.render("login");
}

module.exports.checkUser = async (req,res)=>{
    const emailId= req.body.emailId;
    const password= req.body.password;
    try {
        const getData= await userDetails.findOne({emailId});
        if(verifyPassword(password,getData.password)){
            if(getData.is_verified==0){
                res.send("please verify Your mail")
            }
            res.send("logined")
        }
        else{
            console.log("passwordIncorrect")
            res.send("loginFailed")
        }

    } catch (error) {
        
    }

}

