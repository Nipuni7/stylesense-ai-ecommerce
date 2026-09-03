import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://theenipuni55_db_user:StyleSense12345@cluster0.jdr8sxl.mongodb.net/stylesense?retryWrites=true&w=majority&appName=Cluster0";

const rawProducts = [
  // ==========================================
  // --- WOMEN'S ATELIER COLLECTION ---
  // ==========================================
  {
    id: "w1",
    name: "Silk Satin Slip Dress",
    price: 34500,
    category: "women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
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
    id: "w4",
    name: "Pleated Tussar Silk Trench",
    price: 38500,
    category: "women",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description: "Hand-loomed wild Tussar silk tailored with structured architectural storm flaps.",
    sizes: ["S", "M", "L"],
    colors: ["Sandstone", "Dusty Khaki"],
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
    stockCount: 18,
    tags: ["silk", "trench", "outerwear", "luxury"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "w5",
    name: "Draped Organza Evening Slip",
    price: 42000,
    category: "women",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    description: "Whisper-weight sheer silk organza cut on the bias for an ethereal silhouette.",
    sizes: ["XS", "S", "M"],
    colors: ["Alabaster Ivory", "Smoky Quartz"],
    rating: 4.8,
    reviewsCount: 15,
    inStock: true,
    stockCount: 12,
    tags: ["organza", "evening", "gown", "couture"],
    isFeatured: false,
    seasonality: "Spring/Summer"
  },
  {
    id: "w6",
    name: "Sculpted Cashmere Wrap Blazer",
    price: 49500,
    category: "women",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    description: "Double-faced Mongolian cashmere featuring asymmetric lapels and a cinched sash.",
    sizes: ["S", "M", "L"],
    colors: ["Camel", "Soft Charcoal"],
    rating: 5.0,
    reviewsCount: 42,
    inStock: true,
    stockCount: 20,
    tags: ["cashmere", "blazer", "outerwear", "luxury"],
    isFeatured: true,
    seasonality: "Autumn/Winter"
  },
  {
    id: "w7",
    name: "Oatmeal Raw Linen Palazzo Pant",
    price: 24500,
    category: "women",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    description: "High-waisted Belgian linen tailored with sharp double front pleats.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal", "Raw Ecru", "Olive"],
    rating: 4.6,
    reviewsCount: 29,
    inStock: true,
    stockCount: 35,
    tags: ["linen", "trousers", "minimalist", "summer"],
    isFeatured: false,
    seasonality: "Spring/Summer"
  },
  {
    id: "w8",
    name: "Structured Crepe Cocktail Gown",
    price: 54000,
    category: "women",
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fb1b?auto=format&fit=crop&q=80&w=800",
    description: "Heavy silk crepe with internal bustier boning and a sculpted mermaid hem.",
    sizes: ["S", "M", "L"],
    colors: ["Scarlet Red", "Midnight Noir"],
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
    stockCount: 15,
    tags: ["cocktail", "gown", "evening", "crepe"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "w9",
    name: "Alabaster Poplin Deconstructed Shirt",
    price: 19500,
    category: "women",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=800",
    description: "Egyptian Giza cotton poplin with elongated French cuffs and split collar.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pure White", "Sky Blue"],
    rating: 4.7,
    reviewsCount: 23,
    inStock: true,
    stockCount: 50,
    tags: ["cotton", "shirt", "poplin", "minimal"],
    isFeatured: false,
    seasonality: "All-Season"
  },
  {
    id: "w10",
    name: "Smoked Velvet Cape Coat",
    price: 58000,
    category: "women",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    description: "Plush silk-blend velvet crafted with sweeping draped raglan shoulders.",
    sizes: ["One Size"],
    colors: ["Smoked Bronze", "Midnight Navy"],
    rating: 4.9,
    reviewsCount: 17,
    inStock: true,
    stockCount: 10,
    tags: ["velvet", "cape", "coat", "couture"],
    isFeatured: true,
    seasonality: "Autumn/Winter"
  },

  // ==========================================
  // --- MEN'S BESPOKE COLLECTION ---
  // ==========================================
  {
    id: "m1",
    name: "Italian Wool Tailored Suit",
    price: 98000,
    category: "men",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
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
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
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
    id: "m3",
    name: "Architectural Linen Havana Suit",
    price: 64000,
    category: "men",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    description: "Unstructured unlined Irish linen with wide notch lapels and patch pockets.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Tobacco Brown", "Sand Ivory"],
    rating: 4.8,
    reviewsCount: 24,
    inStock: true,
    stockCount: 16,
    tags: ["linen", "suit", "summer", "tailoring"],
    isFeatured: true,
    seasonality: "Spring/Summer"
  },
  {
    id: "m4",
    name: "Double-Faced Cashmere Overcoat",
    price: 78000,
    category: "men",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800",
    description: "Hand-stitched pure cashmere with a relaxed drop shoulder and storm tab.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Camel", "Midnight Slate"],
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    stockCount: 12,
    tags: ["cashmere", "overcoat", "menswear", "luxury"],
    isFeatured: true,
    seasonality: "Autumn/Winter"
  },
  {
    id: "m5",
    name: "Sea Island Cotton Band-Collar Shirt",
    price: 22500,
    category: "men",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
    description: "Rare Sea Island cotton woven with a luminous hand feel and mother-of-pearl buttons.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Optic White", "Powder Blue"],
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockCount: 40,
    tags: ["cotton", "shirt", "band-collar", "luxury"],
    isFeatured: false,
    seasonality: "All-Season"
  },

  // ==========================================
  // --- ACCESSORIES & CURATED OBJETS ---
  // ==========================================
  {
    id: "a1",
    name: "Signature Leather Tote",
    price: 54000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
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
  },
  {
    id: "a2",
    name: "Hand-Rolled Mulberry Silk Foulard",
    price: 14500,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    description: "90cm twill silk scarf showcasing abstract atelier archival sketches.",
    sizes: ["90x90cm"],
    colors: ["Archival Ochre", "Monochrome Slate"],
    rating: 4.8,
    reviewsCount: 30,
    inStock: true,
    stockCount: 50,
    tags: ["silk", "scarf", "foulard", "accessories"],
    isFeatured: false,
    seasonality: "All-Season"
  },
  {
    id: "a3",
    name: "Grained Calfskin Saddle Belt",
    price: 18000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800",
    description: "Vegetable-tanned full-grain French calfskin with brushed palladium buckle.",
    sizes: ["80", "85", "90", "95", "100"],
    colors: ["Cognac", "Ebony Black"],
    rating: 4.7,
    reviewsCount: 21,
    inStock: true,
    stockCount: 30,
    tags: ["leather", "belt", "calfskin", "accessories"],
    isFeatured: false,
    seasonality: "All-Season"
  },
  {
    id: "a4",
    name: "Baroque Freshwater Pearl Torque",
    price: 28500,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    description: "Organic, uncultured baroque pearl anchored on an 18k gold-vermeil collar.",
    sizes: ["One Size"],
    colors: ["18k Gold Vermeil"],
    rating: 5.0,
    reviewsCount: 46,
    inStock: true,
    stockCount: 15,
    tags: ["jewelry", "pearl", "gold", "necklace"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "a5",
    name: "Brutalist Acetate Sunglasses",
    price: 22000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    description: "Thick bevelled Japanese bio-acetate with anti-reflective nylon lenses.",
    sizes: ["One Size"],
    colors: ["Tortoiseshell", "Solid Black"],
    rating: 4.6,
    reviewsCount: 18,
    inStock: true,
    stockCount: 25,
    tags: ["eyewear", "sunglasses", "acetate", "accessories"],
    isFeatured: false,
    seasonality: "All-Season"
  },
  {
    id: "a6",
    name: "Intrecciato Leather Weekend Holdall",
    price: 85000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    description: "Hand-woven nappa leather duffle reinforced with solid brass rivets.",
    sizes: ["45L"],
    colors: ["Espresso", "Charcoal Black"],
    rating: 4.9,
    reviewsCount: 39,
    inStock: true,
    stockCount: 8,
    tags: ["luggage", "leather", "duffle", "travel"],
    isFeatured: true,
    seasonality: "All-Season"
  },
  {
    id: "a7",
    name: "Handmade Suede Bit Loafers",
    price: 45000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800",
    description: "Unlined Tuscan reverse suede constructed using Blake rapid stitching.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Snuff Suede", "Navy Suede"],
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    stockCount: 18,
    tags: ["footwear", "shoes", "loafers", "suede"],
    isFeatured: false,
    seasonality: "All-Season"
  },
  {
    id: "a8",
    name: "Atelier Extrait de Parfum (50ml)",
    price: 31000,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
    description: "Notes of smoked birch, dry cedarwood, iris concrete, and ambergris.",
    sizes: ["50ml"],
    colors: ["Eau de Parfum"],
    rating: 5.0,
    reviewsCount: 62,
    inStock: true,
    stockCount: 30,
    tags: ["fragrance", "perfume", "parfum", "scent"],
    isFeatured: true,
    seasonality: "All-Season"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🌿 [StyleSense Seeder] Connected to MongoDB Atlas");

    await Product.deleteMany({});
    console.log("🧹 [StyleSense Seeder] Cleared existing product records");

    const createdProducts = await Product.insertMany(rawProducts);
    console.log(`✨ [StyleSense Seeder] Successfully seeded ${createdProducts.length} premium fashion products!`);

    await mongoose.disconnect();
    console.log("🔌 [StyleSense Seeder] Disconnected from MongoDB Atlas");
    process.exit(0);
  } catch (error) {
    console.error("❌ [StyleSense Seeder] Seeding Error:", error.message);
    process.exit(1);
  }
}

seedDatabase();