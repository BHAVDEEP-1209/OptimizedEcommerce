const Product = require("../models/productModel");

//create products
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json("Error while creating product!");
  }
};

// get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    // search is done but filter and pagination is not done!
    // searching the products!
    const q = req.query.keyword;
    if (q) {
      const products = await Product.find({
        name: { $regex: q, $options: "i" },
      });
      res.status(200).json({ products, productCount });
    } else {
      const products = await Product.find().sort({ Orders: -1 });
      res.status(200).json({ products, productCount });
    }
  } catch (error) {
    res.status(500).json("Error while fetching products!");
  }
};


//deletion
exports.deleteProduct = async (req, res, next) => {
try {
    const id = req.params.id;

    let product = await Product.findById(id);
  
    if (!product) {
      res.status(500).json("Product not found");
    }
  
    await Product.deleteOne({ _id: id });
  
    res.status(200).json("Product deleted successfully!");
} catch (error) {
    res.status(500).json("Deletion Error!")
}
};

// get Product details
exports.getProductDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    let product = await Product.findById(id);

    if (!product) {
      res.status(500).json("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Error while getting Product Detail!");
  }
};

// get Vendor Products
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({
      uploadedBy: req.body.email,
      savedAs: req.body.savedAs,
    });

    if (products) {
      return res.status(200).json(products);
    }
    return res.status(204).json("No Products Yet!");
  } catch (error) {
    return res.status(500).json("Error while fetching data");
  }
};

exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({ savedAs: req.body.savedAs });

    if (products) {
      return res.status(200).json(products);
    }
    return res.status(204).json("No Products Yet!");
  } catch (error) {
    return res.status(500).json("Error while fetching data");
  }
};
