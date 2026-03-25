import { cva } from 'class-variance-authority';

export const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      bordered: 'border-ui border-border',
      ghost: 'border-0',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
    rounded: {
      true: 'rounded-lg overflow-hidden',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: false,
  },
});

export const tableRowVariants = cva(
  'border-b-ui border-border transition-colors hover:bg-muted/50',
  {
    variants: {
      variant: {
        default: '',
        selected: 'bg-primary/10 hover:bg-primary/15',
        striped: 'even:bg-muted/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const tableHeadVariants = cva(
  'h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  },
);

export const tableCellVariants = cva('p-4 align-middle [&:has([role=checkbox])]:pr-0', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    numeric: {
      true: 'font-mono tabular-nums',
      false: '',
    },
  },
  defaultVariants: {
    align: 'left',
    numeric: false,
  },
});
