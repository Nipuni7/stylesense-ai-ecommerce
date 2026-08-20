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
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Tag,
  CreditCard,
  Mail,
  Phone,
  Clock,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Plus,
  Headphones
} from 'lucide-react';
import { DEPARTMENTS, SUB_CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from './data/products';

export default function App() {
  // Navigation: 'shop' | 'checkout' | 'faq' | 'contact' | 'admin'
  const [currentPage, setCurrentPage] = useState('shop');
  const [activeDept, setActiveDept] = useState('women'); // Defaulted to Women
  const [selectedSub, setSelectedSub] = useState('All Women');
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
    { id: 'ORD-9022', email: 'theekshana@stylesense.studio', name: 'P.G.N. Theekshana', address: 'No.45, Galle Road, Colombo', postal: '00300', phone: '0719876543', date: '2026-08-20', status: 'Processing', price: 210.00 },
    { id: 'ORD-9023', email: 'saman@yahoo.com', name: 'Saman Kumara', address: 'No.18, Kandy Road, Kiribathgoda', postal: '11600', phone: '0776543456', date: '2026-08-20', status: 'Shipped', price: 82.00 }
  ]);

  // AI Fit State
  const [userHeight, setUserHeight] = useState('172');
  const [userWeight, setUserWeight] = useState('65');
  const [fitPreference, setFitPreference] = useState('regular');
  const [recommendation, setRecommendation] = useState(null);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your StyleSense AI Stylist. Ask me about outfits, size predictions, or curated department picks!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // FAQ Accordion Toggle
  const [openFaq, setOpenFaq] = useState(null);

  // Click Department Box Handler (Smooth scroll directly to products)
  const handleSelectDepartment = (deptId) => {
    setActiveDept(deptId);
    setSelectedSub(SUB_CATEGORIES[deptId] ? SUB_CATEGORIES[deptId][0] : 'All');
    setCurrentPage('shop');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Products strictly by active department
  const filteredProducts = productsList.filter((p) => {
    const matchesDept = p.department === activeDept;
    const matchesSub = selectedSub.startsWith('All') || p.subCategory === selectedSub;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSub && matchesSearch;
  });

  // Cart Handlers
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
      reason: `Calibrated for ${userHeight}cm & ${w}kg in a modern ${fitPreference} fit.`
    });
  };

  // AI Chatbot
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let botReply = "I recommend checking out our Silk Blend Emerald Maxi Dress or Structured Power Blazer for an effortless look!";
      const lower = userText.toLowerCase();
      if (lower.includes('women') || lower.includes('dress') || lower.includes('frock')) {
        botReply = "For Women, our Silk Emerald Maxi Dress and Floral Sundresses are our highest-rated pieces!";
      } else if (lower.includes('men') || lower.includes('shirt')) {
        botReply = "For men, our 280 GSM Heavyweight Washed Graphic Tee paired with the Oxford Cotton Button-Down is trending.";
      } else if (lower.includes('checkout') || lower.includes('order')) {
        botReply = "You can proceed to Checkout from the Cart drawer and use code STYLESENSE20 for 20% off!";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-[#E2E8F0] selection:bg-[#06B6D4] selection:text-black font-sans flex flex-col justify-between">
      
      {/* 1. TOP PROMO BANNER */}
      <div className="bg-gradient-to-r from-[#0891B2] via-[#06B6D4] to-[#0D9488] py-2 px-4 text-center text-xs font-bold tracking-wide text-slate-950 flex items-center justify-center gap-2">
        <Tag className="h-3.5 w-3.5 fill-slate-950" />
        <span>Use code <strong>STYLESENSE20</strong> for 20% OFF across Women, Men, Kids & Footwear collections!</span>
      </div>

      {/* 2. FLOATING PROFESSIONAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#050B14]/85 backdrop-blur-xl border-b border-[#1E293B] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F172A]/90 border border-slate-800 rounded-full px-6 py-2.5 flex items-center justify-between shadow-xl">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleSelectDepartment('women')}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#06B6D4] to-[#0284C7] flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Sparkles className="h-5 w-5 text-slate-950" />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#06B6D4] bg-clip-text text-transparent">
                StyleSense
              </span>
            </div>

            {/* Nav Links (Direct Department Tabs) */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
              <button onClick={() => handleSelectDepartment('women')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'women' ? 'text-[#06B6D4] font-bold' : ''}`}>Women</button>
              <button onClick={() => handleSelectDepartment('men')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'men' ? 'text-[#06B6D4] font-bold' : ''}`}>Men</button>
              <button onClick={() => handleSelectDepartment('kids')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'kids' ? 'text-[#06B6D4] font-bold' : ''}`}>Kids</button>
              <button onClick={() => handleSelectDepartment('shoes')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'shoes' ? 'text-[#06B6D4] font-bold' : ''}`}>Shoes</button>
              <button onClick={() => handleSelectDepartment('handbags')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'handbags' ? 'text-[#06B6D4] font-bold' : ''}`}>Handbags</button>
              <button onClick={() => handleSelectDepartment('cosmetics')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'cosmetics' ? 'text-[#06B6D4] font-bold' : ''}`}>Cosmetics</button>
              <button onClick={() => setCurrentPage('contact')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'contact' ? 'text-[#06B6D4] font-bold' : ''}`}>Contact</button>
              <button onClick={() => setCurrentPage('faq')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'faq' ? 'text-[#06B6D4] font-bold' : ''}`}>FAQ</button>
              <button onClick={() => setCurrentPage('admin')} className={`px-3 py-1 rounded-full border border-cyan-500/30 text-[#06B6D4] hover:bg-cyan-500/10 transition-colors ${currentPage === 'admin' ? 'bg-cyan-500/20 font-bold' : ''}`}>Admin</button>
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
          PAGE 1: MAIN SHOP WITH DRESS HERO & DIRECT CATEGORY BOXES
         ======================================================== */}
      {currentPage === 'shop' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          
          {/* HERO BANNER SECTION */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0A1526] to-slate-900 border border-slate-800 p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Haute Couture & Modern Atelier 2026
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                Elevate Your Style <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">
                  Wear with Elegance
                </span>
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Find your perfect attire across silk evening gowns, tailored blazers, and luxury essentials tailored with precision AI fit algorithms.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={() => handleSelectDepartment('women')} 
                  className="px-6 py-3 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs hover:bg-[#22D3EE] transition-all shadow-lg shadow-cyan-500/20"
                >
                  Explore Women's Dresses
                </button>
                <button 
                  onClick={() => setIsAiModalOpen(true)} 
                  className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs hover:bg-slate-700 transition-all"
                >
                  AI Fit Matcher
                </button>
              </div>
            </div>

            {/* High-Fashion Silk Dress Hero Image */}
            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80" 
                alt="Haute Couture Fashion Dress" 
                className="relative z-10 w-full h-full object-cover rounded-3xl border border-slate-700/60 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* ========================================================
              LARGE VISUAL DEPARTMENT BOXES
             ======================================================== */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Select Department Sanctuary</h2>
                <p className="text-xs text-slate-400 mt-1">Click any category box below to dive directly into its curated item catalog.</p>
              </div>
              <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-wider hidden sm:block">6 Curated Ateliers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept.id)}
                  className={`group relative h-80 rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 shadow-xl flex flex-col justify-end p-7 ${
                    activeDept === dept.id ? 'border-[#06B6D4] ring-2 ring-[#06B6D4]/30' : 'border-slate-800 hover:border-[#06B6D4]'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                    style={{ backgroundImage: `url(${dept.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/65 to-transparent" />

                  <div className="relative z-10 space-y-1.5">
                    <span className="text-[10px] tracking-wider text-[#06B6D4] font-mono uppercase bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/30 font-semibold">
                      {dept.itemCount}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                      {dept.tagline}
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#06B6D4] group-hover:translate-x-2 transition-transform">
                      <span>Explore Collection</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================
              DETAILED PRODUCT CATALOG (DIRECT ACTIVE DEPARTMENT)
             ======================================================== */}
          <div id="catalog-section" className="space-y-6 pt-6 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white capitalize">
                  {activeDept} Atelier
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Showing {filteredProducts.length} items in <span className="text-[#06B6D4] font-semibold">{selectedSub}</span>
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder={`Search in ${activeDept}...`} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Sub-Category Pills for Active Department */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {(SUB_CATEGORIES[activeDept] || ['All']).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedSub === sub
                      ? 'bg-[#06B6D4] text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden hover:border-[#06B6D4]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-500/5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#050B14]/85 backdrop-blur-md text-[#06B6D4] border border-cyan-500/30 font-mono">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="text-[#06B6D4] text-[10px] font-bold uppercase">{p.subCategory}</span>
                        <div className="flex items-center gap-1 text-amber-400 font-medium">
                          <Star className="h-3 w-3 fill-amber-400" />
                          <span>{p.rating}</span>
                          <span className="text-[#64748B] text-[11px]">({p.reviewsCount})</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
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
                        className="px-3.5 py-1.5 rounded-xl bg-[#06B6D4] text-slate-950 text-xs font-bold hover:bg-[#22D3EE] transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10 active:scale-95"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* ========================================================
          PAGE 2: CHECKOUT & DELIVERY PORTAL
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
                Thank you for choosing StyleSense. Your dispatch tracking notification will arrive via SMS & Email.
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
                  <CreditCard className="h-5 w-5 text-cyan-400" /> Secure Payment
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

              {/* Summary */}
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
          PAGE 3: FAQ ACCORDION
         ======================================================== */}
      {currentPage === 'faq' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Answers to common questions about sizes, deliveries, and our AI stylists.</p>
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
          PAGE 4: CONTACT US
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
          PAGE 5: STORE ADMIN DASHBOARD & INVENTORY
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
                            <button onClick={() => updateQty(item.id, -1)} className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs hover:bg-[#334155]">-</button>
                            <span className="text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="px-2 py-0.5 bg-slate-800 text-white rounded text-xs hover:bg-[#334155]">+</button>
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
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#06B6D4] to-[#0284C7] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-slate-950" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">StyleSense Studio</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Next-generation AI-powered fashion platform engineered with neural sizing prediction, intelligent virtual stylist concierge, and curated luxury fashion.
            </p>
            <div className="text-[11px] text-slate-500">
              © 2026 StyleSense Studio. All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Departments</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleSelectDepartment('women')} className="hover:text-cyan-400">Women Dresses & Tops</button></li>
              <li><button onClick={() => handleSelectDepartment('men')} className="hover:text-cyan-400">Men Essentials</button></li>
              <li><button onClick={() => handleSelectDepartment('kids')} className="hover:text-cyan-400">Kids Atelier</button></li>
              <li><button onClick={() => handleSelectDepartment('shoes')} className="hover:text-cyan-400">Footwear</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Help & Info</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('faq')} className="hover:text-cyan-400">Frequently Asked Questions</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-cyan-400">Contact Support</button></li>
              <li><button onClick={() => setCurrentPage('checkout')} className="hover:text-cyan-400">Delivery & Checkout</button></li>
              <li><button onClick={() => setCurrentPage('admin')} className="hover:text-cyan-400">Store Admin</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Stay Updated</h4>
            <p className="text-[11px] text-slate-400">Get the latest fashion drop alerts and private VIP discount codes.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to StyleSense drop list!'); }} className="space-y-2">
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