import React, { useState } from 'react';
import { ArrowLeft, Check, Crown, Zap, Shield, Sparkles, Star, Bug } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface PremiumUpgradeProps {
  onBack: () => void;
  onUpgrade: () => void;
}

export const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ onBack, onUpgrade }) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // ------------------------------------------------------------
  // RAZORPAY CONFIGURATION
  // Replace 'YOUR_RAZORPAY_KEY_ID' with the key you received
  // ------------------------------------------------------------
  const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID"; // <--- PASTE YOUR KEY ID HERE
  
  const handleUpgradeClick = () => {
    setIsProcessing(true);

    if (!(window as any).Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setIsProcessing(false);
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID, 
      amount: "499", // Amount in smallest currency unit (e.g., 499 cents = $4.99). If INR, 49900 paise = ₹499.
      currency: "USD", // Change to "INR" if your Razorpay account is Indian based without International enabled.
      name: "AppVault Premium",
      description: "Monthly Subscription",
      image: "https://cdn-icons-png.flaticon.com/512/3448/3448650.png", // Example logo
      handler: function (response: any) {
        // Payment Success
        console.log("Payment ID: ", response.razorpay_payment_id);
        
        // Here you would typically verify the signature on backend
        // For this mobile-only client app, we grant access immediately
        onUpgrade();
        setIsProcessing(false);
      },
      prefill: {
        name: user?.displayName || "AppVault User",
        email: user?.email || "",
        contact: "" // Optional
      },
      notes: {
        address: "AppVault Corporate Office"
      },
      theme: {
        color: "#8b5cf6" // Matches AppVault Violet
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    try {
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        alert(`Payment Failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp1.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      setIsProcessing(false);
      alert("Unable to initiate payment.");
    }
  };

  const benefits = [
    { text: "Ad-free experience", icon: <Shield size={18} className="text-green-400" /> },
    { text: "Faster app loading speeds", icon: <Zap size={18} className="text-yellow-400" /> },
    { text: "Access to Premium Apps", icon: <Crown size={18} className="text-fuchsia-400" /> },
    { text: "Priority Bug Bounty rewards", icon: <Bug size={18} className="text-red-400" /> },
    { text: "Special reward codes", icon: <Sparkles size={18} className="text-violet-400" /> },
    { text: "Golden Premium Badge", icon: <Star size={18} className="text-amber-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-full bg-black relative animate-in slide-in-from-bottom duration-500">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-violet-900/40 via-fuchsia-900/20 to-black pointer-events-none" />
      <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-violet-600/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center p-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-2 mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-600 p-[2px] shadow-[0_0_40px_rgba(234,179,8,0.4)] mb-6 animate-pulse">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
               <Crown size={48} className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Premium</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-[260px] leading-relaxed">
            Unlock the full power of AppVault. No limits. Just pure performance.
          </p>
        </div>

        {/* Benefits List */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 backdrop-blur-sm">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-1">Premium Benefits</h3>
          <div className="space-y-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                  {benefit.icon}
                </div>
                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-yellow-500/50 mb-8">
            <div className="bg-[#0f0728] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-500/20 to-transparent w-20 h-20" />
                
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-sm text-slate-400 font-medium">Monthly Plan</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">$4.99</span>
                            <span className="text-sm text-slate-500">/mo</span>
                        </div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
                        <span className="text-xs font-bold text-yellow-400">Best Value</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Cancel anytime. 7-day money-back guarantee.</p>
            </div>
        </div>

        {/* CTA */}
        <div className="mb-4">
            <Button 
                fullWidth 
                onClick={handleUpgradeClick}
                disabled={isProcessing}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black border-none shadow-[0_0_20px_rgba(234,179,8,0.3)]"
            >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles size={18} fill="black" />
                    <span>Upgrade to Premium</span>
                  </div>
                )}
            </Button>
            <p className="text-center text-[10px] text-slate-600 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy. Secured by Razorpay.
            </p>
        </div>

      </div>
    </div>
  );
};