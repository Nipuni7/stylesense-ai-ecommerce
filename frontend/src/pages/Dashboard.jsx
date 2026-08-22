import React, { useState } from 'react';
import { Sparkles, Package, Heart, User, ShieldCheck, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('wardrobe');

  // Mock Curated Wardrobe Items
  const savedLooks = [
    {
      id: 1,
      name: "Architectural Linen Ensemble",
      date: "August 2026",
      matchScore: 98,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      notes: "Curated for daytime gallery openings and minimalist formal affairs."
    },
    {
      id: 2,
      name: "Tussar Silk Evening Look",
      date: "August 2026",
      matchScore: 95,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      notes: "Structured tailoring paired with fluid silk silhouette drape."
    }
  ];

  const recentOrders = [
    {
      orderId: "SS-2026-9041",
      item: "Architectural Linen Blazer (Size M)",
      status: "In Atelier Dispatch",
      total: 26000,
      date: "22 Aug 2026"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Profile Banner */}
        <div className="p-8 border border-brand-sand bg-brand-sand/10 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-brand-charcoal text-brand-champagne flex items-center justify-center font-serif text-2xl">
              SS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl uppercase tracking-tight text-brand-dark">Private Client Suite</h1>
                <span className="text-[9px] bg-brand-champagne/20 text-brand-dark uppercase tracking-luxury px-2 py-0.5 rounded-sm font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-brand-champagne" /> Haute Tier
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-1">Bespoke algorithmic profile active &bull; Sri Lanka Atelier</p>
            </div>
          </div>

          <div className="flex gap-3 text-xs uppercase tracking-luxury">
            <a
              href="/stylist"
              className="px-5 py-2.5 bg-brand-charcoal text-brand-cream hover:bg-brand-champagne hover:text-brand-dark transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consult Stylist</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-brand-sand/60 gap-8 text-xs uppercase tracking-luxury">
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`pb-3 transition-all font-semibold flex items-center gap-2 ${
              activeTab === 'wardrobe'
                ? 'border-b-2 border-brand-dark text-brand-dark'
                : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Curated Wardrobe</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-all font-semibold flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-b-2 border-brand-dark text-brand-dark'
                : 'text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Atelier Acquisitions</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'wardrobe' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {savedLooks.map((look) => (
              <div key={look.id} className="border border-brand-sand bg-white/40 p-5 rounded-sm flex gap-5">
                <img
                  src={look.image}
                  alt={look.name}
                  className="w-28 h-36 object-cover rounded-sm bg-brand-sand/30"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] uppercase tracking-luxury text-brand-champagne font-bold">
                        {look.matchScore}% Aesthetic Match
                      </span>
                      <span className="text-[10px] text-brand-muted">{look.date}</span>
                    </div>
                    <h3 className="font-serif text-base uppercase tracking-tight text-brand-dark mt-1">
                      {look.name}
                    </h3>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {look.notes}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brand-sand/40">
                    <a
                      href="/shop"
                      className="text-xs uppercase tracking-luxury font-semibold text-brand-dark hover:text-brand-champagne flex items-center gap-1"
                    >
                      <span>Acquire Pieces</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.orderId}
                className="p-5 border border-brand-sand bg-white/40 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-brand-dark uppercase tracking-luxury">{order.orderId}</span>
                    <span className="text-brand-muted">|</span>
                    <span className="text-emerald-700 font-semibold uppercase text-[10px]">{order.status}</span>
                  </div>
                  <p className="text-brand-dark mt-1 font-sans">{order.item}</p>
                  <p className="text-[10px] text-brand-muted mt-0.5">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-brand-dark">Rs. {order.total.toLocaleString()}</span>
                  <p className="text-[10px] text-brand-muted">Complimentary Delivery</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
