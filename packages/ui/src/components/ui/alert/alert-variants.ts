import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  [
    'relative w-full rounded-lg border px-4 py-3',
    'text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current',
    '[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive:
          'bg-red-50 text-red-900 border-red-200 [&>svg]:text-red-600 dark:bg-red-950 dark:text-red-100 dark:border-red-800 dark:[&>svg]:text-red-400',
        success:
          'bg-emerald-50 text-emerald-900 border-emerald-200 [&>svg]:text-emerald-600 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-800 dark:[&>svg]:text-emerald-400',
        warning:
          'bg-amber-50 text-amber-900 border-amber-200 [&>svg]:text-amber-600 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800 dark:[&>svg]:text-amber-400',
        info: 'bg-blue-50 text-blue-900 border-blue-200 [&>svg]:text-blue-600 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800 dark:[&>svg]:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
