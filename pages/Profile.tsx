import React from 'react';
import { Settings, LogOut, Heart, Bug, Award, ChevronRight, Crown, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';

interface ProfileProps {
  userEmail: string;
  userName: string;
  userAvatar?: string | null;
  onLogout: () => void;
  onNavigateToLikes: () => void;
  onNavigateToBugReport: () => void;
  onNavigateToPoints: () => void;
  onNavigateToUpgrade: () => void;
  onNavigateToSettings: () => void;
  onNavigateToSupport: () => void;
  isPremiumUser: boolean;
  points: number;
}

export const Profile: React.FC<ProfileProps> = ({ 
  userEmail,
  userName,
  userAvatar,
  onLogout, 
  onNavigateToLikes, 
  onNavigateToBugReport, 
  onNavigateToPoints, 
  onNavigateToUpgrade,
  onNavigateToSettings,
  onNavigateToSupport,
  isPremiumUser,
  points
}) => {
  const avatarUrl = userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8b5cf6&color=fff`;

  const menuItems = [
    { icon: <Heart size={20} />, label: "My Likes", onClick: onNavigateToLikes, locked: false },
    { icon: <Award size={20} />, label: "Points & Rewards", onClick: onNavigateToPoints, locked: false, sub: `${points} pts` },
    { icon: <Bug size={20} />, label: "Report a Bug", onClick: onNavigateToBugReport, locked: false },
    { icon: <HelpCircle size={20} />, label: "Help & Support", onClick: onNavigateToSupport, locked: false },
    { icon: <Settings size={20} />, label: "Settings", onClick: onNavigateToSettings, locked: false },
  ];

  return (
    <div className="flex flex-col min-h-full pb-24 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Profile</h1>
              <p className="text-sm text-slate-400">Manage your account</p>
            </div>
            {isPremiumUser && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                 <Crown size={14} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide">Premium</span>
              </div>
            )}
        </div>

        {/* User Card */}
        <div className={`mx-6 mb-6 p-4 rounded-2xl border backdrop-blur-sm flex items-center gap-4 transition-colors ${
          isPremiumUser 
            ? 'bg-gradient-to-br from-[#1a103c] to-[#0f0728] border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
            : 'bg-white/5 border-white/5 hover:bg-white/10'
        }`}>
            <div className="relative">
              <img src={avatarUrl} alt="Profile" className={`w-16 h-16 rounded-full border-2 shadow-lg ${isPremiumUser ? 'border-yellow-400 shadow-yellow-500/20' : 'border-violet-500/50 shadow-purple-900/20'}`} />
              {isPremiumUser && (
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-[#0f0728] shadow-sm">
                  <Crown size={16} className="text-black fill-black" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
                <h2 className={`text-lg font-bold ${isPremiumUser ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400' : 'text-white'}`}>
                  {userName}
                </h2>
                <p className="text-xs text-slate-400 mb-2">{userEmail}</p>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${
                  isPremiumUser 
                    ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}>
                    {isPremiumUser ? 'Premium Member' : 'Free Plan'}
                </span>
            </div>
        </div>

        {/* Premium Banner - Only show if FREE */}
        {!isPremiumUser && (
          <div className="mx-6 mb-8 p-[1px] rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 shadow-lg shadow-purple-900/20 group cursor-pointer" onClick={onNavigateToUpgrade}>
              <div className="bg-[#0f0728]/95 backdrop-blur-xl rounded-[15px] p-4 flex items-center justify-between group-hover:bg-[#0f0728]/80 transition-colors">
                  <div>
                      <div className="flex items-center gap-2 mb-1">
                          <Crown size={16} className="text-yellow-400 fill-yellow-400" />
                          <h3 className="font-bold text-white text-sm">Upgrade to Premium</h3>
                      </div>
                      <p className="text-xs text-slate-400">Unlock exclusive apps & features.</p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-white/10">
                      Upgrade
                  </button>
              </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="px-6 space-y-3">
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center p-4 rounded-xl border border-white/5 bg-white/5 transition-all ${item.locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 active:scale-[0.99] hover:border-white/10'}`}
                    disabled={item.locked}
                >
                    <div className={`p-2 rounded-lg bg-white/5 mr-4 ${item.locked ? 'text-slate-500' : isPremiumUser ? 'text-yellow-400' : 'text-violet-400'}`}>
                        {item.icon}
                    </div>
                    <div className="flex-1 text-left">
                        <span className={`block font-medium ${item.locked ? 'text-slate-500' : 'text-white'}`}>{item.label}</span>
                        {item.sub && <span className="text-[10px] text-slate-500 block mt-0.5">{item.sub}</span>}
                    </div>
                    {!item.locked && <ChevronRight size={18} className="text-slate-600" />}
                </button>
            ))}
        </div>

        {/* Logout */}
        <div className="mt-8 px-6">
            <Button
                variant="outline"
                fullWidth
                onClick={onLogout}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-300"
                icon={<LogOut size={18} />}
            >
                Log Out
            </Button>
            <p className="text-center text-[10px] text-slate-600 mt-6 font-mono">AppVault v1.0.0 (Beta)</p>
        </div>
    </div>
  );
}