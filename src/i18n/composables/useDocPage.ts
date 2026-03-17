import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useDocPage(key: string) {
  const { t, te } = useI18n()

  const description = computed(() =>
    te(`views.${key}.description`) ? t(`views.${key}.description`) : ''
  )

  function propDesc(propKey: string): string {
    const k = `views.${key}.props.${propKey}`
    return te(k) ? t(k) : propKey
  }

  function showcaseTitle(showcaseKey: string): string {
    const k = `views.${key}.showcases.${showcaseKey}.title`
    return te(k) ? t(k) : showcaseKey
  }

  function showcaseDesc(showcaseKey: string): string {
    const k = `views.${key}.showcases.${showcaseKey}.description`
    return te(k) ? t(k) : ''
  }

  return { description, propDesc, showcaseTitle, showcaseDesc }
}
