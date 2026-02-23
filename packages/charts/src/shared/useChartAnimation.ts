import { type Ref, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

export function useChartAnimation(animate: boolean): Ref<number> {
  const animProgress = ref(animate ? 0 : 1);
  let rafId = 0;

  onMounted(() => {
    if (animate) {
      nextTick(() => {
        rafId = requestAnimationFrame(() => {
          animProgress.value = 1;
        });
      });
    }
  });

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });

  return animProgress;
}
