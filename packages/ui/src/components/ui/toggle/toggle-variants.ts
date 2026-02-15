import { cva } from 'class-variance-authority';

export const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md text-sm font-medium',
    'transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    'active:scale-[0.98] active:brightness-[0.97] active:duration-100 active:ease-in',
    '[&>svg]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
        outline:
          'border-ui border-border bg-foreground/[0.06] text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      },
      size: {
        default: 'h-8 px-2.5 text-xs',
        sm: 'h-7 px-2 text-xs',
        lg: 'h-9 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
