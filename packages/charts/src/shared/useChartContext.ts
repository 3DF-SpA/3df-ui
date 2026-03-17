import { type Ref, computed, onMounted, provide, ref, watch } from 'vue';

import type { ChartConfig, ChartContext } from './chart-types';
import { CHART_KEY } from './chart-types';
import { resolveConfigColors } from './chart-utils';

interface UseChartContextReturn {
  chartUid: string;
  resolvedColors: Ref<Record<string, string>>;
}

let _chartCounter = 0;

export function useChartContext(
  config: Ref<ChartConfig>,
  rootRef: Ref<HTMLElement | undefined>,
  prefix: string,
): UseChartContextReturn {
  const chartUid = `${prefix}-${++_chartCounter}`;

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
