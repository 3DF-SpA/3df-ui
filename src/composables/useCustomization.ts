import { computed, ref } from 'vue';
import { use3dfConfig, RADIUS_STEPS } from '@3df/ui';

export function useCustomization() {
  const { config } = use3dfConfig();

  const radiusRem = computed({
    get: () => {
      const step = RADIUS_STEPS[config.value.radiusStep];
      return step?.value ? parseFloat(step.value) : 1;
    },
    set: (val: number) => {
      const idx = RADIUS_STEPS.findIndex(s => 
        parseFloat(s.value) === val
      );
      if (idx !== -1) config.value.radiusStep = idx;
    },
  });

  const letterSpacingIdx = computed({
    get: () => config.value.letterSpacing,
    set: (val: number) => { config.value.letterSpacing = val; },
  });

  const shadowBlurPx = ref(8);
  const shadowOpacityIdx = ref(20);

  return {
    radiusRem,
    letterSpacingIdx,
    shadowBlurPx,
    shadowOpacityIdx,
    radiusLabel: computed(() => RADIUS_STEPS[config.value.radiusStep]?.label ?? 'MD'),
    letterSpacingLabel: computed(() => `${config.value.letterSpacing / 10}em`),
    shadowBlurLabel: computed(() => `${shadowBlurPx.value}px`),
    shadowOpacityLabel: computed(() => `${shadowOpacityIdx.value}%`),
  };
}
