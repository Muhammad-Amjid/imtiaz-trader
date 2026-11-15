
const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

const makeSlug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Public: Get active categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get all categories
router.get("/admin/all", auth, async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create category
router.post("/", auth, async (req, res) => {
  try {
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const category = await Category.create({
      name,
      slug: makeSlug(name),
      description: req.body.description || "",
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "This category already exists."
        : error.message,
    });
  }
});

// Admin: Update category
router.put("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    if (req.body.name?.trim()) {
      const oldName = category.name;
      const newName = req.body.name.trim();

      category.name = newName;
      category.slug = makeSlug(newName);

      if (oldName !== newName) {
        await Product.updateMany(
          { category: oldName },
          { $set: { category: newName } }
        );
      }
    }

    if (typeof req.body.description === "string") {
      category.description = req.body.description;
    }

    if (typeof req.body.active === "boolean") {
      category.active = req.body.active;
    }

    await category.save();

    res.json({ success: true, category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000
        ? "A category with this name already exists."
        : error.message,
    });
  }
});

// Admin: Delete category
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID." });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." });
    }

    const products = await Product.countDocuments({
      category: category.name,
    });

    if (products > 0) {
      return res.status(400).json({
        success: false,
        message: "This category contains products. Move those products before deleting it.",
      });
    }

    await category.deleteOne();

    res.json({ success: true, message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
