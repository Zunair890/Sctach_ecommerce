// we created it so that user won't open any other pages for security id=f something gets wrong

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import flash from "connect-flash";


export const isLoggedIn=async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","You are not logged in");
        return res.redirect("/");
    }
    try{
        let decoded=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        let user= await userModel.findOne({email:decoded.email})
        .select("-password"); // not want to slect password
        req.user=user;
        next();
    }
    catch(err){
        req.flash("error","Something went wrong");
        return res.redirect("/");
    }
}
