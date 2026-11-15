
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

const PAYMENT_METHODS = [
  "Cash on Delivery",
  "Bank Transfer",
  "Easypaisa",
];

router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      paymentMethod,
      paymentReference = "",
    } = req.body;

    // Validate customer information
    if (
      !customer?.fullName?.trim() ||
      !customer?.phone?.trim() ||
      !customer?.address?.trim() ||
      !customer?.city?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required delivery details.",
      });
    }

    // Validate payment method
    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid payment method.",
      });
    }

    // Validate cart
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (items.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Too many different products in this order.",
      });
    }

    // Combine duplicate products
    const quantities = new Map();

    for (const item of items) {
      if (
        !mongoose.Types.ObjectId.isValid(item.product) ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1 ||
        Number(item.quantity) > 99
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity.",
        });
      }

      const id = String(item.product);
      quantities.set(
        id,
        (quantities.get(id) || 0) + Number(item.quantity)
      );

      if (quantities.get(id) > 99) {
        return res.status(400).json({
          success: false,
          message: "Maximum quantity per product is 99.",
        });
      }
    }

    const productIds = [...quantities.keys()];

    // Get actual product prices from database
    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message: "One or more products are no longer available.",
      });
    }

    let subtotal = 0;

    const orderItems = [];

    for (const product of products) {
      if (
        product.available === false ||
        product.availability === "Unavailable"
      ) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is currently unavailable.`,
        });
      }

      const price = Number(product.price);
      const quantity = quantities.get(String(product._id));

      if (!Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${product.name}.`,
        });
      }

      subtotal += price * quantity;

      orderItems.push({
        product: product._id,
        productName: product.name,
        brand: product.brand || "",
        image: product.image || "",
        price,
        quantity,
      });
    }

    // Payment status is not automatically marked as paid
    const paymentStatus =
      paymentMethod === "Cash on Delivery"
        ? "Cash on Delivery"
        : "Awaiting Verification";

    const order = await Order.create({
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        notes: String(customer.notes || "").trim(),
      },
      items: orderItems,
      subtotal,
      total: subtotal,
      paymentMethod,
      paymentStatus,
      paymentReference:
        paymentMethod === "Cash on Delivery"
          ? ""
          : String(paymentReference).trim().slice(0, 100),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Your order has been placed successfully.",
      order: {
        orderNumber: order.orderNumber,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to place your order. Please try again.",
    });
  }
});

module.exports = router;
