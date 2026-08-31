import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag } from 'lucide-react';

const CompleteLookModal = ({ productId, isOpen, onClose, onAddToCart }) => {
  const [ensemble, setEnsemble] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && productId) {
      setLoading(true);
      fetch(`https://stylesense-ai-ecommerce-production.up.railway.app/api/ai/complete-look/${productId}`)
        .then(res => res.json())
        .then(data => setEnsemble(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, productId]);

  if (!isOpen) return null;

  const handleAddBundle = () => {
    if (ensemble && ensemble.ensemblePieces) {
      ensemble.ensemblePieces.forEach(item => {
        if (onAddToCart) onAddToCart(item);
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-stone-900 text-stone-100 border border-stone-800 shadow-2xl p-6 sm:p-8 overflow-hidden space-y-6">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-stone-300" />
            <span>AI Ensemble Optimizer</span>
          </div>
          <h3 className="text-2xl font-serif uppercase tracking-tight text-stone-100">
            Complete My Look Bundle
          </h3>
          {ensemble && (
            <p className="text-xs text-stone-400 font-sans pt-1">
              "{ensemble.stylingRationale}"
            </p>
          )}
        </div>

        {/* Ensemble 3-Piece Grid */}
        {loading ? (
          <div className="py-12 text-center text-xs uppercase tracking-widest text-stone-400">
            Curating complementary textures...
          </div>
        ) : ensemble && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ensemble.ensemblePieces.map((piece, i) => (
              <div key={piece.id} className="bg-stone-800/80 p-3 border border-stone-700 flex flex-col justify-between space-y-2">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                  <img src={piece.image} alt={piece.name} className="h-full w-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-stone-950/80 text-[9px] uppercase tracking-wider text-stone-300">
                    Piece 0{i + 1}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-xs text-stone-100 line-clamp-1">{piece.name}</h4>
                  <p className="text-[11px] font-mono text-stone-400">LKR {piece.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price Summary & Action */}
        {ensemble && !loading && (
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="line-through text-stone-500 text-xs font-mono">LKR {ensemble.totalPrice.toLocaleString()}</span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] uppercase font-semibold border border-emerald-800">
                  Save 10% (LKR {ensemble.savings.toLocaleString()})
                </span>
              </div>
              <p className="text-xl font-serif text-stone-100 mt-1">
                LKR {ensemble.bundlePrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleAddBundle}
              className="px-6 py-3.5 bg-stone-100 text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Complete 3-Piece Look to Bag</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompleteLookModal;