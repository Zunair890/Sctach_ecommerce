import express from "express";
const router = express.Router();
import { registerUser,loginUser,logoutUser } from "../controllers/authController.js";


router.get("/", (req, res) => {
    res.send("user router")
});

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)

export default router;
