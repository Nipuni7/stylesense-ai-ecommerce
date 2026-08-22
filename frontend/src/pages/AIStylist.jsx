import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, CheckCircle2, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const mockAIOutfits = {
  gala: [
    {
      id: 3,
      name: "Draped Organza Evening Slip",
      category: "women",
      type: "Occasionwear",
      price: 42000,
      aiMatch: 99,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 1,
      name: "Pleated Tussar Silk Trench",
      category: "women",
      type: "Outerwear",
      price: 34500,
      aiMatch: 98,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    }
  ],
  minimalist: [
    {
      id: 4,
      name: "Structured Minimalist Poplin Shirt",
      category: "men",
      type: "Essentials",
      price: 18500,
      aiMatch: 95,
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Raw Hem Tailored Trousers",
      category: "men",
      type: "Tailoring",
      price: 22000,
      aiMatch: 93,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

const AIStylist = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [curatedResult, setCuratedResult] = useState(mockAIOutfits.gala);
  const [selectedOccasion, setSelectedOccasion] = useState('Evening Gala');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCuratedResult(inputQuery.toLowerCase().includes('men') || inputQuery.toLowerCase().includes('office') ? mockAIOutfits.minimalist : mockAIOutfits.gala);
    }, 1200);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-champagne/40 bg-brand-champagne/10 text-[10px] uppercase tracking-luxury text-brand-dark font-semibold">
            <Sparkles className="w-3 h-3 text-brand-champagne" />
            <span>AI Wardrobe Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif uppercase tracking-tight text-brand-dark">
            Algorithmic Curation
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed">
            Specify your occasion, budget limit, or aesthetic sensibility in Sinhala or English. Our neural engine curates complete looks from active inventory.
          </p>
        </div>

        {/* Input Interactive Box */}
        <div className="bg-brand-charcoal text-brand-cream p-6 sm:p-8 rounded-sm shadow-xl border border-brand-sand/20 max-w-3xl mx-auto">
          <form onSubmit={handleGenerate} className="space-y-4">
            <label className="text-[10px] uppercase tracking-luxury text-brand-champagne block font-semibold">
              Describe your desired look:
            </label>
            <div className="flex items-center gap-2 border-b border-brand-sand/30 pb-2 focus-within:border-brand-champagne transition-colors">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="e.g., An elegant evening look under Rs. 80,000 for a Colombo art opening"
                className="w-full bg-transparent text-sm text-brand-cream placeholder-brand-muted focus:outline-none tracking-wide"
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="px-5 py-2.5 bg-brand-champagne text-brand-dark text-xs uppercase tracking-luxury font-bold hover:bg-brand-gold transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Curating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] uppercase tracking-luxury text-brand-sand/80">
              <span className="text-brand-muted">Suggested:</span>
              {['Formal Gala', 'Coastal Linen', 'Cocktail Event', 'Boardroom Executive'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setInputQuery(`Curate a ${tag.toLowerCase()} ensemble with premium fabrics.`)}
                  className="px-2.5 py-1 rounded border border-brand-sand/20 hover:border-brand-champagne hover:text-brand-champagne transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Results Showcase */}
        <div className="pt-8 border-t border-brand-sand">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-brand-sand">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Curated Output
              </span>
              <h2 className="font-serif text-2xl uppercase tracking-tight text-brand-dark mt-1">
                Selected Ensemble Pieces
              </h2>
            </div>
            <p className="text-xs uppercase tracking-luxury text-brand-muted mt-2 sm:mt-0">
              Inventory Matching Confidence: 98.4%
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedResult.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIStylist;