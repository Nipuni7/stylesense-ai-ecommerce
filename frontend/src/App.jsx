import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import AIStylistSection from './components/AIStylistSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AIStylist from './pages/AIStylist';

const initialCart = [
  {
    id: 1,
    name: "Pleated Tussar Silk Trench",
    price: 34500,
    size: "UK 8",
    color: "Raw Ecru",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80"
  }
];

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedSection />
      <AIStylistSection />
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Navbar 
          cartCount={cartItems.length} 
          onOpenCart={() => setIsCartOpen(true)}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/ai-stylist" element={<AIStylist />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </Router>
  );
}

export default App;