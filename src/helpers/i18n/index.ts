import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getFromLocal } from '..';

import { EN, ES } from '../../languages';
// import { ES } from '../../languages';

// the translations
const resources = {
  en: {
    translation: EN
  },
  es: {
    translation: ES
  }
  // it: {
  //   translation: translationsInItalian
  // },
};

const lngSelected: string = localStorage.getItem('lng')?.toString() ?? 'es';

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lngSelected,
    debug: false,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    },
    ns: 'translation',
    defaultNS: 'translation'
  });

export default i18n
