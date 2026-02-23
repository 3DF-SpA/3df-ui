import { type Ref, computed, onMounted, provide, ref, watch } from 'vue';

import type { ChartConfig, ChartContext } from './chart-types';
import { CHART_KEY } from './chart-types';
import { resolveConfigColors } from './chart-utils';

interface UseChartContextReturn {
  chartUid: string;
  resolvedColors: Ref<Record<string, string>>;
}

export function useChartContext(
  config: Ref<ChartConfig>,
  rootRef: Ref<HTMLElement | undefined>,
  prefix: string,
): UseChartContextReturn {
  let _uid = 0;
  const chartUid = `${prefix}-${++_uid}-${Math.random().toString(36).slice(2, 6)}`;

  const resolvedColors = ref<Record<string, string>>({});
  const configRef = computed(() => config.value);

  function updateColors() {
    resolvedColors.value = resolveConfigColors(config.value, rootRef.value ?? undefined);
  }

  onMounted(() => updateColors());
  watch(config, updateColors, { deep: true });

  provide<ChartContext>(CHART_KEY, { config: configRef, resolvedColors });

  return { chartUid, resolvedColors };
}
