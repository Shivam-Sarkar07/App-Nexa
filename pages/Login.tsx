import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { auth, googleProvider, signInWithPopup } from '../firebase';

interface LoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onLogin }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin(); // App.tsx will handle the user state change via AuthContext
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative animate-in slide-in-from-bottom duration-300">
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 z-10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors backdrop-blur-md border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto w-full">
        
        <div className="w-24 h-24 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-violet-500/20 rotate-3 border border-white/10">
          <Lock size={40} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Login Required</h1>
        
        <p className="text-slate-400 mb-8 leading-relaxed">
          Sign in to unlock instant apps without downloading.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="w-full space-y-4">
          <Button 
            fullWidth 
            variant="primary" 
            icon={loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span className="font-bold text-xl mr-2">G</span>}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
             {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <Button fullWidth variant="outline" icon={<Mail size={18} />} disabled={loading}>
            Create an Account
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-violet-400" />
          <span>Secure, private, and ad-free experience.</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center pb-8 space-y-4">
        <p className="text-slate-400 text-sm">
          New here? <button className="text-violet-400 font-semibold hover:text-violet-300 hover:underline transition-colors">Create an Account</button>
        </p>
      </div>
    </div>
  );
};