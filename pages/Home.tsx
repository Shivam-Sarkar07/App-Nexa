import React, { useState } from 'react';
import { Search, Sparkles, User, Crown } from 'lucide-react';
import { AppCard, LockType } from '../components/AppCard';
import { Button } from '../components/Button';
import { CATEGORIES } from '../constants';
import { AppItem } from '../types';

interface HomeProps {
  apps: AppItem[];
  onNavigateToLogin: () => void;
  onNavigateToUpgrade: () => void;
  onAppClick: (app: AppItem) => void;
  onOpenApp: (app: AppItem) => void;
  isAuthenticated: boolean;
  isPremiumUser: boolean;
}

export const Home: React.FC<HomeProps> = ({ 
  apps,
  onNavigateToLogin, 
  onNavigateToUpgrade, 
  onAppClick, 
  onOpenApp, 
  isAuthenticated,
  isPremiumUser 
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const getLockType = (app: AppItem): LockType => {
    if (!isAuthenticated) return 'LOGIN';
    if (app.isPremium && !isPremiumUser) return 'PREMIUM';
    return 'NONE';
  };

  const handleAppInteraction = (app: AppItem, isOpening: boolean) => {
    const lockType = getLockType(app);
    
    if (lockType === 'LOGIN') {
      onNavigateToLogin();
      return;
    }
    
    if (lockType === 'PREMIUM') {
      onNavigateToUpgrade();
      return;
    }

    if (isOpening) {
      onOpenApp(app);
    } else {
      onAppClick(app);
    }
  };

  const filteredApps = activeCategory === 'All' 
    ? apps 
    : apps.filter(app => app.category === activeCategory || (activeCategory === 'Trending' && app.isTrending));

  return (
    <div className={`flex flex-col min-h-full ${!isAuthenticated ? 'pb-24' : 'pb-4'}`}> 
      
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white drop-shadow-sm">
            AppVault
          </h1>
          <p className="text-xs text-violet-300/70 font-medium tracking-widest uppercase mt-1">Instant App Platform</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Upgrade Button (Visible only to Non-Premium Users) */}
          {!isPremiumUser && (
            <button
              onClick={onNavigateToUpgrade}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400/10 to-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold hover:bg-yellow-500/20 active:scale-95 transition-all shadow-[0_0_10px_rgba(234,179,8,0.1)]"
            >
              <Crown size={14} className="fill-yellow-400" />
              <span>Go Premium</span>
            </button>
          )}

          {/* Profile Icon / Login Trigger */}
          <button 
              onClick={isAuthenticated ? undefined : onNavigateToLogin}
              className="relative group outline-none"
          >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isAuthenticated && isPremiumUser
                      ? 'ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                      : 'border border-white/10 hover:border-violet-500/50 bg-white/5'
              }`}>
                  {isAuthenticated ? (
                     <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                         isPremiumUser 
                          ? 'bg-gradient-to-br from-slate-900 to-black border border-white/10' 
                          : 'bg-gradient-to-br from-violet-600 to-fuchsia-600'
                     }`}>
                        {isPremiumUser ? (
                            <User size={20} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                        ) : (
                            <User size={20} className="text-white" />
                        )}
                     </div>
                  ) : (
                     <span className="text-sm font-bold text-slate-400">G</span>
                  )}
              </div>
              
              {/* Premium Badge Overlay */}
              {isAuthenticated && isPremiumUser && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-black z-10 animate-in zoom-in duration-300">
                      <Crown size={14} className="text-black fill-black stroke-[3px]" />
                  </div>
              )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-violet-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search apps, games, tools..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all shadow-inner"
            readOnly // Not functional yet
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex overflow-x-auto px-6 gap-3 no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40 border border-violet-500' 
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured/Grid */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-yellow-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">
              {activeCategory === 'All' ? 'Trending Now' : activeCategory}
            </h2>
        </div>
        
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredApps.map((app) => (
              <AppCard 
                key={app.id} 
                app={app} 
                lockType={getLockType(app)}
                onClick={() => handleAppInteraction(app, false)}
                onOpen={() => handleAppInteraction(app, true)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p>No apps found in this category.</p>
          </div>
        )}
      </div>

      {/* Sticky CTA Banner (Only for Guest) */}
      {!isAuthenticated && (
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-md mx-auto z-20">
          <div className="bg-[#120a2e]/90 backdrop-blur-xl border border-violet-500/30 p-4 rounded-2xl shadow-2xl shadow-black/50 flex items-center justify-between gap-4">
              <div className="flex-1">
                  <p className="text-white font-bold text-sm">Unlock 500+ Apps</p>
                  <p className="text-slate-400 text-xs">Zero install. Instant access.</p>
              </div>
              <Button 
                  variant="primary" 
                  className="py-2.5 px-6 text-sm"
                  onClick={onNavigateToLogin}
              >
                  Sign Up Free
              </Button>
          </div>
        </div>
      )}

    </div>
  );
};