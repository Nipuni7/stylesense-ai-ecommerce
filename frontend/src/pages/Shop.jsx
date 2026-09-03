import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModel from '../components/QuickViewModel';
import CompleteLookModal from '../components/CompleteLookModal';
import VirtualTryOnModal from '../components/VirtualTryOnModal';
import { Search } from 'lucide-react';

const BACKEND_URL = 'https://stylesense-ai-ecommerce.vercel.app';

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [completeLookId, setCompleteLookId] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  // Fetch products from Live Database API
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchCat = currentCategory === 'all' || (item.category && item.category.toLowerCase() === currentCategory.toLowerCase());
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
            {loading ? 'Curating bespoke pieces...' : `Showing ${filteredProducts.length} bespoke pieces`}
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

      {/* Loading or Product Grid */}
      {loading ? (
        <div className="py-20 text-center text-stone-500 text-xs font-mono uppercase tracking-widest">
          Loading Atelier Collection...
        </div>
      ) : filteredProducts.length === 0 ? (
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