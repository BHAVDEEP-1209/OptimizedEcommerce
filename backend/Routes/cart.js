const express = require("express");
const router = express.Router();
const Cart = require("../models/CartModel");

///////// adding Item to cart!
router.post("/addToCart", async (req, res) => {
  try {
    // const item  = await Cart.find({id : req.body.id});
    /// testing for the new orders

    const item = await Cart.find({ id: req.body.id, purchasedAs: "cart" });

    let data = { ...req.body };

    if (item.length > 0) {
      const q = item[0].quantity + req.body.quantity;
      data = { ...data, quantity: q };
      console.log(q);
      console.log(data);
      const updated = await Cart.deleteOne({ id: req.body.id });
    }
    const cartItem = await Cart.create({ ...data });
    res.status(201).json(cartItem);
  } catch (error) {
    return res.status(500).json("Error while adding to cart!");
  }
});

/// Getting Individual Cart Item
router.get("/getCartItems/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const items = await Cart.find({ purchasedAs: "cart", purchasedBy: id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

///update cart item
router.post("/updateCart/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, {
      $set: { quantity: req.body.quantity },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json("Error while updating!");
  }
});

router.delete("/deleteCartItem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del = await Cart.deleteOne({ id: id });
    res.status(201).json("item deleted");
  } catch (error) {
    return res.status(500).json("Error while adding to cart!");
  }
});

////////////////// Place Orders
router.post("/PlaceOrders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const items = await Cart.find({ purchasedAs: "cart", purchasedBy: id });
    console.log(items);
    {
      items?.map(async (item) => {
        const ord = item.product.Orders;
        let dis = 0;

        if (req.body.isDiscount) {
          dis =
            item.quantity * item.product.price -
            item.quantity * item.product.price * 0.2;
        }
        const result = await Cart.updateOne(
          { id: item.id, purchasedAs: "cart" },
          {
            $set: {
              purchasedAs: "order",
              "product.Orders": ord + 1,
              discount: Math.round(dis),
            },
          }
          // { $set : { "purchasedAs" : "order"} }
        );
      });
    }
    res.status(200).json("order placed");
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

////////////////
// get Placed order
router.get("/getOrders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const items = await Cart.find({ purchasedAs: "order", purchasedBy: id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

// get vendor orders
router.post("/getVendorOrders", async (req, res) => {
  try {
    const items = await Cart.find({
      purchasedAs: "order",
      "product.uploadedBy": req.body.email,
      orderStatus: { $ne: "delivered" },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

// update order Status
router.post("/updateOrderStatus/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const items = await Cart.findByIdAndUpdate(id, {
      $set: { orderStatus: req.body.orderStatus },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

// order History
router.post("/getHistory", async (req, res) => {
  try {
    const items = await Cart.find({
      purchasedAs: "order",
      "product.uploadedBy": req.body.email,
      orderStatus: "delivered",
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

///////////////get admin Orders
// get admin orders
router.post("/getAdminOrders", async (req, res) => {
  try {
    const items = await Cart.find({
      purchasedAs: "order",
      orderStatus: { $ne: "delivered" },
      purchasedBy: { $ne: req.body.id },
      "product.uploadedBy": { $ne: req.body.email },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

// get admin orders history
router.post("/getAdminOrdersHistory", async (req, res) => {
  try {
    const items = await Cart.find({
      purchasedAs: "order",
      orderStatus: "delivered",
      purchasedBy: { $ne: req.body.id },
      "product.uploadedBy": { $ne: req.body.email },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error while getting data!");
  }
});

router.post("/getProductTotalSales", async (req, res) => {
  try {
    const items = await Cart.find({
      purchasedAs: "order",
      "product.uploadedBy": req.body.uploadedBy,
      "product._id": req.body.id,
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json("Error!");
  }
});

module.exports = router;
