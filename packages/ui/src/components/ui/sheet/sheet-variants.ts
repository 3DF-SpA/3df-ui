import { cva } from 'class-variance-authority';

/**
 * Variantes de posición del panel Sheet.
 * Controla desde qué lado se desliza el contenido.
 */
export const sheetVariants = cva(
  // ── Base ──
  [
    'fixed z-50 flex flex-col gap-4 p-6 shadow-lg',
    'transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'focus:outline-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
      },
      side: {
        top: 'inset-x-0 top-0 border-b-2 border-border',
        bottom: 'inset-x-0 bottom-0 border-t-2 border-border',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r-2 border-border sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l-2 border-border sm:max-w-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      side: 'right',
    },
  },
);

export type SheetSide = 'top' | 'bottom' | 'left' | 'right';
export type SheetVariant = 'default';
