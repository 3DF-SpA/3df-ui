import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  [
    'relative w-full rounded-lg border-2 border-border px-4 py-3',
    'text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current',
    '[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-card text-foreground',
        destructive:
          'bg-red-50 text-red-900 [&>svg]:text-red-600 dark:bg-red-950 dark:text-red-100 dark:[&>svg]:text-red-400',
        success:
          'bg-emerald-50 text-emerald-900 [&>svg]:text-emerald-600 dark:bg-emerald-950 dark:text-emerald-100 dark:[&>svg]:text-emerald-400',
        warning:
          'bg-amber-50 text-amber-900 [&>svg]:text-amber-600 dark:bg-amber-950 dark:text-amber-100 dark:[&>svg]:text-amber-400',
        info: 'bg-blue-50 text-blue-900 [&>svg]:text-blue-600 dark:bg-blue-950 dark:text-blue-100 dark:[&>svg]:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
