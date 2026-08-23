import React from 'react';
import { Eye, ShoppingBag, Shirt, Sparkles, HelpCircle } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onQuickView, onTryOn, onCompleteLook }) => {
  return (
    <div className="group flex flex-col justify-between bg-white border border-stone-200/80 hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md">
      
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* AI Match Score Pill */}
        <span className="absolute bottom-3 left-3 bg-stone-900/80 text-amber-300 border border-stone-700 text-[9px] font-mono px-2 py-0.5 backdrop-blur-sm flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          <span>{product.trendScore || 94}% AI Match</span>
        </span>

        {/* Quick View Floating Eye Icon */}
        <button
          onClick={() => onQuickView && onQuickView(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 text-stone-800 hover:bg-stone-900 hover:text-white transition-colors duration-200 shadow-sm opacity-0 group-hover:opacity-100"
          title="Quick Look"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              {product.category}
            </span>
            <span className="text-[9px] font-mono text-stone-400">
              Color: {product.color || 'Neutral'}
            </span>
          </div>

          <h3 className="font-serif text-sm tracking-wide text-stone-900 line-clamp-1">
            {product.name}
          </h3>

          {/* Explainable AI Rationale Tag */}
          <div className="p-1.5 bg-stone-50 border-l-2 border-stone-800 text-[10px] text-stone-600 font-sans leading-tight">
            <p className="line-clamp-2">
              💡 <strong className="text-stone-800 font-medium">Why Curated:</strong> {product.explainableRationale || `Matches your Warm Autumn palette & structured gala preference.`}
            </p>
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-stone-400 block">Price</span>
            <span className="font-sans text-xs font-semibold text-stone-900">
              LKR {product.price?.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            className="px-3 py-2 bg-stone-900 text-stone-100 text-[10px] uppercase tracking-[0.15em] font-medium hover:bg-stone-800 flex items-center gap-1.5 transition-colors active:scale-95"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add to Bag</span>
          </button>
        </div>

        {/* AI Actions Row */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={() => onTryOn && onTryOn(product)}
            className="py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 text-[9px] uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
          >
            <Shirt className="w-3 h-3 text-stone-300" />
            <span>AI Try-On</span>
          </button>

          <button
            onClick={() => onCompleteLook && onCompleteLook(product.id)}
            className="py-1.5 bg-stone-100 border border-stone-200 hover:bg-stone-200 text-stone-800 text-[9px] uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-stone-600" />
            <span>Pair Look</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;