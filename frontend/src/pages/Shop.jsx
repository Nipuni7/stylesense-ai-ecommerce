import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { RefreshCw } from 'lucide-react';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL query parameter කියවා auto-filter කිරීම (eg: /shop?cat=women)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (catParam && ['women', 'men', 'accessories'].includes(catParam.toLowerCase())) {
      setActiveCategory(catParam.toLowerCase());
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'all' 
          ? 'http://localhost:5000/api/products' 
          : `http://localhost:5000/api/products?category=${activeCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const newUrl = cat === 'all' ? '/shop' : `/shop?cat=${cat}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-luxury font-bold text-brand-champagne">
            Haute Couture Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif uppercase tracking-tight text-brand-dark">
            Curated Collection
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
            Ethically sourced fabrics tailored into timeless minimalist silhouettes. Filter by gender or artisanal accessories.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center items-center gap-3 sm:gap-6 border-b border-brand-sand/60 pb-4 text-xs uppercase tracking-luxury">
          {['all', 'women', 'men', 'accessories'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`pb-2 transition-all font-semibold capitalize ${
                activeCategory === cat
                  ? 'border-b-2 border-brand-dark text-brand-dark'
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              {cat === 'all' ? 'All Pieces' : cat}
            </button>
          ))}
        </div>

        {/* Grid or Loader */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-brand-muted">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-champagne" />
            <p className="text-xs uppercase tracking-luxury">Loading Atelier Pieces...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;