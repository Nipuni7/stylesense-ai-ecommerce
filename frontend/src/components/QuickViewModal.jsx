import React, { useState } from 'react';
import { X, Star, Sparkles, ShoppingBag, Check } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[4/5] md:aspect-auto bg-slate-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-xs text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {product.aiMatch}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{product.category}</span>
            <h3 className="text-xl font-bold text-white mt-1">{product.name}</h3>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="text-2xl font-black text-white mt-4">${product.price.toFixed(2)}</div>

            {/* Size Selector */}
            <div className="mt-5">
              <span className="text-xs text-slate-300 font-medium block mb-2">Select Size</span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedSize === s 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handleAdd}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}