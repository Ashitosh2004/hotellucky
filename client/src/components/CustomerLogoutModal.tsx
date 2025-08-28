import React, { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Lock, Loader2, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from './Notification';

interface CustomerLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  language: Language;
}

export const CustomerLogoutModal: React.FC<CustomerLogoutModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogout,
  language 
}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      showNotification(getTranslation('enter_password', language), 'error');
      return;
    }

    setLoading(true);

    try {
      // Verify password by attempting login with stored email
      const storedEmail = 'hotellucky2025@gmail.com'; // Default admin email
      await login(storedEmail, password);
      
      // If login succeeds, proceed with logout
      showNotification(getTranslation('logout_successful', language), 'success');
      onLogout();
      onClose();
      setPassword('');
    } catch (error) {
      showNotification(getTranslation('invalid_credentials', language), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 glass-dark z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-8 max-w-md w-full animate-bounce-in hover-lift">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 animate-glow">
              <Lock className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {getTranslation('logout_confirmation', language)}
            </h2>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600"
            data-testid="close-logout-modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          {getTranslation('logout_password_prompt', language)}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 animate-slide-up animate-delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('password', language)}
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300" 
              placeholder={getTranslation('enter_password', language)}
              required
              data-testid="logout-password"
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={handleClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 btn-modern"
              data-testid="cancel-logout"
            >
              {getTranslation('cancel', language)}
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 btn-modern hover-lift flex items-center justify-center"
              data-testid="confirm-logout"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {getTranslation('loading', language)}
                </>
              ) : (
                getTranslation('confirm_logout', language)
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};