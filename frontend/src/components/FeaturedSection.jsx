import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import QuickViewModel from './QuickViewModel';
import { Sparkles, ArrowRight } from 'lucide-react';

const categories = [
  {
    title: "Women's Atelier",
    tagline: "Haute Silhouettes & Mulberry Silks",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    link: "/shop?cat=women",
    count: "20 Pieces"
  },
  {
    title: "Men's Sartorial",
    tagline: "Bespoke Linens & Super 120s Tailoring",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    link: "/shop?cat=men",
    count: "20 Pieces"
  },
  {
    title: "High Jewels & Accents",
    tagline: "Ceylon Sapphires & Full-Grain Leathers",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    link: "/shop?cat=accessories",
    count: "20 Pieces"
  }
];

// Fallback items for home preview
const featuredItems = [
  { id: 1, name: "Silk Satin Slip Gown", category: "women", price: 28500, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", description: "Floor-length pure mulberry silk gown in champagne beige.", badge: "Haute Piece", color: "Champagne" },
  { id: 2, name: "Tailored Linen Blazer", category: "women", price: 34900, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop", description: "Structured double-breasted pure flax linen blazer in warm sand.", badge: "Bespoke Cut", color: "Sand" },
  { id: 21, name: "Bespoke Wool-Blend Tuxedo", category: "men", price: 68000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", description: "Satin peak lapel formal tuxedo tailored with super 120s wool.", badge: "Master Cut", color: "Black" },
  { id: 41, name: "Full-Grain Leather Atelier Tote", category: "accessories", price: 39500, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Hand-burnished vegetable-tanned leather with antique brass hardware.", badge: "Craft Legacy", color: "Cognac" }
];

const FeaturedSection = ({ onAddToCart }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-20">
      
      {/* 1. Main 3 Curated Category Universe Cards */}
      <div className="space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
            Curated Universes
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif uppercase tracking-tight text-stone-900">
            Explore The Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative h-[440px] overflow-hidden bg-stone-900 border border-stone-200 block shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-stone-300 font-mono">
                  {cat.count}
                </span>
                <h3 className="text-2xl font-serif text-white tracking-wide">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans line-clamp-1">
                  {cat.tagline}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-100 font-semibold group-hover:translate-x-1.5 transition-transform">
                  <span>Enter Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2. Featured Highlights Grid */}
      <div className="space-y-8 pt-8 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-500 text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              <span>Atelier Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight text-stone-900">
              Signature Creations
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-900 font-semibold hover:opacity-70 transition-opacity"
          >
            <span>View All 60 Catalog Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModel
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />

    </section>
  );
};

export default FeaturedSection;