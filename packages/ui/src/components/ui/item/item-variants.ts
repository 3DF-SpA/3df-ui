import { cva, type VariantProps } from 'class-variance-authority';

export const itemVariants = cva(
  [
    'relative flex w-full items-center gap-3',
    'rounded-md px-3 py-2 text-sm',
    'outline-none transition-colors duration-100',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground focus-visible:bg-accent/50',
        muted: 'bg-muted/50 hover:bg-muted hover:text-foreground',
        destructive: 'hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive',
      },
      size: {
        sm: 'gap-2 px-2 py-1.5 text-xs',
        default: 'gap-3 px-3 py-2 text-sm',
        lg: 'gap-4 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ItemVariants = VariantProps<typeof itemVariants>;
