import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Shield, Check, Ruler } from 'lucide-react';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product?.color || 'Signature');
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({ 
        ...product, 
        selectedSize, 
        selectedColor 
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Dynamic color variations based on product attributes or luxury defaults
  const colors = [
    { name: product?.color || 'Signature', hex: '#d4d4d8' },
    { name: 'Midnight Black', hex: '#1c1917' },
    { name: 'Champagne Beige', hex: '#f5f5f4' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-cream border border-brand-sand w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-1.5 bg-brand-cream/80 rounded-full hover:text-brand-champagne transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Imagery */}
        <div className="relative h-72 md:h-full bg-brand-sand/20 min-h-[320px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-brand-charcoal/90 text-brand-cream text-[10px] uppercase tracking-luxury px-2.5 py-1 rounded-sm flex items-center gap-1.5 backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-brand-champagne" />
            <span>AI Match {product.aiMatch || 96}%</span>
          </div>
        </div>

        {/* Product Details & Purchase Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">
              <span>{product.category} | {product.type || 'Couture'}</span>
              <span className="text-emerald-700 flex items-center gap-1">
                <Shield className="w-3 h-3" /> In Stock
              </span>
            </div>
            
            <h2 className="font-serif text-2xl uppercase tracking-tight text-brand-dark leading-tight">
              {product.name}
            </h2>
            
            <p className="font-serif text-lg text-brand-dark font-semibold">
              Rs. {product.price?.toLocaleString()}
            </p>

            <p className="text-xs text-brand-muted font-sans leading-relaxed pt-1">
              {product.description || "Crafted using heritage artisanal methods and premium sustainably-sourced fibers with bespoke architectural drape."}
            </p>

            {/* AI Size & Silhouette Guide */}
            <div className="p-3 bg-brand-sand/20 border border-brand-sand/60 rounded-sm text-[11px] text-brand-dark space-y-1">
              <div className="flex items-center gap-1.5 text-brand-champagne font-semibold uppercase tracking-luxury text-[9px]">
                <Ruler className="w-3 h-3" />
                <span>AI Fit Recommendation</span>
              </div>
              <p className="text-brand-muted leading-tight">
                True to standard bespoke tailoring. Designed for an effortless, relaxed structure.
              </p>
            </div>

            {/* Color Selector */}
            <div className="pt-1">
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1.5 font-semibold">
                Select Color: <span className="text-brand-dark font-normal">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                      selectedColor === col.name
                        ? 'border-brand-dark bg-brand-dark text-brand-cream font-semibold'
                        : 'border-brand-sand text-brand-muted hover:border-brand-dark bg-white/50'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-brand-sand/60 inline-block" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="pt-1">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] uppercase tracking-luxury text-brand-muted font-semibold">
                  Select Tailored Size
                </label>
                <span className="text-[10px] text-brand-champagne underline cursor-pointer tracking-wider">Size Guide</span>
              </div>
              <div className="flex gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-9 text-xs uppercase tracking-luxury font-semibold border transition-all ${
                      selectedSize === sz
                        ? 'border-brand-dark bg-brand-dark text-brand-cream'
                        : 'border-brand-sand hover:border-brand-muted text-brand-dark bg-white/50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-3 border-t border-brand-sand">
            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full py-3.5 text-xs uppercase tracking-luxury font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                added 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-brand-charcoal text-brand-cream hover:bg-brand-champagne hover:text-brand-dark'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Luxury Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Piece &bull; Rs. {product.price?.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;