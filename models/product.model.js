import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    bgcolor: {
        type: String,
        default: "#F59E0B" // yellow-500
    },
    panelcolor: {
        type: String,
        default: "#EF4444" // red-500
    },
    textcolor: {
        type: String,
        default: "#FFFFFF" // white
    }
});

const productModel = mongoose.model("product", productSchema);
export default productModel;
