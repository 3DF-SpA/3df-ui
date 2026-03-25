<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';
import { use3dfConfig } from './use-3df-config';
import type { Ui3dfConfig } from './use-3df-config';
import Ui3dfRadius from './Ui3dfRadius.vue';
import Ui3dfBorderOpacity from './Ui3dfBorderOpacity.vue';
import Ui3dfLetterSpacing from './Ui3dfLetterSpacing.vue';
import Ui3dfColorPreset from './Ui3dfColorPreset.vue';
import Ui3dfFont from './Ui3dfFont.vue';
import Ui3dfTheme from './Ui3dfTheme.vue';

defineOptions({ name: 'Ui3dfCustomizer', inheritAttrs: false });

interface Props {
  title?: string;
  modelValue?: Partial<Ui3dfConfig>;
}

const props = withDefaults(defineProps<Props>(), {
  title: '3DF Customizer',
});

const emit = defineEmits<{
  'update:modelValue': [config: Ui3dfConfig];
}>();

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };
const restAttrs = computed(() => { const { class: _cls, ...rest } = attrs; return rest; });

const { config, reset } = use3dfConfig();

// If consumer passes v-model, sync inward
watch(() => props.modelValue, (val) => {
  if (val) Object.assign(config.value, val);
}, { deep: true });

// Emit outward on any config change
watch(config, (val) => {
  emit('update:modelValue', { ...val });
}, { deep: true });

defineExpose({ config, reset });
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn(
      'border-ui border-border bg-card text-card-foreground rounded-lg p-4 shadow-sm',
      'flex flex-col gap-4',
      attrs.class
    )"
  >
    <div class="flex items-center gap-2 border-b border-border pb-3">
      <div class="flex size-6 items-center justify-center rounded-md bg-primary text-[10px] font-black text-primary-foreground leading-none">
        3F
      </div>
      <span class="text-sm font-semibold tracking-tight">{{ title }}</span>
    </div>
    <slot>
      <Ui3dfTheme />
      <Ui3dfColorPreset />
      <Ui3dfFont />
      <Ui3dfRadius />
      <Ui3dfBorderOpacity />
      <Ui3dfLetterSpacing />
    </slot>
  </div>
</template>
