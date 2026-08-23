import React, { useState } from 'react';
import { ShoppingBag, Sparkles, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = ({ onOpenCart, cartCount = 0 }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-sand">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl tracking-[0.25em] uppercase text-brand-dark font-light">
              StyleSense
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-brand-muted -mt-1">
              Haute Couture AI
            </span>
          </a>

          {/* Nav Links with Direct Category Support */}
          <nav className="hidden md:flex items-center space-x-7 text-xs uppercase tracking-luxury text-brand-dark">
            <a href="/" className="hover:text-brand-champagne transition-colors">Atelier</a>
            <a href="/shop" className="hover:text-brand-champagne transition-colors">All Pieces</a>
            <a href="/shop?cat=women" className="hover:text-brand-champagne transition-colors font-medium">Women</a>
            <a href="/shop?cat=men" className="hover:text-brand-champagne transition-colors font-medium">Men</a>
            <a href="/shop?cat=accessories" className="hover:text-brand-champagne transition-colors font-medium">Accessories</a>
            
            <a href="/stylist" className="flex items-center gap-1.5 text-brand-champagne font-semibold hover:opacity-80 transition-opacity border-l border-brand-sand/80 pl-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Stylist</span>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-5 text-brand-dark">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-luxury text-brand-champagne font-semibold hidden sm:inline">
                  {currentUser.name}
                </span>
                <button 
                  onClick={handleLogout} 
                  title="Sign Out"
                  className="p-1 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)} 
                className="p-1 hover:text-brand-champagne transition-colors"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            <button 
              onClick={onOpenCart} 
              className="relative p-1 hover:text-brand-champagne transition-colors"
              title="Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-charcoal text-brand-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </>
  );
};

export default Navbar;