import { cva } from 'class-variance-authority';

export const bannerVariants = cva(
  [
    'relative flex w-full items-center gap-3 px-4 py-3 text-sm',
    'transition-[opacity,transform] duration-300 ease-out',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground',
        info: 'bg-blue-600 text-white dark:bg-blue-500',
        success: 'bg-emerald-600 text-white dark:bg-emerald-500',
        warning: 'bg-amber-500 text-white dark:bg-amber-400 dark:text-black',
        destructive: 'bg-destructive text-destructive-foreground',
        muted: 'bg-muted text-muted-foreground border-b border-border',
      },
      position: {
        static: '',
        sticky: 'sticky top-0 z-40',
        fixed: 'fixed inset-x-0 top-0 z-50',
      },
      align: {
        start: 'justify-start',
        center: 'justify-center',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'static',
      align: 'center',
    },
  },
);
