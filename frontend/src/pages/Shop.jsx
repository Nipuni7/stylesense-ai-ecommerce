import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModel from '../components/QuickViewModel';
import CompleteLookModal from '../components/CompleteLookModal';
import VirtualTryOnModal from '../components/VirtualTryOnModal';
import { Search } from 'lucide-react';

const BACKEND_URL = 'https://stylesense-ai-ecommerce.vercel.app';

// Fallback safety catalog incase backend fetch fails or is slow
const fallbackCatalog = [
  { id: "w1", name: "Silk Satin Slip Dress", category: "women", price: 34500, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop", description: "Pure mulberry silk bias-cut slip dress featuring an open back and delicate straps." },
  { id: "w2", name: "Structured Wool Blazer", category: "women", price: 48000, image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop", description: "Tailored double-breasted blazer cut from Italian virgin wool with horn buttons." },
  { id: "w3", name: "Pleated Midi Skirt", category: "women", price: 26500, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop", description: "High-waisted accordion pleated midi skirt in metallic champagne luster fabric." },
  { id: "m1", name: "Italian Wool Tailored Suit", category: "men", price: 98000, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", description: "Bespoke-feel two-piece suit tailored from Super 130s Italian wool." },
  { id: "m2", name: "Cashmere Turtleneck Sweater", category: "men", price: 36000, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", description: "Ultra-fine Grade-A Mongolian cashmere rollneck sweater in relaxed fit." },
  { id: "a1", name: "Signature Leather Tote", category: "accessories", price: 54000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Handcrafted full-grain Italian leather tote with gold-tone hardware." },
  { id: "a4", name: "Baroque Freshwater Pearl Torque", category: "accessories", price: 28500, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop", description: "Organic, uncultured baroque pearl anchored on an 18k gold-vermeil collar." }
];

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products, setProducts] = useState(fallbackCatalog);
  const [loading, setLoading] = useState(true);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [completeLookId, setCompleteLookId] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  // Fetch products from Live Database API with Fallback
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products, using fallback catalog:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const itemCat = (item.category || '').toLowerCase().trim();
      const targetCat = currentCategory.toLowerCase().trim();

      const matchCat = targetCat === 'all' || itemCat === targetCat || 
                       (targetCat === 'women' && itemCat.includes('women')) ||
                       (targetCat === 'men' && itemCat.includes('men')) ||
                       (targetCat === 'accessories' && itemCat.includes('accessor'));

      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, currentCategory, searchQuery]);

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
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-stone-500 text-xs font-sans">
          No bespoke garments found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id || product.id}
              product={product} 
              onAddToCart={onAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onTryOn={(p) => setTryOnProduct(p)}
              onCompleteLook={(id) => setCompleteLookId(id)}
            />
          ))}
        </div>
      )}

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