import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import AIStylistSection from './components/AIStylistSection';
import Shop from './pages/Shop';
import AIStylist from './pages/AIStylist';
import Dashboard from './pages/Dashboard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
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
      <div className="min-h-screen bg-brand-cream text-brand-dark font-sans flex flex-col selection:bg-brand-champagne/30">
        <Navbar 
          onOpenCart={() => setIsCartOpen(true)} 
          cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} 
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <FeaturedSection onAddToCart={handleAddToCart} />
                <AIStylistSection />
              </>
            } />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/stylist" element={<AIStylist onAddToCart={handleAddToCart} />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={handleClearCart}
        />
      </div>
    </Router>
  );
}

export default App;