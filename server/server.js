
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// CORS - Allow laptop and mobile access
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.1.16:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static("uploads"));

// Backend status
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Imtiaz Trader Backend is running!",
  });
});

// Admin authentication
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Product management
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Category management
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

// Customer orders
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// Admin order management
const adminOrderRoutes = require("./routes/adminOrderRoutes");
app.use("/api/admin/orders", adminOrderRoutes);

// Admin enquiry management
const enquiryRoutes = require("./routes/enquiryRoutes");
app.use("/api/enquiries", enquiryRoutes);

// 404 API handler
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// Server error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
