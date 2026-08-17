import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample Product Routes for StyleSense
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Cyberpunk Oversized Bomber Jacket",
    category: "Outerwear",
    price: 129.99,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    tags: ["Streetwear", "Futuristic", "Trending"],
    aiMatch: "98% Match"
  },
  {
    id: 2,
    name: "Minimalist Linen Tailored Blazer",
    category: "Formal",
    price: 154.00,
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    tags: ["Minimalist", "Office", "Elegant"],
    aiMatch: "94% Match"
  }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', message: 'StyleSense API is running' });
});

// Products endpoint
app.get('/api/products', (req, res) => {
  res.status(200).json(SAMPLE_PRODUCTS);
});

app.listen(PORT, () => {
  console.log(`🚀 StyleSense Backend Server running on http://localhost:${PORT}`);
});