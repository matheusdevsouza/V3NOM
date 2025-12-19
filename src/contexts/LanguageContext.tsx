import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Translations } from '@/types';
import { translations } from '@/utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('v3nom-lang');
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      return saved as Language;
    }
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('en')) return 'en';
    if (userLang.startsWith('es')) return 'es';
    return 'pt';
  });

  useEffect(() => {
    localStorage.setItem('v3nom-lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.pt[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

