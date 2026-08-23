import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Camera, Bot } from 'lucide-react';

const Navbar = ({ onOpenCart, cartCount = 0, onOpenVisualSearch, onOpenConcierge }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Atelier', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'AI Stylist Studio', path: '/stylist' },
    { name: 'Intelligence Portal', path: '/dashboard' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-[0.25em] uppercase text-stone-900 font-light">
            StyleSense
          </span>
          <span className="text-[8px] uppercase tracking-[0.4em] text-stone-400 font-sans -mt-1">
            Haute Couture AI Atelier
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-stone-900 ${
                location.pathname === link.path ? 'text-stone-900 font-semibold' : 'text-stone-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Tools: AI Visual Search, Concierge, Cart */}
        <div className="flex items-center gap-4">
          
          {/* Visual Search Button */}
          {onOpenVisualSearch && (
            <button
              onClick={onOpenVisualSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all rounded-full"
              title="AI Visual Search & Color Analysis"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}

          {/* AI Concierge Chatbot Button */}
          {onOpenConcierge && (
            <button
              onClick={onOpenConcierge}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all rounded-full"
              title="AI Fashion Concierge"
            >
              <Bot className="w-4 h-4" />
            </button>
          )}

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-900 hover:opacity-75 transition-opacity"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-stone-100 text-[10px] font-mono flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;