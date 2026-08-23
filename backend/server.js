import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY || ''
});

// ==========================================
// LUXURY PRODUCT CATALOG (60 ITEMS)
// ==========================================
const products = [
  // --- WOMEN'S COLLECTION (20) ---
  { id: "w1", name: "Silk Satin Slip Gown", price: 34500, category: "women", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", description: "Handcrafted pure mulberry silk gown tailored for high-end evening galas.", badge: "Bestseller" },
  { id: "w2", name: "Tailored Linen Blazer", price: 28900, category: "women", image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop", description: "Structured double-breasted linen blazer in neutral sand tone.", badge: "Atelier" },
  { id: "w3", name: "Handwoven Silk Batik Saree", price: 46000, category: "women", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", description: "Contemporary artisanal Sri Lankan batik saree with gold filament borders.", badge: "Haute Couture" },
  { id: "w4", name: "Pleated Organza Midi Dress", price: 31200, category: "women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", description: "Featherlight sheer organza overlay with delicate knife pleating.", badge: "New Arrival" },
  { id: "w5", name: "Cashmere Long Trench Coat", price: 54000, category: "women", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop", description: "Minimalist belted long trench coat crafted from ultra-soft brushed cashmere.", badge: "Limited Edition" },
  { id: "w6", name: "Luxe Cotton Puff Blouse", price: 18500, category: "women", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop", description: "Crisp organic cotton blouse with exaggerated sculptural sleeves.", badge: "Essential" },
  { id: "w7", name: "High-Waist Fluid Trousers", price: 22000, category: "women", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", description: "Wide-leg fluid silhouette with minimalist front pleats and tailored waistband.", badge: "Trending" },
  { id: "w8", name: "Emerald Velvet Wrap Dress", price: 39500, category: "women", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop", description: "Rich emerald velvet wrap dress designed for intimate evening soirees.", badge: "Curated" },
  { id: "w9", name: "Champagne Metallic Jacquard Dress", price: 42000, category: "women", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop", description: "Woven metallic jacquard cocktail dress with subtle floral relief.", badge: "Luxury" },
  { id: "w10", name: "Asymmetrical Draped Crepe Gown", price: 37500, category: "women", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", description: "One-shoulder fluid silhouette in heavy matte crepe.", badge: "Haute Couture" },
  { id: "w11", name: "Minimalist Linen Utility Jumpsuit", price: 26500, category: "women", image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop", description: "Pure breathable linen jumpsuit with tortoiseshell buckle and patch pockets.", badge: "Essential" },
  { id: "w12", name: "French Lace Tiered Maxi", price: 48000, category: "women", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", description: "Intricate floral French lace tiers with a soft champagne lining.", badge: "Limited Edition" },
  { id: "w13", name: "Charcoal Wool Oversized Blazer", price: 33000, category: "women", image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=800&auto=format&fit=crop", description: "Structured fine wool blend blazer with relaxed dropped shoulders.", badge: "Trending" },
  { id: "w14", name: "Silk Charmeuse Backless Top", price: 19800, category: "women", image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=800&auto=format&fit=crop", description: "High-neck fluid silk halter top with cross-back tie details.", badge: "New Arrival" },
  { id: "w15", name: "Hand-Pleated Georgette Skirt", price: 24500, category: "women", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop", description: "Voluminous accordion pleated skirt in neutral sand tone.", badge: "Atelier" },
  { id: "w16", name: "Midnight Silk Kimono Robe Dress", price: 36000, category: "women", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop", description: "Versatile silk wrap robe with wide sleeves and sash belt.", badge: "Curated" },
  { id: "w17", name: "Ribbed Merino Knit Co-ord", price: 29000, category: "women", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop", description: "Two-piece ribbed knit ensemble with crop sweater and matching midi skirt.", badge: "Bestseller" },
  { id: "w18", name: "Sculptural Peplum Top", price: 21500, category: "women", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop", description: "Architectural structured peplum top in rich matte faille.", badge: "Haute Couture" },
  { id: "w19", name: "Artisanal Embroidered Kaftan", price: 41000, category: "women", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", description: "Flowing pure linen kaftan with hand-stitched tonal embroidery.", badge: "Artisanal" },
  { id: "w20", name: "Tailored Linen Cigarette Pants", price: 20500, category: "women", image: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=800&auto=format&fit=crop", description: "Ankle-length slim-cut trousers crafted from premium washed linen.", badge: "Essential" },

  // --- MEN'S COLLECTION (20) ---
  { id: "m1", name: "Double-Breasted Wool Blazer", price: 38500, category: "men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", description: "Peak lapel double-breasted blazer in fine Super 120s charcoal wool.", badge: "Bestseller" },
  { id: "m2", name: "Mandarin Collar Linen Shirt", price: 16500, category: "men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop", description: "Pure breathable coastal linen shirt tailored with mother-of-pearl buttons.", badge: "Essential" },
  { id: "m3", name: "Artisanal Handloom Sarong & Kurta Set", price: 29500, category: "men", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", description: "Raw textured handloom silk-cotton ensemble with tonal geometric weave.", badge: "Haute Couture" },
  { id: "m4", name: "Pleated Relaxed Trouser", price: 22500, category: "men", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop", description: "High-waist double-pleated relaxed trousers in Italian cotton gabardine.", badge: "Trending" },
  { id: "m5", name: "Suede Safari Overshirt", price: 44000, category: "men", image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=800&auto=format&fit=crop", description: "Ultra-supple goat suede overshirt featuring four utility bellows pockets.", badge: "Luxury" },
  { id: "m6", name: "Cashmere Crewneck Sweater", price: 32000, category: "men", image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop", description: "Grade-A Mongolian cashmere knit in oatmeal beige hue.", badge: "Atelier" },
  { id: "m7", name: "Monochrome Tailored Trench", price: 52000, category: "men", image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop", description: "Water-repellent technical cotton belted overcoat with storm flap.", badge: "Limited Edition" },
  { id: "m8", name: "Knitted Silk Polo Shirt", price: 21000, category: "men", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop", description: "Fine-gauge silk-cotton blend knit polo with ribbed open collar.", badge: "New Arrival" },
  { id: "m9", name: "Classic Tuxedo Jacket", price: 48000, category: "men", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop", description: "Midnight navy wool tuxedo with contrast grosgrain shawl lapel.", badge: "Haute Couture" },
  { id: "m10", name: "Washed Denim Chore Jacket", price: 26000, category: "men", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop", description: "Japanese selvedge denim utility worker jacket with horn buttons.", badge: "Essential" },
  { id: "m11", name: "Tapered Cotton Chinos", price: 19500, category: "men", image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop", description: "Garment-dyed stretch organic cotton chinos with internal drawstring.", badge: "Essential" },
  { id: "m12", name: "Resort Open-Collar Camp Shirt", price: 17500, category: "men", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop", description: "Relaxed tropical rayon-linen camp collar shirt in ecru.", badge: "Bestseller" },
  { id: "m13", name: "Merino Wool Turtleneck", price: 27000, category: "men", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop", description: "Ultra-fine ribbed turtleneck in rich jet black hue.", badge: "Atelier" },
  { id: "m14", name: "Houndstooth Overcoat", price: 56000, category: "men", image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop", description: "Heritage micro-houndstooth heavy wool single-breasted coat.", badge: "Limited Edition" },
  { id: "m15", name: "Structured Minimalist Bomber", price: 36000, category: "men", image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop", description: "Clean satin-finish tech fabric bomber jacket with matte gunmetal zippers.", badge: "Trending" },
  { id: "m16", name: "Linen Gurkha Trousers", price: 24000, category: "men", image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop", description: "Classic military-inspired Gurkha waistband with double brass buckles.", badge: "Curated" },
  { id: "m17", name: "Silk-Blend Nehru Vest", price: 23000, category: "men", image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop", description: "Structured stand-collar waistcoat in textured raw silk.", badge: "Artisanal" },
  { id: "m18", name: "Brushed Flannel Overshirt", price: 22000, category: "men", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop", description: "Heavyweight brushed cotton twill overshirt in stone beige.", badge: "Essential" },
  { id: "m19", name: "Tailored Drawstring Linen Pants", price: 21000, category: "men", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop", description: "Effortless casual luxury linen pants with elasticated waistband.", badge: "Bestseller" },
  { id: "m20", name: "Pinstripe Peak Lapel Suit Jacket", price: 46000, category: "men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", description: "Subtle chalk stripe wool blazer with sculpted waist and roped shoulders.", badge: "Haute Couture" },

  // --- ACCESSORIES COLLECTION (20) ---
  { id: "a1", name: "Artisanal Leather Tote", price: 26500, category: "accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Full-grain vegetable-tanned calfskin tote with raw edge finish.", badge: "Bestseller" },
  { id: "a2", name: "Architectural Acetate Sunglasses", price: 15500, category: "accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", description: "Beveled hand-polished Japanese acetate frames with UV400 lenses.", badge: "Trending" },
  { id: "a3", name: "Gold Filament Silk Scarf", price: 14000, category: "accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop", description: "Hand-rolled mulberry silk twill scarf with 18k gold foil block print.", badge: "Haute Couture" },
  { id: "a4", name: "Minimalist Leather Cardholder", price: 8500, category: "accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", description: "Ultra-slim textured saffiano leather card sleeve with gold debossed logo.", badge: "Essential" },
  { id: "a5", name: "Sculptural Brass Cuff Bangle", price: 12500, category: "accessories", image: "https://images.unsplash.com/photo-1611591475155-42e9fce67ff4?q=80&w=800&auto=format&fit=crop", description: "Hand-hammered organic molten shape cuff coated in 18k champagne gold.", badge: "Artisanal" },
  { id: "a6", name: "Woven Raffia Sun Hat", price: 16000, category: "accessories", image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=800&auto=format&fit=crop", description: "Wide-brim hat woven from sustainable Madagascar raffia with grossgrain ribbon.", badge: "New Arrival" },
  { id: "a7", name: "Handcrafted Ceylon Sapphire Pendant", price: 58000, category: "accessories", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", description: "Natural untreated Ceylon blue sapphire set in an 18k solid gold bezel.", badge: "Haute Couture" },
  { id: "a8", name: "Full-Grain Leather Dress Belt", price: 13500, category: "accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop", description: "Sleek tapered bridle leather belt with brushed palladium pin buckle.", badge: "Essential" },
  { id: "a9", name: "Cashmere Fringed Shawl", price: 24000, category: "accessories", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop", description: "Feather-soft pure cashmere wrap with delicate hand-twisted fringes.", badge: "Luxury" },
  { id: "a10", name: "Structured Mini Crossbody Bag", price: 31000, category: "accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", description: "Boxy structured leather crossbody with custom magnetic clasp.", badge: "Trending" },
  { id: "a11", name: "Baroque Freshwater Pearl Drop Earrings", price: 17500, category: "accessories", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", description: "Naturally irregular lustrous baroque pearls suspended from gold vermeil hoops.", badge: "Atelier" },
  { id: "a12", name: "Minimalist Automatic Timepiece", price: 62000, category: "accessories", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop", description: "Bauhaus-inspired sapphire crystal watch with Horween leather strap.", badge: "Limited Edition" },
  { id: "a13", name: "Woven Leather Weekender Duffel", price: 49000, category: "accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", description: "Intrecciato hand-woven calf leather travel bag with removable shoulder strap.", badge: "Luxury" },
  { id: "a14", name: "Square Titanium Aviator Sunglasses", price: 18000, category: "accessories", image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop", description: "Ultra-lightweight Japanese beta-titanium frames with polarized green tint.", badge: "New Arrival" },
  { id: "a15", name: "Artisanal Horn Hair Pin", price: 6500, category: "accessories", image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?q=80&w=800&auto=format&fit=crop", description: "Ethically reclaimed polished horn hair slide with geometric curve.", badge: "Artisanal" },
  { id: "a16", name: "Solid Sterling Silver Signet Ring", price: 14500, category: "accessories", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", description: "Heavy 925 sterling silver ring with brushed satin top plate.", badge: "Essential" },
  { id: "a17", name: "Nappa Leather Gloves", price: 16500, category: "accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop", description: "Buttery lambskin leather gloves lined with 100% pure silk.", badge: "Atelier" },
  { id: "a18", name: "Minimalist Brass Cardcase", price: 9500, category: "accessories", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop", description: "Mirror-polished solid raw brass pocket cardholder that patinas over time.", badge: "Curated" },
  { id: "a19", name: "Leather Passport & Travel Wallet", price: 12000, category: "accessories", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", description: "Vegetable-tanned leather sleeve designed for passport, boarding pass and cards.", badge: "Essential" },
  { id: "a20", name: "Silk-Jacquard Pocket Square", price: 7500, category: "accessories", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=800&auto=format&fit=crop", description: "Hand-rolled edge Italian silk pocket square featuring subtle geometric motifs.", badge: "Bestseller" }
];

// Mock Users Database
let users = [
  { id: 1, name: "Theekshana", email: "theekshana@stylesense.com", password: "password123" }
];

// Mock Orders Database
let orders = [];

// ==========================================
// API ROUTES
// ==========================================

// 1. Get Products (With Category & Search Filter)
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(result);
});

// 2. Get Single Product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// 3. User Authentication Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists with this email" });
  }
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ message: "Registration successful", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
});

// 4. Order & Checkout Simulation Route
app.post('/api/orders/checkout', (req, res) => {
  const { items, customer, totalAmount } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  const newOrder = {
    orderId: "SS-" + Math.floor(100000 + Math.random() * 900000),
    items,
    customer,
    totalAmount,
    status: "Confirmed",
    timestamp: new Date().toISOString()
  };
  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully", order: newOrder });
});

// 5. AI Stylist (Gemini Integration)
app.post('/api/stylist/recommend', async (req, res) => {
  try {
    const { occasion, stylePreference, gender, budget } = req.body;

    const prompt = `You are a world-class luxury fashion stylist at 'StyleSense Haute Couture Atelier'.
A client is requesting outfit recommendations with the following preferences:
- Occasion: ${occasion || 'High-end Evening Gala'}
- Style Aesthetic: ${stylePreference || 'Minimalist Luxury'}
- Gender / Fit: ${gender || 'Women'}
- Budget Level: ${budget || 'High-End'}

Available inventory items for reference:
${products.map(p => `- ${p.name} (${p.category}, LKR ${p.price})`).join('\n')}

Provide an exquisite styling recommendation formatted in structured JSON:
{
  "curatedLookTitle": "Title of the look",
  "stylingAdvice": "2-3 sentences of elevated fashion advice",
  "recommendedPieces": ["List of 2-3 matched pieces from the inventory"],
  "colorPalette": ["3 complementary color tones"],
  "accessorizingTip": "Tip for footwear/jewelry/perfume"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const recommendation = JSON.parse(response.text);
    res.json(recommendation);
  } catch (error) {
    console.error("AI Stylist error:", error);
    // Fallback recommendation
    res.json({
      curatedLookTitle: "Timeless Minimalist Elegance",
      stylingAdvice: "Pair fluid silk fabrics with structured outerwear to create an effortless luxury presence.",
      recommendedPieces: ["Silk Satin Slip Gown", "Tailored Linen Blazer", "Artisanal Leather Tote"],
      colorPalette: ["Champagne Gold", "Oatmeal Beige", "Charcoal Black"],
      accessorizingTip: "Pair with delicate 18k solid gold jewelry and minimalist ankle-strap heels."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StyleSense Backend Atelier Server running on port ${PORT}`);
});