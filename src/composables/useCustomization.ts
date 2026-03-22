import { ref, watchEffect } from 'vue';

const radiusRem = ref(1); // default 1rem
const letterSpacingIdx = ref(10);
const shadowBlurPx = ref(0);
const shadowOpacityIdx = ref(0);

watchEffect(() => {
  const root = document.documentElement;

  const radius = radiusRem.value >= 2.05 ? '9999px' : `${radiusRem.value}rem`;
  root.style.setProperty('--radius', radius);
  root.style.setProperty('--ui-radius', radius);
  const badgeRadiusRem = Math.min(radiusRem.value, 1.5);
  root.style.setProperty('--badge-radius', `calc(${badgeRadiusRem}rem - 4px)`);

  const letterSpacing= `${(-0.1 + letterSpacingIdx.value * 0.01).toFixed(2)}em`;
  root.style.setProperty('--ui-letter-spacing', letterSpacing);

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
