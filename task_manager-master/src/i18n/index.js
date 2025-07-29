import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dil dosyaları
import translationEN from './locales/en.json';
import translationTR from './locales/tr.json';

// Kaynaklar
const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'tr', // Varsayılan dil
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false // React zaten XSS koruması sağlıyor
    },
    react: {
      useSuspense: false // SSR için gerekli
    }
  });

export default i18n; 