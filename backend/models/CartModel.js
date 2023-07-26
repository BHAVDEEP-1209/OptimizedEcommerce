const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product : {},
    id : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    purchasedAs : {            /// cart or  product 2 options
        type : String,
        required : true
    },
    purchasedBy : {
        type : String,
        required : true
    },
    orderStatus : {
        type: String,
        default : "stock"
    },
    discount:{
        type: Number,
        default : 0
    },
    createdAt: {
        type: Date,
        default : Date.now
    }
},{timeseries : true})

module.exports = mongoose.model("Cart",cartSchema);