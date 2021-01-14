import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en/translations.json';
import ru from './ru/translations.json';

export const createI18nConfig = (lng: string) => ({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
  lng,
  fallbackLng: 'en',
  nsSeparator: '|',
  keySeparator: '>',
  interpolation: {
    escapeValue: false,
  },
});

export const createi18n = (lng: string) => i18n.use(LanguageDetector).use(initReactI18next).init(createI18nConfig(lng));
export default i18n;
