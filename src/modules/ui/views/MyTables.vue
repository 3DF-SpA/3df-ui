<script setup lang="ts">
import { computed } from 'vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

import {
  Badge,
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

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import TableDemoDataTable from './_components/TableDemoDataTable.vue';
import { formatCurrency, invoices, statusBadge } from './_components/table-demo-data';

const { description, propDesc, showcaseTitle } = useDocPage('tables');

const tableEmptyProps = computed<PropItem[]>(() => [
  {
    name: 'colspan',
    type: 'number',
    default: '1',
    description: propDesc('colspan'),
  },
]);

const basicCode = `<Table>
  <TableCaption>Lista de facturas recientes.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Factura</TableHead>
      <TableHead>Estado</TableHead>
      <TableHead>Método</TableHead>
      <TableHead class="text-right">Monto</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow v-for="inv in invoices" :key="inv.id">
      <TableCell>{{ inv.id }}</TableCell>
      <TableCell>
        <Badge :variant="statusBadge[inv.status].variant" size="sm">
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
      <TableCell class="text-right">{{ total }}</TableCell>
    </TableRow>
  </TableFooter>
</Table>`;

const emptyCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nombre</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Rol</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableEmpty :colspan="3" label="No hay resultados." />
  </TableBody>
</Table>`;

const stripedCode = `<TableRow
  v-for="(person, i) in people"
  :key="person.name"
  :class="i % 2 === 0 ? 'bg-muted/30' : ''"
>
  <TableCell>{{ person.name }}</TableCell>
  <TableCell>{{ person.role }}</TableCell>
  <TableCell class="text-right">{{ person.salary }}</TableCell>
</TableRow>`;

const anatomyCode = `import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
} from '@3df-spa/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Table"
      :description="description"
      import-code="import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TableEmpty } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" lang="typescript" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
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
              <Badge :variant="statusBadge[inv.status].variant as any" size="sm">
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
    </DocShowcase>

    <DocShowcase title="Estado vacío" :code="emptyCode">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty :colspan="3" label="No hay resultados." />
        </TableBody>
      </Table>
    </DocShowcase>

    <TableDemoDataTable />

    <DocShowcase title="Striped (con class override)" :code="stripedCode">
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
    </DocShowcase>

    <DocPropsTable title="TableEmpty Props" :props="tableEmptyProps" />
  </div>
</template>
