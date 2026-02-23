import { type Ref, ref } from 'vue';

import type { ChartTooltipData } from './chart-types';

interface UseChartTooltipReturn {
  tooltipData: Ref<ChartTooltipData | null>;
  tooltipX: Ref<number>;
  tooltipY: Ref<number>;
  positionTooltip: (event: MouseEvent) => void;
  hideTooltip: () => void;
}

export function useChartTooltip(): UseChartTooltipReturn {
  const tooltipData = ref<ChartTooltipData | null>(null);
  const tooltipX = ref(0);
  const tooltipY = ref(0);

  function positionTooltip(event: MouseEvent) {
    const container = (event.currentTarget as SVGElement).closest('div');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    tooltipX.value = event.clientX - rect.left + 16;
    tooltipY.value = event.clientY - rect.top - 12;
    if (tooltipX.value + 180 > rect.width) {
      tooltipX.value = event.clientX - rect.left - 190;
    }
    if (tooltipY.value < 0) {
      tooltipY.value = 8;
    }
  }

  function hideTooltip() {
    tooltipData.value = null;
  }

  return { tooltipData, tooltipX, tooltipY, positionTooltip, hideTooltip };
}
