import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModel from '../components/QuickViewModel';
import CompleteLookModal from '../components/CompleteLookModal';
import VirtualTryOnModal from '../components/VirtualTryOnModal';
import { Search } from 'lucide-react';

const catalog60 = [
  // ================= WOMEN'S ATELIER (20 Items) =================
  { id: 1, name: "Silk Satin Slip Gown", category: "women", price: 28500, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", description: "Floor-length pure mulberry silk gown in champagne beige.", badge: "Haute Piece", color: "Champagne" },
  { id: 2, name: "Tailored Linen Blazer", category: "women", price: 34900, image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop", description: "Structured double-breasted pure flax linen blazer in warm sand.", badge: "Bespoke Cut", color: "Sand" },
  { id: 3, name: "Handwoven Silk Batik Saree", category: "women", price: 46000, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop", description: "Artisanal Ceylon batik with architectural geometric patterns.", badge: "Heritage Exclusive", color: "Indigo" },
  { id: 4, name: "Pleated Organza Midi Dress", category: "women", price: 32000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", description: "Airy micro-pleated midi silhouette with sheer sleeves.", badge: "New Silhouette", color: "Ivory" },
  { id: 5, name: "Velvet Corset Evening Dress", category: "women", price: 42500, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop", description: "Structured boned bodice with midnight black plush Italian velvet.", badge: "Evening Gala", color: "Black" },
  { id: 6, name: "Cashmere Knit Cardigan", category: "women", price: 29800, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop", description: "Featherlight Grade-A Mongolian cashmere in oat cream.", badge: "Winter Warmth", color: "Cream" },
  { id: 7, name: "Embroidered Georgette Kaftan", category: "women", price: 38000, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", description: "Gold zari hand-embroidery along neckline with fluid drape.", badge: "Resort Elite", color: "Emerald" },
  { id: 8, name: "Wide-Leg Raw Silk Trousers", category: "women", price: 24500, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", description: "High-waisted architectural cut in natural raw tussar silk.", badge: "Essential", color: "Sand" },
  { id: 9, name: "Structured Crepe Trench Coat", category: "women", price: 52000, image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop", description: "Heavyweight crepe outerwear with tortoiseshell horn buttons.", badge: "Timeless", color: "Taupe" },
  { id: 10, name: "Draped Halter Evening Jumpsuit", category: "women", price: 36500, image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop", description: "Fluid modal jersey with open back and wide palazzo legs.", badge: "Modern Chic", color: "Black" },
  { id: 11, name: "Tiered Chiffon Maxi Skirt", category: "women", price: 21000, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop", description: "Flowing multi-tier botanical printed silk chiffon.", badge: "Bohemian Luxe", color: "Sage" },
  { id: 12, name: "Minimalist Ribbed Knit Dress", category: "women", price: 26000, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", description: "Sculptural body-contouring merino wool knit silhouette.", badge: "Capsule Core", color: "Charcoal" },
  { id: 13, name: "Hand-Loomed Cotton Kurta Suit", category: "women", price: 27500, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", description: "Traditional artisanal weave with minimal threadwork accents.", badge: "Heritage", color: "Ivory" },
  { id: 14, name: "Asymmetric Satin Wrap Blouse", category: "women", price: 19500, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=800&auto=format&fit=crop", description: "Diagonal draped neckline in pearlescent heavy silk satin.", badge: "Atelier Line", color: "Pearl" },
  { id: 15, name: "Scalloped Lace Cocktail Dress", category: "women", price: 39000, image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop", description: "French Chantilly lace over muted champagne lining.", badge: "Evening", color: "Champagne" },
  { id: 16, name: "High-Waist Tailored Wool Shorts", category: "women", price: 18000, image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800&auto=format&fit=crop", description: "Crisply pressed front pleats in lightweight tropical wool.", badge: "Summer Tailor", color: "Sand" },
  { id: 17, name: "Bohemian Floral Silk Robe", category: "women", price: 31000, image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop", description: "Artisan screen-printed botanical patterns on habotai silk.", badge: "Resort Elite", color: "Multi" },
  { id: 18, name: "Off-Shoulder Ruched Mesh Top", category: "women", price: 16500, image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=800&auto=format&fit=crop", description: "Delicate gathered tulle bodice with internal corset stays.", badge: "Modern Chic", color: "Taupe" },
  { id: 19, name: "Metallic Threaded Jacquard Gown", category: "women", price: 58000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop", description: "Architectural structured jacquard with interwoven gold yarns.", badge: "Haute Piece", color: "Gold" },
  { id: 20, name: "Sculpted Peplum Silk Jacket", category: "women", price: 41000, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", description: "Cinched waist couture jacket in heavyweight duchess satin.", badge: "Bespoke Cut", color: "Black" },

  // ================= MEN'S SARTORIAL (20 Items) =================
  { id: 21, name: "Bespoke Wool-Blend Tuxedo", category: "men", price: 68000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", description: "Satin peak lapel formal tuxedo tailored with super 120s wool.", badge: "Master Cut", color: "Black" },
  { id: 22, name: "Handcrafted Linen Nehru Jacket", category: "men", price: 29500, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", description: "Mandarin collar vest in textured raw Irish flax linen.", badge: "Regal Minimal", color: "Ivory" },
  { id: 23, name: "Egyptian Cotton Sartorial Shirt", category: "men", price: 18500, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop", description: "200-ply double twisted Egyptian Giza cotton dress shirt.", badge: "Signature Daily", color: "White" },
  { id: 24, name: "Relaxed Italian Linen Shirt", category: "men", price: 16800, image: "https://images.unsplash.com/photo-1603252109303-2751441ec157?q=80&w=800&auto=format&fit=crop", description: "Camp collar breathable linen shirt for tropical high-soirees.", badge: "Riviera Luxe", color: "Sand" },
  { id: 25, name: "Single-Breasted Tweed Blazer", category: "men", price: 44000, image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800&auto=format&fit=crop", description: "Woven herringbone pure virgin wool with suede elbow accents.", badge: "Heritage", color: "Charcoal" },
  { id: 26, name: "Tailored Tapered Linen Trousers", category: "men", price: 22500, image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800&auto=format&fit=crop", description: "Side-adjuster formal trousers cut from breathable flax.", badge: "Bespoke Fit", color: "Sand" },
  { id: 27, name: "Merino Wool Fine-Gauge Polo", category: "men", price: 21000, image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop", description: "Seamless lightweight knit polo with genuine mother-of-pearl buttons.", badge: "Atelier Core", color: "Taupe" },
  { id: 28, name: "Silk-Lined Cashmere Overcoat", category: "men", price: 79000, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", description: "Full-length structured coat crafted from 100% Mongolian cashmere.", badge: "Masterpiece", color: "Camel" },
  { id: 29, name: "Mandarin Collar Silk Kurta", category: "men", price: 26500, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop", description: "Pure raw silk kurta tunic with concealed button placket.", badge: "Heritage Exclusive", color: "Indigo" },
  { id: 30, name: "Double-Breasted Pinstripe Suit", category: "men", price: 72000, image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop", description: "Savile Row inspired pinstripe tailoring in English worsted wool.", badge: "Sartorial Elite", color: "Navy" },
  { id: 31, name: "Textured Seersucker Summer Shirt", category: "men", price: 15500, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop", description: "Puckered cotton weave engineered for maximum tropical airflow.", badge: "Summer Essential", color: "Ivory" },
  { id: 32, name: "Pleated Gurkha Trousers", category: "men", price: 25000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop", description: "Double-buckle waistband with high rise in crisp heavy cotton twill.", badge: "Classic", color: "Taupe" },
  { id: 33, name: "Hand-Stitched Suede Bomber Jacket", category: "men", price: 62000, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop", description: "Velvety goat suede with ribbed knit trim and silk interior.", badge: "Luxury Outerwear", color: "Cognac" },
  { id: 34, name: "Structured Cuban Collar Overshirt", category: "men", price: 19800, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop", description: "Heavyweight basketweave cotton canvas with chest utility pockets.", badge: "Urban Tailor", color: "Olive" },
  { id: 35, name: "Superfine Cotton Poplin Tux Shirt", category: "men", price: 21500, image: "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?q=80&w=800&auto=format&fit=crop", description: "Marcella bib front with French double cuffs and stud fastening.", badge: "Black Tie", color: "White" },
  { id: 36, name: "Relaxed Linen Drawstring Pants", category: "men", price: 17500, image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop", description: "Elasticated back with internal drawstring for effortless resort wear.", badge: "Resort Line", color: "Sand" },
  { id: 37, name: "Cashmere-Silk Blend Rollneck", category: "men", price: 33000, image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop", description: "Ultra-fine gauge knit designed for elegant under-blazer layering.", badge: "Winter Luxe", color: "Charcoal" },
  { id: 38, name: "Embroidered Velvet Dinner Jacket", category: "men", price: 54000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", description: "Intricate tonal soutache embroidery on rich emerald velvet.", badge: "Gala Exclusive", color: "Emerald" },
  { id: 39, name: "Hand-Spun Khadi Cotton Shirt", category: "men", price: 14000, image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop", description: "Artisanal hand-spun organic cotton with wooden button accents.", badge: "Artisanal", color: "Ivory" },
  { id: 40, name: "Tailored Safari Travel Jacket", category: "men", price: 38500, image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop", description: "Four-pocket belted safari silhouette crafted from water-repellent linen.", badge: "Voyage", color: "Taupe" },

  // ================= HIGH JEWELS & ACCESSORIES (20 Items) =================
  { id: 41, name: "Full-Grain Leather Atelier Tote", category: "accessories", price: 39500, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Hand-burnished vegetable-tanned leather with antique brass hardware.", badge: "Craft Legacy", color: "Cognac" },
  { id: 42, name: "18K Gold Sculptural Cuff Bangle", category: "accessories", price: 54000, image: "https://images.unsplash.com/photo-1611591475161-da2da7793d59?q=80&w=800&auto=format&fit=crop", description: "Hammered finish 18k solid gold vermeil artisan statement bracelet.", badge: "Atelier Gem", color: "Gold" },
  { id: 43, name: "Ceylon Blue Sapphire Signet Ring", category: "accessories", price: 89000, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", description: "Natural unheated Ratnapura blue sapphire set in oxidized silver.", badge: "Collector High Jewel", color: "Blue" },
  { id: 44, name: "Hand-Rolled Mulberry Silk Scarf", category: "accessories", price: 14500, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop", description: "Hand-painted abstract brushwork on 16mm pure silk twill.", badge: "Art Piece", color: "Multi" },
  { id: 45, name: "Italian Calfskin Belt with Brass Buckle", category: "accessories", price: 16500, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop", description: "Hand-edge painted supple calfskin with hand-cast solid brass buckle.", badge: "Classic", color: "Cognac" },
  { id: 46, name: "Minimalist Structured Leather Clutch", category: "accessories", price: 28000, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop", description: "Magnetic frame closure envelope clutch lined in suede.", badge: "Evening", color: "Black" },
  { id: 47, name: "Natural Baroque Pearl Drop Earrings", category: "accessories", price: 32000, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", description: "Unique organic freshwater pearls suspended on 14k gold vermeil wire.", badge: "One of a Kind", color: "Pearl" },
  { id: 48, name: "Handwoven Panama Straw Fedora", category: "accessories", price: 18500, image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=800&auto=format&fit=crop", description: "Grade-8 Ecuadorian Toquilla straw with grosgrain band.", badge: "Summer", color: "Ivory" },
  { id: 49, name: "Artisanal Ceylon Moonstone Pendant", category: "accessories", price: 42000, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", description: "Meetiyagoda blue-sheen moonstone in sculptural 18k bezel setting.", badge: "Ceylon Exclusive", color: "Blue" },
  { id: 50, name: "Braided Leather Weekender Duffel", category: "accessories", price: 65000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", description: "Spacious travel holdall with woven leather front and reinforced base.", badge: "Travel Luxe", color: "Cognac" },
  { id: 51, name: "Solid Brass Geometric Cufflinks", category: "accessories", price: 12500, image: "https://images.unsplash.com/photo-1589782183669-e9b46ec60b0e?q=80&w=800&auto=format&fit=crop", description: "Machined hexagonal cufflinks with matte brushed finish.", badge: "Black Tie", color: "Gold" },
  { id: 52, name: "Polarized Tortoiseshell Sunglasses", category: "accessories", price: 23000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", description: "Handcrafted Italian acetate frames with category-3 UV lenses.", badge: "Eyewear", color: "Taupe" },
  { id: 53, name: "Hand-Knitted Cashmere Beanie", category: "accessories", price: 11000, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop", description: "Ribbed pure Mongolian cashmere with seamless crown finish.", badge: "Winter Warmth", color: "Cream" },
  { id: 54, name: "Embossed Croc Leather Cardholder", category: "accessories", price: 9500, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", description: "Slim profile with 6 card slots and central notes pocket.", badge: "Daily Luxe", color: "Black" },
  { id: 55, name: "Raw Silk Pocket Square Set", category: "accessories", price: 8500, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop", description: "Trio of hand-rolled edge pocket squares in versatile neutral hues.", badge: "Sartorial", color: "Multi" },
  { id: 56, name: "Star Ruby Cabochon Cocktail Ring", category: "accessories", price: 95000, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop", description: "Rare 6-ray Ceylon star ruby mounted in 18k yellow gold setting.", badge: "Collector High Jewel", color: "Multi" },
  { id: 57, name: "Handcrafted Leather Watch Folio", category: "accessories", price: 24000, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop", description: "Three-watch travel roll lined in soft micro-suede.", badge: "Horology", color: "Cognac" },
  { id: 58, name: "Hammered Silver Choker Necklace", category: "accessories", price: 36000, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", description: "925 sterling silver malleable neck collar with artisanal texture.", badge: "Artisan Gem", color: "White" },
  { id: 59, name: "Silk Velvet Pouch Evening Bag", category: "accessories", price: 22000, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop", description: "Drawstring pouch in emerald velvet with gold tassel details.", badge: "Evening Gala", color: "Emerald" },
  { id: 60, name: "Ceylon Padparadscha Sapphire Brooch", category: "accessories", price: 120000, image: "https://images.unsplash.com/photo-1611591475161-da2da7793d59?q=80&w=800&auto=format&fit=crop", description: "Bespoke lotus-inspired brooch featuring unheated sunrise sapphire.", badge: "Haute Masterpiece", color: "Gold" }
];

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [completeLookId, setCompleteLookId] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return catalog60.filter(item => {
      const matchCat = currentCategory === 'all' || item.category.toLowerCase() === currentCategory.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [currentCategory, searchQuery]);

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
            Atelier Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-tight text-stone-900">
            {currentCategory === 'all' ? 'Complete Collection' : `${currentCategory.toUpperCase()}'S ATELIER`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-sans">
            Showing {filteredProducts.length} bespoke pieces
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {['all', 'women', 'men', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams(cat === 'all' ? {} : { cat })}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all ${
                currentCategory === cat
                  ? 'bg-stone-900 text-stone-100 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search garments, textures, descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 text-xs font-sans text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            product={product} 
            onAddToCart={onAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onTryOn={(p) => setTryOnProduct(p)}
            onCompleteLook={(id) => setCompleteLookId(id)}
          />
        ))}
      </div>

      {/* Modals */}
      <QuickViewModel
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />

      <CompleteLookModal
        isOpen={Boolean(completeLookId)}
        productId={completeLookId}
        onClose={() => setCompleteLookId(null)}
        onAddToCart={onAddToCart}
      />

      <VirtualTryOnModal
        isOpen={Boolean(tryOnProduct)}
        product={tryOnProduct}
        onClose={() => setTryOnProduct(null)}
        onAddToCart={onAddToCart}
      />

    </div>
  );
};

export default Shop;