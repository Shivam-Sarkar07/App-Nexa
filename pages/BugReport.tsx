import React, { useState } from 'react';
import { ArrowLeft, Upload, Bug, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { AppItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BugReportProps {
  apps: AppItem[];
  onBack: () => void;
}

export const BugReport: React.FC<BugReportProps> = ({ apps, onBack }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    appName: '',
    bugType: 'not_loading',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'bug_reports'), {
        userId: user.uid,
        userEmail: user.email,
        appName: formData.appName,
        bugType: formData.bugType,
        description: formData.description,
        status: 'pending',
        timestamp: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting bug:", err);
      setError("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Report Submitted</h2>
        <p className="text-slate-400 mb-8 max-w-[260px] leading-relaxed">
          Thanks! Your report will be reviewed. Valid reports may earn points.
        </p>
        <div className="w-full max-w-xs">
          <Button onClick={onBack} variant="primary" fullWidth>
            Return to Profile
          </Button>
        </div>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold text-white">Report a Bug</h1>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-24">
        
        <div className="mb-8 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-200/80 leading-relaxed">
            Found an issue? Let us know! Valid bug reports may be rewarded with community points.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* App Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Affected App</label>
            <div className="relative">
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all text-sm"
                value={formData.appName}
                onChange={(e) => setFormData({...formData, appName: e.target.value})}
                required
              >
                <option value="" disabled className="bg-slate-900 text-slate-500">Select an app...</option>
                <option value="general" className="bg-slate-900">General AppVault Issue</option>
                {apps.map(app => (
                  <option key={app.id} value={app.id} className="bg-slate-900">{app.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Bug Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Issue Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'not_loading', label: 'App Not Loading' },
                { id: 'ui', label: 'UI/Design Issue' },
                { id: 'feature', label: 'Feature Broken' },
                { id: 'other', label: 'Other' },
              ].map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setFormData({...formData, bugType: type.id})}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                    formData.bugType === type.id
                      ? 'bg-violet-600/20 border-violet-500 text-violet-300'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Description</label>
            <textarea 
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all text-sm resize-none"
              placeholder="Describe what happened..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          {/* Mock Screenshot Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Screenshot (Optional)</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload size={20} className="text-slate-400 group-hover:text-violet-400" />
              </div>
              <span className="text-xs text-slate-500">Tap to upload image</span>
            </div>
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit */}
          <div className="pt-4">
            <Button 
              type="submit" 
              fullWidth 
              variant="primary"
              disabled={isSubmitting}
              icon={isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Bug size={18} />}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};