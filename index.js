import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import db from "./config/mongoose-connection.js";
import ownerRouter from "./routes/ownerRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";
import expressSession from "express-session";
import flash from "connect-flash";
import indexRouter from "./routes/index.js";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(flash());
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
}))


app.set("view engine", "ejs");
// routes
app.use("/",indexRouter);
app.use("/owners", ownerRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

