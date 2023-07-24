const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    default : "",
  },
  image: {
    type: String,
    default : "",
  },
  address : [],
  role: {
    type: String,
    default: "role",
  },
  disabled : {
    type : Boolean,
    default : false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  business : {
    logo : {
      type: String,
      default : "bLogo"
    },
    brandName : {
      type: String,
      default : "bName"
    },
    brandDescription : {
      type: String,
      default : "bDescription"
    },
  }

});


module.exports = mongoose.model("User", userSchema);





