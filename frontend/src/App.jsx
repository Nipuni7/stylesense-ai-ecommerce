import React from 'react';
import { Sparkles, ShoppingBag, Search, Camera, Bot, Shirt, ArrowRight, Star } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/20 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              StyleSense<span className="text-indigo-400">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#collection" className="hover:text-white transition">Collection</a>
            <a href="#ai-stylist" className="hover:text-white transition flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Bot className="w-4 h-4" /> AI Stylist
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            </button>
            <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-medium text-indigo-300 mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Next-Gen AI Fashion Experience
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Discover Your Signature Style with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Intelligent Fashion</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time personalized styling, smart sizing predictions, and image-based visual discovery powered by state-of-the-art machine learning.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-semibold text-white shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition group">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 font-semibold text-slate-200 flex items-center justify-center gap-2 transition">
              <Camera className="w-4 h-4 text-indigo-400" />
              Try Visual Search
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Camera className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Visual Image Search</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload any outfit photo to instantly discover matching designs and tailored alternatives from the catalog.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">AI Personal Stylist</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interactive conversational styling recommendations tailored to your event, aesthetic, and preferences.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <Shirt className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Smart Size Predictor</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Machine learning models accurately predict your ideal apparel fit based on body metric parameters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}