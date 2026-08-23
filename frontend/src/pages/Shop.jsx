import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import QuickViewModel from '../components/QuickViewModel';
import { Search, RefreshCw } from 'lucide-react';

const Shop = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('cat') || 'all';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = currentCategory === 'all' 
          ? 'http://localhost:5000/api/products'
          : `http://localhost:5000/api/products?category=${currentCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load catalog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-12 px-6 lg:px-12 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
            Atelier Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif uppercase tracking-tight text-stone-900">
            {currentCategory === 'all' ? 'Complete Collection' : `${currentCategory}'s Collection`}
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

      {/* Search Bar */}
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

      {/* Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3 text-stone-400">
          <RefreshCw className="w-6 h-6 animate-spin text-stone-700" />
          <p className="text-xs uppercase tracking-[0.2em]">Curating Haute Pieces...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-24 text-center space-y-2 text-stone-400">
          <p className="font-serif text-lg text-stone-700">No items match your criteria</p>
          <p className="text-xs font-sans">Try searching with a different term or browse another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModel
        isOpen={Boolean(quickViewProduct)}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />

    </div>
  );
};

export default Shop;