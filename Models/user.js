const mongoose = require("mongoose");
const {createHmac,randomBytes}=require("crypto");
const { error } = require("console");
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    profileImageURL:{
        type:String,
        default:"../Public/user_avatar.png"
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    }
},
{
    timestamps:true
});
userSchema.static("matchPassoword", async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User Not Found!");
    const salt = user.salt;
    const user_provided_hash=user.password;
    const hashedPassword = createHmac("sha256",salt).update(password).digest("hex");
    if(hashedPassword!==user_provided_hash) throw new Error("Incorrect Password");
    return user;
})

userSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return console.log("User Not Found");
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password=hashedPassword;
    next();
})

const User=mongoose.model("user",userSchema);
module.exports=User;