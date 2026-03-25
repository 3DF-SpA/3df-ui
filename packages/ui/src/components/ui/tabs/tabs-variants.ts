import { cva } from 'class-variance-authority';

export const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap shrink-0 text-sm font-medium',
    'transition-all duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-ring',
    'cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        underline: [
          'rounded-none border-b-2 border-transparent px-4 pb-3 pt-2',
          'data-[state=active]:border-primary data-[state=active]:text-foreground',
          'text-muted-foreground hover:text-foreground',
        ].join(' '),
        pill: [
          'rounded-full px-4 py-1.5',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
          'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        ].join(' '),
        card: [
          'rounded-md px-3 py-1.5',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

export type TabsTriggerVariant = 'underline' | 'pill' | 'card';
