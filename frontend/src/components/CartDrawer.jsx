import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const FREE_SHIPPING_THRESHOLD = 75000;

const CartDrawer = ({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity, onClearCart }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const hasAccessories = cartItems.some(i => i.category === 'accessories');
  const hasApparel = cartItems.some(i => i.category === 'women' || i.category === 'men');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-sm font-serif uppercase tracking-[0.25em] text-stone-900 font-semibold">
                Your Atelier Bag ({cartItems.length})
              </h2>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Intelligence Bar: Free Shipping Nudge */}
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Truck className="w-3.5 h-3.5 text-stone-900" />
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700 font-medium">Complimentary Courier Unlocked</strong>
                ) : (
                  <span>Add <strong>LKR {remainingForFreeShipping.toLocaleString()}</strong> for Free Islandwide Courier</span>
                )}
              </span>
              <span className="font-mono text-[10px] text-stone-500">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 overflow-hidden">
              <div 
                className="bg-stone-900 h-full transition-all duration-500" 
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-stone-400">
                <ShoppingBag className="w-12 h-12 stroke-[1.2]" />
                <p className="font-serif text-base text-stone-700">Your bag is empty</p>
                <p className="text-xs font-sans max-w-xs">Explore our haute couture collection to curate your ensemble.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-stone-100 pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-stone-100" />
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-stone-900 font-medium line-clamp-1">{item.name}</h4>
                          <button onClick={() => onRemoveItem(item.id)} className="text-stone-400 hover:text-rose-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] font-mono text-stone-500 mt-0.5">LKR {item.price?.toLocaleString()}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-200">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono text-xs text-stone-900">{item.quantity || 1}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Outfit Completion Nudge */}
                {hasApparel && !hasAccessories && (
                  <div className="p-3 bg-stone-50 border border-dashed border-stone-300 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                      <span>Stylist Tip: Ensemble 70% Complete</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Add a handcrafted leather tote or Ceylon sapphire accent to unify your look.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-mono">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Courier Delivery</span>
                  <span className="font-mono">{remainingForFreeShipping === 0 ? 'Complimentary' : 'LKR 850'}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-semibold text-sm pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono">LKR {(subtotal + (remainingForFreeShipping === 0 ? 0 : 850)).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-800 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Proceed to Bespoke Checkout</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={subtotal + (remainingForFreeShipping === 0 ? 0 : 850)}
        onOrderComplete={() => {
          setIsCheckoutOpen(false);
          onClearCart();
          onClose();
        }}
      />
    </div>
  );
};

export default CartDrawer;