import React, { useState } from 'react';
import { Sparkles, Clock, Lock, ArrowRight, Check } from 'lucide-react';

const upcomingVault = [
  {
    id: "vault-1",
    edition: "Vault Drop 01 // Autumn Equinox",
    title: "The Zero-Gravity Titanium Trench",
    fabric: "Japanese Hydro-Silk & Micro-Titanium Filament",
    launchDate: "OCTOBER 15, 2026",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 78,000",
    status: "In Bespoke Prototyping"
  },
  {
    id: "vault-2",
    edition: "Vault Drop 02 // Evening Haute",
    title: "Liquid Platinum Lamé Evening Gown",
    fabric: "24k White Gold Leaf Embroidered Tulle",
    launchDate: "NOVEMBER 01, 2026",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    expectedPrice: "LKR 115,000",
    status: "Limited Edition (12 numbered pieces)"
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
            Reserved exclusively for private clients. Preview strictly confidential capsule editions currently under development in our atelier.
          </p>
        </div>

        {/* Reveal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingVault.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-stone-900/90 backdrop-blur-md px-3 py-1.5 border border-stone-700 text-[10px] uppercase tracking-wider text-amber-300 font-mono">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{item.edition}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 block font-mono">
                      Expected Debut
                    </span>
                    <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {item.launchDate}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-stone-300 bg-stone-900/80 px-2.5 py-1 border border-stone-700">
                    Est. {item.expectedPrice}
                  </span>
                </div>
              </div>

              {/* Item Info & CTA */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-white tracking-wide group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-mono">{item.fabric}</p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-amber-400/90 font-mono">
                    ● {item.status}
                  </span>
                  <button
                    onClick={() => setRegisteredItem(item)}
                    className="text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Priority</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
                className="absolute top-4 right-4 text-stone-400 hover:text-white text-lg"
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