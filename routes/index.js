import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash('error');
    res.render("index", {error, loggedin:false});
});

router.get("/shop", isLoggedIn, async (req, res) => {

    try {
        const products = await productModel.find();

        let success= req.flash("success");
        res.render("shop", { 
            products,
           success
        });
    } catch (error) {
        console.error('Error fetching products:', error); // Debug log
        req.flash('error', 'Failed to load products');
        
        res.redirect('/');
    }
});
router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Added to cart");
        console.log(req.flash('success')); // Debug log
        res.redirect("/shop");
    } catch (error) {
        console.error('Error adding to cart:', error);
        req.flash('error', 'Failed to add to cart');
        res.redirect("/shop");
    }
});

router.get("/cart",isLoggedIn, async (req,res)=>{
    let user= await userModel
    .findOne({email:req.user.email})
    .populate("cart")
    res.render("cart",{user});
})



router.get("/logout",isLoggedIn,(req,res)=>{
    res.render("shop")
})

export default router;