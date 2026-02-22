import { computed, useAttrs } from 'vue';

import type { ClassValue } from 'clsx';

export function useRestAttrs() {
  const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

  const restAttrs = computed(() => {
    const { class: _cls, ...rest } = attrs;
    return rest;
  });

  return { attrs, restAttrs };
}
