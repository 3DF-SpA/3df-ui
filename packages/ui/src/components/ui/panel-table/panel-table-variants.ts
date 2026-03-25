import { cva } from 'class-variance-authority';

export type PanelTableAccent =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info';

export const panelTableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    accent: {
      default: '',
      primary: '',
      success: '',
      warning: '',
      destructive: '',
      info: '',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
    divided: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    accent: 'default',
    size: 'default',
    divided: false,
  },
});

export const panelTableRowVariants = cva(
  'transition-all duration-150 hover:translate-x-0.5 hover:shadow-sm',
  {
    variants: {
      accent: {
        default: 'border-l-ui border-l-transparent hover:border-l-muted-foreground/40',
        primary: 'border-l-ui border-l-transparent hover:border-l-primary',
        success: 'border-l-ui border-l-transparent hover:border-l-green-500',
        warning: 'border-l-ui border-l-transparent hover:border-l-yellow-500',
        destructive: 'border-l-ui border-l-transparent hover:border-l-destructive',
        info: 'border-l-ui border-l-transparent hover:border-l-blue-500',
      },
    },
    defaultVariants: {
      accent: 'default',
    },
  },
);

export const panelTableHeadVariants = cva(
  'text-xs uppercase tracking-wider font-semibold',
  {
    variants: {
      size: {
        sm: 'px-3 py-2',
        default: 'px-4 py-3',
        lg: 'px-5 py-4',
      },
      accent: {
        default: 'bg-muted/40 text-muted-foreground',
        primary: 'bg-primary/10 text-primary',
        success: 'bg-green-500/10 text-green-700 dark:text-green-400',
        warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
        destructive: 'bg-destructive/10 text-destructive',
        info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      },
    },
    defaultVariants: {
      size: 'default',
      accent: 'default',
    },
  },
);

export const panelTableCellVariants = cva('align-middle', {
  variants: {
    size: {
      sm: 'px-3 py-2 text-xs',
      default: 'px-4 py-3 text-sm',
      lg: 'px-5 py-4 text-base',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'default',
    align: 'left',
  },
});
