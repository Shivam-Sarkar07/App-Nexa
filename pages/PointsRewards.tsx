import React from 'react';
import { ArrowLeft, Trophy, Zap, Bug, Gift, Lock, Crown, TrendingUp } from 'lucide-react';
import { Button } from '../components/Button';

interface PointsRewardsProps {
  onBack: () => void;
  isPremiumUser: boolean;
  onNavigateToUpgrade: () => void;
  onNavigateToBugReport: () => void;
  onNavigateToRedeem: () => void;
  points: number;
}

export const PointsRewards: React.FC<PointsRewardsProps> = ({ 
  onBack, 
  isPremiumUser, 
  onNavigateToUpgrade, 
  onNavigateToBugReport,
  onNavigateToRedeem,
  points
}) => {
  const userPoints = points;
  const nextLevelPoints = 200;
  const progress = Math.min((userPoints / nextLevelPoints) * 100, 100);

  const earnTasks = [
    { 
        icon: <Bug size={18} className="text-red-400" />, 
        label: "Report a valid bug", 
        points: "+20", 
        sub: "Approved reports only", 
        bg: "bg-red-500/10 border-red-500/20",
        action: onNavigateToBugReport 
    },
    { 
        icon: <Gift size={18} className="text-blue-400" />, 
        label: "Redeem Code", 
        points: "???", 
        sub: "Enter admin code", 
        bg: "bg-blue-500/10 border-blue-500/20",
        action: onNavigateToRedeem 
    },
  ];

  const rewards = [
    { title: "7 Days Ad-Free", cost: 500, icon: <Zap size={20} /> },
    { title: "Pro Profile Badge", cost: 1000, icon: <Crown size={20} /> },
    { title: "Beta Access", cost: 300, icon: <div className="text-xs font-bold">BETA</div> },
    { title: "Custom Themes", cost: 2000, icon: <Trophy size={20} /> },
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
        <h1 className="text-lg font-bold text-white">Points & Rewards</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        
        {/* Points Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-700 to-violet-900 p-6 shadow-2xl shadow-purple-900/40 mb-6 border border-white/10">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={140} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-200 mb-1">Total Balance</span>
            <h2 className="text-5xl font-black text-white mb-2 drop-shadow-md">{userPoints}</h2>
            <div className={`inline-flex items-center gap-1 backdrop-blur-md px-3 py-1 rounded-full border mb-6 ${isPremiumUser ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-black/20 border-white/10'}`}>
               {isPremiumUser ? <Crown size={14} className="text-yellow-400 fill-yellow-400" /> : <Trophy size={14} className="text-slate-300" />}
               <span className={`text-xs font-bold ${isPremiumUser ? 'text-yellow-200' : 'text-slate-200'}`}>
                 {isPremiumUser ? 'Premium Member' : 'Bronze Member'}
               </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-violet-200 mb-2 font-medium">
                <span>Progress to Silver</span>
                <span>{userPoints} / {nextLevelPoints} pts</span>
              </div>
              <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Premium Nudge (Only for Free Users) */}
        {!isPremiumUser && (
          <div className="mb-8 p-[1px] rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 shadow-lg shadow-amber-900/20">
             <div className="bg-[#0f0728] rounded-[15px] p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                    <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                    Double Points?
                  </h3>
                  <p className="text-xs text-slate-400">Premium members earn 2x rewards.</p>
                </div>
                <Button 
                  variant="primary" 
                  className="py-2 px-4 text-xs h-auto bg-gradient-to-r from-amber-500 to-yellow-600 border-none"
                  onClick={onNavigateToUpgrade}
                >
                  Upgrade
                </Button>
             </div>
          </div>
        )}

        {/* Ways to Earn */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-green-400" />
            <h3 className="text-lg font-bold text-white">Ways to Earn</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {earnTasks.map((task, idx) => (
              <button 
                key={idx} 
                onClick={task.action}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors active:scale-[0.98] group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${task.bg}`}>
                    {task.icon}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-200 block group-hover:text-white transition-colors">{task.label}</span>
                    <span className="text-[10px] text-slate-500 block">{task.sub}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/10">{task.points}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Store */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Gift size={18} className="text-fuchsia-400" />
            <h3 className="text-lg font-bold text-white">Rewards Store</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {rewards.map((reward, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-violet-500/30 transition-colors">
                
                {/* Lock Overlay */}
                <div className="absolute inset-0 bg-[#030014]/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 transition-opacity">
                  <div className="bg-black/40 p-2 rounded-full mb-1 border border-white/10">
                    <Lock size={16} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Coming Soon</span>
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <div className="text-slate-400">{reward.icon}</div>
                </div>
                
                <div className="flex-1 flex flex-col justify-end w-full opacity-40">
                  <h4 className="text-xs font-bold text-white mb-1">{reward.title}</h4>
                  <span className="text-[10px] text-violet-300 bg-violet-500/10 py-1 px-2 rounded-full self-center">
                    {reward.cost} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};