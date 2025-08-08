import React, { useState } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Lock, Loader2, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNotification } from './Notification';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  language: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  language 
}) => {
  const [email, setEmail] = useState('hotellucky2025@gmail.com');
  const [password, setPassword] = useState('hotellucky');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      showNotification(getTranslation('login_successful', language), 'success');
      onSuccess();
    } catch (error) {
      showNotification(getTranslation('invalid_credentials', language), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 glass-dark z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-8 max-w-md w-full animate-bounce-in hover-lift">
        <div className="text-center mb-6 animate-scale-in animate-delay-200">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <Lock className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getTranslation('secure_access', language)}
          </h2>
          <p className="text-gray-600">
            {getTranslation('authenticate_continue', language)}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 animate-slide-left animate-delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('email', language)}
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300" 
              placeholder={getTranslation('enter_email', language)}
              required
              data-testid="login-email"
            />
          </div>
          <div className="mb-6 animate-slide-right animate-delay-400">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getTranslation('password', language)}
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300" 
              placeholder={getTranslation('enter_password', language)}
              required
              data-testid="login-password"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center btn-modern hover-lift animate-slide-up animate-delay-500"
            data-testid="login-submit"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                {getTranslation('loading', language)}
              </>
            ) : (
              getTranslation('sign_in', language)
            )}
          </button>
        </form>
        
        <button 
          onClick={onClose}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          data-testid="login-cancel"
        >
          {getTranslation('cancel', language)}
        </button>
      </div>
    </div>
  );
};
