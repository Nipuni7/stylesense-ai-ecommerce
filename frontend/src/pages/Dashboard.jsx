import React, { useState, useEffect } from 'react';
import { 
  User, Package, Sparkles, TrendingUp, Clock, Crown, 
  Award, CheckCircle, Brain, LineChart, Lock, ShieldCheck, 
  AlertCircle, LogOut 
} from 'lucide-react';

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

const BACKEND_URL = 'https://stylesense-ai-ecommerce.vercel.app';

const Dashboard = () => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data states
  const [metrics, setMetrics] = useState(null);
  const [clvData, setClvData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [executiveInsights, setExecutiveInsights] = useState(null);
  const [styleDna, setStyleDna] = useState(null);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      username.trim().toLowerCase() === 'admin@stylesense.luxury' &&
      password === 'admin123'
    ) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrative credentials. Access denied.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // 1. Fetch KPI Metrics
    fetch(`${BACKEND_URL}/api/admin/intelligence-metrics`)
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(e => console.error(e));

    // 2. Fetch CLV Predictions
    fetch(`${BACKEND_URL}/api/admin/clv-prediction`)
      .then(res => res.json())
      .then(data => setClvData(data))
      .catch(e => console.error(e));

    // 3. Fetch Trend Intelligence
    fetch(`${BACKEND_URL}/api/admin/trend-intelligence`)
      .then(res => res.json())
      .then(data => setTrendData(data))
      .catch(e => console.error(e));

    // 4. Fetch Executive AI Insights
    fetch(`${BACKEND_URL}/api/admin/executive-insights`)
      .then(res => res.json())
      .then(data => setExecutiveInsights(data))
      .catch(e => console.error(e));

    // 5. Fetch Style DNA
    fetch(`${BACKEND_URL}/api/ai/user-style-dna`)
      .then(res => res.json())
      .then(data => setStyleDna(data))
      .catch(e => console.error(e));
  }, [isAuthenticated]);

  // View 1: Login Gate (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 bg-stone-50/50 py-16">
        <div className="w-full max-w-md bg-white border border-stone-200 rounded-sm shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-xl uppercase tracking-[0.2em] text-stone-900">
              Atelier Terminal Access
            </h2>
            <p className="text-xs text-stone-500 font-sans tracking-wide">
              Provide administrative credentials to access order acquisitions and intelligence layers.
            </p>
          </div>

          {authError && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block uppercase tracking-[0.15em] text-stone-500 text-[10px] mb-1.5 font-semibold">
                Administrative Email
              </label>
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@stylesense.luxury"
                className="w-full border border-stone-300 px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-stone-900 bg-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-[0.15em] text-stone-500 text-[10px] mb-1.5 font-semibold">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-stone-300 px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-stone-900 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 text-stone-100 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Authorize Terminal</span>
            </button>
          </form>

          <div className="pt-2 border-t border-stone-100 text-center">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
              Default: admin@stylesense.luxury | admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // View 2: Full Dashboard (When logged in)
  return (
    <div className="py-14 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Sign Out Action Bar */}
      <div className="flex justify-between items-center bg-stone-100 border border-stone-200 px-4 py-2.5 text-xs font-sans">
        <span className="text-stone-600 font-mono text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Terminal Session: <strong className="text-stone-900">Authenticated Admin</strong>
        </span>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-widest text-[10px] font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Close Session</span>
        </button>
      </div>

      {/* 1. Profile Header Banner with Style DNA */}
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
            <p className="text-lg font-serif text-emerald-400">96.4% Pure Natural Fibres</p>
          </div>
        </div>
      </div>

      {/* --- MODULE 5: AI EXECUTIVE INSIGHT LAYER --- */}
      {executiveInsights && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-700 p-6 sm:p-8 text-stone-100 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-serif uppercase tracking-[0.2em] font-semibold text-white">
                AI Executive Intelligence & Strategic Directives
              </h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5">
              System Health: {executiveInsights.healthScore}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            {executiveInsights.executiveSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {executiveInsights.strategicDirectives.map((dir, i) => (
              <div key={i} className="p-3 bg-stone-800/60 border border-stone-700 text-xs font-sans space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-semibold">Directive 0{i + 1}</span>
                <p className="text-stone-300 text-[11px] leading-snug">{dir}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODULE 1 & 3: STYLE DNA & CLV PREDICTIVE INTELLIGENCE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Personalized Style Profile (5 cols) */}
        {styleDna && (
          <div className="lg:col-span-5 bg-white p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Sparkles className="w-4 h-4 text-stone-800" />
              <h3 className="font-serif text-lg uppercase tracking-tight text-stone-900">
                Personalized Style DNA Profile
              </h3>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-stone-50 border border-stone-200 space-y-0.5">
                <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Primary Archetype</span>
                <p className="font-serif text-sm font-semibold text-stone-900">{styleDna.archetype}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Color Spectrum</span>
                  <p className="font-medium text-stone-800 text-[11px]">{styleDna.colorPalette}</p>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase text-stone-400 tracking-wider block">Price Affinity</span>
                  <p className="font-medium text-stone-800 text-[11px]">{styleDna.preferredPriceBand}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase text-stone-400 tracking-wider font-semibold block">Fabric Affinity Scores</span>
                {Object.entries(styleDna.affinityMetrics).map(([k, v], idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-stone-100">
                    <span className="text-stone-600 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-mono text-stone-900 font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLV Predictive Modeling (7 cols) */}
        {clvData && (
          <div className="lg:col-span-7 bg-white p-6 border border-stone-200 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-emerald-700" />
                <h3 className="font-serif text-lg uppercase tracking-tight text-stone-900">
                  Customer Lifetime Value (CLV) Prediction
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                Velocity {clvData.growthVelocity}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Predicted 365-Day CLV</span>
                <p className="text-2xl font-serif text-stone-900">LKR {clvData.predicted365DayCLV.toLocaleString()}</p>
                <p className="text-[11px] text-stone-500 font-sans">Historical Spend: LKR {clvData.currentHistoricalSpend.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Churn Risk Prediction</span>
                <p className="text-2xl font-serif text-emerald-600">{clvData.churnRiskIndex}</p>
                <p className="text-[11px] text-stone-500 font-sans">AI Retention: High Affinity VIP</p>
              </div>
            </div>

            <div className="p-3.5 bg-stone-900 text-stone-100 text-xs font-sans space-y-1">
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider">AI Suggested Action:</span>
              <p className="text-stone-300 text-[11px]">{clvData.suggestedRetentionAction}</p>
              <p className="text-stone-400 text-[10px] pt-1">{clvData.tierProgressionMilestone}</p>
            </div>
          </div>
        )}

      </div>

      {/* --- MODULE 4: FASHION TREND INTELLIGENCE & VELOCITY --- */}
      {trendData && (
        <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
            <TrendingUp className="w-5 h-5 text-stone-800" />
            <h3 className="font-serif text-2xl uppercase tracking-tight text-stone-900">
              Macro Trend Velocity & Color Sentiment Radar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trend Velocity List */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                Garment Silhouette Velocity (QoQ)
              </span>
              {trendData.macroTrends.map((tr, idx) => (
                <div key={idx} className="p-3 bg-stone-50 border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-serif font-medium text-stone-900">{tr.trendName}</p>
                    <p className="text-[10px] text-stone-500 font-sans">{tr.sentiment}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-semibold text-xs ${tr.velocity.startsWith('+') ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {tr.velocity}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider block text-stone-400">{tr.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Market Share */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
                Curated Color Wavelength Demand Share
              </span>
              <div className="space-y-2.5">
                {trendData.colorVelocity.map((cv, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-stone-700">{cv.color}</span>
                      <span className="font-mono text-stone-900 font-semibold">{cv.share}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 overflow-hidden">
                      <div className="bg-stone-900 h-full" style={{ width: cv.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIP Tier Progression */}
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

        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-stone-700 font-medium">Current Status: <strong className="text-stone-900">Haute Privé VIP</strong> (LKR 285,000 spend)</span>
            <span className="text-stone-500 font-mono">LKR 215,000 to Black Bespoke</span>
          </div>
          <div className="w-full bg-stone-100 h-2.5 overflow-hidden">
            <div className="bg-stone-900 h-full w-[57%] transition-all duration-700" />
          </div>
        </div>

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
      </div>

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