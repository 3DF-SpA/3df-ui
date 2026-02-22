<script setup lang="ts">
import { computed, ref } from 'vue';

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
} from '@3df-spa/ui';

import { formatCurrency, invoices, statusBadge } from './table-demo-data';

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
      Data Table — Sorting, filtro, paginación y selección
    </h2>

    <div class="flex flex-wrap items-center gap-3">
      <Input
        v-model="filterText"
        placeholder="Buscar por ID, email o método..."
        class="max-w-xs"
        @input="onFilterChange"
      />
      <Select
        v-model="filterStatus"
        placeholder="Todos los estados"
        class="w-[180px]"
        @update:model-value="onFilterChange"
      >
        <SelectItem value="">Todos</SelectItem>
        <SelectItem value="paid">Pagado</SelectItem>
        <SelectItem value="pending">Pendiente</SelectItem>
        <SelectItem value="unpaid">No pagado</SelectItem>
        <SelectItem value="overdue">Vencido</SelectItem>
      </Select>
      <span v-if="selectedIds.size" class="text-muted-foreground ml-auto text-sm">
        {{ selectedIds.size }} seleccionado{{ selectedIds.size > 1 ? 's' : '' }}
      </span>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[40px]">
            <Checkbox :model-value="allSelected" @update:model-value="toggleAll" />
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('id')">
            Factura {{ sortIcon('id') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('status')">
            Estado {{ sortIcon('status') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('email')">
            Email {{ sortIcon('email') }}
          </TableHead>
          <TableHead class="cursor-pointer select-none" @click="toggleSort('method')">
            Método {{ sortIcon('method') }}
          </TableHead>
          <TableHead class="cursor-pointer text-right select-none" @click="toggleSort('amount')">
            Monto {{ sortIcon('amount') }}
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
                {{ statusBadge[inv.status].label }}
              </Badge>
            </TableCell>
            <TableCell>{{ inv.email }}</TableCell>
            <TableCell>{{ inv.method }}</TableCell>
            <TableCell class="text-right">{{ formatCurrency(inv.amount) }}</TableCell>
          </TableRow>
        </template>
        <TableEmpty v-else :colspan="6">No se encontraron facturas.</TableEmpty>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell :colspan="5">Total (filtrado)</TableCell>
          <TableCell class="text-right font-bold">{{ formatCurrency(total) }}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

    <div class="flex items-center justify-between">
      <p class="text-muted-foreground text-sm">
        Mostrando {{ (page - 1) * pageSize + 1 }}–{{ Math.min(page * pageSize, sorted.length) }} de
        {{ sorted.length }} resultado{{ sorted.length !== 1 ? 's' : '' }}
      </p>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" :disabled="page <= 1" @click="page--">
          Anterior
        </Button>
        <span class="text-sm">{{ page }} / {{ totalPages }}</span>
        <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">
          Siguiente
        </Button>
      </div>
    </div>
  </section>
</template>
