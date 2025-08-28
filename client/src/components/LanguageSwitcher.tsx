import React, { useState, useEffect, useRef } from 'react';
import { Language } from '@/types';
import { getTranslation } from '@/lib/translations';
import { ChevronDown, Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

const languageFlags = {
  en: '🇺🇸',
  hi: '🇮🇳',
  mr: '🇮🇳'
};

const languageNames = {
  en: { full: 'English', short: 'EN' },
  hi: { full: 'हिंदी', short: 'हि' },
  mr: { full: 'मराठी', short: 'मर' }
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Desktop version - dropdown */}
      <div className="hidden sm:block">
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          data-testid="language-switcher"
        >
          <option value="en">🇺🇸 English</option>
          <option value="hi">🇮🇳 हिंदी</option>
          <option value="mr">🇮🇳 मराठी</option>
        </select>
      </div>

      {/* Mobile version - flag buttons */}
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-2 py-1 shadow-sm hover:shadow-md transition-all"
          data-testid="mobile-language-switcher"
        >
          <span className="text-lg">{languageFlags[currentLanguage]}</span>
          <span className="text-xs font-medium">{languageNames[currentLanguage].short}</span>
          <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[100px]">
            {Object.entries(languageFlags).map(([lang, flag]) => (
              <button
                key={lang}
                onClick={() => {
                  onLanguageChange(lang as Language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  currentLanguage === lang ? 'bg-orange-50 text-orange-600' : ''
                } ${lang === 'en' ? 'rounded-t-lg' : ''} ${lang === 'mr' ? 'rounded-b-lg' : ''}`}
                data-testid={`lang-option-${lang}`}
              >
                <span className="text-lg">{flag}</span>
                <span className="text-xs font-medium">{languageNames[lang as Language].short}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
