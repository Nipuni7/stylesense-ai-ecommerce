import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemoveItem }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const complimentaryThreshold = 15000;
  const progressPercent = Math.min((subtotal / complimentaryThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-xs transition-opacity duration-300" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-cream text-brand-dark shadow-2xl flex flex-col justify-between border-l border-brand-sand">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-sand">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-champagne" />
                <h2 className="font-serif text-xl tracking-tight uppercase">Your Shopping Bag</h2>
              </div>
              <button 
                onClick={onClose}
                aria-label="Close cart"
                className="p-1 hover:text-brand-champagne transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complimentary Delivery Progress */}
            <div className="mt-4 pt-3 border-t border-brand-sand/60">
              <div className="flex justify-between text-[10px] uppercase tracking-luxury text-brand-muted">
                <span>{subtotal >= complimentaryThreshold ? 'Complimentary Delivery Unlocked' : `Add LKR ${(complimentaryThreshold - subtotal).toLocaleString()} for free delivery`}</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1 bg-brand-sand rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-brand-champagne transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-brand-sand/60">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 aspect-[3/4] object-cover rounded-sm bg-brand-sand"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-sm font-semibold line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                          className="text-brand-muted hover:text-rose-600 transition-colors pl-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] uppercase tracking-luxury text-brand-muted mt-0.5">
                        Size: {item.size || 'UK 8'} · {item.color || 'Ecru'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-brand-muted font-medium">Qty: {item.quantity || 1}</span>
                      <span className="text-xs font-semibold">LKR {(item.price * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <ShoppingBag className="w-10 h-10 text-brand-muted/40 mx-auto mb-3" />
                <p className="font-serif text-lg text-brand-dark">Your bag is presently empty.</p>
                <p className="text-[10px] uppercase tracking-luxury text-brand-muted mt-1">Explore our latest silhouettes</p>
              </div>
            )}
          </div>

          {/* Footer / Checkout Button */}
          <div className="p-6 border-t border-brand-sand bg-brand-sand/20 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-brand-muted uppercase tracking-luxury text-[10px]">
                <span>Estimated Subtotal</span>
                <span>LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-brand-muted uppercase tracking-luxury text-[10px]">
                <span>Islandwide Delivery</span>
                <span>{subtotal >= complimentaryThreshold || subtotal === 0 ? 'COMPLIMENTARY' : 'LKR 750'}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-brand-dark pt-2 border-t border-brand-sand">
                <span>Total</span>
                <span>LKR {(subtotal + (subtotal >= complimentaryThreshold || subtotal === 0 ? 0 : 750)).toLocaleString()}</span>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0}
              className="w-full py-4 bg-brand-dark text-brand-cream text-xs uppercase tracking-luxury font-bold hover:bg-brand-charcoal transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;