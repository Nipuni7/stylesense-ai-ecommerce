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
  ChevronDown,
  CheckCircle2,
  Tag,
  Layers,
  CreditCard,
  Mail,
  Phone,
  Clock,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Plus,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { DEPARTMENTS, SUB_CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from './data/products';

export default function App() {
  // Navigation: 'shop' | 'collections' | 'checkout' | 'faq' | 'contact' | 'admin'
  const [currentPage, setCurrentPage] = useState('shop');
  const [activeDept, setActiveDept] = useState('all');
  const [selectedSub, setSelectedSub] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Store & Product State
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Checkout & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Admin Panel State
  const [ordersList, setOrdersList] = useState([
    { id: 'ORD-9021', email: 'contact@stylesense.studio', name: 'Senuka Chandunu', address: '123, Highlevel Road, Maharagama', postal: '69696', phone: '0771234567', date: '2026-08-19', status: 'Delivered', price: 145.00 },
    { id: 'ORD-9022', email: 'theekshana@law.ac.lk', name: 'P.G.N. Theekshana', address: 'No.45, Galle Road, Colombo', postal: '00300', phone: '0719876543', date: '2026-08-20', status: 'Processing', price: 210.00 },
    { id: 'ORD-9023', email: 'saman@yahoo.com', name: 'Saman Kumara', address: 'No.18, Kandy Road, Kiribathgoda', postal: '11600', phone: '0776543456', date: '2026-08-20', status: 'Shipped', price: 82.00 }
  ]);

  // AI Fit State
  const [userHeight, setUserHeight] = useState('172');
  const [userWeight, setUserWeight] = useState('65');
  const [fitPreference, setFitPreference] = useState('regular');
  const [recommendation, setRecommendation] = useState(null);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your StyleSense AI Stylist. Ask me about outfits, size predictions, or checkout orders!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // FAQ Accordion Toggle
  const [openFaq, setOpenFaq] = useState(null);

  // Filter Products
  const filteredProducts = productsList.filter((p) => {
    const matchesDept = activeDept === 'all' || p.department === activeDept;
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

  const subTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const finalTotal = Math.max(0, subTotal - discount);

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'STYLESENSE20') {
      setDiscount(subTotal * 0.2);
      setCouponApplied(true);
    } else {
      alert('Invalid Promo Code. Use STYLESENSE20 for 20% discount.');
    }
  };

  // Place Order Action
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      email: e.target.email.value,
      name: `${e.target.firstName.value} ${e.target.lastName.value}`,
      address: e.target.address.value,
      postal: e.target.postal.value,
      phone: e.target.phone.value,
      date: '2026-08-20',
      status: 'Placed',
      price: finalTotal
    };
    setOrdersList([newOrder, ...ordersList]);
    setOrderSuccess(true);
    setCart([]);
  };

  // AI Fit Recommendation
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
      reason: `Calibrated for ${userHeight}cm & ${w}kg in a sharp ${fitPreference} fit.`
    });
  };

  // AI Chatbot
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let botReply = "I recommend our Silk Blend Emerald Maxi Dress paired with Italian Chelsea Boots for a refined finish!";
      const lower = userText.toLowerCase();
      if (lower.includes('bag') || lower.includes('handbag')) {
        botReply = "Our Quilted Lambskin Chain Crossbody bag is tailored for modern sophistication.";
      } else if (lower.includes('men') || lower.includes('shirt')) {
        botReply = "For gentlemen, our Heavyweight Vintage Graphic Tee paired with the Oxford Cotton Button-Down is trending.";
      } else if (lower.includes('checkout') || lower.includes('order')) {
        botReply = "You can proceed to Checkout from the Cart drawer and use code STYLESENSE20 for 20% off!";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#060D17] text-[#E2E8F0] selection:bg-[#06B6D4] selection:text-black font-sans flex flex-col justify-between">
      
      {/* 1. TOP PROMOTIONAL ANNOUNCEMENT */}
      <div className="bg-gradient-to-r from-[#0284C7] via-[#06B6D4] to-[#0D9488] py-2 px-4 text-center text-xs font-bold tracking-wide text-slate-950 flex items-center justify-center gap-2">
        <Tag className="h-3.5 w-3.5 fill-slate-950" />
        <span>Use code <strong>STYLESENSE20</strong> for 20% OFF across all collections! Free Islandwide & Global Shipping</span>
      </div>

      {/* 2. FLOATING PROFESSIONAL PILL NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#060D17]/85 backdrop-blur-xl border-b border-slate-800/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A]/90 border border-slate-800 rounded-full px-6 py-2.5 flex items-center justify-between shadow-xl">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentPage('shop')}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#06B6D4] to-[#0284C7] flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Sparkles className="h-5 w-5 text-slate-950" />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#06B6D4] bg-clip-text text-transparent">
                StyleSense
              </span>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
              <button onClick={() => { setCurrentPage('shop'); setActiveDept('all'); }} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'all' ? 'text-[#06B6D4] font-bold' : ''}`}>Shop</button>
              <button onClick={() => { setCurrentPage('collections'); }} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'collections' ? 'text-[#06B6D4] font-bold' : ''}`}>Collections</button>
              <button onClick={() => { setCurrentPage('shop'); setSelectedSub('Trending'); }} className="hover:text-[#06B6D4] transition-colors">Sale</button>
              <button onClick={() => setCurrentPage('contact')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'contact' ? 'text-[#06B6D4] font-bold' : ''}`}>Contact Us</button>
              <button onClick={() => setCurrentPage('faq')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'faq' ? 'text-[#06B6D4] font-bold' : ''}`}>FAQ</button>
              <button onClick={() => setCurrentPage('admin')} className={`px-3 py-1 rounded-full border border-cyan-500/30 text-[#06B6D4] hover:bg-cyan-500/10 transition-colors ${currentPage === 'admin' ? 'bg-cyan-500/20 font-bold' : ''}`}>Admin Portal</button>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>AI Sizing</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 transition-all"
              >
                <ShoppingBag className="h-4 w-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#06B6D4] text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================
          PAGE 1: SHOP & HERO CAROUSEL VIEW
         ======================================================== */}
      {currentPage === 'shop' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* HERO BANNER SECTION */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border border-slate-800 p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Luxury AI Collection 2026
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                Elevate Your Style <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">
                  Walk in Prestige
                </span>
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Discover curated designer footwear, haute couture silk dresses, and streetwear tailored with precision AI fit algorithms.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={() => { setActiveDept('women'); setSelectedSub('All Women'); }} 
                  className="px-6 py-3 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs hover:bg-[#22D3EE] transition-all shadow-lg shadow-cyan-500/20"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => setIsAiModalOpen(true)} 
                  className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs hover:bg-slate-700 transition-all"
                >
                  AI Fit Analysis
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80" 
                alt="Featured Product" 
                className="relative z-10 w-full h-full object-cover rounded-2xl border border-slate-700/60 shadow-2xl rotate-[-4deg] hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>

          {/* DEPARTMENT PILL SELECTOR */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white tracking-tight">Explore Categories</h2>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search item..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {[{ id: 'all', name: '✨ All Departments' }, ...DEPARTMENTS].map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveDept(dept.id);
                    setSelectedSub(dept.id === 'all' ? 'All Items' : (SUB_CATEGORIES[dept.id] ? SUB_CATEGORIES[dept.id][0] : 'All'));
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeDept === dept.id
                      ? 'bg-[#06B6D4] text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>

            {/* Sub-Category Chips */}
            {activeDept !== 'all' && SUB_CATEGORIES[activeDept] && (
              <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-2 scrollbar-none">
                {SUB_CATEGORIES[activeDept].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSub(sub)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedSub === sub
                        ? 'bg-cyan-500/20 text-[#06B6D4] border border-cyan-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-[#06B6D4] border border-cyan-500/30">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="text-[#06B6D4] text-[10px] font-bold uppercase">{p.subCategory}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" />
                        <span>{p.rating}</span>
                        <span className="text-slate-500 text-[11px]">({p.reviewsCount})</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-sm group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
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
                      className="px-3.5 py-1.5 rounded-xl bg-[#06B6D4] text-slate-950 text-xs font-bold hover:bg-[#22D3EE] transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* ========================================================
          PAGE 2: COLLECTIONS SANCTUARY HUB
         ======================================================== */}
      {currentPage === 'collections' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">Maison Collections</span>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">The Curated Ateliers</h2>
            <p className="text-xs text-slate-400">Select any department to jump into dedicated designer collections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                onClick={() => {
                  setActiveDept(dept.id);
                  setSelectedSub(SUB_CATEGORIES[dept.id] ? SUB_CATEGORIES[dept.id][0] : 'All');
                  setCurrentPage('shop');
                }}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-[#06B6D4] transition-all duration-700 shadow-2xl flex flex-col justify-end p-8"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                  style={{ backgroundImage: `url(${dept.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] tracking-wider text-[#06B6D4] font-mono uppercase bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/30">
                    {dept.itemCount}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {dept.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#06B6D4] group-hover:translate-x-2 transition-transform">
                    <span>Enter Atelier</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================
          PAGE 3: CHECKOUT & DELIVERY PORTAL
         ======================================================== */}
      {currentPage === 'checkout' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button 
            onClick={() => setCurrentPage('shop')} 
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </button>

          {orderSuccess ? (
            <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-2xl">
              <CheckCircle2 className="h-16 w-16 text-cyan-400 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold text-white">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thank you for choosing StyleSense. Your tracking confirmation details have been dispatched.
              </p>
              <button 
                onClick={() => { setOrderSuccess(false); setCurrentPage('shop'); }}
                className="mt-4 px-6 py-3 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Details */}
              <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6 bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-cyan-400" /> Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">First Name *</label>
                    <input required name="firstName" defaultValue="Theekshana" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Last Name *</label>
                    <input required name="lastName" defaultValue="Gunathilaka" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Phone Number *</label>
                    <input required name="phone" defaultValue="0771234567" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address *</label>
                    <input required type="email" name="email" defaultValue="theekshana@stylesense.studio" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Street Address *</label>
                    <input required name="address" defaultValue="No 45, Baseline Road, Colombo 09" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Postal Code *</label>
                    <input required name="postal" defaultValue="00900" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">City / Region *</label>
                    <input required name="city" defaultValue="Colombo" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white pt-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-cyan-400" /> Payment Method
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" defaultChecked name="pay" className="accent-cyan-500" />
                      <span className="font-semibold text-white">Credit / Debit Card (Visa, MasterCard)</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono">256-Bit Encrypted</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="col-span-2">
                      <input placeholder="Card Number: 4242 •••• •••• 4242" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs" />
                    </div>
                    <input placeholder="MM / YY" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs" />
                    <input placeholder="CVC / CVV" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:bg-[#22D3EE] transition-all">
                  Confirm & Place Order (${finalTotal.toFixed(2)})
                </button>
              </form>

              {/* Order Summary & Coupon */}
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <h4 className="font-bold text-white text-sm pb-2 border-b border-slate-800">Order Summary</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {cart.length === 0 ? (
                      <p className="text-xs text-slate-500">Cart is empty.</p>
                    ) : (
                      cart.map(i => (
                        <div key={i.id} className="flex justify-between text-xs text-slate-300">
                          <span>{i.name} x {i.quantity}</span>
                          <span className="font-bold text-white">${(i.price * i.quantity).toFixed(2)}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>${subTotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-cyan-400 font-bold">
                        <span>Promo Discount (20%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Express Shipping</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-slate-800">
                      <span>Total</span>
                      <span className="text-cyan-400">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Box */}
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3 text-xs">
                  <label className="block text-slate-300 font-semibold">Enter Promo Code</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. STYLESENSE20" 
                      value={couponCode} 
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white uppercase focus:outline-none focus:border-cyan-500"
                    />
                    <button onClick={handleApplyCoupon} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl border border-cyan-500/30">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ========================================================
          PAGE 4: FAQ (FREQUENTLY ASKED QUESTIONS) ACCORDION
         ======================================================== */}
      {currentPage === 'faq' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Answers to common inquiries regarding delivery, sizing, and our AI stylists.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What are the delivery methods and dispatch times?', a: 'Standard Islandwide/Global Delivery takes 2-4 business days. Express Overnight Priority ships within 24 hours.' },
              { q: 'How does the StyleSense AI Sizing Matcher work?', a: 'Our neural sizing matrix analyzes your height, weight distribution, and preferred silhouette cut (slim, regular, oversized) to yield a 98% accurate fit.' },
              { q: 'Can I exchange or return an item?', a: 'Yes! We offer a 30-Day Hassle-Free Return and Exchange Guarantee on all non-damaged apparel and accessories.' },
              { q: 'What payment methods are supported on StyleSense?', a: 'We accept all major Visa, MasterCard, and direct digital payments with 256-Bit SSL protection.' },
              { q: 'How do I contact customer support?', a: 'Our concierge desk is operational 24/7 via live chatbot, or Monday-Friday 9am-5pm through our Contact Us portal.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-cyan-400"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================
          PAGE 5: CONTACT US & CUSTOMER CARE
         ======================================================== */}
      {currentPage === 'contact' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">We’re Always Here to Help</h2>
            <p className="text-xs text-slate-400">Reach out to our customer care team for order inquiries and personal styling assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Headphones className="h-5 w-5 text-cyan-400" /> Customer Support Center
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>Monday - Friday, 9:00 AM - 5:00 PM (UTC+05:30, Colombo)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>concierge@stylesense.studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-cyan-400" />
                  <span>+94 11 234 5678 / +94 77 987 6543</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300">
                ⚡ Live Chatbot concierge available 24/7 at the bottom right corner.
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Your message has been sent to our concierge desk!'); }} className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-4 text-xs">
              <h3 className="text-lg font-bold text-white">Send Us a Direct Message</h3>
              <div>
                <label className="block text-slate-400 mb-1">Your Full Name</label>
                <input required placeholder="Theekshana Gunathilaka" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Your Email</label>
                <input required type="email" placeholder="user@domain.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Message / Inquiry</label>
                <textarea required rows="4" placeholder="How can our styling team help you?" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#06B6D4] text-slate-950 font-bold rounded-xl hover:bg-[#22D3EE] transition-all">
                Send Inquiry
              </button>
            </form>
          </div>
        </main>
      )}

      {/* ========================================================
          PAGE 6: STORE ADMIN DASHBOARD & INVENTORY
         ======================================================== */}
      {currentPage === 'admin' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-cyan-400" /> Executive Admin Dashboard
              </h2>
              <p className="text-xs text-slate-400">Live transaction records & product inventory control</p>
            </div>
            <button onClick={() => setCurrentPage('shop')} className="px-4 py-2 bg-slate-800 text-xs font-semibold rounded-xl text-slate-300 hover:text-white">
              Back to Store
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5"><Package className="h-4 w-4 text-cyan-400" /> Total Orders</span>
              <p className="text-3xl font-black text-white">{ordersList.length}</p>
            </div>
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-emerald-400" /> Total Sales Revenue</span>
              <p className="text-3xl font-black text-emerald-400">${ordersList.reduce((s, o) => s + o.price, 0).toFixed(2)}</p>
            </div>
            <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5"><Users className="h-4 w-4 text-amber-400" /> Live Inventory Items</span>
              <p className="text-3xl font-black text-amber-400">{productsList.length}</p>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm">Recent Customer Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 pb-2">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Delivery Address</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ordersList.map(ord => (
                    <tr key={ord.id} className="text-slate-300">
                      <td className="py-3.5 font-mono text-cyan-400">{ord.id}</td>
                      <td className="py-3.5">{ord.name} <br/><span className="text-[10px] text-slate-500">{ord.email}</span></td>
                      <td className="py-3.5">{ord.address}</td>
                      <td className="py-3.5">{ord.date}</td>
                      <td className="py-3.5"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">{ord.status}</span></td>
                      <td className="py-3.5 text-right font-bold text-white">${ord.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Product Inventory Table */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Products Catalog Control</h3>
              <button 
                onClick={() => {
                  const name = prompt('Enter Product Name:');
                  const price = parseFloat(prompt('Enter Price ($):') || '50');
                  if (name) {
                    setProductsList([{
                      id: `custom-${Date.now()}`,
                      name,
                      department: 'women',
                      subCategory: 'Evening Dresses',
                      price,
                      rating: 5.0,
                      reviewsCount: 1,
                      badge: 'New',
                      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
                      description: 'Custom added catalog piece.',
                      sizes: ['S', 'M', 'L']
                    }, ...productsList]);
                  }
                }}
                className="px-3.5 py-1.5 bg-[#06B6D4] text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 pb-2">
                    <th className="pb-3 font-semibold">Product</th>
                    <th className="pb-3 font-semibold">Department</th>
                    <th className="pb-3 font-semibold">Price</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {productsList.map(prod => (
                    <tr key={prod.id} className="text-slate-300">
                      <td className="py-3 flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 rounded-lg object-cover" />
                        <span className="font-semibold text-white">{prod.name}</span>
                      </td>
                      <td className="py-3 capitalize text-cyan-400">{prod.department} ({prod.subCategory})</td>
                      <td className="py-3 font-bold text-white">${prod.price.toFixed(2)}</td>
                      <td className="py-3 text-right">
                        <button 
                          onClick={() => setProductsList(productsList.filter(p => p.id !== prod.id))}
                          className="px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30 hover:bg-rose-500/30 text-[11px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================
          SLIDE-OVER SHOPPING CART DRAWER
         ======================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0F172A] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#06B6D4]" />
                    <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">Your shopping bag is currently empty.</div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 items-center justify-between">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                          <p className="text-xs text-[#06B6D4] font-bold mt-0.5">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQty(item.id, -1)} className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs">-</button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs">+</button>
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
                    <span className="text-slate-400">Estimated Total</span>
                    <span className="text-xl font-bold text-[#06B6D4]">${subTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); setCurrentPage('checkout'); }}
                    className="w-full py-3.5 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:bg-[#22D3EE] transition-all"
                  >
                    Proceed to Delivery Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          AI BESPOKE SIZE RECOMMENDER MODAL
         ======================================================== */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => setIsAiModalOpen(false)} />
          <div className="relative bg-[#0F172A] border border-cyan-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#06B6D4]" />
                <h3 className="font-bold text-base text-white">AI Bespoke Size Atelier</h3>
              </div>
              <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Height: <strong className="text-white">{userHeight} cm</strong></label>
                <input type="range" min="140" max="210" value={userHeight} onChange={e => setUserHeight(e.target.value)} className="w-full accent-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Weight: <strong className="text-white">{userWeight} kg</strong></label>
                <input type="range" min="40" max="130" value={userWeight} onChange={e => setUserWeight(e.target.value)} className="w-full accent-cyan-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Preferred Silhouette Fit</label>
                <div className="grid grid-cols-3 gap-2">
                  {['slim', 'regular', 'oversized'].map(f => (
                    <button key={f} onClick={() => setFitPreference(f)} className={`py-2 rounded-xl capitalize font-semibold border ${fitPreference === f ? 'bg-cyan-500/20 border-[#06B6D4] text-[#06B6D4]' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculateRecommendation} className="w-full py-3.5 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:bg-[#22D3EE] transition-all">
                Compute Precise AI Fit
              </button>

              {recommendation && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Recommended Size:</span>
                    <span className="text-xl font-bold text-[#06B6D4] flex items-center gap-1">
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

      {/* ========================================================
          FLOATING AI VIRTUAL STYLIST CHATBOT
         ======================================================== */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-tr from-[#0891B2] via-[#06B6D4] to-[#0D9488] text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-transform"
      >
        <Bot className="h-6 w-6" />
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-[#0F172A] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#06B6D4]" />
              <span className="font-bold text-xs text-white">StyleSense AI Concierge</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#06B6D4] text-slate-950 font-semibold rounded-br-none' : 'bg-slate-950 border border-slate-800 text-[#E2E8F0] rounded-bl-none font-light'}`}>
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
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#06B6D4]"
            />
            <button onClick={sendMessage} className="p-2 bg-[#06B6D4] text-slate-950 rounded-xl font-bold">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          PROFESSIONAL MULTI-COLUMN FOOTER
         ======================================================== */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#06B6D4] to-[#0284C7] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">StyleSense Studio</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Next-generation AI-powered e-commerce platform engineered with neural sizing prediction, intelligent virtual stylist concierge, and curated luxury fashion.
            </p>
            <div className="text-[11px] text-slate-500">
              © 2026 StyleSense Studio. All rights reserved.
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Explore</h4>
            <ul className="space-y-2">
              <li><button onClick={() => { setCurrentPage('shop'); setActiveDept('all'); }} className="hover:text-cyan-400">New Arrivals</button></li>
              <li><button onClick={() => { setCurrentPage('collections'); }} className="hover:text-cyan-400">All Collections</button></li>
              <li><button onClick={() => { setCurrentPage('shop'); setSelectedSub('Trending'); }} className="hover:text-cyan-400">Trending Styles</button></li>
              <li><button onClick={() => setIsAiModalOpen(true)} className="hover:text-cyan-400">AI Size Predictor</button></li>
            </ul>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Departments</h4>
            <ul className="space-y-2">
              <li><button onClick={() => { setCurrentPage('shop'); setActiveDept('women'); }} className="hover:text-cyan-400">Women Haute Couture</button></li>
              <li><button onClick={() => { setCurrentPage('shop'); setActiveDept('men'); }} className="hover:text-cyan-400">Men Essentials</button></li>
              <li><button onClick={() => { setCurrentPage('shop'); setActiveDept('shoes'); }} className="hover:text-cyan-400">Luxury Footwear</button></li>
              <li><button onClick={() => { setCurrentPage('shop'); setActiveDept('cosmetics'); }} className="hover:text-cyan-400">Radiant Skincare</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Stay Updated</h4>
            <p className="text-[11px] text-slate-400">Get the latest fashion drop alerts and private VIP discount codes.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully to StyleSense VIP drop list!'); }} className="space-y-2">
              <input required type="email" placeholder="Enter your email address" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-xs" />
              <button type="submit" className="w-full py-2 bg-[#06B6D4] text-slate-950 font-bold rounded-xl hover:bg-[#22D3EE] transition-all text-xs">
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </footer>

    </div>
  );
}