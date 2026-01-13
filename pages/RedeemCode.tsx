import React, { useState } from 'react';
import { ArrowLeft, Gift, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, runTransaction, doc, serverTimestamp } from 'firebase/firestore';

interface RedeemCodeProps {
  onBack: () => void;
}

export const RedeemCode: React.FC<RedeemCodeProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [message, setMessage] = useState('');

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !user) return;
    
    setStatus('LOADING');
    
    try {
        const normalizedCode = code.trim();
        const giftCodesRef = collection(db, 'gift_codes');
        const q = query(giftCodesRef, where('code', '==', normalizedCode), where('active', '==', true));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            setStatus('ERROR');
            setMessage('Invalid or expired code.');
            return;
        }

        const giftCodeDoc = querySnapshot.docs[0];
        const giftData = giftCodeDoc.data();
        
        // Use transaction for atomic update
        await runTransaction(db, async (transaction) => {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) throw new Error("User does not exist");
            
            // Check if user already redeemed this specific code ID (optional, but good for one-time use per user logic if extended)
            // For now, simple usage limit check on the code doc
            
            const currentUsage = giftData.usedCount || 0;
            if (giftData.usageLimit && currentUsage >= giftData.usageLimit) {
                throw new Error("Code limit reached");
            }

            // Update user points
            const currentPoints = userDoc.data().points || 0;
            transaction.update(userRef, { points: currentPoints + giftData.points });

            // Update gift code usage
            transaction.update(giftCodeDoc.ref, { usedCount: currentUsage + 1 });

            // Log entry
            const logRef = doc(collection(db, 'points_logs'));
            transaction.set(logRef, {
                userId: user.uid,
                amount: giftData.points,
                reason: 'Gift Code Redeem',
                code: normalizedCode,
                timestamp: serverTimestamp()
            });
        });

        setStatus('SUCCESS');
        setMessage(`Code redeemed! +${giftData.points} Points added.`);

    } catch (err: any) {
        console.error(err);
        setStatus('ERROR');
        setMessage(err.message === "Code limit reached" ? "Code usage limit reached." : "Failed to redeem code.");
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
        <p className="text-slate-400 mb-8 max-w-[260px] leading-relaxed">
          {message}
        </p>
        <div className="w-full max-w-xs">
          <Button onClick={onBack} variant="primary" fullWidth>
            Return to Rewards
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
        <h1 className="text-lg font-bold text-white">Redeem Code</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        
        <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                <Gift size={32} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Got a promo code?</h2>
            <p className="text-slate-400 text-sm text-center max-w-[280px]">
                Enter your reward code below to claim points, badges, or premium features.
            </p>
        </div>

        <form onSubmit={handleRedeem} className="space-y-4 max-w-sm mx-auto">
            <div className="space-y-2">
                <input 
                    type="text" 
                    placeholder="Enter code" 
                    className={`w-full bg-white/5 border rounded-xl px-4 py-4 text-center text-lg font-mono tracking-widest uppercase text-white placeholder-slate-600 focus:outline-none focus:bg-white/10 transition-all ${status === 'ERROR' ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'}`}
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        if (status === 'ERROR') setStatus('IDLE');
                    }}
                    disabled={status === 'LOADING'}
                />
                {status === 'ERROR' && (
                    <div className="flex items-center justify-center gap-1.5 text-red-400 animate-in slide-in-from-top-1">
                        <XCircle size={14} />
                        <span className="text-xs font-medium">{message}</span>
                    </div>
                )}
            </div>

            <Button 
                type="submit" 
                fullWidth 
                variant="primary"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-900/20"
                disabled={status === 'LOADING' || !code.trim()}
                icon={status === 'LOADING' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : undefined}
            >
                {status === 'LOADING' ? 'Verifying...' : 'Redeem Code'}
            </Button>
            
        </form>

      </div>
    </div>
  );
};