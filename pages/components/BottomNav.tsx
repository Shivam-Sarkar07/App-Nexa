import React from 'react';
import { Home, Heart, User, Trophy } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  activeTab: AppView;
  onTabChange: (tab: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', id: 'HOME' as AppView },
    { icon: <Heart size={24} />, label: 'Liked', id: 'LIKES' as AppView },
    { icon: <Trophy size={24} />, label: 'Points', id: 'POINTS' as AppView },
    { icon: <User size={24} />, label: 'Profile', id: 'PROFILE' as AppView },
  ];

  return (
    <div className="flex-none bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe z-30">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id || (activeTab === 'APP_DETAILS' && item.id === 'HOME');
          return (
            <button 
              key={index}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                isActive 
                  ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]' 
                  : 'text-slate-500 hover:text-slate-300'
              } active:scale-95`}
            >
              <div className={`relative ${isActive ? '-translate-y-0.5' : ''} transition-transform`}>
                {item.icon}
                {isActive && <div className="absolute inset-0 bg-violet-500 blur-lg opacity-20" />}
              </div>
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};