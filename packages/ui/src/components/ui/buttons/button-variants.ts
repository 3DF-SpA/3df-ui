import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md text-sm font-medium',
    'transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    'active:scale-[0.97] active:brightness-[0.96] active:duration-100 active:ease-in',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:text-primary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground/80 hover:bg-secondary/60 hover:text-secondary-foreground',
        outline:
          'border-ui border-border bg-foreground/[0.06] text-foreground/80 shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground/90 shadow-sm hover:bg-destructive/80 hover:text-destructive-foreground',
        link: 'text-primary underline-offset-4 hover:underline active:scale-100 active:brightness-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2 text-xs font-semibold rounded-sm',
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
