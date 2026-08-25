import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://theenipuni55_db_user:StyleSense12345@cluster0.jdr8sxl.mongodb.net/stylesense?retryWrites=true&w=majority&appName=Cluster0";

const rawProducts = [
  {
    id: "w1",
    name: "Silk Satin Slip Dress",
    price: 34500,
    category: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    description: "Pure mulberry silk bias-cut slip dress featuring an open back and delicate straps.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Noir Black", "Emerald"],
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 45,
    tags: ["luxury", "evening", "silk", "dress"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "w2",
    name: "Structured Wool Blazer",
    price: 48000,
    category: "women",
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop",
    description: "Tailored double-breasted blazer cut from Italian virgin wool with horn buttons.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Oatmeal", "Midnight Navy", "Black"],
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    stockCount: 30,
    tags: ["tailored", "blazer", "wool", "workwear"],
    isFeatured: true,
    seasonality: "Autumn/Winter"
  },
  {
    id: "m1",
    name: "Italian Wool Tailored Suit",
    price: 98000,
    category: "men",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    description: "Bespoke-feel two-piece suit tailored from Super 130s Italian wool with canvas chest construction.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Charcoal Grey", "Navy", "Jet Black"],
    rating: 5.0,
    reviewsCount: 52,
    inStock: true,
    stockCount: 20,
    tags: ["bespoke", "suit", "wool", "menswear", "luxury"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "a1",
    name: "Signature Leather Tote",
    price: 54000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    description: "Handcrafted full-grain Italian leather tote with gold-tone hardware and suede lining.",
    sizes: ["One Size"],
    colors: ["Cognac Tan", "Noir Black", "Burgundy"],
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockCount: 25,
    tags: ["leather", "bag", "handbag", "accessories", "tote"],
    isFeatured: true,
    seasonality: "All-Season"
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas.");

    await Product.deleteMany({});
    console.log("Cleared existing product records.");

    const created = await Product.insertMany(rawProducts);
    console.log(`Successfully seeded ${created.length} products into MongoDB Atlas!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
}

seedDatabase();
