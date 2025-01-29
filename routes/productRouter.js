import express from "express";
import productModel from "../models/product.model.js";
const router = express.Router();
import multer from "multer";



const storage=multer.memoryStorage();
const upload=multer({storage:storage});


router.post("/create",upload.single("image"),async(req,res)=>{
   try{
    let{name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
   let product= await productModel.create({
    image:req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor
   })
   req.flash("success","Product created successfully");
    res.redirect("/owners/admin");}
    catch(err){
        res.send(err.message);
    }
    
})

export default router;
