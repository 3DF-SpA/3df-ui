import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-[var(--radius-md)] text-sm font-medium',
    'transition-[color,background-color,border-color,box-shadow,transform] duration-200',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]',
        outline:
          'border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2 text-xs font-semibold rounded-[var(--radius-sm)]',
        sm: 'h-9 px-3 text-xs font-semibold',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
