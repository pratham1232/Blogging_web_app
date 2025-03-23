const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/blogify").
then(()=>console.log("Mongo DB is Connected!")).
catch((err)=>console.log(err));

app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("Views",path.resolve("./Views"));

app.use("/user",userRouter);
app.get("/",(req,res)=>{
    return res.render("home");
})
app.listen(PORT,()=>console.log("Server Started!"));