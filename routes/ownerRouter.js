import express from "express";
const router = express.Router();

router.get("/admin", (req, res) => {
   let success=req.flash("success");
   res.render("createproducts",{success});
});

export default router;
