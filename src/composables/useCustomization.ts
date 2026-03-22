import { ref, computed, watchEffect } from 'vue';
import { use3dfConfig, RADIUS_STEPS } from '@3df-spa/ui';

// Module-level singletons for shadow controls only
const shadowBlurPx = ref(0);
const shadowOpacityIdx = ref(0);

// Module-level watchEffect for shadows only (radius/letterSpacing handled by use3dfConfig)
watchEffect(() => {
  const root = document.documentElement;

  root.style.setProperty('--ui-shadow-blur', `${shadowBlurPx.value}px`);
  root.style.setProperty('--ui-shadow-opacity', `${(shadowOpacityIdx.value * 0.05).toFixed(2)}`);

  const blur = `${shadowBlurPx.value}px`;
  const op = (shadowOpacityIdx.value * 0.05).toFixed(2);
  const op2 = (shadowOpacityIdx.value * 0.05 * 0.75).toFixed(2);

  root.style.setProperty('--shadow-2xs', `0 1px 0 0 hsl(0 0% 0% / ${op})`);
  root.style.setProperty('--shadow-xs', `0 1px ${blur} 0 hsl(0 0% 0% / ${op})`);
  root.style.setProperty('--shadow-sm', `0 1px ${blur} 0 hsl(0 0% 0% / ${op}), 0 1px 2px -1px hsl(0 0% 0% / ${op2})`);
  root.style.setProperty('--shadow-md', `0 4px ${blur} -1px hsl(0 0% 0% / ${op}), 0 2px 4px -2px hsl(0 0% 0% / ${op2})`);
  root.style.setProperty('--shadow-lg', `0 10px ${blur} -3px hsl(0 0% 0% / ${op}), 0 4px 6px -4px hsl(0 0% 0% / ${op2})`);
  root.style.setProperty('--shadow-xl', `0 20px ${blur} -5px hsl(0 0% 0% / ${op}), 0 8px 10px -6px hsl(0 0% 0% / ${op2})`);
  root.style.setProperty('--shadow-2xl', `0 25px 50px -12px hsl(0 0% 0% / ${op})`);
});

export function useCustomization() {
  const { config } = use3dfConfig();

  // Writable computed: maps to/from config.value.radiusStep
  const radiusRem = computed({
    get: () => RADIUS_STEPS[config.value.radiusStep] ?? 0.5,
    set: (val: number) => {
      let closest = 0;
      let minDiff = Infinity;
      RADIUS_STEPS.forEach((step, idx) => {
        const diff = Math.abs(step - val);
        if (diff < minDiff) {
          minDiff = diff;
          closest = idx;
        }
      });
      config.value.radiusStep = closest;
    },
  });

  // Writable computed: maps to/from config.value.letterSpacing
  const letterSpacingIdx = computed({
    get: () => config.value.letterSpacing,
    set: (val: number) => {
      config.value.letterSpacing = Math.round(val);
    },
  });

  return {
    radiusRem,
    letterSpacingIdx,
    shadowBlurPx,
    shadowOpacityIdx,
    radiusLabel: () => (radiusRem.value >= 2.05 ? 'full' : `${radiusRem.value}rem`),
    letterSpacingLabel: () => `${(-0.1 + letterSpacingIdx.value * 0.01).toFixed(2)}em`,
    shadowBlurLabel: () => `${shadowBlurPx.value}px`,
    shadowOpacityLabel: () => `${(shadowOpacityIdx.value * 0.05).toFixed(2)}`,
  };
}

