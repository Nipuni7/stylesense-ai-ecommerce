export const DEPARTMENTS = [
  {
    id: 'women',
    name: 'Women Atelier',
    tagline: 'Haute Couture Silk Dresses, Chic Tops & Formal Silhouettes',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
    itemCount: '520+ Designer Items'
  },
  {
    id: 'men',
    name: 'Men Collection',
    tagline: 'Tailored Suits, Oxford Shirts & Urban Streetwear',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
    itemCount: '340+ Modern Essentials'
  },
  {
    id: 'shoes',
    name: 'Luxury Shoes & Footwear',
    tagline: 'Italian Leather Boots, Cloud Foam Sneakers & Strappy Heels',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&auto=format&fit=crop&q=80',
    itemCount: '190+ Exclusive Pairs'
  },
  {
    id: 'handbags',
    name: 'Designer Handbags',
    tagline: 'Quilted Lambskin Totes, Crossbody Bags & Evening Clutches',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&auto=format&fit=crop&q=80',
    itemCount: '160+ Leather Pieces'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Skincare',
    tagline: 'Botanical Radiance Glow Serums, Velvet Lipsticks & Parfums',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
    itemCount: '210+ Clean Formulas'
  },
  {
    id: 'kids',
    name: 'Kids Royal Atelier',
    tagline: 'Organic Cotton Tees, Princess Frocks & Active Sport Sets',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&auto=format&fit=crop&q=80',
    itemCount: '180+ Playful Pieces'
  }
];

export const SUB_CATEGORIES = {
  women: ['All Women', 'Evening Dresses', 'T-Shirts & Tops', 'Blazers & Outerwear', 'Skirts & Pants', 'Cocktail Gowns'],
  men: ['All Men', 'T-Shirts & Polos', 'Shirts', 'Suits & Blazers', 'Jackets & Coats', 'Shorts & Trousers'],
  shoes: ['All Shoes', 'Sneakers', 'Leather Boots', 'Strappy Heels', 'Formal Loafers'],
  handbags: ['All Bags', 'Crossbody Bags', 'Tote Bags', 'Evening Clutches', 'Shoulder Bags'],
  cosmetics: ['All Cosmetics', 'Skincare Serums', 'Lipsticks & Lips', 'Luxury Perfumes', 'Setting Glow'],
  kids: ['All Kids', 'Kids T-Shirts', 'Frocks & Dresses', 'Active Shorts', 'Sports Jerseys']
};

