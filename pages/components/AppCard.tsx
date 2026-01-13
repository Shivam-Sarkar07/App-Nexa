import React from 'react';
import { Lock, Star, Users, ExternalLink, Crown } from 'lucide-react';
import { AppItem } from '../types';

export type LockType = 'NONE' | 'LOGIN' | 'PREMIUM';

interface AppCardProps {
  app: AppItem;
  onClick: () => void;
  onOpen?: (app: AppItem) => void;
  lockType?: LockType;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick, onOpen, lockType = 'NONE' }) => {
  const isLocked = lockType !== 'NONE';
  
  const handleOpenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpen && !isLocked) {
      onOpen(app);
    } else if (isLocked) {
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative group overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border p-4 active:scale-[0.98] transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/20 ${
        lockType === 'PREMIUM' 
          ? 'border-yellow-500/20 hover:border-yellow-500/40' 
          : 'border-white/5 hover:border-violet-500/30'
      }`}
    >
      {/* Header with Icon and Info */}
      <div className="flex items-start gap-4 mb-3">
        <div className="relative">
          <img 
            src={app.icon} 
            alt={app.name} 
            className="w-14 h-14 rounded-xl object-cover bg-slate-800 shadow-inner ring-1 ring-white/10"
          />
          {app.isPremium && lockType !== 'LOGIN' && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-black p-0.5 rounded-full border border-black/20 shadow-sm">
              <Crown size={10} fill="currentColor" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
             <h3 className={`font-bold text-lg truncate transition-colors pr-2 ${lockType === 'PREMIUM' ? 'text-slate-100' : 'text-white group-hover:text-violet-300'}`}>
               {app.name}
             </h3>
             
             {/* Open Button (Only if unlocked and onOpen provided) */}
             {!isLocked && onOpen && (
               <button 
                 onClick={handleOpenClick}
                 className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px] font-bold uppercase tracking-wider hover:bg-violet-600 hover:text-white transition-all"
               >
                 Open
               </button>
             )}
          </div>
          
          <p className="text-slate-400 text-xs truncate mt-0.5">{app.category}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-slate-400">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              {app.rating}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Users size={12} className="text-violet-400" />
              {app.users}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tagline */}
      <div className="flex items-end justify-between">
          <p className="text-sm text-slate-300 line-clamp-2 flex-1 mr-2">{app.tagline}</p>
          
          {/* Mobile Open Button */}
          {!isLocked && onOpen && (
             <button 
               onClick={handleOpenClick}
               className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-violet-400 active:bg-violet-600 active:text-white transition-colors"
             >
               <ExternalLink size={16} />
             </button>
          )}
      </div>

      {/* Lock Overlay - Only show if locked */}
      {isLocked && (
        <>
          {/* Hover state for desktop */}
          <div className="hidden md:flex absolute inset-0 bg-[#050505]/70 backdrop-blur-[4px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`p-3 rounded-full mb-2 border shadow-2xl ${lockType === 'PREMIUM' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-white/10 border-white/10'}`}>
              {lockType === 'PREMIUM' ? <Crown size={20} className="text-yellow-400" /> : <Lock size={20} className="text-violet-400" />}
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase drop-shadow-md ${lockType === 'PREMIUM' ? 'text-yellow-200' : 'text-violet-200'}`}>
              {lockType === 'PREMIUM' ? 'Premium Required' : 'Login to Use'}
            </span>
          </div>

          {/* Mobile state - Always visible when locked */}
          <div className="md:hidden absolute inset-0 bg-[#050505]/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
             <div className={`p-3 rounded-full mb-2 border shadow-lg backdrop-blur-md ${lockType === 'PREMIUM' ? 'bg-black/60 border-yellow-500/30' : 'bg-black/60 border-white/10'}`}>
              {lockType === 'PREMIUM' ? <Crown size={18} className="text-yellow-400" /> : <Lock size={18} className="text-violet-400" />}
            </div>
            <span className={`text-[10px] font-bold tracking-wider uppercase bg-black/50 px-2 py-1 rounded-md border ${lockType === 'PREMIUM' ? 'text-yellow-100 border-yellow-500/20' : 'text-violet-100 border-white/10'}`}>
              {lockType === 'PREMIUM' ? 'Premium Required' : 'Login to Use'}
            </span>
          </div>
        </>
      )}
    </div>
  );
};