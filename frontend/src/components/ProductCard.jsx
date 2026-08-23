import React from 'react';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-stone-400">
      
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onQuickView && onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-3 right-3 p-2.5 bg-white/90 text-stone-900 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white"
            title="Quick Look"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4 bg-white">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 capitalize">
            {product.category}
          </span>
          <h3 className="font-serif text-base text-stone-900 tracking-wide font-normal group-hover:text-stone-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 font-sans line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Bag Action Button */}
        <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Price</span>
            <span className="font-sans text-sm font-semibold tracking-wide text-stone-900">
              LKR {product.price?.toLocaleString()}
            </span>
          </div>

          {/* Prominent Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-4 py-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 text-[11px] uppercase tracking-[0.15em] font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;