import React from 'react';
import { User, Package, Heart, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const mockOrders = [
  {
    id: "SS-914820",
    date: "2026-08-20",
    item: "Silk Satin Slip Gown & Tailored Linen Blazer",
    total: 63400,
    status: "Delivered to Residence"
  },
  {
    id: "SS-781033",
    date: "2026-08-14",
    item: "Handwoven Silk Batik Saree",
    total: 46000,
    status: "In Tailoring Archive"
  }
];

const Dashboard = () => {
  return (
    <div className="py-14 px-6 lg:px-12 max-w-6xl mx-auto space-y-10">
      
      {/* Header Profile Section */}
      <div className="bg-stone-900 text-stone-100 p-8 border border-stone-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-200">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">VIP Patron</span>
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight text-stone-100">
              P.G.N. Theekshana
            </h1>
            <p className="text-xs text-stone-400 font-mono">theekshana@stylesense.com</p>
          </div>
        </div>

        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-8 text-xs font-sans">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Total Acquisitions</p>
            <p className="text-lg font-serif text-stone-100">02 Pieces</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Tier Status</p>
            <p className="text-lg font-serif text-stone-100">Haute Privé</p>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
          <Package className="w-4 h-4 text-stone-700" />
          <h2 className="font-serif text-xl uppercase tracking-wide text-stone-900">
            Atelier Acquisition History
          </h2>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white border border-stone-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-stone-900">{order.id}</span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 border border-stone-200">
                    {order.status}
                  </span>
                </div>
                <h4 className="font-serif text-sm text-stone-800">{order.item}</h4>
                <p className="text-[11px] font-sans text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Dispatched on {order.date}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Total Investment</span>
                <span className="font-sans text-sm font-semibold text-stone-900">
                  LKR {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;