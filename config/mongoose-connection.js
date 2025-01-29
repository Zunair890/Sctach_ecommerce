import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB 2.0 connected");
})
.catch((err)=>{
    console.log(err);
})

export default mongoose.connection;