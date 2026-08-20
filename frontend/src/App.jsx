import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Bot, 
  SlidersHorizontal, 
  Search, 
  Star, 
  Trash2, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight,
  CheckCircle2,
  Tag,
  Layers
} from 'lucide-react';
import { DEPARTMENTS, SUB_CATEGORIES, PRODUCTS } from './data/products';

export default function App() {
  // Navigation Flow: 'welcome' (Hero Landing) -> 'hub' (Large Department Boxes) -> 'department' (Detailed Catalog)
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [activeDept, setActiveDept] = useState('women');
  const [selectedSub, setSelectedSub] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // AI Fit State
  const [userHeight, setUserHeight] = useState('172');
  const [userWeight, setUserWeight] = useState('65');
  const [fitPreference, setFitPreference] = useState('regular');
  const [recommendation, setRecommendation] = useState(null);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your StyleSense AI Stylist. Ask me what to wear for a date night, casual dinner, or business gala!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Enter a specific department
  const enterDepartment = (deptId) => {
    setActiveDept(deptId);
    setSelectedSub(SUB_CATEGORIES[deptId] ? SUB_CATEGORIES[deptId][0] : 'All');
    setCurrentScreen('department');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Products inside active department
  const currentProducts = PRODUCTS.filter((p) => {
    const matchesDept = p.department === activeDept;
    const matchesSub = selectedSub.startsWith('All') || p.subCategory === selectedSub;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSub && matchesSearch;
  });

  // Cart Management
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.sizes[0] }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // AI Size Matcher
  const calculateRecommendation = () => {
    const w = parseFloat(userWeight);
    let size = 'M';
    if (w < 55) size = 'XS';
    else if (w < 65) size = 'S';
    else if (w < 78) size = 'M';
    else if (w < 90) size = 'L';
    else size = 'XL';

    if (fitPreference === 'oversized' && size !== 'XL') {
      const sizes = ['XS', 'S', 'M', 'L', 'XL'];
      size = sizes[sizes.indexOf(size) + 1] || size;
    }

    setRecommendation({
      size,
      confidence: '98%',
      reason: `Optimized for ${userHeight}cm & ${w}kg in a modern ${fitPreference} fit.`
    });
  };

  // AI Chatbot
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let botReply = "I recommend pairing our Silk Blend Emerald Maxi Dress with the Quilted Leather Crossbody for an effortlessly chic look!";
      const lower = userText.toLowerCase();
      if (lower.includes('bag') || lower.includes('handbag')) {
        botReply = "Our Quilted Lambskin Gold Chain Bag in Noir Black elevates both daytime tailoring and gala evening wear.";
      } else if (lower.includes('men') || lower.includes('suit') || lower.includes('tshirt')) {
        botReply = "For men, our 280 GSM Heavyweight Washed Graphic Tee with Chinos creates a razor-sharp modern aesthetic.";
      } else if (lower.includes('kid') || lower.includes('child')) {
        botReply = "Our Kids Organic Dino Tees are crafted from 100% hypoallergenic combed cotton for sensitive skin.";
      } else if (lower.includes('glow') || lower.includes('serum') || lower.includes('skincare')) {
        botReply = "The 24K Botanical Radiance Glow Serum gives an instant dewy glass-skin finish before applying makeup.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* 1. TOP PROMO BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 py-2 px-4 text-center text-xs font-semibold tracking-wide text-slate-950 flex items-center justify-center gap-2">
        <Tag className="h-3.5 w-3.5" />
        <span>StyleSense Special: Enjoy 20% OFF across all Women, Men, Kids & Shoe collections!</span>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentScreen('welcome')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                StyleSense
              </span>
              <span className="text-[10px] text-emerald-400 font-bold ml-1.5 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 uppercase tracking-wider">
                AI STUDIO
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search dresses, graphic tees, shoes, serums, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Hubs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen('hub')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
            >
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Department Hub</span>
            </button>

            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-semibold transition-all shadow-sm"
            >
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
              <span className="hidden sm:inline">AI Size Matcher</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] flex items-center justify-center animate-pulse shadow-md">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== SCREEN 1: DEDICATED WELCOME HERO PAGE ==================== */}
      {currentScreen === 'welcome' && (
        <div className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden px-4">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 py-16">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-medium tracking-wide text-emerald-400 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen AI E-Commerce Fashion Platform</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Intelligent Style for the <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                Modern Persona
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore curated designer collections across Women, Men, Shoes, Bags, and Beauty with smart AI sizing and real-time personal styling.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentScreen('hub')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Enter Studio Collections</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => enterDepartment('women')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold text-sm transition-all"
              >
                Explore Women's Atelier
              </button>
            </div>

            {/* Value Proposition Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-800/80 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Truck className="h-4 w-4 text-emerald-400" /> Free Global Express Shipping
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Sparkles className="h-4 w-4 text-emerald-400" /> Smart AI Size Recommendation
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> 100% Genuine Authenticated
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== SCREEN 2: LARGE VISUAL DEPARTMENT CARDS ==================== */}
      {currentScreen === 'hub' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Select Department</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">The StyleSense Sanctuary</h2>
            <p className="text-xs text-slate-400">Choose your specialized atelier to explore tailored fashion collections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                onClick={() => enterDepartment(dept.id)}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500/60 transition-all duration-700 shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-end p-8"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                  style={{ backgroundImage: `url(${dept.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] tracking-wider text-emerald-400 font-mono uppercase bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
                    {dept.itemCount}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {dept.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-2 transition-transform">
                    <span>Enter Atelier</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==================== SCREEN 3: SPECIALIZED DEPARTMENT CATALOG ==================== */}
      {currentScreen === 'department' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <button
              onClick={() => setCurrentScreen('hub')}
              className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Department Hubs</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>StyleSense</span>
              <span>/</span>
              <span className="text-emerald-400 capitalize font-bold">{activeDept} Collection</span>
            </div>
          </div>

          {/* Department Header & Sub-Category Pills */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white capitalize">
              {activeDept}’s Curated Atelier
            </h2>

            {/* Sub-Category Filter Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {SUB_CATEGORIES[activeDept]?.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedSub === sub
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800">
              <p className="text-slate-400 text-sm">No items found matching this filter.</p>
              <button
                onClick={() => setSelectedSub(SUB_CATEGORIES[activeDept][0])}
                className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold"
              >
                Reset Atelier Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((p) => (
                <div 
                  key={p.id}
                  className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-500/5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wider">{p.subCategory}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{p.rating}</span>
                          <span className="text-slate-500 text-[11px]">({p.reviewsCount})</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-white">${p.price.toFixed(2)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate-500 line-through ml-2">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 5. SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">Your cart is currently empty.</div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 items-center justify-between">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                          <p className="text-xs text-emerald-400 font-bold mt-0.5">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQty(item.id, -1)} className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-xs">-</button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-xs">+</button>
                          </div>
                        </div>
                        <button onClick={() => updateQty(item.id, -item.quantity)} className="p-2 text-rose-400 hover:text-rose-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Valuation</span>
                    <span className="text-xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. AI SIZE RECOMMENDER MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsAiModalOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">AI Bespoke Size Atelier</h3>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Height: <strong className="text-white">{userHeight} cm</strong></label>
                <input type="range" min="140" max="210" value={userHeight} onChange={e => setUserHeight(e.target.value)} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Weight: <strong className="text-white">{userWeight} kg</strong></label>
                <input type="range" min="40" max="130" value={userWeight} onChange={e => setUserWeight(e.target.value)} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Preferred Fit Silhouette</label>
                <div className="grid grid-cols-3 gap-2">
                  {['slim', 'regular', 'oversized'].map(f => (
                    <button key={f} onClick={() => setFitPreference(f)} className={`py-2 rounded-xl capitalize font-medium border ${fitPreference === f ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculateRecommendation} className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all">
                Compute Precise AI Fit
              </button>

              {recommendation && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Recommended Size:</span>
                    <span className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {recommendation.size}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{recommendation.reason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 7. FLOATING AI VIRTUAL STYLIST CHATBOT */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-transform"
      >
        <Bot className="h-6 w-6" />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span className="font-bold text-xs text-white">StyleSense AI Concierge</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-emerald-500 text-slate-950 font-medium rounded-br-none' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none font-light'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask for fashion advice..."
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <button onClick={sendMessage} className="p-2 bg-emerald-500 text-slate-950 rounded-xl font-bold">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}