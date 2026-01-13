import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-[100dvh] w-full bg-[#030014] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
            We encountered an unexpected error. Please try reloading the app.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 font-medium active:scale-95"
          >
            <RefreshCw size={18} />
            Reload App
          </button>
          <p className="mt-8 text-[10px] text-slate-600 font-mono">
            {this.state.error?.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}