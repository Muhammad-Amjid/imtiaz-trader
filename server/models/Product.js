
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Laptops",
    },
    processor: { type: String, default: "" },
    generation: { type: String, default: "" },
    ram: { type: String, default: "" },
    operatingSystem: { type: String, default: "" },
    storage: { type: String, default: "" },
    graphics: { type: String, default: "" },
    price: { type: Number, default: null },
    condition: { type: String, default: "" },
    availability: {
      type: String,
      default: "Contact to confirm",
    },
    image: { type: String, default: "" },
    images: {
      type: [String],
      default: [],
    },
    description: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
