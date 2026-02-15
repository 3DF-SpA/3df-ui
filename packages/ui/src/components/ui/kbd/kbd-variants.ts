import { cva, type VariantProps } from 'class-variance-authority';

export const kbdVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-md border-ui border-border',
    'font-mono font-medium',
    'select-none align-middle',
    'leading-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-muted text-muted-foreground shadow-[0_2px_0_0] shadow-border',
      },
      size: {
        xs: 'min-w-5 px-1 py-0.5 text-[10px]',
        sm: 'min-w-6 px-1.5 py-0.5 text-xs',
        default: 'min-w-7 px-1.5 py-1 text-xs',
        lg: 'min-w-8 px-2 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type KbdVariants = VariantProps<typeof kbdVariants>;
