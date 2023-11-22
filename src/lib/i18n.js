import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enTranslations from '../locale/en.json'
import esTranslations from '../locale/es.json'
import ptTranslations from '../locale/pt.json'

i18n.use(initReactI18next).init({
  fallbackLgn: 'pt',
  lng: 'pt',
  interpolation: {
    escapeValue: false
  },

  resources: {
    en: {
      ...enTranslations
    },

    pt: {
      ...ptTranslations
    },

    es: {
      ...esTranslations
    }
  }
})

export default i18n
