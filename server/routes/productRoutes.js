
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Product = require("../models/Product");
const protectAdmin = require("../middleware/auth");

const router = express.Router();

const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP and GIF images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8,
  },
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
});

// Add product
router.post(
  "/",
  protectAdmin,
  upload.array("images", 8),
  async (req, res) => {
    try {
      const imagePaths = (req.files || []).map(
        (file) => `/uploads/${file.filename}`
      );

      const product = await Product.create({
        ...req.body,
        images: imagePaths,
        image: imagePaths[0] || "",
      });

      res.status(201).json({
        success: true,
        message: "Product added successfully.",
        product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Update product with existing and new images
router.put(
  "/:id",
  protectAdmin,
  upload.array("images", 8),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      let existingImages = [];

      try {
        existingImages = JSON.parse(req.body.existingImages || "[]");
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid existing images data.",
        });
      }

      if (!Array.isArray(existingImages)) {
        return res.status(400).json({
          success: false,
          message: "Existing images must be an array.",
        });
      }

      // Only retain image paths that already belong to this product.
      const oldImages = product.images?.length
        ? product.images
        : product.image
          ? [product.image]
          : [];

      const retainedImages = existingImages.filter(
        (image) =>
          typeof image === "string" &&
          oldImages.includes(image)
      );

      const newImages = (req.files || []).map(
        (file) => `/uploads/${file.filename}`
      );

      const updatedImages = [
        ...retainedImages,
        ...newImages,
      ];

      const {
        existingImages: ignoredImages,
        ...updatedFields
      } = req.body;

      Object.assign(product, updatedFields);

      product.images = updatedImages;
      product.image = updatedImages[0] || "";

      await product.save();

      res.json({
        success: true,
        message: "Product updated successfully.",
        product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Delete product
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
