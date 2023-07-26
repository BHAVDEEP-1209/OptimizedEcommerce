const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");


const PORT = process.env.PORT; 
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
const db = process.env.DB;


/// databe connection
mongoose.connect(db,connectionParams).then(()=>console.log("database connected!")).catch(err=>console.log(err,"error while connecting  database!"));


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use('/images',express.static("public/images"));

app.use("/",require("./Routes"));


app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));