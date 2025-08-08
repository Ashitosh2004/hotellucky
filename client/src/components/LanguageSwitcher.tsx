import React from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = ""
}) => {
  return (
    <select
      value={currentLanguage}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className={`border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${className}`}
      data-testid="language-switcher"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
    </select>
  );
};
