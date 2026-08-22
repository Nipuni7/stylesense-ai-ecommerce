import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product, onAddToCart }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <div className="group relative flex flex-col bg-brand-cream border border-brand-sand/40 hover:border-brand-champagne transition-all duration-500 overflow-hidden">
        {/* Imagery */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-sand/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* AI Match Badge */}
          {product.aiMatch && (
            <div className="absolute top-3 left-3 bg-brand-charcoal/90 backdrop-blur-xs text-brand-cream text-[10px] uppercase tracking-luxury px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-brand-champagne" />
              <span>{product.aiMatch}% Match</span>
            </div>
          )}

          {/* Quick View Button on Hover */}
          <div className="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full max-w-[180px] py-2.5 bg-brand-cream text-brand-dark text-xs uppercase tracking-luxury font-semibold shadow-lg hover:bg-brand-champagne transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Meta */}
        <div className="p-4 space-y-1">
          <span className="text-[10px] uppercase tracking-luxury text-brand-muted block">
            {product.category}
          </span>
          <h3 className="font-serif text-sm uppercase tracking-tight text-brand-dark truncate">
            {product.name}
          </h3>
          <p className="text-xs font-semibold text-brand-dark pt-1">
            Rs. {product.price?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bespoke Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default ProductCard;