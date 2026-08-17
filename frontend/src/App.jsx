import React, { useState } from 'react';
import { 
  Sparkles, ShoppingBag, Search, Camera, Bot, Shirt, 
  ArrowRight, Star, Heart, SlidersHorizontal 
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from './data/products';
import { AIStylistDrawer, VisualSearchModal, SizePredictorModal } from './components/AIModals';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Modals state
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isSizePredictorOpen, setIsSizePredictorOpen] = useState(false);

  const categories = ['All', 'Outerwear', 'Formal', 'Casual', 'Dresses', 'Bottoms'];

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              StyleSense<span className="text-indigo-400">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#catalog" className="hover:text-white transition">Catalog</a>
            <button 
              onClick={() => setIsStylistOpen(true)}
              className="hover:text-white transition flex items-center gap-1.5 text-indigo-400 font-semibold cursor-pointer"
            >
              <Bot className="w-4 h-4" /> AI Stylist
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsVisualSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition flex items-center gap-1 text-xs"
            >
              <Camera className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Visual Search</span>
            </button>

            <button className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-indigo-300 mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Next-Gen AI Fashion Experience
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Discover Your Signature Style with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Intelligent Fashion</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time personalized styling, smart sizing predictions, and image-based visual discovery powered by machine learning.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#catalog" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-semibold text-white shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition group">
              Explore Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <button 
              onClick={() => setIsVisualSearchOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
            >
              <Camera className="w-4 h-4 text-indigo-400" />
              Try Visual Search
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => setIsVisualSearchOpen(true)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4 group-hover:scale-110 transition">
              <Camera className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Visual Image Search</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload any outfit photo to instantly discover matching designs and tailored alternatives.
            </p>
          </div>

          <div 
            onClick={() => setIsStylistOpen(true)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 transition cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-4 group-hover:scale-110 transition">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">AI Personal Stylist</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interactive conversational styling recommendations tailored to your event and aesthetic.
            </p>
          </div>

          <div 
            onClick={() => setIsSizePredictorOpen(true)}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group"
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:scale-110 transition">
              <Shirt className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Smart Size Predictor</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Machine learning models accurately predict your ideal apparel fit based on body metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Curated AI Collection</h2>
            <p className="text-sm text-slate-400 mt-1">Smart recommendations updated live based on style trends</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by name, tag, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-slate-900/50 rounded-2xl border border-slate-800/80 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-800">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-indigo-500/30 text-xs font-semibold text-indigo-300 flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  {product.aiMatch}
                </div>
                <button className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-slate-300 hover:text-pink-400 transition">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>{product.category}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.tags.map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Interactive Drawers & Modals */}
      <AIStylistDrawer isOpen={isStylistOpen} onClose={() => setIsStylistOpen(false)} />
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
      <SizePredictorModal isOpen={isSizePredictorOpen} onClose={() => setIsSizePredictorOpen(false)} />
    </div>
  );
}