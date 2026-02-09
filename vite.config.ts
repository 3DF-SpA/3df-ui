import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

import vue from '@vitejs/plugin-vue';

import tailwindcss from '@tailwindcss/vite';
import { URL, fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@3df/ui/theme.css': fileURLToPath(
        new URL('./packages/ui/src/styles/theme.css', import.meta.url),
      ),
      '@3df/ui': fileURLToPath(new URL('./packages/ui/src/index.ts', import.meta.url)),
    },
  },
});
