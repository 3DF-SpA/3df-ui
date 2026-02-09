import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'flex w-full rounded-[var(--radius-md)] bg-background text-sm text-foreground',
    'border border-input',
    'transition-[color,border-color,box-shadow] duration-200',
    'placeholder:text-muted-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring focus-visible:border-ring',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30',
  ].join(' '),
  {
    variants: {
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-1 text-xs',
        lg: 'h-11 px-4 py-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);
