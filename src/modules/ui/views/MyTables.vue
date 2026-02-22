<script setup lang="ts">
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

import TableDemoDataTable from './_components/TableDemoDataTable.vue';
import { formatCurrency, invoices, statusBadge } from './_components/table-demo-data';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Table</h1>

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
    </section>

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

    <TableDemoDataTable />

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
