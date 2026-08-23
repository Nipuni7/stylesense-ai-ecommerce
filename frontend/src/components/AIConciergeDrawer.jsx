import React, { useState } from 'react';
import { X, Sparkles, Send, Bot } from 'lucide-react';

const AIConciergeDrawer = ({ isOpen, onClose, onAddToCart }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Greetings. I am your Atelier Neural Concierge. Tell me your occasion, dress code, or desired aesthetic (e.g. 'I need a gala look under Rs. 60,000')."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/concierge-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: data.reply, products: data.recommendedProducts }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: "I have curated our finest Silk Slip Gown & Tailored Linen pieces for this evening." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-stone-300" />
              <h2 className="text-sm font-serif uppercase tracking-[0.25em] text-stone-100">
                Atelier AI Concierge
              </h2>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                <div className={`p-3.5 max-w-[85%] leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-stone-100 text-stone-900 font-medium' 
                    : 'bg-stone-800/90 text-stone-200 border border-stone-700'
                }`}>
                  {m.text}
                </div>

                {/* Embedded Products */}
                {m.products && m.products.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 w-full pt-2">
                    {m.products.map(p => (
                      <div key={p.id} className="bg-stone-800 p-2 border border-stone-700 flex flex-col justify-between space-y-2">
                        <img src={p.image} alt={p.name} className="aspect-square object-cover w-full" />
                        <div>
                          <p className="font-serif text-[11px] text-stone-100 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">LKR {p.price?.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => onAddToCart && onAddToCart(p)}
                          className="w-full py-1 bg-stone-100 text-stone-900 text-[10px] uppercase tracking-wider font-semibold hover:bg-white"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-stone-400 italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Atelier Stylist is curating...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-stone-800 bg-stone-950 flex gap-2">
            <input
              type="text"
              placeholder="Ask style advice or describe your event..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-stone-400 font-sans"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-100 text-stone-900 hover:bg-white font-semibold flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AIConciergeDrawer;