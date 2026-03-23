import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  [
    'relative w-full rounded-lg',
    'border border-border/30 border-l-[3px]',
    'px-4 py-3 text-sm',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current',
    '[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  ].join(' '),
  {
    variants: {
      variant: {
        default:     'bg-card text-foreground border-l-border',
        destructive: 'bg-destructive/15 text-destructive border-l-destructive [&>svg]:text-destructive',
        success:     'bg-success/15 text-success border-l-success [&>svg]:text-success',
        warning:     'bg-warning/15 text-warning border-l-warning [&>svg]:text-warning',
        info:        'bg-info/15 text-info border-l-info [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
