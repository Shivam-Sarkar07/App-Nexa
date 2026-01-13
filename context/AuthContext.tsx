import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export type UserRole = 'admin' | 'user' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      
      if (currentUser) {
        setUser(currentUser);
        
        // Check for admin role
        if (currentUser.email) {
          try {
            // Assumes document ID in 'admins' collection is the user's email
            const adminDocRef = doc(db, 'admins', currentUser.email);
            const adminSnap = await getDoc(adminDocRef);

            if (adminSnap.exists() && adminSnap.data()?.active === true) {
              setRole('admin');
            } else {
              setRole('user');
            }
          } catch (error) {
            console.error("Error fetching admin status:", error);
            // Default to user on error for security
            setRole('user');
          }
        } else {
          // No email (e.g. anonymous auth), default to user
          setRole('user');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};