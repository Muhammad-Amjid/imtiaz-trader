
const express = require("express");
const mongoose = require("mongoose");
const Enquiry = require("../models/Enquiry");
const protectAdmin = require("../middleware/auth");

const router = express.Router();

// Customer submits an enquiry (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Create enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry.",
    });
  }
});

// Admin gets all enquiries (protected)
router.get("/", protectAdmin, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error("Get enquiries error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load enquiries.",
    });
  }
});

// Admin updates enquiry status (protected)
router.patch("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const allowedStatuses = ["New", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry status updated.",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update enquiry.",
    });
  }
});

// Admin deletes an enquiry (protected)
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry.",
    });
  }
});

module.exports = router;
