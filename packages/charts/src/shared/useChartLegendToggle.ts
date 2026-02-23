import { type Ref, ref } from 'vue';

interface UseChartLegendToggleReturn {
  hiddenSeries: Ref<Set<string>>;
  onToggleSeries: (key: string) => void;
}

export function useChartLegendToggle(): UseChartLegendToggleReturn {
  const hiddenSeries = ref<Set<string>>(new Set());

  function onToggleSeries(key: string) {
    const next = new Set(hiddenSeries.value);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    hiddenSeries.value = next;
  }

  return { hiddenSeries, onToggleSeries };
}
