import React, { useState, useEffect } from 'react';
import { UserRole, Language } from './types';
import { RoleLanguageSelector } from './components/RoleLanguageSelector';
import { CustomerMenu } from './components/CustomerMenu';
import { KitchenDashboard } from './components/KitchenDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { useNotification } from './components/Notification';
import { useAuth } from './hooks/use-auth';

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(
    () => localStorage.getItem('userRole') as UserRole || null
  );
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    () => localStorage.getItem('userLanguage') as Language || 'en'
  );
  const [showRoleSelector, setShowRoleSelector] = useState(!currentRole);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { user, loading } = useAuth();
  const { showNotification, NotificationComponent } = useNotification();

  // Handle role and language selection
  const handleRoleLanguageSelection = (role: UserRole, language: Language) => {
    setCurrentRole(role);
    setCurrentLanguage(language);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userLanguage', language);
    setShowRoleSelector(false);

    // Show login modal for non-customer roles
    if (role !== 'customer') {
      setShowLoginModal(true);
    }
  };

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('userLanguage', language);
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    showNotification('Login successful!', 'success');
  };

  // Handle login modal close
  const handleLoginClose = () => {
    setShowLoginModal(false);
    // Reset to role selection if login was cancelled
    setCurrentRole(null);
    setShowRoleSelector(true);
    localStorage.removeItem('userRole');
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentRole(null);
    setShowRoleSelector(true);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLanguage');
  };

  // Show loading spinner while Firebase is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role and Language Selector */}
      {showRoleSelector && (
        <RoleLanguageSelector onContinue={handleRoleLanguageSelection} />
      )}

      {/* Customer Menu View */}
      {currentRole === 'customer' && !showRoleSelector && (
        <CustomerMenu
          language={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* Kitchen Dashboard */}
      {(currentRole === 'south-kitchen' || currentRole === 'kolhapuri-kitchen') && 
       !showRoleSelector && 
       user && (
        <KitchenDashboard
          role={currentRole}
          language={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Dashboard */}
      {currentRole === 'admin' && !showRoleSelector && user && (
        <AdminDashboard
          language={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginClose}
        onSuccess={handleLoginSuccess}
        language={currentLanguage}
      />

      {/* Notification Component */}
      {NotificationComponent}
    </div>
  );
}

export default App;
