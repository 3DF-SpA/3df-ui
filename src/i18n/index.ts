import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'
import es from '@/i18n/locales/es'

const saved = localStorage.getItem('3df-lang') as 'en' | 'es' | null
const browserLang = navigator.language.startsWith('es') ? 'es' : 'en'

export const i18n = createI18n({
  legacy: false,
  locale: saved ?? browserLang,
  fallbackLocale: 'en',
  messages: { en, es },
})

export function setLocale(lang: 'en' | 'es') {
  i18n.global.locale.value = lang
  localStorage.setItem('3df-lang', lang)
}

export function getLocale(): 'en' | 'es' {
  return i18n.global.locale.value as 'en' | 'es'
}
