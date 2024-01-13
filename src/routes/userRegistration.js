const express=require("express");
const user_router = express.Router();
const multer = require("multer");

const {upload} =  require("../middlewares/multer")
const {loadPage, saveUserData,verifyMail}= require("../controllers/userRegistration")


user_router.use(express.urlencoded({extended:true}));





user_router.get("/register",loadPage);
user_router.get("/verify",verifyMail);
user_router.post("/register",upload.single("image"),saveUserData);





module.exports= user_router;
