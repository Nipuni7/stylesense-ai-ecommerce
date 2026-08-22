import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen && !isCheckoutOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
          <div 
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm transition-opacity" 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-cream border-l border-brand-sand flex flex-col shadow-2xl">
              
              {/* Header */}
              <div className="p-6 border-b border-brand-sand flex items-center justify-between bg-brand-cream">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-brand-dark" />
                  <span className="font-serif text-lg tracking-luxury uppercase text-brand-dark">Curated Bag</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-champagne/20 text-brand-dark font-sans">
                    {cartItems.length}
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:text-brand-champagne transition-colors"
                >
                  <X className="w-5 h-5 text-brand-dark" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-brand-muted">
                    <ShoppingBag className="w-12 h-12 stroke-1 text-brand-sand" />
                    <p className="font-serif text-sm tracking-wide">Your luxury bag is currently empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-brand-sand/40 pb-6">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-24 object-cover rounded-sm bg-brand-sand/20"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-serif uppercase tracking-luxury text-brand-dark">{item.name}</h4>
                            <button 
                              onClick={() => onRemoveItem && onRemoveItem(item.id)}
                              className="text-brand-muted hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-brand-muted uppercase tracking-luxury mt-1">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs font-semibold text-brand-dark">
                            Rs. {item.price.toLocaleString()}
                          </span>
                          <div className="flex items-center border border-brand-sand text-xs">
                            <button 
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="px-2 py-0.5 hover:bg-brand-sand/30"
                            >-</button>
                            <span className="px-2">{item.quantity || 1}</span>
                            <button 
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="px-2 py-0.5 hover:bg-brand-sand/30"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-brand-sand bg-brand-sand/20 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-luxury text-brand-muted">Estimated Total</span>
                    <span className="font-serif text-lg text-brand-dark font-semibold">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3.5 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-luxury font-bold hover:bg-brand-champagne hover:text-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Boutique Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        onClearCart={onClearCart}
      />
    </>
  );
};

export default CartDrawer;