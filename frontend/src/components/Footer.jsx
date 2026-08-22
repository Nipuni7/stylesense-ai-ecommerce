import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-cream border-t border-brand-sand/15">
      
      {/* Newsletter / Brand Statement Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-b border-brand-sand/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              The StyleSense Gazette
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light mt-2 tracking-wide">
              Receive private collection releases and seasonal styling digests.
            </h3>
          </div>
          <div className="lg:col-span-5">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-brand-sand/30 pb-2 focus-within:border-brand-champagne transition-colors">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent text-xs text-brand-cream placeholder-brand-muted w-full focus:outline-none tracking-wide"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-xs uppercase tracking-luxury text-brand-champagne hover:text-white flex items-center gap-1 font-semibold ml-2"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-xs tracking-wide">
        
        {/* Brand Column */}
        <div className="space-y-4 col-span-2 md:col-span-1">
          <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-brand-cream">
            StyleSense
          </span>
          <p className="text-brand-muted text-xs leading-relaxed max-w-xs font-light">
            Algorithmic precision merged with bespoke editorial fashion design.
          </p>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">Collections</p>
          <ul className="space-y-2.5 text-brand-sand/80">
            <li><Link to="/shop?category=women" className="hover:text-brand-champagne transition-colors">Women’s Ready-to-Wear</Link></li>
            <li><Link to="/shop?category=men" className="hover:text-brand-champagne transition-colors">Men’s Tailoring</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-brand-champagne transition-colors">Silk & Accessories</Link></li>
            <li><Link to="/shop?category=occasions" className="hover:text-brand-champagne transition-colors">Editorial Occasionwear</Link></li>
          </ul>
        </div>

        {/* Intelligence & Studio */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">Intelligence</p>
          <ul className="space-y-2.5 text-brand-sand/80">
            <li><Link to="/ai-stylist" className="hover:text-brand-champagne transition-colors">AI Wardrobe Concierge</Link></li>
            <li><Link to="/brand-story" className="hover:text-brand-champagne transition-colors">Craftsmanship & Sustainability</Link></li>
            <li><Link to="/size-guide" className="hover:text-brand-champagne transition-colors">Bespoke Fit Guide</Link></li>
            <li><Link to="/journal" className="hover:text-brand-champagne transition-colors">Fashion Informatics</Link></li>
          </ul>
        </div>

        {/* Concierge */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold">Concierge</p>
          <ul className="space-y-2.5 text-brand-sand/80">
            <li><span className="text-brand-muted">Complimentary Delivery</span></li>
            <li><span className="text-brand-muted">Colombo Private Showroom</span></li>
            <li><a href="mailto:concierge@stylesense.fashion" className="hover:text-brand-champagne transition-colors">concierge@stylesense.fashion</a></li>
            <li><span className="text-brand-muted">+94 (011) 234-5678</span></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 border-t border-brand-sand/10 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-luxury text-brand-muted gap-4">
        <p>© 2026 StyleSense AI Fashion House. All Rights Reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-brand-champagne transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-champagne transition-colors">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;