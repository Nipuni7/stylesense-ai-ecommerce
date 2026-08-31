import React, { useState } from 'react';
import { X, Camera, Sparkles, Palette, Upload, CheckCircle2 } from 'lucide-react';

const VisualSearchModal = ({ isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('visual');
  const [analyzing, setAnalyzing] = useState(false);
  const [visualResult, setVisualResult] = useState(null);
  const [colorResult, setColorResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateVisualSearch = () => {
    setAnalyzing(true);
    setVisualResult(null);
    setTimeout(async () => {
      try {
        const res = await fetch('https://stylesense-ai-ecommerce-production.up.railway.app/api/ai/visual-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ styleKeywords: "Minimalist Champagne Silk" })
        });
        const data = await res.json();
        setVisualResult(data);
      } catch (e) {
        console.error(e);
      } finally {
        setAnalyzing(false);
      }
    }, 1200);
  };

  const handleColorAnalysis = (season) => {
    setAnalyzing(true);
    setColorResult(null);
    setTimeout(async () => {
      try {
        const res = await fetch('https://stylesense-ai-ecommerce-production.up.railway.app/api/ai/color-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ season })
        });
        const data = await res.json();
        setColorResult(data);
      } catch (e) {
        console.error(e);
      } finally {
        setAnalyzing(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Tab Selection */}
        <div className="flex gap-6 border-b border-stone-800 pb-4 mb-6">
          <button
            onClick={() => { setActiveTab('visual'); setAnalyzing(false); }}
            className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold pb-1 transition-all ${
              activeTab === 'visual' ? 'text-stone-100 border-b-2 border-stone-100' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>AI Visual Search</span>
          </button>
          <button
            onClick={() => { setActiveTab('color'); setAnalyzing(false); }}
            className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold pb-1 transition-all ${
              activeTab === 'color' ? 'text-stone-100 border-b-2 border-stone-100' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>AI Color & Undertone</span>
          </button>
        </div>

        {/* --- Tab 1: Visual Search --- */}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif uppercase tracking-tight text-stone-100">
                Visual Aesthetic Matcher
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Upload or simulate an editorial moodboard image to compute vector similarity across our Atelier collection.
              </p>
            </div>

            <div 
              onClick={handleSimulateVisualSearch}
              className="border-2 border-dashed border-stone-700 bg-stone-800/40 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-stone-400 transition-all space-y-2"
            >
              <Upload className="w-8 h-8 text-stone-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-300">Click to Upload Moodboard / Run Sample Scan</p>
              <span className="text-[10px] text-stone-500">Extracts textures, silhouette contours & palette</span>
            </div>

            {analyzing && (
              <div className="py-6 text-center space-y-2 text-stone-400">
                <Sparkles className="w-6 h-6 animate-spin mx-auto text-stone-300" />
                <p className="text-xs uppercase tracking-[0.2em]">Computing feature vectors and luxury embeddings...</p>
              </div>
            )}

            {visualResult && !analyzing && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-xs bg-stone-800/80 p-3 border border-stone-700">
                  <span className="text-stone-400">Aesthetic: <strong className="text-stone-100 font-normal">{visualResult.visualAestheticDetected}</strong></span>
                  <span className="text-emerald-400 font-mono text-[11px]">{visualResult.confidence} Match</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {visualResult.similarMatches.map(item => (
                    <div key={item.id} className="bg-stone-800 p-2 border border-stone-700 flex flex-col justify-between space-y-2">
                      <img src={item.image} alt={item.name} className="aspect-[3/4] object-cover w-full" />
                      <p className="font-serif text-[11px] text-stone-100 line-clamp-1">{item.name}</p>
                      <button 
                        onClick={() => {
                          if (onAddToCart) onAddToCart(item);
                        }}
                        className="w-full py-1.5 bg-stone-100 text-stone-900 text-[10px] uppercase tracking-wider font-semibold hover:bg-white"
                      >
                        Add to Bag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- Tab 2: Color Analysis --- */}
        {activeTab === 'color' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif uppercase tracking-tight text-stone-100">
                Seasonal Undertone Analysis
              </h3>
              <p className="text-xs text-stone-400 font-sans">
                Select your skin undertone profile to automatically isolate harmonious color wavelengths from the inventory.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleColorAnalysis("Warm Autumn")}
                className="p-4 bg-stone-800 border border-stone-700 text-left hover:border-stone-400 transition-all space-y-1"
              >
                <span className="text-[10px] uppercase tracking-widest text-stone-400">Profile 01</span>
                <p className="font-serif text-sm text-stone-100">Warm Autumn / Golden Olive</p>
              </button>
              <button
                onClick={() => handleColorAnalysis("Cool Winter")}
                className="p-4 bg-stone-800 border border-stone-700 text-left hover:border-stone-400 transition-all space-y-1"
              >
                <span className="text-[10px] uppercase tracking-widest text-stone-400">Profile 02</span>
                <p className="font-serif text-sm text-stone-100">Cool Winter / Deep Ebony</p>
              </button>
            </div>

            {analyzing && (
              <div className="py-6 text-center space-y-2 text-stone-400">
                <Sparkles className="w-6 h-6 animate-spin mx-auto text-stone-300" />
                <p className="text-xs uppercase tracking-[0.2em]">Calculating complementary color spectrums...</p>
              </div>
            )}

            {colorResult && !analyzing && (
              <div className="p-5 bg-stone-800/80 border border-stone-700 space-y-4">
                <div className="flex justify-between items-center border-b border-stone-700 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400">Detected Undertone</span>
                    <h4 className="font-serif text-base text-stone-100">{colorResult.undertone}</h4>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400">Harmonious Color Palette</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {colorResult.bestColors.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-stone-900 border border-stone-700 text-stone-200 text-xs font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-stone-400">
                  <span>Tones to Avoid: <span className="text-rose-400 font-mono">{colorResult.avoidColors.join(", ")}</span></span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default VisualSearchModal;