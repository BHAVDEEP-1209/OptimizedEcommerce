const express = require("express");
const router = express.Router();


///////////// image uploading!
const User = require("../models/userModal");
const multer = require("multer");

// for image uploading!
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        return cb(null,"./public/images")
    },
    filename : function (req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({storage});

const authController = require("../controllers/userController");

router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/update/:id",authController.update);
router.get("/getVendorsList",authController.getVendorsList);
router.get("/getAdminId",authController.getAdminId);

/// updating Profile Pic and Business Logo
router.post("/updateImage",upload.single("image"),async(req,res)=>{
    const id = req.body.id;
    const pic = req.body.pic;
    const image = req.file.filename;
    try {
        const user = await User.findById(id);
        
        if(!user){
            return res.status(204).json("No such email exists");
        }
        if(pic=="profile"){
            const newUser = await User.findByIdAndUpdate(id,{image : image });
        }else{
            const newUser = await User.findByIdAndUpdate(id,{"business.logo" : image });
        }
        
        const updatedUser = await User.findById(id);        
        return res.status(201).json(updatedUser);
    } catch (error) {
        return res.status(400).send("error while updating User!");
    }
})




module.exports = router;