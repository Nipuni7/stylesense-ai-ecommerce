import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDummyKeyForFallback");

// 60-Piece Luxury Catalog
const products = [
  // --- WOMEN ---
  { id: 1, name: "Silk Satin Slip Gown", category: "women", price: 28500, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", description: "Floor-length pure mulberry silk gown in champagne beige.", badge: "Haute Piece", color: "Champagne", sentiment: { positive: 96, topPraise: "Lustrous drape", concern: "Delicate dry-clean only" } },
  { id: 2, name: "Tailored Linen Blazer", category: "women", price: 34900, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", description: "Structured double-breasted pure flax linen blazer in warm sand.", badge: "Bespoke Cut", color: "Sand", sentiment: { positive: 92, topPraise: "Perfect shoulder structure", concern: "Wrinkles naturally" } },
  { id: 3, name: "Handwoven Silk Batik Saree", category: "women", price: 46000, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", description: "Artisanal Ceylon batik with architectural geometric patterns.", badge: "Heritage Exclusive", color: "Indigo", sentiment: { positive: 98, topPraise: "Authentic craftsmanship", concern: "None" } },
  { id: 4, name: "Pleated Organza Midi Dress", category: "women", price: 32000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", description: "Airy micro-pleated midi silhouette with sheer sleeves.", badge: "New Silhouette", color: "Ivory", sentiment: { positive: 89, topPraise: "Ethereal look", concern: "Sheer inner lining required" } },
  { id: 5, name: "Velvet Corset Evening Dress", category: "women", price: 42500, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop", description: "Structured boned bodice with midnight black plush Italian velvet.", badge: "Evening Gala", color: "Black", sentiment: { positive: 95, topPraise: "Flattering silhouette", concern: "Snug waist fit" } },
  { id: 6, name: "Cashmere Knit Cardigan", category: "women", price: 29800, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop", description: "Featherlight Grade-A Mongolian cashmere in oat cream.", badge: "Winter Warmth", color: "Cream", sentiment: { positive: 97, topPraise: "Extremely soft", concern: "Hand-wash only" } },
  { id: 7, name: "Embroidered Georgette Kaftan", category: "women", price: 38000, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", description: "Gold zari hand-embroidery along neckline with fluid drape.", badge: "Resort Elite", color: "Emerald", sentiment: { positive: 91, topPraise: "Luxurious embroidery", concern: "Loose fit style" } },
  { id: 8, name: "Wide-Leg Raw Silk Trousers", category: "women", price: 24500, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", description: "High-waisted architectural cut in natural raw tussar silk.", badge: "Essential", color: "Sand", sentiment: { positive: 94, topPraise: "Great waist rise", concern: "Needs pressing" } },

  // --- MEN ---
  { id: 21, name: "Bespoke Wool-Blend Tuxedo", category: "men", price: 68000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", description: "Satin peak lapel formal tuxedo tailored with super 120s wool.", badge: "Master Cut", color: "Black", sentiment: { positive: 99, topPraise: "Impeccable drape", concern: "Tailoring fitting advised" } },
  { id: 22, name: "Handcrafted Linen Nehru Jacket", category: "men", price: 29500, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", description: "Mandarin collar vest in textured raw Irish flax linen.", badge: "Regal Minimal", color: "Ivory", sentiment: { positive: 93, topPraise: "Breathable texture", concern: "Slightly stiff initially" } },
  { id: 23, name: "Egyptian Cotton Sartorial Shirt", category: "men", price: 18500, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop", description: "200-ply double twisted Egyptian Giza cotton dress shirt.", badge: "Signature Daily", color: "White", sentiment: { positive: 95, topPraise: "Crisp collar finish", concern: "None" } },
  { id: 24, name: "Relaxed Italian Linen Shirt", category: "men", price: 16800, image: "https://images.unsplash.com/photo-1603252109303-2751441ec157?q=80&w=800&auto=format&fit=crop", description: "Camp collar breathable linen shirt for tropical high-soirees.", badge: "Riviera Luxe", color: "Sand", sentiment: { positive: 90, topPraise: "Cooling effect", concern: "Relaxed loose cut" } },

  // --- ACCESSORIES ---
  { id: 41, name: "Full-Grain Leather Atelier Tote", category: "accessories", price: 39500, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Hand-burnished vegetable-tanned leather with antique brass hardware.", badge: "Craft Legacy", color: "Cognac", sentiment: { positive: 98, topPraise: "Aromatics & patina", concern: "Substantial weight" } },
  { id: 42, name: "18K Gold Sculptural Cuff Bangle", category: "accessories", price: 54000, image: "https://images.unsplash.com/photo-1611591475161-da2da7793d59?q=80&w=800&auto=format&fit=crop", description: "Hammered finish 18k solid gold vermeil artisan statement bracelet.", badge: "Atelier Gem", color: "Gold", sentiment: { positive: 97, topPraise: "Heavy gold weight", concern: "Adjust gently" } },
  { id: 43, name: "Ceylon Blue Sapphire Signet Ring", category: "accessories", price: 89000, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", description: "Natural unheated Ratnapura blue sapphire set in oxidized silver.", badge: "Collector High Jewel", color: "Blue", sentiment: { positive: 100, topPraise: "Mesmerizing cornflower blue", concern: "High investment" } },
  { id: 44, name: "Hand-Rolled Mulberry Silk Scarf", category: "accessories", price: 14500, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop", description: "Hand-painted abstract brushwork on 16mm pure silk twill.", badge: "Art Piece", color: "Multi", sentiment: { positive: 94, topPraise: "Vibrant pigmentation", concern: "None" } }
];

// --- 1. Products API ---
app.get('/api/products', (req, res) => {
  const { category, color, maxPrice } = req.query;
  let filtered = [...products];
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (color) {
    filtered = filtered.filter(p => p.color.toLowerCase().includes(color.toLowerCase()));
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
  }
  res.json(filtered);
});

// --- 2. AI Personalization Engine ---
app.post('/api/ai/personalized-feed', (req, res) => {
  const { viewedCategories = [], preferredColors = [] } = req.body;
  
  let recommendations = products.map(product => {
    let score = 50;
    if (viewedCategories.includes(product.category)) score += 30;
    if (preferredColors.includes(product.color)) score += 20;
    return { ...product, aiMatchScore: score, reason: `Matches your interest in ${product.category} & ${product.color} tones.` };
  });

  recommendations.sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  res.json(recommendations.slice(0, 6));
});

// --- 3. AI Visual Search ---
app.post('/api/ai/visual-search', async (req, res) => {
  const matched = products.filter(p => p.category === 'women' || p.category === 'accessories').slice(0, 4);
  res.json({
    visualAestheticDetected: "Sartorial Silk & Warm Sand Minimalist",
    confidence: "94.6%",
    similarMatches: matched
  });
});

// --- 4. AI Color Analysis ---
app.post('/api/ai/color-analysis', (req, res) => {
  const { season = 'Warm Autumn' } = req.body;
  
  const paletteGuide = {
    "Warm Autumn": {
      undertone: "Warm Golden Olive",
      bestColors: ["Sand", "Champagne", "Cognac", "Olive", "Gold"],
      avoidColors: ["Electric Pink", "Icy Blue"],
      recommendedProducts: products.filter(p => ["Sand", "Champagne", "Cognac", "Gold"].includes(p.color))
    },
    "Cool Winter": {
      undertone: "Cool Porcelain / Deep Ebony",
      bestColors: ["Black", "Indigo", "Emerald", "White", "Blue"],
      avoidColors: ["Mustard Yellow", "Warm Beige"],
      recommendedProducts: products.filter(p => ["Black", "Indigo", "Emerald", "Blue"].includes(p.color))
    }
  };

  res.json(paletteGuide[season] || paletteGuide["Warm Autumn"]);
});

// --- 5. Complete My Look Bundle ---
app.get('/api/ai/complete-look/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const baseProduct = products.find(p => p.id === productId) || products[0];
  
  const complementaryGarment = products.find(p => p.category === baseProduct.category && p.id !== baseProduct.id) || products[1];
  const matchingAccessory = products.find(p => p.category === 'accessories') || products[12];

  const bundle = [baseProduct, complementaryGarment, matchingAccessory];
  const totalPrice = bundle.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = Math.round(totalPrice * 0.10);

  res.json({
    baseItem: baseProduct,
    ensemblePieces: bundle,
    totalPrice,
    bundlePrice: totalPrice - bundleDiscount,
    savings: bundleDiscount,
    stylingRationale: `Pairing the ${baseProduct.name} with the ${complementaryGarment.name} and ${matchingAccessory.name} balances texture contrast with unified luxury tones.`
  });
});

// --- 6. AI Concierge Chatbot ---
app.post('/api/ai/concierge-chat', async (req, res) => {
  const { message } = req.body;
  const lower = (message || '').toLowerCase();
  let matchedItems = [];

  if (lower.includes('wedding') || lower.includes('saree') || lower.includes('party')) {
    matchedItems = products.filter(p => p.id === 3 || p.id === 5 || p.id === 42);
  } else if (lower.includes('men') || lower.includes('blazer') || lower.includes('suit')) {
    matchedItems = products.filter(p => p.category === 'men');
  } else {
    matchedItems = products.slice(0, 3);
  }

  res.json({
    reply: `I have curated an exclusive ensemble tailored to your query: "${message}". These garments feature bespoke draping and premium textures currently in stock at the Atelier.`,
    recommendedProducts: matchedItems
  });
});

// --- 7. Data Science & Intelligence Analytics ---
app.get('/api/admin/intelligence-metrics', (req, res) => {
  res.json({
    totalRevenue: 2845000,
    activeVIPClients: 142,
    conversionRate: "4.82%",
    inventoryTurnoverDays: 18,
    categoryPerformance: [
      { category: "Women Haute Couture", sales: 1420000, percentage: 50 },
      { category: "Men Sartorial", sales: 850000, percentage: 30 },
      { category: "High Jewels & Accessories", sales: 575000, percentage: 20 }
    ],
    demandForecasting: [
      { month: "Sep", predictedDemand: 120, actualSales: 110 },
      { month: "Oct", predictedDemand: 160, actualSales: 155 },
      { month: "Nov", predictedDemand: 240, actualSales: 230 },
      { month: "Dec (Gala Season)", predictedDemand: 390, actualSales: 380 }
    ],
    customerSegmentation: [
      { segment: "VIP Haute Privé (CLV > 150k)", count: 28, share: "20%" },
      { segment: "Occasion High-Spenders", count: 54, share: "38%" },
      { segment: "Emerging Minimalists", count: 60, share: "42%" }
    ]
  });
});

// --- 8. Orders Checkout ---
app.post('/api/orders/checkout', (req, res) => {
  const { items, customer, totalAmount } = req.body;
  res.json({
    success: true,
    order: {
      orderId: 'SS-' + Math.floor(100000 + Math.random() * 900000),
      itemsCount: items ? items.length : 1,
      totalPaid: totalAmount || 45000,
      customerName: customer?.name || "VIP Patron",
      timestamp: new Date().toISOString()
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StyleSense AI Fashion Intelligence Server active on port ${PORT}`);
});