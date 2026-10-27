import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('sundarbans_lang') || 'en';
  });

  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('sundarbans_lang', lang);
    if (lang === 'bn') {
      document.documentElement.lang = 'bn';
    } else {
      document.documentElement.lang = 'en';
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

