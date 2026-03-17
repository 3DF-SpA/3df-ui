<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Badge,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@3df/ui';

import { formatCurrency, invoices, statusBadge } from './table-demo-data';

const { t } = useI18n();

const methodLabel = (m: string) => (m === 'PayPal' ? m : t('demo.table.' + m));

type SortKey = 'id' | 'status' | 'method' | 'email' | 'amount';
type SortDir = 'asc' | 'desc';

const sortKey = ref<SortKey>('id');
const sortDir = ref<SortDir>('asc');

function toggleSort(key: SortKey) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
}

function sortIcon(key: SortKey) {
  if (sortKey.value !== key) return '↕';
  return sortDir.value === 'asc' ? '↑' : '↓';
}

const filterText = ref('');
const filterStatus = ref('');

const page = ref(1);
const pageSize = ref(5);

const selectedIds = ref<Set<string>>(new Set());

function toggleRow(id: string) {
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
}

const filtered = computed(() => {
  let rows = [...invoices];

  if (filterText.value) {
    const q = filterText.value.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.method.toLowerCase().includes(q),
    );
  }

  if (filterStatus.value) {
    rows = rows.filter((r) => r.status === filterStatus.value);
  }

  return rows;
});

const sorted = computed(() => {
  const rows = [...filtered.value];
  const key = sortKey.value;
  const dir = sortDir.value === 'asc' ? 1 : -1;
  rows.sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
  return rows;
});

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)));

const paginated = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return sorted.value.slice(start, start + pageSize.value);
});

const allSelected = computed(
  () => paginated.value.length > 0 && paginated.value.every((r) => selectedIds.value.has(r.id)),
);

function toggleAll(checked: boolean) {
  const next = new Set(selectedIds.value);
  for (const row of paginated.value) {
    if (checked) next.add(row.id);
    else next.delete(row.id);
  }
  selectedIds.value = next;
}

function onFilterChange() {
  page.value = 1;
}

const total = computed(() => filtered.value.reduce((sum, r) => sum + r.amount, 0));
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      {{ t('demo.table.dataTableTitle') }}
    </h2>

    <div class="flex flex-wrap items-center gap-3">
      <Input
        v-model="filterText"
        :placeholder="t('common.search')"
        class="max-w-xs"
        @input="onFilterChange"
      />
      <Select
        v-model="filterStatus"
        :placeholder="t('demo.table.allStatuses')"
        class="w-[180px]"
        @update:model-value="onFilterChange"
      >
        <SelectItem value="">{{ t('demo.table.all') }}</SelectItem>
        <SelectItem value="paid">{{ t('demo.table.paid') }}</SelectItem>
        <SelectItem value="pending">{{ t('demo.pending') }}</SelectItem>
        <SelectItem value="unpaid">{{ t('demo.table.unpaid') }}</SelectItem>
        <SelectItem value="overdue">{{ t('demo.table.overdue') }}</SelectItem>
      </Select>
      <span v-if="selectedIds.size" class="text-muted-foreground ml-auto text-sm">
        {{ t('demo.table.selected', { n: selectedIds.size }, selectedIds.size) }}
      </span>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40px]">
            <Checkbox :model-value="allSelected" @update:model-value="toggleAll" />
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('id')">
            {{ t('demo.table.invoice') }} {{ sortIcon('id') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('status')">
            {{ t('demo.table.statusCol') }} {{ sortIcon('status') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('email')">
            Email {{ sortIcon('email') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('method')">
            {{ t('demo.table.method') }} {{ sortIcon('method') }}
          </TableHead>
          <TableHead class="cursor-pointer text-right select-none" @click="toggleSort('amount')">
            {{ t('demo.table.amount') }} {{ sortIcon('amount') }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="paginated.length">
          <TableRow
            v-for="inv in paginated"
            :key="inv.id"
            :data-state="selectedIds.has(inv.id) ? 'selected' : undefined"
          >
            <TableCell>
              <Checkbox
                :model-value="selectedIds.has(inv.id)"
                @update:model-value="toggleRow(inv.id)"
              />
            </TableCell>
            <TableCell class="font-medium">{{ inv.id }}</TableCell>
            <TableCell>
              <Badge :variant="statusBadge[inv.status].variant as any" size="sm">
                {{ t('demo.table.' + statusBadge[inv.status].label) }}
              </Badge>
            </TableCell>
            <TableCell>{{ inv.email }}</TableCell>
            <TableCell>{{ methodLabel(inv.method) }}</TableCell>
            <TableCell class="text-right">{{ formatCurrency(inv.amount) }}</TableCell>
          </TableRow>
        </template>
        <TableEmpty v-else :colspan="6">{{ t('demo.table.noInvoices') }}</TableEmpty>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell :colspan="5">{{ t('demo.totalFiltered') }}</TableCell>
          <TableCell class="text-right font-bold">{{ formatCurrency(total) }}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

    <div class="flex items-center justify-between">
      <p class="text-muted-foreground text-sm">
        {{ t('demo.table.showing', { from: (page - 1) * pageSize + 1, to: Math.min(page * pageSize, sorted.length), total: sorted.length }, sorted.length) }}
      </p>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" :disabled="page <= 1" @click="page--">
          {{ t('demo.table.previous') }}
        </Button>
        <span class="text-sm">{{ page }} / {{ totalPages }}</span>
        <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">
          {{ t('demo.table.next') }}
        </Button>
      </div>
    </div>
  </section>
</template>
