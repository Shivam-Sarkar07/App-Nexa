import React from 'react';
import { ArrowLeft, HelpCircle, Mail, MessageSquare, ChevronDown, Bug } from 'lucide-react';
import { Button } from '../components/Button';

interface SupportProps {
  onBack: () => void;
  onNavigateToBugReport: () => void;
}

export const Support: React.FC<SupportProps> = ({ onBack, onNavigateToBugReport }) => {
  const faqs = [
    { q: "Is AppVault free to use?", a: "Yes! You can use hundreds of instant apps for free. We also offer a Premium plan for enhanced features and exclusive apps." },
    { q: "Do I need to download apps?", a: "No. AppVault runs web apps instantly in a secure environment, saving your phone's storage space." },
    { q: "How do I upgrade to Premium?", a: "Go to your Profile and tap on 'Upgrade to Premium'. You'll unlock ad-free usage and pro badges." },
    { q: "Is my data secure?", a: "Absolutely. Each app runs in a sandboxed environment, and we do not sell your personal data to third parties." },
    { q: "How can I request a refund?", a: "Please contact our support team via email. Refund requests are processed within 48 hours." },
  ];

  return (
    <div className="flex flex-col min-h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-[#030014]/80 backdrop-blur-md z-20 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-white">Help & Support</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-24">
        
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-900/20">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">How can we help?</h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Find answers to common questions or get in touch with our team.
          </p>
        </div>

        {/* Contact Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer">
            <Mail size={24} className="text-violet-400 mb-2" />
            <span className="text-sm font-bold text-white">Email Us</span>
            <span className="text-[10px] text-slate-500 mt-1">support@appvault.com</span>
          </div>
           <div 
             onClick={onNavigateToBugReport}
             className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer"
            >
            <Bug size={24} className="text-red-400 mb-2" />
            <span className="text-sm font-bold text-white">Report Bug</span>
            <span className="text-[10px] text-slate-500 mt-1">Fix issues faster</span>
          </div>
        </div>

        {/* FAQ Section */}
        <h3 className="text-sm font-bold text-white mb-4 px-1 flex items-center gap-2">
          <MessageSquare size={16} className="text-slate-400" />
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4">
              <h4 className="text-sm font-bold text-white mb-2 pr-4 leading-snug">{faq.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center bg-violet-500/5 border border-violet-500/10 rounded-2xl p-4">
          <p className="text-xs text-slate-300">
            Still need help? Our support team is available Mon-Fri, 9am - 5pm EST.
          </p>
        </div>

      </div>
    </div>
  );
};