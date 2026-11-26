
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");

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

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.1.16:5173",
  "https://imtiaz-trader.netlify.app",
  "https://imtiaztrader.pages.dev",
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

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// MongoDB connection for serverless and local use
let dbConnection;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  if (!dbConnection) {
    dbConnection = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    await dbConnection;
  } catch (error) {
    dbConnection = null;
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// Backend status
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Imtiaz Trader Backend is running!",
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin/orders", require("./routes/adminOrderRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

// 404 handler
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// Local development only
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Required by Vercel
module.exports = app;
