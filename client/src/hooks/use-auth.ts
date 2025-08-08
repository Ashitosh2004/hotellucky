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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Set role after successful login
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          role: storedRole as UserRole
        });
      }
    } catch (error: any) {
      console.error('Firebase auth error:', error.code, error.message);
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many login attempts. Please try again later.');
      } else {
        throw new Error(error.message || 'Login failed. Please try again.');
      }
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
