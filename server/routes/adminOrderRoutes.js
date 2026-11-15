
const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const allowed = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify bank or Easypaisa payment
router.patch("/:id/payment", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.paymentMethod === "Cash on Delivery") {
      return res.status(400).json({
        success: false,
        message: "COD orders cannot be marked as prepaid.",
      });
    }

    order.paymentStatus = "Paid";
    await order.save();

    res.json({
      success: true,
      message: "Payment marked as verified.",
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
