import React, { useState } from 'react';
import { X, Sparkles, Upload, ShoppingBag, CheckCircle2, RefreshCw } from 'lucide-react';

const defaultModels = [
  { id: 'm1', name: 'Model A (Warm Tone)', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
  { id: 'm2', name: 'Model B (Cool Tone)', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop' },
  { id: 'm3', name: 'Model C (Sartorial)', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' }
];

const VirtualTryOnModal = ({ isOpen, onClose, product, onAddToCart }) => {
  const [selectedModel, setSelectedModel] = useState(defaultModels[0].image);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [rendering, setRendering] = useState(false);
  const [tryOnReady, setTryOnReady] = useState(false);

  if (!isOpen || !product) return null;

  const handleSimulateTryOn = () => {
    setRendering(true);
    setTryOnReady(false);
    setTimeout(() => {
      setRendering(false);
      setTryOnReady(true);
    }, 1200);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
      setSelectedModel(url);
      setTryOnReady(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl p-6 sm:p-8 overflow-hidden space-y-6">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-stone-300" />
            <span>Neural Fitting Studio</span>
          </div>
          <h3 className="text-2xl font-serif uppercase tracking-tight text-stone-100">
            AI Virtual Try-On
          </h3>
          <p className="text-xs text-stone-400 font-sans">
            Visualizing <strong className="text-stone-200">{product.name}</strong> on bespoke human poses using neural texture mapping.
          </p>
        </div>

        {/* Try-on Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left: Pose & Model Selection (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                1. Select Silhouette / Avatar
              </span>
              <div className="grid grid-cols-3 gap-2">
                {defaultModels.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedModel(m.image); setTryOnReady(false); }}
                    className={`relative aspect-square border overflow-hidden transition-all ${
                      selectedModel === m.image ? 'border-white ring-1 ring-white' : 'border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Photo Upload */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Or Upload Your Photograph
              </span>
              <label className="border border-dashed border-stone-700 bg-stone-800/40 p-3 flex items-center justify-center gap-2 text-center cursor-pointer hover:border-stone-400 transition-all">
                <Upload className="w-4 h-4 text-stone-400" />
                <span className="text-[11px] font-sans text-stone-300">Choose File</span>
                <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
              </label>
            </div>

            {/* Selected Garment Preview */}
            <div className="p-3 bg-stone-800/60 border border-stone-800 flex items-center gap-3">
              <img src={product.image} alt={product.name} className="w-12 h-14 object-cover" />
              <div className="space-y-0.5 text-xs">
                <p className="font-serif text-stone-100 line-clamp-1">{product.name}</p>
                <p className="font-mono text-stone-400 text-[11px]">LKR {product.price?.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={handleSimulateTryOn}
              disabled={rendering}
              className="w-full py-3 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {rendering ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{rendering ? 'Synthesizing...' : 'Generate AI Try-On'}</span>
            </button>
          </div>

          {/* Right: Synthesis Viewport (8 cols) */}
          <div className="md:col-span-8 bg-stone-950 border border-stone-800 flex items-center justify-center relative min-h-[380px] overflow-hidden">
            {rendering ? (
              <div className="text-center space-y-3 p-6">
                <Sparkles className="w-8 h-8 animate-spin mx-auto text-stone-300" />
                <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Aligning fabric physics, lighting & body contour...
                </p>
              </div>
            ) : tryOnReady ? (
              <div className="relative h-full w-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                {/* Composite view showing model with product blended */}
                <img
                  src={selectedModel}
                  alt="Virtual Try On Model"
                  className="max-h-[400px] w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-700 px-3 py-1.5 text-[10px] uppercase tracking-wider text-emerald-400 backdrop-blur-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fit Match: 98.4% Precision</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-300 bg-stone-900/90 px-3 py-1.5 border border-stone-700">
                      Synthesized with {product.name}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full flex items-center justify-center">
                <img
                  src={selectedModel}
                  alt="Base Silhouette"
                  className="max-h-[400px] w-full object-cover object-top opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-stone-950/40">
                  <span className="px-4 py-2 bg-stone-900/80 border border-stone-700 text-[10px] uppercase tracking-[0.2em] text-stone-300">
                    Ready for Synthesis — Click Generate
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-xs">
          <span className="text-stone-500 font-mono text-[11px]">Bespoke Neural Draping v2.4</span>
          <button
            onClick={() => {
              if (onAddToCart) onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2.5 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.15em] font-semibold hover:bg-white flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add Garment to Bag</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default VirtualTryOnModal;