import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'flex w-full rounded-md border-ui border-input bg-foreground/5 text-sm text-foreground',
    'shadow-xs',
    'transition-[color,box-shadow,transform] duration-200 ease-out',
    'placeholder:text-muted-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-ring',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'aria-[invalid=true]:border-destructive',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-1 text-xs',
        lg: 'h-11 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
