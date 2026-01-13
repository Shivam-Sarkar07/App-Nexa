import React, { useState } from 'react';
import { ArrowLeft, Moon, Bell, Globe, ChevronRight, Shield, FileText, AlertCircle, Info } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
  onNavigateToDisclaimer: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  onBack, 
  onNavigateToPrivacy, 
  onNavigateToTerms, 
  onNavigateToDisclaimer 
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Mock toggle component
  const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${active ? 'bg-violet-600' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  const SettingItem = ({ icon, label, action, description }: { icon: React.ReactNode, label: string, action: React.ReactNode, description?: string }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl mb-3">
      <div className="flex items-center gap-3">
        <div className="text-slate-400">{icon}</div>
        <div>
          <span className="text-white font-medium text-sm block">{label}</span>
          {description && <span className="text-slate-500 text-xs block mt-0.5">{description}</span>}
        </div>
      </div>
      <div>{action}</div>
    </div>
  );

  const LinkItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl mb-3 hover:bg-white/10 active:scale-[0.99] transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-400">{icon}</div>
        <span className="text-white font-medium text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-slate-600" />
    </button>
  );

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
        <h1 className="text-lg font-bold text-white">Settings</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-24">
        
        {/* General Section */}
        <h2 className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-4 px-1">General</h2>
        <SettingItem 
          icon={<Moon size={20} />} 
          label="Dark Mode" 
          action={<Toggle active={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        />
        <SettingItem 
          icon={<Bell size={20} />} 
          label="Notifications" 
          action={<Toggle active={notifications} onChange={() => setNotifications(!notifications)} />}
        />
        <LinkItem 
          icon={<Globe size={20} />} 
          label="Language" 
          onClick={() => {}} // Placeholder
        />

        {/* Legal Section */}
        <h2 className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-4 px-1 mt-6">About & Legal</h2>
        <LinkItem 
          icon={<Shield size={20} />} 
          label="Privacy Policy" 
          onClick={onNavigateToPrivacy}
        />
        <LinkItem 
          icon={<FileText size={20} />} 
          label="Terms of Service" 
          onClick={onNavigateToTerms}
        />
        <LinkItem 
          icon={<AlertCircle size={20} />} 
          label="Disclaimer" 
          onClick={onNavigateToDisclaimer}
        />

        {/* Version Info */}
        <div className="flex flex-col items-center justify-center mt-8 mb-4 opacity-50">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-2">
            <Info size={24} className="text-slate-400" />
          </div>
          <span className="text-white font-bold text-sm">AppVault</span>
          <span className="text-slate-500 text-xs font-mono">v1.0.0 (Build 2024.1)</span>
        </div>
      </div>
    </div>
  );
};