const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");

// @route   GET  api/cart
// @desc    Get all products in cart
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   POST  api/cart
// @desc    Add   cart
// @access  Private
router.post("/", auth, async (req, res) => {
  const { sku, price, name } = req.body;
  const quantity = 1;
  try {
    let cart = await Cart.findOne({ sku: sku });

    if (cart) {
      return res.status(400).json({ msg: "Product already in cart" });
    } else {
      const newCart = new Cart({
        sku,
        price,
        name,
        quantity,
        user: req.user.id,
      });

      cart = await newCart.save();
      console.log(`${name} added to cart`.magenta);
    }

    res.json(cart);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   PUT  api/cart/:id/plusone
// @desc    Add one to quantity of product
// @access  Private
router.put("/:id/plusone", auth, async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    // Make sure user owns cart
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    cart.quantity++;

    await Cart.findByIdAndUpdate(req.params.id, { $set: cart }, { new: true });

    console.log(`Product ${cart.name} quantity increased by one`.magenta);
    cart = await Cart.find({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   PUT  api/cart/:id/minus one
// @desc    Minus one to quantity of product
// @access  Private
router.put("/:id/minusone", auth, async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    // Make sure user owns cart
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    cart.quantity--;

    await Cart.findByIdAndUpdate(req.params.id, { $set: cart }, { new: true });

    console.log(`Product ${cart.name} quantity decreased by one`.magenta);

    cart = await Cart.find({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE  api/cart/:id
// @desc    Remove product from cart
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find cart
    let cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    // Make sure user owns cart
    if (cart.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Remove product from cart
    await Cart.findByIdAndRemove(req.params.id);
    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
