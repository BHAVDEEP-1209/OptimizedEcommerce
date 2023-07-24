const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
 id :{
    type: String,
    required : true
 },
 messages : [],
 user : {
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    },
 },
 createdAt: {
    type: Date,
    default: Date.now,
  },
  
},{timeseries : true})

module.exports = mongoose.model("Chat",chatSchema);