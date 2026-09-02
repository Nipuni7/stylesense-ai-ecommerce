import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [userState, setUserState] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientName = isLogin ? (formData.email.split('@')[0] || 'Client') : formData.name;
    
    // Email එකේ "admin" අඩංගු නම් හෝ password එක "admin123" නම් Admin privileges ලබා දීම
    const isAdminUser = 
      formData.email.toLowerCase().includes('admin') || 
      formData.password === 'admin123';

    const clientData = { 
      name: clientName, 
      email: formData.email,
      isAdmin: isAdminUser
    };
    
    setUserState(clientData);
    if (onLoginSuccess) onLoginSuccess(clientData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-cream border border-brand-sand w-full max-w-md rounded-sm shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-sand flex items-center justify-between bg-brand-sand/20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-luxury font-bold text-brand-champagne">
              Member Access
            </span>
            <span className="text-brand-muted">|</span>
            <h2 className="text-sm font-serif uppercase tracking-luxury text-brand-dark">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:text-brand-champagne transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl uppercase tracking-tight text-brand-dark">
              {isLogin ? 'Welcome Back' : 'Join StyleSense'}
            </h3>
            <p className="text-xs text-brand-muted font-sans">
              {isLogin 
                ? 'Access your personalized AI wardrobe and orders.' 
                : 'Unlock bespoke algorithmic fashion curations.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-brand-muted absolute left-3" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full border border-brand-sand bg-white/80 pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@stylesense.luxury"
                  className="w-full border border-brand-sand bg-white/80 pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-luxury text-brand-muted mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="admin123"
                  className="w-full border border-brand-sand bg-white/80 pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-brand-champagne"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-charcoal text-brand-cream text-xs uppercase tracking-luxury font-bold hover:bg-brand-champagne hover:text-brand-dark transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLogin ? 'Authenticate' : 'Register Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="text-center pt-2 border-t border-brand-sand">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[11px] text-brand-muted hover:text-brand-champagne transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already registered? Sign In"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;