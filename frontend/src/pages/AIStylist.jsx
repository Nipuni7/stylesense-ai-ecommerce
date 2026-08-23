import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, ShoppingBag, Check, RefreshCw, Palette } from 'lucide-react';

const AIStylist = ({ onAddToCart }) => {
  const [formData, setFormData] = useState({
    occasion: 'High-end Evening Gala',
    stylePreference: 'Minimalist Luxury',
    gender: 'women',
    budget: 'LKR 40,000 - 80,000'
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const occasions = [
    'High-end Evening Gala',
    'Cocktail Soiree',
    'Art Gallery Vernissage',
    'Bespoke Business Summit',
    'Tropical Luxury Resort'
  ];

  const styles = [
    'Minimalist Luxury',
    'Classic Haute Couture',
    'Modern Architectural',
    'Bohemian Artisanal',
    'Quiet Luxury / Old Money'
  ];

  const handleGenerateStyle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/stylist/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setRecommendation(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setRecommendation({
        curatedLookTitle: "Monochrome Silk Reverie",
        stylingAdvice: "Harmonize clean architectural lines with breathable silk textures for an effortlessly elevated silhouette.",
        recommendedPieces: ["Silk Satin Slip Gown", "Tailored Linen Blazer", "Artisanal Leather Tote"],
        colorPalette: ["Champagne Gold", "Desert Sand", "Jet Charcoal"],
        accessorizingTip: "Pair with sculptural gold cuff bangles and minimalist pointed-toe mules."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-stone-500 text-xs uppercase tracking-[0.3em] font-semibold">
          <Sparkles className="w-4 h-4 text-stone-700" />
          <span>Gemini-Powered Haute Couture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif uppercase tracking-tight text-stone-900">
          AI Personal Stylist Studio
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans tracking-wide leading-relaxed">
          Configure your bespoke parameters below. Our neural stylist curates an exclusive capsule wardrobe tailored to your persona.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Configuration Panel */}
        <form onSubmit={handleGenerateStyle} className="lg:col-span-5 bg-stone-900 text-stone-100 p-8 border border-stone-800 shadow-2xl space-y-6">
          <div className="space-y-1 border-b border-stone-800 pb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
              Step 01
            </span>
            <h3 className="text-xl font-serif uppercase tracking-tight text-stone-100">
              Style Matrix
            </h3>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Gender / Silhouette */}
            <div>
              <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1.5">Collection Fit</label>
              <div className="grid grid-cols-3 gap-2">
                {['women', 'men', 'accessories'].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`py-2 text-[11px] uppercase tracking-wider border transition-all ${
                      formData.gender === g
                        ? 'bg-stone-100 text-stone-900 font-semibold border-stone-100'
                        : 'bg-stone-800/60 text-stone-400 border-stone-700 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1.5">Occasion / Event</label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-stone-400"
              >
                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Style Aesthetic */}
            <div>
              <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1.5">Aesthetic Direction</label>
              <select
                value={formData.stylePreference}
                onChange={(e) => setFormData({ ...formData, stylePreference: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-stone-400"
              >
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block uppercase tracking-wider text-[10px] text-stone-400 mb-1.5">Investment Tier</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Consulting Gemini AI...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Curate Bespoke Look</span>
              </>
            )}
          </button>
        </form>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {recommendation ? (
            <div className="bg-white border border-stone-200 p-8 shadow-xl space-y-8 animate-in fade-in duration-500">
              
              <div className="space-y-2 border-b border-stone-100 pb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
                  Curated Capsule Look
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight text-stone-900">
                  {recommendation.curatedLookTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2">
                  "{recommendation.stylingAdvice}"
                </p>
              </div>

              {/* Recommended Inventory Items */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">
                  Ensemble Garments
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendation.recommendedPieces?.map((item, idx) => (
                    <div key={idx} className="p-4 bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                      <span className="text-[10px] font-mono text-stone-400">0{idx + 1}</span>
                      <h4 className="font-serif text-sm text-stone-900 line-clamp-2">{item}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-700 font-semibold">
                        <Check className="w-3 h-3" />
                        <span>Available in Atelier</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Palette & Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-stone-700 text-xs font-semibold uppercase tracking-wider">
                    <Palette className="w-4 h-4 text-stone-500" />
                    <span>Color Palette</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.colorPalette?.map((color, i) => (
                      <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-800 text-[11px] font-sans border border-stone-200">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-stone-700 text-xs font-semibold uppercase tracking-wider block">
                    Finishing Accent
                  </span>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {recommendation.accessorizingTip}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[420px] bg-stone-50 border border-dashed border-stone-300 p-12 flex flex-col items-center justify-center text-center space-y-4 text-stone-400">
              <Sparkles className="w-8 h-8 text-stone-400" />
              <div className="space-y-1">
                <p className="font-serif text-lg text-stone-700">Awaiting Your Aesthetic Directives</p>
                <p className="text-xs font-sans max-w-sm">Select your occasion and style preference on the left to consult our neural atelier stylist.</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default AIStylist;