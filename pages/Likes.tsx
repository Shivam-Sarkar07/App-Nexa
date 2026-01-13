import React from 'react';
import { Heart } from 'lucide-react';
import { AppItem } from '../types';
import { AppCard } from '../components/AppCard';

interface LikesProps {
  likedApps: AppItem[];
  onAppClick: (app: AppItem) => void;
  onOpenApp: (app: AppItem) => void;
}

export const Likes: React.FC<LikesProps> = ({ likedApps, onAppClick, onOpenApp }) => {
  return (
    <div className="flex flex-col min-h-full pb-20">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-bold text-white mb-1">My Likes</h1>
        <p className="text-sm text-slate-400">Your favorite instant apps collection</p>
      </div>

      {likedApps.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-0 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-2xl shadow-purple-900/10">
            <Heart size={36} className="text-slate-600" />
          </div>
          <h3 className="text-white font-medium mb-2 text-lg">No likes yet</h3>
          <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
            Tap the heart icon on any app to save it here for quick access.
          </p>
        </div>
      ) : (
        <div className="px-6 grid grid-cols-1 gap-4 animate-in slide-in-from-bottom-4 duration-300">
          {likedApps.map((app) => (
            <AppCard 
              key={app.id} 
              app={app} 
              onClick={() => onAppClick(app)}
              onOpen={onOpenApp}
              lockType="NONE"
            />
          ))}
        </div>
      )}
    </div>
  );
};