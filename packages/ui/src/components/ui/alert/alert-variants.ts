import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  [
    'relative w-full rounded-lg border-ui border-border px-4 py-3',
    'text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current',
    '[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-card text-foreground',
        destructive: 'bg-destructive/10 text-destructive [&>svg]:text-destructive',
        success: 'bg-success/10 text-success [&>svg]:text-success',
        warning: 'bg-warning/10 text-warning [&>svg]:text-warning',
        info: 'bg-info/10 text-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
