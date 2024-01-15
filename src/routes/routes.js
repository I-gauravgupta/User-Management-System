const express=require("express");
const user_router = express.Router();
// const multer = require("multer");
const {upload} =  require("../middlewares/multer")
const {loadPage, saveUserData,isMailVerified}= require("../controllers/userRegistration")
const {loadPagelogin,checkUser}= require("../controllers/userLogin")
const {authorization}= require("../middlewares/Authorization")
const {deleteCookies}= require("../middlewares/Deauthorization")


const cookieParser = require("cookie-parser");
const { deauthorization } = require("../middlewares/Deauthorization");
user_router.use(cookieParser())



user_router.use(express.urlencoded({extended:true}));


//home
user_router.get("/",(req,res)=>{res.render("home")});


//registration
user_router.get("/register",authorization,loadPage);
user_router.get("/verify",isMailVerified);
user_router.post("/register",upload.single("image"),saveUserData);

//login
user_router.get("/login",authorization,loadPagelogin);
user_router.post("/login",checkUser);

//profile 
user_router.get("/profile",authorization,(req,res)=>{
    res.render("profile")
});
user_router.get("/logout",deleteCookies,(req,res)=>{
    res.redirect("/")
});











module.exports= user_router;
