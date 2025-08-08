import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserRole } from '@/types';

interface AuthUser {
  uid: string;
  email: string;
  role: UserRole;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        // In a real app, you'd fetch role from Firestore user document
        // For this demo, we'll determine role based on stored role
        const storedRole = localStorage.getItem('userRole') as UserRole;
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          role: storedRole || 'customer'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole');
      localStorage.removeItem('userLanguage');
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  return {
    user,
    loading,
    login,
    logout
  };
};
