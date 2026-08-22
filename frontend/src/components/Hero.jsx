import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Editorial Visual Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="StyleSense Editorial Luxury Showcase"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Gradient & Texture Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        
        {/* Signature Season Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-champagne/40 bg-brand-dark/60 backdrop-blur-md text-[10px] uppercase tracking-luxury text-brand-champagne mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Autumn / Winter 2026 Collection</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-brand-cream font-normal leading-[1.08] tracking-tight max-w-4xl">
          Elegance Defined by <br />
          <span className="italic font-light text-brand-champagne">Computational Craft.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-brand-sand/90 text-sm sm:text-base max-w-xl font-sans font-light leading-relaxed tracking-wide">
          Curated silhouettes engineered by algorithmic styling intelligence. Experience bespoke fashion adapted to your individual aesthetic.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-cream text-brand-dark text-xs uppercase tracking-luxury font-semibold hover:bg-brand-champagne hover:text-white transition-all duration-300 shadow-xl group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/ai-stylist"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-brand-cream/40 bg-brand-dark/40 backdrop-blur-sm text-brand-cream text-xs uppercase tracking-luxury font-semibold hover:border-brand-champagne hover:text-brand-champagne transition-all duration-300 shadow-md"
          >
            <Compass className="w-4 h-4 text-brand-champagne" />
            <span>Consult AI Stylist</span>
          </Link>
        </div>

        {/* Subtle Scroll / Feature Indicators */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-brand-cream/15 text-brand-cream/80 w-full max-w-2xl">
          <div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-brand-cream">100%</p>
            <p className="text-[9px] uppercase tracking-luxury text-brand-sand/70 mt-1">Ethical Cottons & Silk</p>
          </div>
          <div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-brand-cream">AI-Driven</p>
            <p className="text-[9px] uppercase tracking-luxury text-brand-sand/70 mt-1">Adaptive Curation</p>
          </div>
          <div>
            <p className="font-serif text-xl sm:text-2xl font-bold text-brand-cream">Direct</p>
            <p className="text-[9px] uppercase tracking-luxury text-brand-sand/70 mt-1">Islandwide Concierge</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;