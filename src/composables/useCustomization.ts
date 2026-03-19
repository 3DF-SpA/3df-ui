import { ref } from 'vue';

const radiusRem = ref(0.5); // >= 2.05 = full circle (9999px)
const letterSpacingIdx = ref(0); // index 0 = -0.10em
const shadowBlurPx = ref(0);
const shadowOpacityIdx = ref(0);

export function useCustomization() {
  return {
    radiusRem,
    letterSpacingIdx,
    shadowBlurPx,
    shadowOpacityIdx,
    // Labels
    radiusLabel: () => (radiusRem.value >= 2.05 ? 'full' : `${radiusRem.value}rem`),
    letterSpacingLabel: () => `${(-0.1 + letterSpacingIdx.value * 0.01).toFixed(2)}em`,
    shadowBlurLabel: () => `${shadowBlurPx.value}px`,
    shadowOpacityLabel: () => `${(shadowOpacityIdx.value * 0.05).toFixed(2)}`,
  };
}
