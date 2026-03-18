import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      cleanVueFileName: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        calendar: resolve(__dirname, 'src/index.calendar.ts'),
        carousel: resolve(__dirname, 'src/index.carousel.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    minify: true,
    rollupOptions: {
      external: ['vue', 'class-variance-authority', 'clsx', 'tailwind-merge', 'date-fns', 'embla-carousel'],
      output: {},
    },
  },
});
