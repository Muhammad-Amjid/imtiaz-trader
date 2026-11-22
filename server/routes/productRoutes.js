
const express = require("express");
const multer = require("multer");

const Product = require("../models/Product");
const protectAdmin = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

// Store uploaded images temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8,
  },
  fileFilter: (req, file, cb) => {
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
  },
});

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "imtiaz-trader/products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};

// Validate product prices
const validatePrices = (body) => {
  const price =
    body.price === "" || body.price == null
      ? null
      : Number(body.price);

  const originalPrice =
    body.originalPrice === "" || body.originalPrice == null
      ? null
      : Number(body.originalPrice);

  if (
    (price !== null && (!Number.isFinite(price) || price < 0)) ||
    (originalPrice !== null &&
      (!Number.isFinite(originalPrice) ||
        price === null ||
        originalPrice < price))
  ) {
    return {
      valid: false,
      message:
        "Please enter valid prices. Original price must not be lower than selling price.",
    };
  }

  return {
    valid: true,
    price,
    originalPrice,
  };
};

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
router.post("/", protectAdmin, upload.array("images", 8), async (req, res) => {
  try {
    const prices = validatePrices(req.body);

    if (!prices.valid) {
      return res.status(400).json({
        success: false,
        message: prices.message,
      });
    }

    const imagePaths = await Promise.all(
      (req.files || []).map((file) =>
        uploadToCloudinary(file.buffer)
      )
    );

    const product = await Product.create({
      ...req.body,
      price: prices.price,
      originalPrice: prices.originalPrice,
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
});

// Update product
router.put("/:id", protectAdmin, upload.array("images", 8), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const prices = validatePrices({
      price:
        req.body.price !== undefined
          ? req.body.price
          : product.price,
      originalPrice:
        req.body.originalPrice !== undefined
          ? req.body.originalPrice
          : product.originalPrice,
    });

    if (!prices.valid) {
      return res.status(400).json({
        success: false,
        message: prices.message,
      });
    }

    let existingImages = [];

    try {
      existingImages = JSON.parse(
        req.body.existingImages || "[]"
      );
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

    const newImages = await Promise.all(
      (req.files || []).map((file) =>
        uploadToCloudinary(file.buffer)
      )
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

    product.price = prices.price;
    product.originalPrice = prices.originalPrice;
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
});

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
