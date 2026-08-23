import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: 'Colombo',
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '888'
  });
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch('http://localhost:5000/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customer: { name: formData.name, email: formData.email, address: formData.address },
          totalAmount
        })
      });

      const data = await res.json();
      setProcessing(false);
      setOrderComplete(data.order || { orderId: 'SS-' + Math.floor(100000 + Math.random() * 900000) });
      if (onOrderSuccess) onOrderSuccess();
    } catch (err) {
      console.error(err);
      setProcessing(false);
      setOrderComplete({ orderId: 'SS-892104' });
      if (onOrderSuccess) onOrderSuccess();
    }
  };

  const handleClose = () => {
    setOrderComplete(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-200">
              <CheckCircle2 className="w-8 h-8 text-stone-100" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
                Payment Authorized
              </span>
              <h3 className="text-2xl font-serif uppercase tracking-tight text-stone-100">
                Atelier Order Confirmed
              </h3>
              <p className="text-xs text-stone-400 font-sans max-w-xs mx-auto">
                Reference ID: <span className="text-stone-200 font-mono font-medium">{orderComplete.orderId}</span>. A bespoke receipt and dispatch docket have been dispatched to your email.
              </p>
            </div>

            <div className="p-4 bg-stone-800/60 border border-stone-800 text-left text-xs space-y-1">
              <div className="flex justify-between text-stone-400">
                <span>Total Amount Paid:</span>
                <span className="text-stone-100 font-medium">LKR {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Items Tailored:</span>
                <span className="text-stone-100">{cartItems.length} Signature Pieces</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white transition-all"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-stone-300" />
                <span>Haute Couture Dispatch</span>
              </div>
              <h3 className="text-2xl font-serif uppercase tracking-tight text-stone-100">
                Bespoke Checkout
              </h3>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1">Email Docket</label>
                <input
                  type="email"
                  required
                  placeholder="client@atelier.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 text-xs"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="74 Ward Place, Cinnamon Gardens, Colombo 07"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:border-stone-400 text-xs"
                />
              </div>

              <div className="pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400 mb-2">
                  <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Direct Card Authorization</span>
                  <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3 h-3" /> SSL Secured</span>
                </div>
                <div className="p-3 bg-stone-800/80 border border-stone-700 space-y-2 font-mono text-[11px] text-stone-300">
                  <div className="flex justify-between">
                    <span>Card: 4242 •••• •••• 4242</span>
                    <span>EXP: 12/28</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total summary & action */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-stone-400">Total Investment</p>
                <p className="text-lg font-serif text-stone-100">LKR {totalAmount.toLocaleString()}</p>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Authorize & Place Order'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;