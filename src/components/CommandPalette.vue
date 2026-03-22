<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from '@3df-spa/ui';
import { uiRoutes, chartRoutes } from '@/router';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const router = useRouter();
const search = ref('');

interface PaletteItem {
  name: string;
  fullPath: string;
  group: string;
}

interface PaletteGroup {
  label: string;
  items: PaletteItem[];
}

function buildGroups(
  routes: typeof uiRoutes,
  prefix: string,
): PaletteGroup[] {
  const map = new Map<string, PaletteItem[]>();
  for (const r of routes) {
    const group = (r.meta?.group as string) ?? 'Other';
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push({
      name: r.name as string,
      fullPath: `${prefix}/${r.path}`,
      group,
    });
  }
  return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
}

const allGroups = computed<PaletteGroup[]>(() => [
  ...buildGroups(uiRoutes, '/ui'),
  ...buildGroups(chartRoutes, '/charts'),
]);

const filteredGroups = computed<PaletteGroup[]>(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return allGroups.value;
  return allGroups.value
    .map(g => ({
      label: g.label,
      items: g.items.filter(item => item.name.toLowerCase().includes(q)),
    }))
    .filter(g => g.items.length > 0);
});

function select(fullPath: string) {
  router.push(fullPath);
  search.value = '';
  emit('update:open', false);
}

function onDialogOpenChange(val: boolean) {
  if (!val) search.value = '';
  emit('update:open', val);
}
</script>

<template>
  <CommandDialog :open="props.open" @update:open="onDialogOpenChange">
    <CommandInput v-model="search" placeholder="Buscar componente..." />
    <CommandList>
      <CommandEmpty>Sin resultados.</CommandEmpty>
      <template v-for="(group, idx) in filteredGroups" :key="group.label">
        <CommandSeparator v-if="idx > 0" />
        <CommandGroup :heading="group.label">
          <CommandItem
            v-for="item in group.items"
            :key="item.fullPath"
            :value="item.fullPath"
            @select="select(item.fullPath)"
          >
            {{ item.name }}
          </CommandItem>
        </CommandGroup>
      </template>
    </CommandList>
  </CommandDialog>
</template>