export const PRODUCTS = [
  // ===================== WOMEN =====================
  {
    id: 'w-1',
    name: 'Silk Blend Emerald Gala Maxi Dress',
    department: 'women',
    subCategory: 'Evening Dresses',
    price: 145.00,
    originalPrice: 180.00,
    rating: 4.9,
    reviewsCount: 214,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    description: 'Flowing pure emerald silk blend tailored for evening galas and celebrations.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald Green', 'Midnight Blue']
  },
  {
    id: 'w-2',
    name: 'Floral Chiffon Summer Sundress',
    department: 'women',
    subCategory: 'Evening Dresses',
    price: 82.00,
    originalPrice: 99.00,
    rating: 4.8,
    reviewsCount: 135,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    description: 'Breezy botanical print chiffon sundress with adjustable ribbon waist tie.',
    sizes: ['S', 'M', 'L'],
    colors: ['Pastel Rose', 'Vintage Cream']
  },
  {
    id: 'w-3',
    name: 'Structured Double-Breasted Power Blazer',
    department: 'women',
    subCategory: 'Blazers & Outerwear',
    price: 165.00,
    originalPrice: 210.00,
    rating: 4.9,
    reviewsCount: 168,
    badge: 'AI Top Pick',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop&q=80',
    description: 'Sharp tailoring with peak lapels, sculpted shoulders, and custom hardware.',
    sizes: ['S', 'M', 'L'],
    colors: ['Charcoal Black', 'Cream Ivory']
  },
  {
    id: 'w-4',
    name: 'Minimalist Relaxed Fit Organic Linen Tee',
    department: 'women',
    subCategory: 'T-Shirts & Tops',
    price: 42.00,
    rating: 4.7,
    reviewsCount: 84,
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-breathable 100% organic linen everyday crewneck silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Off White', 'Sage Green']
  },
  {
    id: 'w-5',
    name: 'High-Waist Drape Pleated Trousers',
    department: 'women',
    subCategory: 'Skirts & Pants',
    price: 95.00,
    rating: 4.8,
    reviewsCount: 92,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&auto=format&fit=crop&q=80',
    description: 'Fluid tailoring engineered with deep front pleats and side slash pockets.',
    sizes: ['S', 'M', 'L'],
    colors: ['Oatmeal Tan', 'Obsidian']
  },

  // ===================== MEN =====================
  {
    id: 'm-1',
    name: 'Heavyweight Washed Vintage Graphic Tee',
    department: 'men',
    subCategory: 'T-Shirts & Polos',
    price: 48.00,
    originalPrice: 60.00,
    rating: 4.9,
    reviewsCount: 145,
    badge: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    description: '280 GSM heavyweight washed cotton tee featuring minimal typographic print.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Black', 'Olive Moss']
  },
  {
    id: 'm-2',
    name: 'Tailored Oxford Cotton Button-Down',
    department: 'men',
    subCategory: 'Shirts',
    price: 72.00,
    originalPrice: 89.00,
    rating: 4.9,
    reviewsCount: 160,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
    description: 'Pre-shrunk Egyptian Oxford yarn woven into a timeless tailored shirt.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Sky Blue', 'Crisp White']
  },
  {
    id: 'm-3',
    name: 'Modern Utility Flight Bomber Jacket',
    department: 'men',
    subCategory: 'Jackets & Coats',
    price: 155.00,
    originalPrice: 190.00,
    rating: 5.0,
    reviewsCount: 110,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80',
    description: 'Weather-resistant nylon blend jacket with ergonomic zip pockets and thermal lining.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Forest Khaki', 'Jet Black']
  },
  {
    id: 'm-4',
    name: 'Tailored Two-Piece Wool Suit',
    department: 'men',
    subCategory: 'Suits & Blazers',
    price: 295.00,
    originalPrice: 380.00,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Formal Elite',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    description: 'Super 120s fine wool tailored with half-canvas construction for boardroom poise.',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Midnight Charcoal', 'Navy Blue']
  },

  // ===================== SHOES =====================
  {
    id: 's-1',
    name: 'AeroCushion Cloud Foam Sneakers',
    department: 'shoes',
    subCategory: 'Sneakers',
    price: 115.00,
    originalPrice: 140.00,
    rating: 4.9,
    reviewsCount: 260,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
    description: 'Featherlight cushioned sole with breathable engineered knit upper.',
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: ['Pure White', 'Stealth Gray']
  },
  {
    id: 's-2',
    name: 'Italian Handcrafted Chelsea Leather Boots',
    department: 'shoes',
    subCategory: 'Leather Boots',
    price: 195.00,
    originalPrice: 240.00,
    rating: 5.0,
    reviewsCount: 120,
    badge: 'Artisan Crafted',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80',
    description: 'Full-grain calfskin leather with Goodyear welted durability and elastic gussets.',
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43'],
    colors: ['Cognac Tan', 'Onyx Black']
  },
  {
    id: 's-3',
    name: 'Strappy Minimalist Block Heels',
    department: 'shoes',
    subCategory: 'Strappy Heels',
    price: 88.00,
    rating: 4.8,
    reviewsCount: 74,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
    description: 'Cushioned 2.5-inch block heel sandals with refined square toe construction.',
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    colors: ['Nude Blush', 'Black']
  },

  // ===================== HANDBAGS =====================
  {
    id: 'hb-1',
    name: 'Quilted Lambskin Chain Crossbody Bag',
    department: 'handbags',
    subCategory: 'Crossbody Bags',
    price: 240.00,
    originalPrice: 310.00,
    rating: 5.0,
    reviewsCount: 142,
    badge: 'Iconic Pick',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    description: 'Diamond quilted lambskin with electroplated metal hardware and turn-lock clasp.',
    sizes: ['Medium 26cm'],
    colors: ['Noir Black', 'Ivory Cream']
  },
  {
    id: 'hb-2',
    name: 'Sculpted Minimalist Leather Tote',
    department: 'handbags',
    subCategory: 'Tote Bags',
    price: 265.00,
    rating: 4.9,
    reviewsCount: 95,
    badge: 'Designer Pick',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
    description: 'Full-grain structured tote with removable pouch and suede interior lining.',
    sizes: ['Large 38cm'],
    colors: ['Caramel Brown', 'Charcoal']
  },

  // ===================== COSMETICS =====================
  {
    id: 'c-1',
    name: 'Botanical Radiance Glow 24K Serum',
    department: 'cosmetics',
    subCategory: 'Skincare Serums',
    price: 58.00,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 230,
    badge: 'AI Top Pick',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    description: 'Quad-action Hyaluronic acid and Niacinamide formula for dewy luminous glass skin.',
    sizes: ['30ml', '50ml'],
    colors: ['Radiant Dew']
  },
  {
    id: 'c-2',
    name: 'Velvet Matte Long-Wear Lipstick',
    department: 'cosmetics',
    subCategory: 'Lipsticks & Lips',
    price: 29.00,
    rating: 4.8,
    reviewsCount: 118,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
    description: 'Hydrating matte formulation enriched with organic argan oil and Vitamin E.',
    sizes: ['3.8g'],
    colors: ['Crimson Velvet', 'Nude Rose', 'Berry Mauve']
  },

  // ===================== KIDS =====================
  {
    id: 'k-1',
    name: 'Organic Cotton Happy Dino Tee',
    department: 'kids',
    subCategory: 'Kids T-Shirts',
    price: 26.00,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Eco Gentle',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
    description: 'Super-soft combed organic cotton crafted for active playtime and delicate skin.',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Sunshine Yellow', 'Mint']
  },
  {
    id: 'k-2',
    name: 'Pastel Floral Princess Frock',
    department: 'kids',
    subCategory: 'Frocks & Dresses',
    price: 39.00,
    rating: 4.9,
    reviewsCount: 65,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80',
    description: 'Tiered cotton dress with delicate lace trims and gentle breathable inner lining.',
    sizes: ['2-3Y', '4-5Y', '6-7Y'],
    colors: ['Pastel Rose', 'Ivory']
  }
];