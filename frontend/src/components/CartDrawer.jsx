import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    if (onClearCart) onClearCart();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          onClick={onClose} 
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-stone-900 text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-stone-300" />
                <h2 className="text-sm font-serif uppercase tracking-[0.25em] text-stone-100">
                  Atelier Bag ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-stone-800/80">
              {cartItems.length === 0 ? (
                <div className="py-24 text-center space-y-3 text-stone-400">
                  <p className="font-serif text-lg text-stone-300">Your bag is currently empty</p>
                  <p className="text-xs font-sans tracking-wide">Explore the 60 curated pieces in the catalog.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="pt-6 first:pt-0 flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-24 object-cover bg-stone-800 border border-stone-800"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm text-stone-100 line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => onRemoveItem && onRemoveItem(item.id)}
                            className="text-stone-500 hover:text-red-400 transition-colors pl-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-sans text-stone-400">LKR {item.price?.toLocaleString()}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-700 bg-stone-800/60">
                          <button 
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="p-1.5 text-stone-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono">{item.quantity || 1}</span>
                          <button 
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-1.5 text-stone-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer / Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-900/90 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Subtotal</span>
                  <span className="text-lg font-serif text-stone-100">LKR {subtotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleOpenCheckout}
                  className="w-full py-4 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Embedded Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={subtotal}
        onOrderSuccess={handleOrderSuccess}
      />
    </>
  );
};

export default CartDrawer;