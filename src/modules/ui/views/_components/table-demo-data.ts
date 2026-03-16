export interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'unpaid' | 'overdue';
  method: string;
  amount: number;
  email: string;
}

export const invoices: Invoice[] = [
  {
    id: 'INV-001',
    status: 'paid',
    method: 'creditCard',
    amount: 250.0,
    email: 'ana@example.com',
  },
  {
    id: 'INV-002',
    status: 'pending',
    method: 'PayPal',
    amount: 150.0,
    email: 'carlos@example.com',
  },
  {
    id: 'INV-003',
    status: 'unpaid',
    method: 'transfer',
    amount: 350.0,
    email: 'lucia@example.com',
  },
  {
    id: 'INV-004',
    status: 'paid',
    method: 'creditCard',
    amount: 450.0,
    email: 'pedro@example.com',
  },
  { id: 'INV-005', status: 'paid', method: 'PayPal', amount: 550.0, email: 'maria@example.com' },
  {
    id: 'INV-006',
    status: 'overdue',
    method: 'transfer',
    amount: 200.0,
    email: 'jorge@example.com',
  },
  {
    id: 'INV-007',
    status: 'paid',
    method: 'creditCard',
    amount: 300.0,
    email: 'sofia@example.com',
  },
  { id: 'INV-008', status: 'pending', method: 'PayPal', amount: 100.0, email: 'diego@example.com' },
  {
    id: 'INV-009',
    status: 'paid',
    method: 'transfer',
    amount: 750.0,
    email: 'valentina@example.com',
  },
  {
    id: 'INV-010',
    status: 'unpaid',
    method: 'creditCard',
    amount: 180.0,
    email: 'andres@example.com',
  },
  { id: 'INV-011', status: 'paid', method: 'PayPal', amount: 620.0, email: 'camila@example.com' },
  {
    id: 'INV-012',
    status: 'pending',
    method: 'transfer',
    amount: 90.0,
    email: 'mateo@example.com',
  },
];

export const statusBadge: Record<Invoice['status'], { variant: string; label: string }> = {
  paid: { variant: 'success', label: 'paid' },
  pending: { variant: 'warning', label: 'pending' },
  unpaid: { variant: 'destructive', label: 'unpaid' },
  overdue: { variant: 'red', label: 'overdue' },
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD' }).format(value);
}
