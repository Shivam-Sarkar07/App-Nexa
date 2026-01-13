import React from 'react';
import { ArrowLeft, Heart, Share2, Star, Users, Zap } from 'lucide-react';
import { AppItem } from '../types';
import { Button } from '../components/Button';

interface AppDetailsProps {
  app: AppItem;
  onBack: () => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onOpenApp: (app: AppItem) => void;
}

export const AppDetails: React.FC<AppDetailsProps> = ({ app, onBack, isLiked, onToggleLike, onOpenApp }) => {
  return (
    <div className="flex flex-col min-h-full animate-in slide-in-from-right duration-300">
      
      {/* Navbar */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-[#030014]/80 backdrop-blur-md z-20 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onToggleLike(app.id)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            <Heart 
              size={24} 
              className={`transition-all ${isLiked ? 'fill-fuchsia-500 text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'text-white'}`} 
            />
          </button>
          <button className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-24 overflow-y-auto pt-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mt-2 mb-8">
          <img 
            src={app.icon} 
            alt={app.name} 
            className="w-28 h-28 rounded-3xl object-cover shadow-2xl shadow-purple-900/30 mb-6 ring-4 ring-white/5"
          />
          <h1 className="text-3xl font-bold text-white mb-2">{app.name}</h1>
          <span className="text-violet-300 font-medium bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-xs tracking-wide">
            {app.category}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-1 text-yellow-400 mb-1">
              <span className="text-xl font-bold text-white">{app.rating}</span>
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs text-slate-400">Rating</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
             <div className="flex items-center gap-1 text-violet-400 mb-1">
              <span className="text-xl font-bold text-white">{app.users}</span>
              <Users size={16} />
            </div>
            <span className="text-xs text-slate-400">Active Users</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <Button 
            fullWidth 
            variant="primary" 
            className="h-14 text-lg shadow-violet-500/25"
            icon={<Zap size={20} className="fill-white" />}
            onClick={() => onOpenApp(app)}
          >
            Use App Now
          </Button>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">About this App</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            {app.description || app.tagline}
          </p>
          <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
             <h4 className="text-xs font-bold text-violet-300 uppercase mb-3 tracking-wider">Key Features</h4>
             <ul className="text-sm text-slate-300 space-y-3 list-disc list-inside marker:text-violet-500">
                <li>Instant load times</li>
                <li>No installation required</li>
                <li>Secure data handling</li>
                <li>Automatic updates</li>
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};