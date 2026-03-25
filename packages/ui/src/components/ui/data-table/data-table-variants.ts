import { cva } from 'class-variance-authority';

export const dataTableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      bordered: 'border-ui border-border',
      striped: '[&_tbody_tr:nth-child(even)]:bg-muted/30',
      ghost: 'border-0 shadow-none',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
    rounded: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: false,
  },
});

export const dataTableRowVariants = cva('border-b-ui border-border transition-colors', {
  variants: {
    variant: {
      default: '',
      selected: 'bg-primary/10',
      striped: 'even:bg-muted/30',
    },
    hoverable: {
      true: 'hover:bg-muted/50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    hoverable: true,
  },
});

export const dataTableHeadVariants = cva(
  'h-11 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      sortable: {
        true: 'cursor-pointer select-none hover:text-foreground',
        false: '',
      },
      sticky: {
        true: 'sticky top-0 z-10 bg-card backdrop-blur-sm',
        false: '',
      },
    },
    defaultVariants: {
      align: 'left',
      sortable: false,
      sticky: false,
    },
  },
);

export const dataTableCellVariants = cva('px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', {
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
    mono: {
      true: 'font-mono',
      false: '',
    },
    truncate: {
      true: 'max-w-[200px] truncate',
      false: '',
    },
  },
  defaultVariants: {
    align: 'left',
    numeric: false,
    mono: false,
    truncate: false,
  },
});
