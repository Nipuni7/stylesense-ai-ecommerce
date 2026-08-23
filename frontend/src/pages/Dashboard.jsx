import React, { useState, useEffect } from 'react';
import { User, Package, Sparkles, TrendingUp, Users, BarChart3, Clock, Crown, Gift, Award, CheckCircle } from 'lucide-react';

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

const loyaltyTiers = [
  { name: "Silver Atelier", threshold: 0, current: true },
  { name: "Gold Sartorial", threshold: 100000, current: true },
  { name: "Haute Privé VIP", threshold: 250000, current: true },
  { name: "Black Bespoke", threshold: 500000, current: false }
];

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/intelligence-metrics')
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="py-14 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Profile Header Banner */}
      <div className="bg-stone-900 text-stone-100 p-8 border border-stone-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-200">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">VIP Patron & Data Studio</span>
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight text-stone-100">
              P.G.N. Theekshana
            </h1>
            <p className="text-xs text-stone-400 font-mono">theekshana@stylesense.com</p>
          </div>
        </div>

        <div className="flex gap-6 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-8 text-xs font-sans">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Atelier Tier</p>
            <p className="text-lg font-serif text-amber-300 flex items-center gap-1.5">
              <Crown className="w-4 h-4" /> Haute Privé VIP
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Style DNA Alignment</p>
            <p className="text-lg font-serif text-emerald-400">94.2% Minimalist</p>
          </div>
        </div>
      </div>

      {/* --- VIP LOYALTY & REWARDS TIER PROGRESS --- */}
      <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Patron Privileges</span>
            </div>
            <h3 className="font-serif text-2xl uppercase tracking-tight text-stone-900">
              VIP Tier Progression & Atelier Points
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Available Rewards Balance</span>
            <span className="font-serif text-xl text-stone-900">4,280 Atelier Points</span>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-stone-700 font-medium">Current Status: <strong className="text-stone-900">Haute Privé VIP</strong> (LKR 285,000 spend)</span>
            <span className="text-stone-500 font-mono">LKR 215,000 to Black Bespoke</span>
          </div>
          <div className="w-full bg-stone-100 h-2.5 overflow-hidden">
            <div className="bg-stone-900 h-full w-[57%] transition-all duration-700" />
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {loyaltyTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`p-4 border text-xs space-y-2 transition-all ${
                tier.current 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                  : 'bg-stone-50 text-stone-500 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider font-mono">Tier 0{idx + 1}</span>
                {tier.current && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <h4 className="font-serif text-sm font-semibold">{tier.name}</h4>
              <p className="text-[10px] opacity-75 font-mono">Spend &gt; LKR {tier.threshold.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Exclusive VIP Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-sans">
          <div className="p-3 bg-stone-50 border border-stone-200 space-y-1">
            <p className="font-semibold text-stone-900">✨ Private Stylist Access</p>
            <p className="text-stone-500 text-[11px]">Direct priority line to our senior haute couture concierges.</p>
          </div>
          <div className="p-3 bg-stone-50 border border-stone-200 space-y-1">
            <p className="font-semibold text-stone-900">📦 Complimentary Valet Courier</p>
            <p className="text-stone-500 text-[11px]">Free same-day doorstep fitting & return assistance.</p>
          </div>
          <div className="p-3 bg-stone-50 border border-stone-200 space-y-1">
            <p className="font-semibold text-stone-900">🥂 Gala Runway Invitations</p>
            <p className="text-stone-500 text-[11px]">Advance reserved allocation for seasonal bridal & gala drops.</p>
          </div>
        </div>
      </div>

      {/* --- FASHION INTELLIGENCE & DATA SCIENCE SECTION --- */}
      {metrics && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
            <BarChart3 className="w-5 h-5 text-stone-800" />
            <h2 className="font-serif text-2xl uppercase tracking-tight text-stone-900">
              Fashion Intelligence & Demand Analytics
            </h2>
          </div>

          {/* KPI Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-stone-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Catalog Gross Revenue</span>
              <p className="text-2xl font-serif text-stone-900">LKR {metrics.totalRevenue.toLocaleString()}</p>
              <span className="text-[11px] text-emerald-600 font-sans">↑ +14.2% vs last cycle</span>
            </div>
            <div className="bg-white p-6 border border-stone-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Active VIP Patrons</span>
              <p className="text-2xl font-serif text-stone-900">{metrics.activeVIPClients}</p>
              <span className="text-[11px] text-stone-500 font-sans">CLV Average: LKR 120,000</span>
            </div>
            <div className="bg-white p-6 border border-stone-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Conversion Rate</span>
              <p className="text-2xl font-serif text-stone-900">{metrics.conversionRate}</p>
              <span className="text-[11px] text-emerald-600 font-sans">High-intent sessions</span>
            </div>
            <div className="bg-white p-6 border border-stone-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Inventory Turnover</span>
              <p className="text-2xl font-serif text-stone-900">{metrics.inventoryTurnoverDays} Days</p>
              <span className="text-[11px] text-stone-500 font-sans">Bespoke silk & linen holding</span>
            </div>
          </div>

          {/* Forecasting & Clustering Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SARIMA Demand Forecasting */}
            <div className="bg-white p-6 border border-stone-200 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-base uppercase tracking-wide text-stone-900">
                  SARIMA Demand Forecasting
                </h3>
                <span className="text-[10px] uppercase font-mono text-stone-400">Gala Season Cycle</span>
              </div>
              <div className="space-y-3 pt-2">
                {metrics.demandForecasting.map((df, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-stone-700">{df.month}</span>
                      <span className="font-mono text-stone-500">Forecast: {df.predictedDemand} / Actual: {df.actualSales}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 overflow-hidden">
                      <div 
                        className="bg-stone-900 h-full transition-all duration-700" 
                        style={{ width: `${(df.actualSales / 400) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* K-Means Customer Segmentation */}
            <div className="bg-white p-6 border border-stone-200 space-y-4">
              <h3 className="font-serif text-base uppercase tracking-wide text-stone-900">
                K-Means Client Segmentation
              </h3>
              <div className="space-y-3 pt-2">
                {metrics.customerSegmentation.map((seg, i) => (
                  <div key={i} className="p-3 bg-stone-50 border border-stone-200 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-stone-800">{seg.segment}</p>
                      <p className="text-[11px] text-stone-500">{seg.count} Enrolled VIPs</p>
                    </div>
                    <span className="px-2.5 py-1 bg-stone-900 text-stone-100 font-mono text-[10px]">
                      {seg.share}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders History */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-stone-700" />
          <h3 className="font-serif text-lg uppercase tracking-wide text-stone-900">
            Recent Atelier Acquisitions
          </h3>
        </div>

        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white border border-stone-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
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