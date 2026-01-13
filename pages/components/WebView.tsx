import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

interface WebViewProps {
  url: string;
  title: string;
  onBack: () => void;
}

export const WebView: React.FC<WebViewProps> = ({ url, title, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when URL changes
    setLoading(true);
    setError(false);
  }, [url]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#030014] flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#030014]/90 backdrop-blur-md border-b border-white/5 shadow-xl">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
             <h1 className="text-sm font-bold text-white truncate max-w-[200px]">{title}</h1>
             <span className="text-[10px] text-green-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                Secure Connection
             </span>
        </div>
        <div className="w-10" /> 
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#030014] z-10">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="animate-spin text-violet-500" size={40} />
              <p className="text-slate-400 text-sm animate-pulse">Establishing secure connection...</p>
            </div>
          </div>
        )}

        {error ? (
           <div className="absolute inset-0 flex items-center justify-center bg-[#030014] z-10">
            <div className="flex flex-col items-center gap-3 text-center p-6">
              <AlertCircle className="text-red-500" size={48} />
              <p className="text-white font-bold text-lg mt-2">Unable to load app</p>
              <p className="text-slate-400 text-sm">The connection was interrupted. Please try again.</p>
              <button 
                onClick={onBack} 
                className="mt-6 px-6 py-2.5 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors border border-white/10"
              >
                Return to AppVault
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={url}
            className="w-full h-full border-0"
            onLoad={handleLoad}
            onError={handleError}
            title={title}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        )}
      </div>
    </div>
  );
};