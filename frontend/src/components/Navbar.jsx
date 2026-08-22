import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Sparkles, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = ({ cartCount = 0, wishlistCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-sand/60 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-brand-dark text-brand-cream text-[11px] uppercase tracking-luxury py-2 text-center font-medium">
        Complimentary Islandwide Delivery on Orders Over LKR 15,000
      </div>

      {/* Main Nav Container */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Navigation Categories */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-luxury uppercase text-brand-dark/80">
          <Link to="/shop?category=women" className="hover:text-brand-champagne transition-colors">Women</Link>
          <Link to="/shop?category=men" className="hover:text-brand-champagne transition-colors">Men</Link>
          <Link to="/shop?category=accessories" className="hover:text-brand-champagne transition-colors">Collections</Link>
          <Link to="/brand-story" className="hover:text-brand-champagne transition-colors">Editorial</Link>
        </div>

        {/* Center: Brand Identity Logo */}
        <div className="text-center">
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-semibold text-brand-dark group-hover:text-brand-champagne transition-colors uppercase">
              StyleSense
            </span>
            <span className="text-[8px] uppercase tracking-[0.35em] text-brand-muted -mt-1 font-sans">
              Curated Intelligence
            </span>
          </Link>
        </div>

        {/* Right: Actions & AI Assistant CTA */}
        <div className="flex items-center space-x-5 text-brand-dark">
          {/* AI Stylist Page Link */}
          <Link 
            to="/ai-stylist" 
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand-champagne text-brand-dark text-xs font-medium tracking-wide bg-brand-champagne/10 hover:bg-brand-champagne hover:text-white transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-champagne" />
            <span>AI Stylist</span>
          </Link>

          <button aria-label="Search Catalog" className="hover:text-brand-champagne transition-colors">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          <Link to="/wishlist" className="relative hover:text-brand-champagne transition-colors">
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-champagne text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger Button - Opens Slide-over Cart Drawer */}
          <button 
            onClick={onOpenCart}
            aria-label="Open Shopping Bag" 
            className="relative hover:text-brand-champagne transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-dark text-brand-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <Link to="/profile" className="hover:text-brand-champagne transition-colors">
            <User className="w-5 h-5 stroke-[1.5]" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden hover:text-brand-champagne transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-sand px-6 py-6 space-y-4">
          <Link 
            to="/ai-stylist" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm bg-brand-champagne text-brand-dark font-medium text-xs tracking-luxury uppercase"
          >
            <Sparkles className="w-4 h-4" />
            Open AI Stylist
          </Link>
          <div className="flex flex-col space-y-3 pt-2 text-xs uppercase tracking-luxury text-brand-dark">
            <Link to="/shop?category=women" onClick={() => setMobileMenuOpen(false)}>Women</Link>
            <Link to="/shop?category=men" onClick={() => setMobileMenuOpen(false)}>Men</Link>
            <Link to="/shop?category=accessories" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
            <Link to="/brand-story" onClick={() => setMobileMenuOpen(false)}>Editorial</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;