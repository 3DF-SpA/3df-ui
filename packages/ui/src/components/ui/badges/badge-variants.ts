import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'rounded-md text-xs font-semibold',
    'transition-colors duration-200',
    'select-none',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    '[&>svg]:size-3 [&>svg]:pointer-events-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border-ui border-border bg-foreground/[0.06] text-foreground',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm',
        success: 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500',
        warning: 'bg-amber-500 text-white shadow-sm dark:bg-amber-400 dark:text-black',

        // Color variants
        red: 'bg-red-600 text-white shadow-sm dark:bg-red-500',
        orange: 'bg-orange-500 text-white shadow-sm dark:bg-orange-400 dark:text-black',
        yellow: 'bg-yellow-400 text-black shadow-sm dark:bg-yellow-300',
        green: 'bg-green-600 text-white shadow-sm dark:bg-green-500',
        teal: 'bg-teal-600 text-white shadow-sm dark:bg-teal-500',
        blue: 'bg-blue-600 text-white shadow-sm dark:bg-blue-500',
        indigo: 'bg-indigo-600 text-white shadow-sm dark:bg-indigo-500',
        purple: 'bg-purple-600 text-white shadow-sm dark:bg-purple-500',
        pink: 'bg-pink-600 text-white shadow-sm dark:bg-pink-500',
        gray: 'bg-gray-500 text-white shadow-sm dark:bg-gray-400 dark:text-black',
      },
      size: {
        default: 'px-2.5 py-0.5',
        sm: 'px-2 py-px text-[0.65rem]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
