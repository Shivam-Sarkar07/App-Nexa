import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AppDetails } from './pages/AppDetails';
import { Likes } from './pages/Likes';
import { Profile } from './pages/Profile';
import { BugReport } from './pages/BugReport';
import { PointsRewards } from './pages/PointsRewards';
import { PremiumUpgrade } from './pages/PremiumUpgrade';
import { Settings } from './pages/Settings';
import { Support } from './pages/Support';
import { LegalPage } from './pages/Legal';
import { RedeemCode } from './pages/RedeemCode';
import { BottomNav } from './components/BottomNav';
import { WebView } from './components/WebView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppView, AppItem } from './types';
import { useAuth } from './context/AuthContext';
import { auth, db, signOut } from './firebase';
import { collection, query, where, onSnapshot, doc, getDoc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { MOCK_APPS } from './constants';

const AppContent: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [apps, setApps] = useState<AppItem[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [previousView, setPreviousView] = useState<AppView>('HOME');

  // Fetch Apps
  useEffect(() => {
    const q = query(collection(db, 'apps'), where('active', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AppItem[];
      setApps(items);
    }, (error) => {
      console.warn("Firestore access denied or not configured. Switching to Demo Mode.", error);
      // Fallback to mock data so the app is usable without backend setup
      setApps(MOCK_APPS);
    });
    return () => unsubscribe();
  }, []);

  // Sync User Data
  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    
    // Create user doc if it doesn't exist
    const syncUser = async () => {
      try {
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            points: 0,
            likedAppIds: [],
            isPremium: false,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          });
        } else {
          await updateDoc(userRef, { lastLogin: serverTimestamp() });
        }
      } catch (err) {
        console.error("Error syncing user:", err);
        // Silent fail for demo purposes
      }
    };
    syncUser();

    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      }
    }, (error) => {
       console.warn("User sync error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const isAuthenticated = !!user;
  const isPremiumUser = userData?.isPremium || false;
  const points = userData?.points || 0;
  const likedAppIds = new Set(userData?.likedAppIds || []);

  const handleLogin = () => {
    setCurrentView('HOME');
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
    setCurrentView('HOME');
  };

  const handleUpgradeSuccess = () => {
    if (user) {
        // Optimistic update if backend fails
        setUserData((prev: any) => ({ ...prev, isPremium: true }));
        try {
            updateDoc(doc(db, 'users', user.uid), { isPremium: true });
        } catch (e) {
            console.error("Failed to update status on server", e);
        }
    }
    setCurrentView('PROFILE');
  };

  const handleAppClick = (app: AppItem) => {
    setSelectedApp(app);
    if (currentView !== 'APP_DETAILS') {
      setPreviousView(currentView === 'LIKES' ? 'LIKES' : 'HOME');
    }
    setCurrentView('APP_DETAILS');
  };

  const handleOpenApp = (app: AppItem) => {
    setSelectedApp(app);
    if (currentView !== 'WEBVIEW') {
         setPreviousView(currentView);
    }
    setCurrentView('WEBVIEW');
  };

  const handleToggleLike = async (id: string) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const isLiked = likedAppIds.has(id);
    
    // Optimistic UI update
    const newLiked = new Set(likedAppIds);
    if (isLiked) newLiked.delete(id); else newLiked.add(id);
    setUserData((prev: any) => ({ ...prev, likedAppIds: Array.from(newLiked) }));

    try {
      await updateDoc(userRef, {
        likedAppIds: isLiked ? arrayRemove(id) : arrayUnion(id)
      });
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const getLikedApps = () => {
    return apps.filter(app => likedAppIds.has(app.id));
  };

  const handleBack = () => {
    setCurrentView(previousView);
  };

  const showBottomNav = [
    'HOME', 'LIKES', 'APP_DETAILS', 'PROFILE', 
    'BUG_REPORT', 'POINTS', 'PREMIUM_UPGRADE', 
    'SETTINGS', 'SUPPORT', 'REDEEM_CODE'
  ].includes(currentView);

  if (authLoading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    // Mobile container wrapper
    <div className="max-w-md mx-auto h-[100dvh] bg-transparent flex flex-col shadow-2xl overflow-hidden relative border-x border-white/5">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {currentView === 'HOME' && (
          <Home 
            apps={apps}
            onNavigateToLogin={() => setCurrentView('LOGIN')} 
            onNavigateToUpgrade={() => {
              setPreviousView('HOME');
              setCurrentView('PREMIUM_UPGRADE');
            }}
            onAppClick={handleAppClick}
            onOpenApp={handleOpenApp}
            isAuthenticated={isAuthenticated}
            isPremiumUser={isPremiumUser}
          />
        )}
        
        {currentView === 'LOGIN' && (
          <Login 
            onBack={() => setCurrentView('HOME')} 
            onLogin={handleLogin}
          />
        )}

        {currentView === 'APP_DETAILS' && selectedApp && (
          <AppDetails 
            app={selectedApp}
            onBack={handleBack}
            isLiked={likedAppIds.has(selectedApp.id)}
            onToggleLike={handleToggleLike}
            onOpenApp={handleOpenApp}
          />
        )}

        {currentView === 'LIKES' && (
          <Likes 
            likedApps={getLikedApps()}
            onAppClick={handleAppClick}
            onOpenApp={handleOpenApp}
          />
        )}

        {currentView === 'PROFILE' && (
          <Profile 
            userEmail={user?.email || 'Guest'}
            userName={user?.displayName || 'Guest User'}
            userAvatar={user?.photoURL}
            onLogout={handleLogout}
            onNavigateToLikes={() => setCurrentView('LIKES')}
            onNavigateToBugReport={() => {
                setPreviousView('PROFILE');
                setCurrentView('BUG_REPORT');
            }}
            onNavigateToPoints={() => setCurrentView('POINTS')}
            onNavigateToUpgrade={() => {
              setPreviousView('PROFILE');
              setCurrentView('PREMIUM_UPGRADE');
            }}
            onNavigateToSettings={() => setCurrentView('SETTINGS')}
            onNavigateToSupport={() => setCurrentView('SUPPORT')}
            isPremiumUser={isPremiumUser}
            points={points}
          />
        )}
        
        {currentView === 'BUG_REPORT' && (
          <BugReport 
            apps={apps}
            onBack={() => setCurrentView(previousView)}
          />
        )}

        {currentView === 'POINTS' && (
          <PointsRewards
            points={points}
            onBack={() => setCurrentView('PROFILE')}
            isPremiumUser={isPremiumUser}
            onNavigateToUpgrade={() => {
              setPreviousView('POINTS');
              setCurrentView('PREMIUM_UPGRADE');
            }}
            onNavigateToBugReport={() => {
                setPreviousView('POINTS');
                setCurrentView('BUG_REPORT');
            }}
            onNavigateToRedeem={() => {
                setPreviousView('POINTS');
                setCurrentView('REDEEM_CODE');
            }}
          />
        )}

        {currentView === 'REDEEM_CODE' && (
            <RedeemCode 
                onBack={() => setCurrentView('POINTS')}
            />
        )}

        {currentView === 'PREMIUM_UPGRADE' && (
          <PremiumUpgrade 
            onBack={handleBack}
            onUpgrade={handleUpgradeSuccess}
          />
        )}

        {currentView === 'SETTINGS' && (
          <Settings 
            onBack={() => setCurrentView('PROFILE')}
            onNavigateToPrivacy={() => setCurrentView('PRIVACY')}
            onNavigateToTerms={() => setCurrentView('TERMS')}
            onNavigateToDisclaimer={() => setCurrentView('DISCLAIMER')}
          />
        )}

        {currentView === 'SUPPORT' && (
          <Support
            onBack={() => setCurrentView('PROFILE')}
            onNavigateToBugReport={() => {
              setPreviousView('SUPPORT');
              setCurrentView('BUG_REPORT');
            }}
          />
        )}

        {(currentView === 'PRIVACY' || currentView === 'TERMS' || currentView === 'DISCLAIMER') && (
          <LegalPage 
            view={currentView}
            onBack={() => setCurrentView('SETTINGS')}
          />
        )}

        {currentView === 'WEBVIEW' && selectedApp && (
            <WebView 
                url={selectedApp.url}
                title={selectedApp.name}
                onBack={handleBack}
            />
        )}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav 
          activeTab={currentView}
          onTabChange={(tab) => {
            if ((tab === 'LIKES' || tab === 'PROFILE' || tab === 'POINTS') && !isAuthenticated) {
              setCurrentView('LOGIN'); 
            } else {
              setCurrentView(tab);
            }
          }}
        />
      )}
      
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;