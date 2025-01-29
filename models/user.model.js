import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default:[]
  },
 
  orders: {
    type: Array,
    default: [],
  },
  contact:{
    type:Number
  },
  picture:String

});

const userModel = mongoose.model("User", userSchema);

export default userModel;

