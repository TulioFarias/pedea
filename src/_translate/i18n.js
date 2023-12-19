import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslations from '../_translate/languages/en.json'
import esTranslations from '../_translate/languages/es.json'
import ptTranslations from '../_translate/languages/pt.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
