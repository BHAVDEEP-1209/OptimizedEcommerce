const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const Cart = require("../models/CartModel");

//////////////////////
const Product = require("../models/productModel");
const multer = require("multer");

// for image uploading!
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//// uploading Product Images
router.post("/productImage/", upload.array("images", 4), async (req, res) => {
  try {
    const files = req.files;
    const imagesArray = [];
    {
      for (let i = 0; i < files.length; i++) {
        imagesArray.push(files[i].filename);
      }
    }
    res.status(200).json(imagesArray);
  } catch (error) {
    res.status(500).json("Error While Uploading Product Images!");
  }
});
////////////////////////////////

////////////// updating Product!
router.post("/updateProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...req.body.formValues,
    });
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json("Error while updating!");
  }
});


///////// increasing order quantity
router.post("/updateProductOrders/", async (req, res) => {
  try {
    const array = req.body.items;
    {
      array?.map(async(ele)=>{
        const orders = ele.product.Orders;
        const res = await Product.findByIdAndUpdate( ele.product._id ,{$set : { Orders : (ele.product.Orders + 1) } });
      })
    }
    res.status(201).json("Product Orders Updated!");
  } catch (error) {
    res.status(500).json("Error while updating!");
  }
});

/// decreasing the toal number of orders on cancellation
router.post("/reduceProductOrder",async(req,res)=>{
  try {
    
    const old = await Product.findById(req.body.id);
    const res = await Product.findByIdAndUpdate( req.body.id,{$set : { Orders : old.Orders - 1} });

    res.status(201).json("Product Orders Updated!");
  } catch (error) {
    res.status(500).json("Error while updating!");
  }
})

router.get("/getAllProducts", productController.getAllProducts);
router.post("/createProduct", productController.create);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.get("/getProductDetails/:id", productController.getProductDetails);
router.post("/getVendorProducts", productController.getVendorProducts);
router.post("/getAdminProducts", productController.getAdminProducts);

module.exports = router;
