import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, title = "Atelier Notification") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Floating Glassmorphic Toast Stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-stone-900/90 text-stone-100 backdrop-blur-md border border-stone-700/60 shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-5"
          >
            <div className="p-1 rounded-full bg-stone-800 text-stone-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-0.5">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                {toast.title}
              </p>
              <p className="text-xs font-sans text-stone-200">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);