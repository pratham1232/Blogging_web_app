const express = require("express");
const router = express.Router();
const User= require("../Models/user");
router.get("/signup",(req,res)=>{
    return res.render("signup");
});
router.get("/signin",(req,res)=>{
    return res.render("signin");
});
router.post("/signup",async(req,res)=>{
    const {fullname,email,password}= req.body;
    await User.create({
        fullname,email,password
    });
    return res.redirect("/");
});
router.post("/signin",async(req,res)=>{
    const {email,password}= req.body;
    const user = await User.matchPassoword(email,password);
    console.log(user);
    return res.redirect("/");
}) 
module.exports=router;