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
  Headphones,
  Heart,
  Eye,
  Check,
  Compass
} from 'lucide-react';
import { DEPARTMENTS, SUB_CATEGORIES, PRODUCTS as INITIAL_PRODUCTS } from './data/products';

export default function App() {
  // Navigation: 'shop' | 'wishlist' | 'track' | 'checkout' | 'faq' | 'contact' | 'admin'
  const [currentPage, setCurrentPage] = useState('shop');
  const [activeDept, setActiveDept] = useState('women');
  const [selectedSub, setSelectedSub] = useState('All Women');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Store & Product State
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product Detail Modal
  
  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Checkout & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastPlacedOrderId, setLastPlacedOrderId] = useState(null);

  // Form States (Clean Controlled Placeholders)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    postal: '',
    city: '',
    cardNumber: '',
    expDate: '',
    cvc: ''
  });

  // Admin & Orders State
  const [ordersList, setOrdersList] = useState([
    { id: 'ORD-9021', email: 'customer1@example.com', name: 'Alexander Wright', address: '123 High Street', postal: '10001', phone: '+1 555-0192', date: '2026-08-19', status: 'Delivered', price: 145.00 },
    { id: 'ORD-9022', email: 'customer2@example.com', name: 'Sophia Miller', address: '45 Park Avenue', postal: '90210', phone: '+1 555-0144', date: '2026-08-20', status: 'Shipped', price: 210.00 },
    { id: 'ORD-9023', email: 'customer3@example.com', name: 'Liam Davies', address: '18 Victoria Road', postal: 'SW1A', phone: '+44 20 7946', date: '2026-08-20', status: 'Processing', price: 82.00 }
  ]);

  // AI Fit State
  const [userHeight, setUserHeight] = useState('172');
  const [userWeight, setUserWeight] = useState('65');
  const [fitPreference, setFitPreference] = useState('regular');
  const [recommendation, setRecommendation] = useState(null);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your StyleSense AI Stylist. Ask me about outfits, size predictions, or style recommendations!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // FAQ Accordion Toggle
  const [openFaq, setOpenFaq] = useState(null);

  // Department Selection Handler
  const handleSelectDepartment = (deptId) => {
    setActiveDept(deptId);
    setSelectedSub(SUB_CATEGORIES[deptId] ? SUB_CATEGORIES[deptId][0] : 'All');
    setCurrentPage('shop');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Products
  const filteredProducts = productsList.filter((p) => {
    const matchesDept = p.department === activeDept;
    const matchesSub = selectedSub.startsWith('All') || p.subCategory === selectedSub;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSub && matchesSearch;
  });

  // Wishlist Toggle
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Cart Handlers
  const addToCart = (product, chosenSize) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: chosenSize || product.sizes[0] }];
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
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      address: formData.address,
      postal: formData.postal,
      phone: formData.phone,
      date: '2026-08-20',
      status: 'Placed',
      price: finalTotal
    };
    setOrdersList([newOrder, ...ordersList]);
    setLastPlacedOrderId(orderId);
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
      reason: `Calibrated for ${userHeight}cm & ${w}kg in a modern ${fitPreference} cut.`
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
        <span>Use code <strong>STYLESENSE20</strong> for 20% OFF across all collections! Free Global Express Shipping</span>
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

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <button onClick={() => handleSelectDepartment('women')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'women' ? 'text-[#06B6D4] font-bold' : ''}`}>Women</button>
              <button onClick={() => handleSelectDepartment('men')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'men' ? 'text-[#06B6D4] font-bold' : ''}`}>Men</button>
              <button onClick={() => handleSelectDepartment('kids')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'kids' ? 'text-[#06B6D4] font-bold' : ''}`}>Kids</button>
              <button onClick={() => handleSelectDepartment('shoes')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'shoes' ? 'text-[#06B6D4] font-bold' : ''}`}>Shoes</button>
              <button onClick={() => handleSelectDepartment('handbags')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'handbags' ? 'text-[#06B6D4] font-bold' : ''}`}>Bags</button>
              <button onClick={() => handleSelectDepartment('cosmetics')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'shop' && activeDept === 'cosmetics' ? 'text-[#06B6D4] font-bold' : ''}`}>Beauty</button>
              <button onClick={() => setCurrentPage('track')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'track' ? 'text-[#06B6D4] font-bold' : ''}`}>Track Order</button>
              <button onClick={() => setCurrentPage('faq')} className={`hover:text-[#06B6D4] transition-colors ${currentPage === 'faq' ? 'text-[#06B6D4] font-bold' : ''}`}>FAQ</button>
              <button onClick={() => setCurrentPage('admin')} className={`px-3 py-1 rounded-full border border-cyan-500/30 text-[#06B6D4] hover:bg-cyan-500/10 transition-colors ${currentPage === 'admin' ? 'bg-cyan-500/20 font-bold' : ''}`}>Admin</button>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('wishlist')}
                className={`relative p-2.5 rounded-full border transition-all ${currentPage === 'wishlist' ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-rose-400'}`}
              >
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

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
          PAGE 1: MAIN SHOP WITH DRESS HERO & CATEGORY BOXES
         ======================================================== */}
      {currentPage === 'shop' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          
          {/* HERO BANNER */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#0A1526] to-slate-900 border border-slate-800 p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Haute Couture & AI Atelier 2026
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

            <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80" 
                alt="Haute Couture Fashion Dress" 
                className="relative z-10 w-full h-full object-cover rounded-3xl border border-slate-700/60 shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* LARGE VISUAL DEPARTMENT BOXES */}
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

          {/* PRODUCT CATALOG */}
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

            {/* Sub-Category Filter Pills */}
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

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => {
                const isWishlisted = wishlist.some(w => w.id === p.id);
                return (
                  <div 
                    key={p.id}
                    className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden hover:border-[#06B6D4]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-500/5"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => setSelectedProduct(p)}
                      />
                      {p.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#050B14]/85 backdrop-blur-md text-[#06B6D4] border border-cyan-500/30 font-mono">
                          {p.badge}
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button 
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isWishlisted ? 'bg-rose-500 text-white' : 'bg-slate-950/70 text-slate-300 hover:text-rose-400'
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                      </button>

                      {/* Quick View Overlay Button */}
                      <button 
                        onClick={() => setSelectedProduct(p)}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5 text-cyan-400" /> Quick View
                      </button>
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
                        <h3 
                          onClick={() => setSelectedProduct(p)}
                          className="font-bold text-white text-sm group-hover:text-[#06B6D4] transition-colors line-clamp-1 cursor-pointer"
                        >
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
                );
              })}
            </div>
          </div>

        </main>
      )}

      {/* ========================================================
          PAGE 2: DEDICATED WISHLIST VIEW
         ======================================================== */}
      {currentPage === 'wishlist' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="h-6 w-6 text-rose-500 fill-rose-500" /> Saved Items & Wishlist
              </h2>
              <p className="text-xs text-slate-400">Manage your favorite curated designer pieces.</p>
            </div>
            <button onClick={() => setCurrentPage('shop')} className="px-4 py-2 bg-slate-800 text-xs font-semibold rounded-xl text-slate-300 hover:text-white">
              Back to Store
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Heart className="h-12 w-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">Your wishlist is currently empty.</p>
              <button onClick={() => setCurrentPage('shop')} className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
                Explore Collections
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(p => (
                <div key={p.id} className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                  <img src={p.image} alt={p.name} className="aspect-[4/5] object-cover" />
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-white text-xs truncate">{p.name}</h4>
                    <p className="text-sm font-bold text-cyan-400">${p.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(p)} className="flex-1 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1">
                        <ShoppingBag className="h-3.5 w-3.5" /> Move to Cart
                      </button>
                      <button onClick={() => toggleWishlist(p)} className="p-2 bg-slate-800 text-rose-400 rounded-xl hover:bg-slate-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ========================================================
          PAGE 3: LIVE ORDER TRACKING TIMELINE
         ======================================================== */}
      {currentPage === 'track' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
              <Compass className="h-7 w-7 text-cyan-400" /> Live Order Tracking
            </h2>
            <p className="text-xs text-slate-400">Track real-time shipment status and dispatch progress.</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Tracking Reference</span>
                <p className="text-xl font-bold font-mono text-cyan-400">{lastPlacedOrderId || 'ORD-9022'}</p>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
                <Truck className="h-4 w-4" /> Status: In Transit
              </div>
            </div>

            {/* 6-Stage Tracking Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
              {[
                { stage: '1. Placed', done: true },
                { stage: '2. Confirmed', done: true },
                { stage: '3. Processing', done: true },
                { stage: '4. Shipped', done: true },
                { stage: '5. Out for Delivery', done: false },
                { stage: '6. Delivered', done: false }
              ].map((step, idx) => (
                <div key={idx} className="space-y-2">
                  <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center border-2 ${
                    step.done ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-600'
                  }`}>
                    {step.done ? <Check className="h-5 w-5 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className={`text-[11px] font-semibold ${step.done ? 'text-white' : 'text-slate-500'}`}>{step.stage}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Estimated Delivery Date:</span>
              <strong className="text-cyan-400">Friday, August 21, 2026 (Priority Express)</strong>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================
          PAGE 4: CLEAN CHECKOUT & PAYMENT PORTAL
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
                Order ID <strong className="text-cyan-400 font-mono">{lastPlacedOrderId}</strong> has been logged to the system.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button 
                  onClick={() => setCurrentPage('track')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Track Shipment
                </button>
                <button 
                  onClick={() => { setOrderSuccess(false); setCurrentPage('shop'); }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6 bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-cyan-400" /> Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">First Name *</label>
                    <input 
                      required 
                      placeholder="e.g. John" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Last Name *</label>
                    <input 
                      required 
                      placeholder="e.g. Doe" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Phone Number *</label>
                    <input 
                      required 
                      placeholder="e.g. +94 77 123 4567" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="e.g. user@example.com" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Street Address *</label>
                    <input 
                      required 
                      placeholder="e.g. 123 Luxury Boulevard, Suite 400" 
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Postal Code *</label>
                    <input 
                      required 
                      placeholder="e.g. 10001" 
                      value={formData.postal}
                      onChange={e => setFormData({...formData, postal: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">City / State *</label>
                    <input 
                      required 
                      placeholder="e.g. New York / Colombo" 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500" 
                    />
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
                    <span className="text-[10px] text-cyan-400 font-mono">256-Bit SSL Encrypted</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="col-span-2">
                      <input 
                        placeholder="Card Number: •••• •••• •••• ••••" 
                        value={formData.cardNumber}
                        onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs focus:border-cyan-500" 
                      />
                    </div>
                    <input 
                      placeholder="MM / YY" 
                      value={formData.expDate}
                      onChange={e => setFormData({...formData, expDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs focus:border-cyan-500" 
                    />
                    <input 
                      placeholder="CVC / CVV" 
                      value={formData.cvc}
                      onChange={e => setFormData({...formData, cvc: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs focus:border-cyan-500" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:bg-[#22D3EE] transition-all">
                  Confirm & Place Order (${finalTotal.toFixed(2)})
                </button>
              </form>

              {/* Order Valuation Summary */}
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
          PAGE 5: FAQ & CONTACT
         ======================================================== */}
      {currentPage === 'faq' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about shipments, AI fitting, and returns.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'What are the delivery dispatch times?', a: 'Standard Delivery takes 2-4 business days. Priority Express Overnight delivers within 24 hours.' },
              { q: 'How does the StyleSense AI Sizing Matrix work?', a: 'Our neural algorithm computes physical geometry against height, weight, and silhouette preference to deliver 98% sizing precision.' },
              { q: 'What is the return policy?', a: 'We provide a 30-day hassle-free return and exchange policy on all non-damaged items.' },
              { q: 'What payment options are accepted?', a: 'We accept all major Visa, Mastercard, American Express, and SSL encrypted bank payments.' }
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
          MODAL 1: PRODUCT DETAIL QUICK-VIEW MODAL
         ======================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-[#0F172A] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden z-10 flex flex-col sm:flex-row gap-6">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg">
              <X className="h-5 w-5" />
            </button>

            <div className="w-full sm:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full sm:w-1/2 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{selectedProduct.subCategory}</span>
                <h3 className="text-xl font-bold text-white leading-snug">{selectedProduct.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="font-bold">{selectedProduct.rating}</span>
                  <span className="text-slate-500">({selectedProduct.reviewsCount} customer reviews)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{selectedProduct.description}</p>
                
                {/* Available Sizes */}
                <div className="pt-2">
                  <span className="text-xs text-slate-300 font-semibold block mb-1.5">Available Sizes:</span>
                  <div className="flex gap-2">
                    {selectedProduct.sizes?.map(sz => (
                      <span key={sz} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-cyan-400">{sz}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">${selectedProduct.price.toFixed(2)}</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> In Stock
                  </span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-3.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: SHOPPING CART DRAWER
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
          MODAL 3: AI BESPOKE SIZE RECOMMENDER
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
          FLOATING AI CONCIERGE CHATBOT
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
          MULTI-COLUMN FOOTER
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
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Help & Tracking</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('track')} className="hover:text-cyan-400">Track My Order</button></li>
              <li><button onClick={() => setCurrentPage('wishlist')} className="hover:text-cyan-400">My Wishlist</button></li>
              <li><button onClick={() => setCurrentPage('faq')} className="hover:text-cyan-400">FAQ & Returns</button></li>
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