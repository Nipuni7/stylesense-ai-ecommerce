import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

const mockTrending = [
  {
    id: 1,
    name: "Pleated Tussar Silk Trench",
    category: "Outerwear",
    price: 34500,
    aiMatch: 98,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Architectural Linen Blazer",
    category: "Tailoring",
    price: 26000,
    aiMatch: 94,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Draped Organza Evening Slip",
    category: "Occasionwear",
    price: 42000,
    aiMatch: 99,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Structured Minimalist Poplin Shirt",
    category: "Essentials",
    price: 18500,
    aiMatch: 91,
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturedSection = () => {
  return (
    <div className="bg-brand-cream py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Editorial Categories Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/shop?category=women" className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-sand">
            <img 
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80" 
              alt="Women Collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-brand-cream">
              <span className="text-[10px] uppercase tracking-luxury text-brand-sand/80">Curated Silhouettes</span>
              <h2 className="font-serif text-2xl uppercase tracking-wider mt-1">Women</h2>
            </div>
          </Link>

          <Link to="/shop?category=men" className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-sand">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" 
              alt="Men Collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-brand-cream">
              <span className="text-[10px] uppercase tracking-luxury text-brand-sand/80">Tailored Modernity</span>
              <h2 className="font-serif text-2xl uppercase tracking-wider mt-1">Men</h2>
            </div>
          </Link>

          <Link to="/shop?category=accessories" className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-sand">
            <img 
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" 
              alt="Accessories Collection" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-brand-cream">
              <span className="text-[10px] uppercase tracking-luxury text-brand-sand/80">Subtle Accents</span>
              <h2 className="font-serif text-2xl uppercase tracking-wider mt-1">Accessories</h2>
            </div>
          </Link>
        </div>

        {/* Trending Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-brand-sand">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">
                Algorithmic Curation
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark uppercase tracking-tight mt-1">
                Trending Silhouettes
              </h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-brand-dark hover:text-brand-champagne transition-colors mt-4 md:mt-0 font-medium">
              <span>View All Pieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {mockTrending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedSection;