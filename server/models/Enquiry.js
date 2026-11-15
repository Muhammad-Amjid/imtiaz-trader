
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, trim: true, default: "General Enquiry" },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
