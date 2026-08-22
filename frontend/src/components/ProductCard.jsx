import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col bg-transparent">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-sand/60 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* AI Style Match Badge */}
        {product.aiMatch && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-brand-dark/80 backdrop-blur-md border border-brand-champagne/40 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-luxury text-brand-champagne font-semibold shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            <span>{product.aiMatch}% AI Match</span>
          </div>
        )}

        {/* Wishlist Trigger */}
        <button
          aria-label="Add to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-cream/80 backdrop-blur-md flex items-center justify-center text-brand-dark hover:text-brand-champagne transition-all opacity-0 group-hover:opacity-100 shadow-sm"
        >
          <Heart className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Quick Add Overlay */}
        <button
          aria-label="Quick Add to Bag"
          className="absolute bottom-0 inset-x-0 bg-brand-dark/90 backdrop-blur-sm text-brand-cream text-[10px] uppercase tracking-luxury font-semibold py-3 text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-brand-champagne" />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col space-y-1">
        <span className="text-[10px] uppercase tracking-luxury text-brand-muted font-medium">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="hover:text-brand-champagne transition-colors">
          <h3 className="font-serif text-base text-brand-dark tracking-tight line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-semibold text-brand-dark pt-0.5 tracking-wide">
          LKR {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;