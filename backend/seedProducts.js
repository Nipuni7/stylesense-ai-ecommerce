const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stylesense';

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
    id: "w3",
    name: "Pleated Midi Skirt",
    price: 26500,
    category: "women",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    description: "High-waisted accordion pleated midi skirt in metallic champagne luster fabric.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne Gold", "Pearl White", "Black"],
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockCount: 40,
    tags: ["pleated", "skirt", "metallic", "midi"],
    isFeatured: false,
    seasonality: "Spring/Summer"
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
    id: "m2",
    name: "Cashmere Turtleneck Sweater",
    price: 36000,
    category: "men",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-fine Grade-A Mongolian cashmere rollneck sweater in relaxed fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Ivory", "Charcoal"],
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    stockCount: 35,
    tags: ["cashmere", "sweater", "knitwear", "winter"],
    isFeatured: true,
    seasonality: "Autumn/Winter"
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
    await mongoose.connect(MONGO_URI);
    console.log('🌿 [StyleSense Seeder] Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🧹 [StyleSense Seeder] Cleared existing product records');

    const createdProducts = await Product.insertMany(rawProducts);
    console.log(✅ [StyleSense Seeder] Successfully seeded  premium fashion products!);

    await mongoose.disconnect();
    console.log('🔌 [StyleSense Seeder] Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ [StyleSense Seeder] Seeding Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
