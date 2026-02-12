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
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@3df-spa/ui';

// ─── Demo data ────────────────────────────────────────────────
interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'unpaid' | 'overdue';
  method: string;
  amount: number;
  email: string;
}

const invoices: Invoice[] = [
  { id: 'INV-001', status: 'paid', method: 'Tarjeta de crédito', amount: 250.0, email: 'ana@example.com' },
  { id: 'INV-002', status: 'pending', method: 'PayPal', amount: 150.0, email: 'carlos@example.com' },
  { id: 'INV-003', status: 'unpaid', method: 'Transferencia', amount: 350.0, email: 'lucia@example.com' },
  { id: 'INV-004', status: 'paid', method: 'Tarjeta de crédito', amount: 450.0, email: 'pedro@example.com' },
  { id: 'INV-005', status: 'paid', method: 'PayPal', amount: 550.0, email: 'maria@example.com' },
  { id: 'INV-006', status: 'overdue', method: 'Transferencia', amount: 200.0, email: 'jorge@example.com' },
  { id: 'INV-007', status: 'paid', method: 'Tarjeta de crédito', amount: 300.0, email: 'sofia@example.com' },
  { id: 'INV-008', status: 'pending', method: 'PayPal', amount: 100.0, email: 'diego@example.com' },
  { id: 'INV-009', status: 'paid', method: 'Transferencia', amount: 750.0, email: 'valentina@example.com' },
  { id: 'INV-010', status: 'unpaid', method: 'Tarjeta de crédito', amount: 180.0, email: 'andres@example.com' },
  { id: 'INV-011', status: 'paid', method: 'PayPal', amount: 620.0, email: 'camila@example.com' },
  { id: 'INV-012', status: 'pending', method: 'Transferencia', amount: 90.0, email: 'mateo@example.com' },
];

const statusBadge: Record<Invoice['status'], { variant: string; label: string }> = {
  paid: { variant: 'success', label: 'Pagado' },
  pending: { variant: 'warning', label: 'Pendiente' },
  unpaid: { variant: 'destructive', label: 'No pagado' },
  overdue: { variant: 'red', label: 'Vencido' },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}

// ─── Sorting ──────────────────────────────────────────────────
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

// ─── Filtering ────────────────────────────────────────────────
const filterText = ref('');
const filterStatus = ref('');

// ─── Pagination ───────────────────────────────────────────────
const page = ref(1);
const pageSize = ref(5);

// ─── Selection ────────────────────────────────────────────────
const selectedIds = ref<Set<string>>(new Set());

function toggleRow(id: string) {
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
}

// ─── Computed pipeline ────────────────────────────────────────
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

const allSelected = computed(() =>
  paginated.value.length > 0 && paginated.value.every((r) => selectedIds.value.has(r.id)),
);

function toggleAll(checked: boolean) {
  const next = new Set(selectedIds.value);
  for (const row of paginated.value) {
    if (checked) next.add(row.id);
    else next.delete(row.id);
  }
  selectedIds.value = next;
}

// Reset page on filter change
function onFilterChange() {
  page.value = 1;
}

const total = computed(() => filtered.value.reduce((sum, r) => sum + r.amount, 0));
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Table</h1>

    <!-- ════════════════════════════════════════════════════════════
         1. Tabla básica
         ════════════════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Básica</h2>
      <Table>
        <TableCaption>Lista de facturas recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Factura</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Método</TableHead>
            <TableHead class="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="inv in invoices.slice(0, 5)" :key="inv.id">
            <TableCell class="font-medium">{{ inv.id }}</TableCell>
            <TableCell>
              <Badge :variant="(statusBadge[inv.status].variant as any)" size="sm">
                {{ statusBadge[inv.status].label }}
              </Badge>
            </TableCell>
            <TableCell>{{ inv.method }}</TableCell>
            <TableCell class="text-right">{{ formatCurrency(inv.amount) }}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan="3">Total</TableCell>
            <TableCell class="text-right">
              {{ formatCurrency(invoices.slice(0, 5).reduce((s, r) => s + r.amount, 0)) }}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         2. Tabla vacía
         ════════════════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Estado vacío</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty :colspan="3" />
        </TableBody>
      </Table>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         3. Data Table completa
         ════════════════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Data Table — Sorting, filtro, paginación y selección
      </h2>

      <!-- Toolbar -->
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

      <!-- Tabla -->
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
            <TableHead
              class="cursor-pointer select-none text-right"
              @click="toggleSort('amount')"
            >
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
                <Badge :variant="(statusBadge[inv.status].variant as any)" size="sm">
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

      <!-- Paginación -->
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground text-sm">
          Mostrando {{ (page - 1) * pageSize + 1 }}–{{
            Math.min(page * pageSize, sorted.length)
          }}
          de {{ sorted.length }} resultado{{ sorted.length !== 1 ? 's' : '' }}
        </p>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="page <= 1"
            @click="page--"
          >
            Anterior
          </Button>
          <span class="text-sm">{{ page }} / {{ totalPages }}</span>
          <Button
            variant="outline"
            size="sm"
            :disabled="page >= totalPages"
            @click="page++"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         4. Tabla striped
         ════════════════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Striped (con class override)</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead class="text-right">Salario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(person, i) in [
              { name: 'Ana García', role: 'Ingeniería', salary: 85000 },
              { name: 'Carlos López', role: 'Diseño', salary: 72000 },
              { name: 'Lucía Fernández', role: 'Producto', salary: 92000 },
              { name: 'Pedro Martínez', role: 'Marketing', salary: 68000 },
              { name: 'María Rodríguez', role: 'Ventas', salary: 78000 },
            ]"
            :key="person.name"
            :class="i % 2 === 0 ? 'bg-muted/30' : ''"
          >
            <TableCell class="font-medium">{{ person.name }}</TableCell>
            <TableCell>{{ person.role }}</TableCell>
            <TableCell class="text-right">{{ formatCurrency(person.salary) }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  </div>
</template>