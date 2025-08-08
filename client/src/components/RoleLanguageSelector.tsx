import React, { useState } from 'react';
import { UserRole, Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Utensils, User, CookingPot, Flame, Settings } from 'lucide-react';

interface RoleLanguageSelectorProps {
  onContinue: (role: UserRole, language: Language) => void;
}

export const RoleLanguageSelector: React.FC<RoleLanguageSelectorProps> = ({ onContinue }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const roles = [
    {
      id: 'customer' as UserRole,
      icon: User,
      title: 'customer_menu',
      description: 'customer_menu_desc'
    },
    {
      id: 'south-kitchen' as UserRole,
      icon: CookingPot,
      title: 'south_indian_kitchen',
      description: 'south_kitchen_desc'
    },
    {
      id: 'kolhapuri-kitchen' as UserRole,
      icon: Flame,
      title: 'kolhapuri_kitchen',
      description: 'kolhapuri_kitchen_desc'
    },
    {
      id: 'admin' as UserRole,
      icon: Settings,
      title: 'admin_dashboard',
      description: 'admin_dashboard_desc'
    }
  ];

  const languages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'hi' as Language, name: 'हिंदी' },
    { code: 'mr' as Language, name: 'मराठी' }
  ];

  const handleContinue = () => {
    if (selectedRole && selectedLanguage) {
      onContinue(selectedRole, selectedLanguage);
    }
  };

  return (
    <div className="fixed inset-0 gradient-bg z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card-modern rounded-2xl shadow-2xl p-8 max-w-md w-full animate-bounce-in hover-lift">
        {/* Hotel Lucky Logo */}
        <div className="text-center mb-8 animate-scale-in animate-delay-200">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <Utensils className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getTranslation('hotel_lucky', selectedLanguage)}
          </h1>
          <p className="text-gray-600">
            {getTranslation('restaurant_management', selectedLanguage)}
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6 animate-slide-up animate-delay-300">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {getTranslation('select_role', selectedLanguage)}
          </label>
          <div className="grid grid-cols-1 gap-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 text-left hover-lift btn-modern ${
                    isSelected ? 'border-orange-500 bg-orange-50 animate-glow' : 'border-gray-200'
                  }`}
                  data-testid={`role-${role.id}`}
                >
                  <div className="flex items-center">
                    <Icon className="text-orange-500 mr-3" size={20} />
                    <div>
                      <div className="font-medium">
                        {getTranslation(role.title, selectedLanguage)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getTranslation(role.description, selectedLanguage)}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection */}
        <div className="mb-6 animate-slide-up animate-delay-400">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {getTranslation('select_language', selectedLanguage)}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-3 border-2 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 text-center hover-lift btn-modern ${
                    isSelected ? 'border-orange-500 bg-orange-50 animate-glow' : 'border-gray-200'
                  }`}
                  data-testid={`language-${lang.code}`}
                >
                  <div className="font-medium">{lang.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRole || !selectedLanguage}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-modern hover-lift animate-slide-up animate-delay-500"
          data-testid="continue-button"
        >
          {getTranslation('continue', selectedLanguage)}
        </button>
      </div>
    </div>
  );
};
