const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        default : 0
    },
    images :[],
    category : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        default : 1
    },
    Orders: {
        type: Number,
        default : 0,
    },
    numOfReviews : {
        type: Number,
        default: 0
    },
    savedAs : {
        type : String,
        required : true
    },
    uploadedBy : {
        type : String,
        required : true
    },
    uploadedByName : {
        type : String,
        required : true
    },
    reviews : [
        {
            name : {
                type: String,
                required : true
            },
            rating : {
                type: Number,
                required : true
            },
            comment : {
                type: String,
                required : true
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    }


},{timeseries : true});

module.exports = mongoose.model("Product",productSchema);