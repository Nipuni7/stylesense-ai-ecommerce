import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

const mockCatalog = [
  {
    id: 1,
    name: "Pleated Tussar Silk Trench",
    category: "women",
    type: "Outerwear",
    price: 34500,
    aiMatch: 98,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Architectural Linen Blazer",
    category: "women",
    type: "Tailoring",
    price: 26000,
    aiMatch: 94,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Draped Organza Evening Slip",
    category: "women",
    type: "Occasionwear",
    price: 42000,
    aiMatch: 99,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Structured Minimalist Poplin Shirt",
    category: "men",
    type: "Essentials",
    price: 18500,
    aiMatch: 91,
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Raw Hem Tailored Trousers",
    category: "men",
    type: "Tailoring",
    price: 22000,
    aiMatch: 89,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Woven Minimalist Leather Tote",
    category: "accessories",
    type: "Leather Goods",
    price: 31000,
    aiMatch: 96,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
  }
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(50000);

  const filteredProducts = useMemo(() => {
    return mockCatalog
      .filter(item => (currentCategory === 'all' || currentCategory === 'collections' ? true : item.category === currentCategory))
      .filter(item => item.price <= priceRange)
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'ai-match') return b.aiMatch - a.aiMatch;
        return 0;
      });
  }, [currentCategory, sortBy, priceRange]);

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-brand-sand pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">
              Curated Catalog
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl uppercase tracking-tight text-brand-dark mt-1">
              {currentCategory === 'all' ? 'All Silhouettes' : `${currentCategory} Collection`}
            </h1>
          </div>
          <p className="text-xs uppercase tracking-luxury text-brand-muted mt-2 md:mt-0 font-medium">
            Showing {filteredProducts.length} Crafted Pieces
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Category Tabs */}
          <div className="lg:col-span-6 flex flex-wrap gap-2">
            {['all', 'women', 'men', 'accessories'].map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat })}
                className={`px-5 py-2 text-xs uppercase tracking-luxury rounded-full border transition-all ${
                  currentCategory === cat
                    ? 'bg-brand-dark text-brand-cream border-brand-dark shadow-sm font-semibold'
                    : 'bg-transparent text-brand-dark border-brand-sand hover:border-brand-champagne'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Price Filter Controls */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-6">
            {/* Price Slider */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[10px] uppercase tracking-luxury text-brand-muted whitespace-nowrap">Max Price:</span>
              <input
                type="range"
                min="15000"
                max="50000"
                step="2500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-28 accent-brand-champagne"
              />
              <span className="text-xs font-semibold text-brand-dark whitespace-nowrap">LKR {priceRange.toLocaleString()}</span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-brand-sand px-3 py-1.5 rounded-sm bg-brand-cream w-full sm:w-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-brand-dark uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="ai-match">Highest AI Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-brand-sand rounded-sm">
            <Sparkles className="w-8 h-8 text-brand-champagne mx-auto mb-3" />
            <p className="font-serif text-xl text-brand-dark">No pieces match your exact criteria.</p>
            <p className="text-xs text-brand-muted tracking-luxury uppercase mt-1">Adjust filters or consult our AI Stylist.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;