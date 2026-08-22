import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, cartItems = [], subtotal = 0, onClearCart }) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      if (onClearCart) onClearCart();
    }, 1500);
  };

  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-cream border border-brand-sand w-full max-w-xl rounded-sm shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-sand flex items-center justify-between bg-brand-sand/20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-luxury font-bold text-brand-champagne">
              {step === 3 ? 'Confirmed' : `Step 0${step} of 02`}
            </span>
            <span className="text-brand-muted">|</span>
            <h2 className="text-sm font-serif uppercase tracking-luxury text-brand-dark">
              {step === 3 ? 'Order Confirmed' : 'Boutique Checkout'}
            </h2>
          </div>
          <button onClick={handleCloseModal} className="p-1 hover:text-brand-champagne transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <form onSubmit={() => setStep(2)} className="space-y-4">
              <h3 className="font-serif text-lg text-brand-dark uppercase tracking-tight">Shipping Destination</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Theekshana"
                    className="w-full border border-brand-sand bg-white/80 p-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="concierge@stylesense.com"
                    className="w-full border border-brand-sand bg-white/80 p-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">City / Region</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Colombo 07"
                      className="w-full border border-brand-sand bg-white/80 p-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="No. 12, Ward Place"
                      className="w-full border border-brand-sand bg-white/80 p-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                <span className="text-xs font-serif font-semibold">Total: Rs. {subtotal.toLocaleString()}</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-luxury hover:bg-brand-champagne hover:text-brand-dark transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <h3 className="font-serif text-lg text-brand-dark uppercase tracking-tight">Payment Selection</h3>
              <div className="grid grid-cols-3 gap-3">
                {['card', 'koko', 'mintpay'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`p-3 border text-center rounded-sm transition-all text-xs uppercase tracking-luxury font-semibold ${
                      formData.paymentMethod === method
                        ? 'border-brand-champagne bg-brand-champagne/10 text-brand-dark'
                        : 'border-brand-sand hover:border-brand-muted text-brand-muted'
                    }`}
                  >
                    {method === 'card' ? 'Visa / Master' : method}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white/60 border border-brand-sand space-y-3 text-xs">
                <div className="flex items-center justify-between text-brand-muted">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex items-center justify-between text-brand-dark font-serif text-sm pt-2 border-t border-brand-sand">
                  <span>Final Total</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-brand-sand text-xs uppercase tracking-luxury hover:bg-white transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-2.5 bg-brand-champagne text-brand-dark text-xs uppercase tracking-luxury font-bold hover:bg-brand-gold transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Processing Securely...' : `Pay Rs. ${subtotal.toLocaleString()}`}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-serif text-2xl uppercase tracking-tight text-brand-dark">Ensemble Reserved</h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name || 'Valued Client'}. Your curated pieces are being prepared for dispatch to {formData.city || 'your address'}.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-8 py-3 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-luxury hover:bg-brand-champagne hover:text-brand-dark transition-all"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;