
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const name = "Imtiaz Trader Admin";
    const email = "admin@imtiaztrader.com";
    const password = process.env.ADMIN_PASSWORD;

    if (!password || password.length < 8) {
  throw new Error("Password must contain at least 8 characters.");
}

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    await Admin.create({ name, email, password });

    console.log("Admin account created successfully!");
    console.log("Email:", email);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
