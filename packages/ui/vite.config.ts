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
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'class-variance-authority', 'clsx', 'tailwind-merge', 'date-fns'],
      // Ensure date-fns sub-path imports are also externalized
      // Rollup matches external as prefix, so 'date-fns' covers 'date-fns/*'
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
      },
    },
  },
});
