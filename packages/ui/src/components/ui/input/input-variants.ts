import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'flex w-full rounded-md border-ui border-input bg-foreground/5 text-sm text-foreground',
    '',
    'transition-[color,box-shadow,transform] duration-200 ease-out',
    'placeholder:text-muted-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-[2.2px] focus-visible:ring-ring',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-destructive aria-[invalid=true]:focus-visible:ring-destructive/30',
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
