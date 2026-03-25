import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 shadow-sm',
    'rounded-[var(--badge-radius,var(--radius-sm))] text-xs font-semibold',
    'transition-colors duration-200',
    'select-none max-w-full',
    'focus-visible:outline-2 focus-visible:outline-ring',
    '[&>svg]:size-3 [&>svg]:pointer-events-none [&>svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-none',
        outline: 'border-ui border-border bg-foreground/[0.06] text-foreground shadow-none',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',

        red: 'bg-red-600 text-white dark:bg-red-500',
        orange: 'bg-orange-500 text-white dark:bg-orange-400 dark:text-black',
        yellow: 'bg-yellow-400 text-black dark:bg-yellow-300',
        green: 'bg-green-600 text-white dark:bg-green-500',
        teal: 'bg-teal-600 text-white dark:bg-teal-500',
        blue: 'bg-blue-600 text-white dark:bg-blue-500',
        indigo: 'bg-indigo-600 text-white dark:bg-indigo-500',
        purple: 'bg-purple-600 text-white dark:bg-purple-500',
        pink: 'bg-pink-600 text-white dark:bg-pink-500',
        gray: 'bg-gray-500 text-white dark:bg-gray-400 dark:text-black',
      },
      size: {
        default: 'h-6 px-3.5',
        sm: 'h-5 px-2.5 text-[0.65rem]',
        lg: 'h-7 px-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
