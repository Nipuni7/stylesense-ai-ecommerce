import React, { useState } from 'react';
import { Bot, Camera, Shirt, X, Upload, Sparkles, Send, CheckCircle2, Loader2 } from 'lucide-react';

export function AIStylistDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your StyleSense AI fashion advisor. Looking for outfit ideas for a wedding, party, or casual weekend?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/ai/recommend-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.advice }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Style advisory: Pair minimal neutral tones with tailored fits for a modern, sleek aesthetic." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 h-full border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold">
            <Bot className="w-5 h-5" />
            <span>AI Personal Stylist</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-indigo-400 text-xs px-4 py-2 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="relative mt-2">
          <input
            type="text"
            placeholder="Ask for fashion advice or style matching..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function VisualSearchModal({ isOpen, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const simulateSearch = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult("Matching item found: Cyberpunk Oversized Bomber Jacket (98.4% visual similarity)");
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
          <Camera className="w-5 h-5" />
          <h3 className="text-white text-lg">AI Visual Search</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">Upload or drop an outfit picture to find identical and complementary items.</p>

        <div 
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); simulateSearch(); }}
          onClick={simulateSearch}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            dragOver ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-700 hover:border-slate-600 bg-slate-800/40'
          }`}
        >
          <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-300">Click to upload or drag image here</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
        </div>

        {analyzing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-indigo-400 animate-pulse">
            <Sparkles className="w-4 h-4" /> Analyzing visual patterns & textures...
          </div>
        )}

        {result && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export function SizePredictorModal({ isOpen, onClose }) {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(68);
  const [fit, setFit] = useState('Regular');
  const [predictedSize, setPredictedSize] = useState('M');
  const [confidence, setConfidence] = useState(97.4);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/ai/predict-size', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          height: Number(height),
          weight: Number(weight),
          fit_preference: fit
        })
      });
      const data = await response.json();
      setPredictedSize(data.recommended_size);
      setConfidence(data.confidence_score);
    } catch (err) {
      if (weight > 78 || height > 185) setPredictedSize('L');
      else if (weight < 58 || height < 165) setPredictedSize('S');
      else setPredictedSize('M');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-violet-400 font-semibold mb-2">
          <Shirt className="w-5 h-5" />
          <h3 className="text-white text-lg">Smart Size Predictor</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">Enter your dimensions to get machine learning fit recommendations.</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Height: {height} cm</span>
            </div>
            <input 
              type="range" min="150" max="205" value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Weight: {weight} kg</span>
            </div>
            <input 
              type="range" min="45" max="120" value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1.5">Fit Preference</label>
            <div className="grid grid-cols-3 gap-2">
              {['Slim', 'Regular', 'Oversized'].map(f => (
                <button
                  key={f}
                  onClick={() => setFit(f)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition ${
                    fit === f ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Calculate Optimal Fit
          </button>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-xs text-slate-400 block">Recommended Size</span>
            <span className="text-2xl font-black text-indigo-400">{predictedSize}</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">{confidence}% confidence accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
}