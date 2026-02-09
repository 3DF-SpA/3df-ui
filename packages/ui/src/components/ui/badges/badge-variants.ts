import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex items-center gap-1 whitespace-nowrap',
    'rounded-[var(--radius-md)] text-xs font-semibold',
    'transition-[color,background-color,border-color] duration-200',
    'select-none',
    'focus-visible:outline-none focus-visible:ring-[3.2px] focus-visible:ring-ring',
    '[&>svg]:size-3 [&>svg]:pointer-events-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground/90 shadow-sm hover:bg-primary/85 hover:text-primary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground/80 hover:bg-secondary/60 hover:text-secondary-foreground',
        outline:
          'border border-border bg-background text-foreground/80 hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground/90 shadow-sm hover:bg-destructive/80 hover:text-destructive-foreground',
        success:
          'bg-emerald-600 text-white/90 shadow-sm hover:bg-emerald-600/80 hover:text-white dark:bg-emerald-500 dark:hover:bg-emerald-500/80',
        warning:
          'bg-amber-500 text-white/90 shadow-sm hover:bg-amber-500/80 hover:text-white dark:bg-amber-400 dark:text-black/80 dark:hover:bg-amber-400/80 dark:hover:text-black',
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
