import React, { useState } from 'react';
import { Sparkles, Clock, Lock, ArrowRight, Check } from 'lucide-react';

const upcomingVault = [
  {
    id: "vault-1",
    edition: "Vault Drop 01 // Cyber Couture",
    title: "The Zero-Gravity Cyber Trench",
    fabric: "Japanese Hydro-Silk & Micro-Titanium Hardware",
    launchDate: "OCTOBER 15, 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 84,000",
    status: "Prototyping in Atelier"
  },
  {
    id: "vault-2",
    edition: "Vault Drop 02 // Red Carpet Haute",
    title: "Liquid Champagne Lamé Slip Gown",
    fabric: "24K Molten Gold Thread & Mulberry Organza",
    launchDate: "NOVEMBER 05, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 112,000",
    status: "Limited Atelier Drop (10 Pieces)"
  },
  {
    id: "vault-3",
    edition: "Vault Drop 03 // Avant-Garde Tailoring",
    title: "Sculptural Raw Matka Cape Blazer",
    fabric: "Handloomed Ceylon Silk-Wool & Horn Buttons",
    launchDate: "NOVEMBER 22, 2026",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 65,000",
    status: "Hand-Draping Phase"
  },
  {
    id: "vault-4",
    edition: "Vault Drop 04 // High Jewelry Vault",
    title: "Floating Keshi Pearl & Gold Choker",
    fabric: "18K Solid Vermeil & South Sea Baroque Pearl",
    launchDate: "DECEMBER 10, 2026",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 135,000",
    status: "1-of-1 Collector Edition"
  }
];

const ComingSoonReveal = () => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [registeredItem, setRegisteredItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRegisteredItem(null);
      setWaitlistEmail('');
    }, 3500);
  };

  return (
    <section className="py-20 bg-stone-950 text-stone-100 px-6 lg:px-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Confidential Archive
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl uppercase tracking-tight text-white">
              Atelier Vault: Upcoming Releases
            </h2>
          </div>
          <p className="text-xs text-stone-400 max-w-md font-sans leading-relaxed">
            Reserved exclusively for private patrons. Preview strictly confidential capsule editions currently undergoing artisanal tailoring in our atelier.
          </p>
        </div>

        {/* Reveal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingVault.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-950">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-md px-2.5 py-1 border border-stone-700 text-[9px] uppercase tracking-wider text-amber-300 font-mono">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{item.edition}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="space-y-0.5">
                    <span className="text-[8px] uppercase tracking-widest text-stone-400 block font-mono">
                      Expected Debut
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-white flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> {item.launchDate}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300 bg-stone-900/90 px-2 py-0.5 border border-stone-700">
                    Est. {item.expectedPrice}
                  </span>
                </div>
              </div>

              {/* Item Info & CTA */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-white tracking-wide group-hover:text-amber-200 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1 font-mono line-clamp-2">{item.fabric}</p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-amber-400/90 font-mono">
                    ● {item.status}
                  </span>
                  <button
                    onClick={() => setRegisteredItem(item)}
                    className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Priority</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Priority Waitlist Modal */}
        {registeredItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 max-w-md w-full p-8 space-y-6 shadow-2xl relative">
              <button 
                onClick={() => setRegisteredItem(null)} 
                className="absolute top-4 right-4 text-stone-400 hover:text-white text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-semibold block">
                  Private Priority Ledger
                </span>
                <h3 className="font-serif text-2xl text-white uppercase tracking-tight">
                  {registeredItem.title}
                </h3>
                <p className="text-xs text-stone-400">
                  Enter your executive email to receive private allocation access 48 hours prior to global release.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Invitation registered. You are on the private atelier priority list.</span>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlist} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="concierge@client.luxury"
                    className="w-full p-3 bg-stone-950 border border-stone-700 text-stone-100 text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-100 text-stone-950 hover:bg-amber-300 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md cursor-pointer"
                  >
                    Confirm Private Priority
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ComingSoonReveal;