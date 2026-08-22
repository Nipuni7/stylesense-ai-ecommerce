import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const promptExamples = [
  "Curate a minimalist evening look for a rooftop gallery opening in Colombo.",
  "Recommend breathable linen silhouettes under LKR 25,000 for a coastal getaway.",
  "Assemble a monochromatic tailored outfit for a boardroom presentation."
];

const AIStylistSection = () => {
  const [activePrompt, setActivePrompt] = useState(promptExamples[0]);

  return (
    <section className="bg-brand-dark text-brand-cream py-24 px-6 lg:px-12 relative overflow-hidden border-t border-brand-sand/10">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-champagne/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: AI Narrative & Prompts */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-champagne/40 bg-brand-champagne/10 text-[10px] uppercase tracking-luxury text-brand-champagne font-medium">
            <Sparkles className="w-3 h-3 text-brand-champagne" />
            <span>Proprietary AI Styling Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif leading-tight">
            Personalized curation, <br />
            <span className="italic font-light text-brand-champagne">instantaneous</span> precision.
          </h2>

          <p className="text-brand-muted text-sm sm:text-base font-light leading-relaxed max-w-lg">
            StyleSense processes your occasion, climate preferences, and silhouette sensibilities to assemble ready-to-wear ensembles drawn directly from our active inventory.
          </p>

          {/* Interactive Prompt Selector */}
          <div className="space-y-3 pt-2">
            <p className="text-[11px] uppercase tracking-luxury text-brand-sand/60">Sample Stylist Prompts:</p>
            {promptExamples.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setActivePrompt(prompt)}
                className={`w-full text-left p-3.5 text-xs rounded-sm border transition-all duration-300 flex items-center justify-between group ${
                  activePrompt === prompt
                    ? 'border-brand-champagne bg-brand-charcoal text-brand-cream shadow-md'
                    : 'border-brand-sand/15 bg-brand-dark/50 text-brand-muted hover:border-brand-sand/40 hover:text-brand-cream'
                }`}
              >
                <span className="line-clamp-1 italic">"{prompt}"</span>
                <Sparkles className={`w-3.5 h-3.5 transition-opacity ${activePrompt === prompt ? 'text-brand-champagne opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </button>
            ))}
          </div>

          <div className="pt-4">
            <Link
              to="/ai-stylist"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-champagne text-brand-dark text-xs uppercase tracking-luxury font-bold hover:bg-brand-gold transition-all shadow-lg group"
            >
              <span>Launch Full AI Stylist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Simulated AI Outfit Assembly Preview */}
        <div className="lg:col-span-6 bg-brand-charcoal/90 border border-brand-sand/15 p-6 sm:p-8 rounded-sm shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between pb-5 border-b border-brand-sand/10">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] uppercase tracking-luxury font-semibold text-brand-cream">
                AI Curator Active
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-mono">
              Confidence: 98.6%
            </span>
          </div>

          {/* Active Query Simulation */}
          <div className="mt-5 p-3.5 bg-brand-dark/80 rounded border border-brand-sand/10 flex items-start gap-3">
            <MessageSquare className="w-4 h-4 text-brand-champagne shrink-0 mt-0.5" />
            <p className="text-xs text-brand-sand/90 italic font-serif">
              "{activePrompt}"
            </p>
          </div>

          {/* Curated Ensemble Match Items */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 p-3 bg-brand-dark/40 border border-brand-sand/10 rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=200&q=80"
                alt="Ensemble Component"
                className="w-14 h-18 object-cover rounded-sm"
              />
              <div className="flex-1">
                <span className="text-[9px] uppercase tracking-luxury text-brand-muted">Primary Layer</span>
                <p className="font-serif text-sm text-brand-cream font-semibold">Tussar Silk Trench</p>
                <p className="text-xs text-brand-champagne font-medium mt-0.5">LKR 34,500</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-brand-champagne" />
            </div>

            <div className="flex items-center gap-4 p-3 bg-brand-dark/40 border border-brand-sand/10 rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=200&q=80"
                alt="Ensemble Component"
                className="w-14 h-18 object-cover rounded-sm"
              />
              <div className="flex-1">
                <span className="text-[9px] uppercase tracking-luxury text-brand-muted">Base Layer</span>
                <p className="font-serif text-sm text-brand-cream font-semibold">Draped Organza Slip</p>
                <p className="text-xs text-brand-champagne font-medium mt-0.5">LKR 42,000</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-brand-champagne" />
            </div>
          </div>

          {/* Ensemble Total Bar */}
          <div className="mt-6 pt-5 border-t border-brand-sand/10 flex items-center justify-between text-xs">
            <div>
              <p className="text-[9px] uppercase tracking-luxury text-brand-muted">Curated Look Total</p>
              <p className="font-serif text-lg font-bold text-brand-cream">LKR 76,500</p>
            </div>
            <button className="px-4 py-2 bg-brand-cream text-brand-dark text-[10px] uppercase tracking-luxury font-bold hover:bg-brand-champagne hover:text-white transition-colors">
              Add Look to Bag
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIStylistSection;