import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const initialItems = [
  {
    id: "3",
    name: "Draped Organza Evening Slip",
    category: "women",
    type: "Occasionwear",
    price: 42000,
    aiMatch: 99,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "1",
    name: "Pleated Tussar Silk Trench",
    category: "women",
    type: "Outerwear",
    price: 34500,
    aiMatch: 98,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
  }
];

const AIStylist = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [curatedResult, setCuratedResult] = useState(initialItems);
  const [stylingNote, setStylingNote] = useState("Curated ensemble tailored to your silhouette, tone, and occasion requirements.");
  const [confidenceScore, setConfidenceScore] = useState(98.4);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    setIsAnalyzing(true);
    try {
      // 1. Call Backend AI Endpoint
      const aiResponse = await fetch('http://localhost:5000/api/ai/curate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputQuery })
      });
      const aiData = await aiResponse.json();

      // 2. Fetch all products from Backend API
      const prodResponse = await fetch('http://localhost:5000/api/products');
      const allProducts = await prodResponse.json();

      // 3. Filter products matching AI recommendation
      const matched = allProducts.filter(p => aiData.recommendedIds?.includes(p.id));

      setCuratedResult(matched.length > 0 ? matched : allProducts.slice(0, 2));
      setStylingNote(aiData.stylingNote || "Algorithmic ensemble matched perfectly against current luxury silhouettes.");
      setConfidenceScore(aiData.confidenceScore || 96.0);
    } catch (err) {
      console.error("Stylist API integration error:", err);
    } finally {
      setIsAnalyzing(false);
    }
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

        {/* Input Form */}
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
                placeholder="e.g., Gala dinner look under Rs. 80,000 / කාර්යාලයට ගැලපෙන ඇඳුමක්"
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

            {/* Quick Tag Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] uppercase tracking-luxury text-brand-sand/80">
              <span className="text-brand-muted">Suggested:</span>
              {['Evening Gala', 'Executive Office Suit', 'Silk Slip Ensemble', 'Minimalist Linen'].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setInputQuery(`Curate a ${tag.toLowerCase()} outfit with luxury materials.`)}
                  className="px-2.5 py-1 rounded border border-brand-sand/20 hover:border-brand-champagne hover:text-brand-champagne transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* AI Stylist Note */}
        <div className="bg-brand-sand/30 border-l-2 border-brand-champagne p-4 max-w-3xl mx-auto text-xs text-brand-dark leading-relaxed font-sans">
          <span className="font-semibold uppercase tracking-luxury text-[10px] text-brand-champagne block mb-1">Stylist Note:</span>
          {stylingNote}
        </div>

        {/* Dynamic Results Grid */}
        <div className="pt-8 border-t border-brand-sand">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-brand-sand">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-champagne font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Live Inventory Match
              </span>
              <h2 className="font-serif text-2xl uppercase tracking-tight text-brand-dark mt-1">
                Selected Ensemble Pieces
              </h2>
            </div>
            <p className="text-xs uppercase tracking-luxury text-brand-muted mt-2 sm:mt-0">
              Matching Confidence: {confidenceScore}%
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