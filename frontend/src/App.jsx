import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import AIStylistSection from './components/AIStylistSection';
import VisualSearchModal from './components/VisualSearchModal';
import AIConciergeDrawer from './components/AIConciergeDrawer';
import Shop from './pages/Shop';
import AIStylist from './pages/AIStylist';
import ComingSoonReveal from "./components/ComingSoonReveal";
import Dashboard from './pages/Dashboard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast("Curated into Bag", `${product.name} added to your Atelier cart.`);
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col selection:bg-stone-300">
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
          onOpenVisualSearch={() => setIsVisualSearchOpen(true)}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ComingSoonReveal />
                <FeaturedSection />
                <AIStylistSection />
              </>
            } />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/stylist" element={<AIStylist onAddToCart={handleAddToCart} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
        />

        <VisualSearchModal 
          isOpen={isVisualSearchOpen}
          onClose={() => setIsVisualSearchOpen(false)}
          onAddToCart={handleAddToCart}
        />

        <AIConciergeDrawer
          isOpen={isConciergeOpen}
          onClose={() => setIsConciergeOpen(false)}
          onAddToCart={handleAddToCart}
        />

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 p-4 bg-stone-900 text-white shadow-2xl border border-stone-700 max-w-sm w-full transition-all duration-300">
            <div className="p-2 bg-stone-800 rounded-full text-stone-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                {toast.title}
              </p>
              <p className="text-xs font-sans text-stone-200 mt-0.5">
                {toast.message}
              </p>
            </div>
            <button onClick={() => setToast(null)} className="text-stone-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;