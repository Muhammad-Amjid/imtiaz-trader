
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const testImages = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80"
];

const products = [
  ["Dell Latitude 5420", "Dell", "Core i5", "11th Gen", "8GB DDR4", "256GB SSD", 65000],
  ["Dell Latitude 5410", "Dell", "Core i5", "10th Gen", "8GB DDR4", "256GB SSD", 55000],
  ["Dell Latitude 5520", "Dell", "Core i7", "11th Gen", "16GB DDR4", "512GB SSD", 95000],
  ["HP EliteBook 840 G7", "HP", "Core i5", "10th Gen", "8GB DDR4", "256GB SSD", 62000],
  ["HP EliteBook 840 G8", "HP", "Core i5", "11th Gen", "16GB DDR4", "256GB SSD", 78000],
  ["HP ProBook 450 G8", "HP", "Core i5", "11th Gen", "8GB DDR4", "512GB SSD", 75000],
  ["Lenovo ThinkPad T14", "Lenovo", "Core i5", "10th Gen", "8GB DDR4", "256GB SSD", 60000],
  ["Lenovo ThinkPad T14 Gen 2", "Lenovo", "Core i5", "11th Gen", "16GB DDR4", "512GB SSD", 82000],
  ["Acer Aspire 5", "Acer", "Core i5", "11th Gen", "8GB DDR4", "512GB SSD", 72000],
  ["ASUS VivoBook 15", "ASUS", "Core i5", "11th Gen", "8GB DDR4", "512GB SSD", 74000]
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const operations = products.map((p, index) => {
      const slug = p[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const product = {
        name: p[0],
        brand: p[1],
        processor: p[2],
        generation: p[3],
        ram: p[4],
        storage: p[5],
        price: p[6],
        slug,
        category: "Laptops",
        operatingSystem: "Windows 11 Pro",
        condition: "Used",
        availability: "Contact to confirm",
        image: testImages[0],
        images: testImages,
        description: "Dummy laptop product for Imtiaz Trader website testing.",
        featured: false,
        available: true
      };

      return {
        updateOne: {
          filter: { slug },
          update: { $set: product },
          upsert: true
        }
      };
    });

    await Product.bulkWrite(operations);
    console.log("10 laptop products added or updated successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
