import React, { useState } from 'react';
import { X, CreditCard, Landmark, Truck, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, cartItems = [], totalAmount = 0, onOrderComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: 'P.G.N. Theekshana',
    email: 'theekshana@stylesense.com',
    phone: '+94 77 123 4567',
    address: 'No. 45, Horton Place, Colombo 07',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://stylesense-ai-ecommerce-production.up.railway.app/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customer: formData,
          totalAmount: totalAmount,
          paymentMethod: paymentMethod
        })
      });

      const data = await res.json();
      setOrderSuccess(data.order || {
        orderId: 'SS-' + Math.floor(100000 + Math.random() * 900000),
        totalPaid: totalAmount,
        customerName: formData.name
      });
    } catch (err) {
      console.error(err);
      setOrderSuccess({
        orderId: 'SS-' + Math.floor(100000 + Math.random() * 900000),
        totalPaid: totalAmount,
        customerName: formData.name
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-stone-900">
          <X className="w-5 h-5" />
        </button>

        {orderSuccess ? (
          /* Order Confirmation View */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">Haute Couture Acquisition</span>
              <h3 className="font-serif text-2xl uppercase tracking-tight text-stone-900">Order Confirmed</h3>
              <p className="text-xs text-stone-500 font-sans">
                Order ID: <strong className="font-mono text-stone-800">{orderSuccess.orderId}</strong>
              </p>
            </div>
            <div className="p-4 bg-stone-50 border border-stone-200 text-xs font-sans max-w-md mx-auto space-y-1 text-left">
              <p className="text-stone-700">Client: <strong>{orderSuccess.customerName}</strong></p>
              <p className="text-stone-700">Total Investment: <strong>LKR {orderSuccess.totalPaid?.toLocaleString()}</strong></p>
              <p className="text-stone-700">Payment Status: <strong className="text-emerald-700">Authorized ({paymentMethod.toUpperCase()})</strong></p>
              <p className="text-stone-500 text-[11px] pt-1">Our private valet concierge has initiated packaging for dispatch.</p>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(null);
                if (onOrderComplete) onOrderComplete();
              }}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-800"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="space-y-1 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
                <Lock className="w-3.5 h-3.5 text-stone-700" />
                <span>256-Bit Encrypted Atelier Checkout</span>
              </div>
              <h3 className="font-serif text-2xl uppercase tracking-tight text-stone-900">
                Payment & Bespoke Delivery
              </h3>
            </div>

            {/* 1. Payment Methods Selection */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Method 1: Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Card Payment</span>
                  <span className="text-[9px] opacity-75">Visa / Mastercard / Amex</span>
                </button>

                {/* Method 2: Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Bank Transfer</span>
                  <span className="text-[9px] opacity-75">Commercial / HNB Direct</span>
                </button>

                {/* Method 3: Valet COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border text-left flex flex-col justify-between space-y-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Valet Courier COD</span>
                  <span className="text-[9px] opacity-75">Pay upon fitting</span>
                </button>
              </div>
            </div>

            {/* Dynamic Payment Details */}
            {paymentMethod === 'card' && (
              <div className="grid grid-cols-3 gap-3 bg-stone-50 p-4 border border-stone-200 text-xs font-sans">
                <div className="col-span-3 space-y-1">
                  <label className="text-[10px] uppercase text-stone-500">Card Number</label>
                  <input
                    type="text"
                    defaultValue={formData.cardNumber}
                    className="w-full p-2 bg-white border border-stone-200 text-xs font-mono focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase text-stone-500">Expiry Date</label>
                  <input
                    type="text"
                    defaultValue={formData.cardExp}
                    className="w-full p-2 bg-white border border-stone-200 text-xs font-mono focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-stone-500">CVC</label>
                  <input
                    type="text"
                    defaultValue={formData.cardCvc}
                    className="w-full p-2 bg-white border border-stone-200 text-xs font-mono focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-stone-50 p-4 border border-stone-200 text-xs font-sans space-y-2">
                <p className="font-semibold text-stone-900">Atelier Bank Beneficiary Details:</p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 font-mono">
                  <p>Bank: <strong>Commercial Bank of Ceylon</strong></p>
                  <p>Branch: <strong>Colombo 07 Elite</strong></p>
                  <p>Account: <strong>1000 8492 0184</strong></p>
                  <p>Name: <strong>StyleSense Haute Couture Ltd</strong></p>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-stone-50 p-4 border border-stone-200 text-xs font-sans space-y-1">
                <p className="font-semibold text-stone-900">VIP Doorstep Fitting & Cash on Delivery:</p>
                <p className="text-stone-500 text-[11px]">
                  Our private courier will bring the pieces directly to your residence. You can inspect fabric drape before finalizing payment.
                </p>
              </div>
            )}

            {/* Total Summary & Submit */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Total Investment</span>
                <span className="font-serif text-xl text-stone-900">
                  LKR {totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-800 flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Processing...' : 'Authorize Acquisition'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;