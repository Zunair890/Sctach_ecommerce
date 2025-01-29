import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/genearateToken.js";

export const registerUser=async(req,res)=>{
    try{
        let {email,fullName,password}=req.body;
        let user=await userModel.findOne({email:email});
        if(user){
            req.flash('error', 'User already exists, please login');
            return res.redirect('/');
        }
        
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) {
                    req.flash('error', err.message);
                    return res.redirect('/');
                }
                
                else{
                   let user = await userModel.create({email,password:hash,fullName});
                   let token = generateToken(user);
                   res.cookie("token",token);
                   req.flash('success', 'Registration successful');
                   res.redirect('/shop');
                }
            })
        })
    }
    catch(err){
        console.log(err.message);
        req.flash('error', err.message);
        res.redirect('/');
    }
}

export const loginUser= async(req,res)=>{
    try {
        let {email,password} = req.body;
        let user = await userModel.findOne({email:email});
        if(!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                req.flash('success', 'Login successful');
                res.redirect('/shop');
            }
            else{
                req.flash('error', 'Email or password is incorrect');
                res.redirect('/');
            }
        })
    } catch(error) {
        req.flash('error', 'Login failed');
        res.redirect('/');
    }
}


export const logoutUser=async(req,res)=>{
    res.clearCookie("token");
    req.flash('success', 'Logout successful');
    res.redirect('/');
}
