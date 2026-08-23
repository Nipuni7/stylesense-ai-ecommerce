import React from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

const QuickViewModel = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (onAddToCart) onAddToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white transition-colors bg-stone-800/80 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[3/4] md:aspect-auto h-full w-full bg-stone-950 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-stone-900/90 text-stone-100 text-[10px] uppercase tracking-[0.2em] px-3 py-1 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details & Purchase Action */}
        <div className="p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 capitalize">
                {product.category} Signature Piece
              </span>
              <h2 className="text-2xl font-serif uppercase tracking-wide text-stone-100">
                {product.name}
              </h2>
              <p className="text-lg font-serif text-stone-200">
                LKR {product.price?.toLocaleString()}
              </p>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              {product.description}
            </p>

            <div className="p-4 bg-stone-800/60 border border-stone-800 space-y-2 text-[11px] font-sans text-stone-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                <span>Ethically Sourced Luxury Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Bespoke Atelier Quality Guarantee</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full py-4 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Atelier Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuickViewModel;