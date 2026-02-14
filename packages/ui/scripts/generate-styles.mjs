/**
 * Post-build script: generates dist/styles.css
 *
 * Produces a pre-compiled CSS file containing the theme tokens AND
 * every Tailwind utility class used by @3df-spa/ui components.
 *
 * Consumers only need:
 *   @import '@3df-spa/ui/styles.css';
 *
 * No @source, no @theme, no extra config required.
 */

import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, '..');
const distDir = join(pkgRoot, 'dist');

// Create input.css inside the package root (so Tailwind can resolve itself)
const inputCSS = join(pkgRoot, '_tw-input.css');
const outputCSS = join(distDir, 'styles.css');

const srcComponents = join(pkgRoot, 'src', 'components').replace(/\\/g, '/');
const distPath = distDir.replace(/\\/g, '/');

const inputContent = [
  '@import "tailwindcss";',
  '',
  '@import "./src/styles/theme.css";',
  '',
  `@source "${distPath}/**/*.js";`,
  `@source "${distPath}/**/*.html";`,
  `@source "${srcComponents}/**/*.vue";`,
].join('\n');

import { writeFileSync, unlinkSync } from 'node:fs';
writeFileSync(inputCSS, inputContent, 'utf-8');

try {
  execSync(
    `npx @tailwindcss/cli -i "${inputCSS}" -o "${outputCSS}" --minify`,
    { cwd: pkgRoot, stdio: 'inherit' },
  );
} finally {
  // Clean up temp input file
  try { unlinkSync(inputCSS); } catch { }
}

// Append scoped Vue component CSS (transitions, animations, scroll-area, etc.)
// Vite emits this as dist/index.css — it contains styles that use data-v-* scoped selectors
import { readFileSync, statSync } from 'node:fs';
const indexCSS = join(distDir, 'index.css');
try {
  const scopedCSS = readFileSync(indexCSS, 'utf-8').trim();
  if (scopedCSS) {
    const current = readFileSync(outputCSS, 'utf-8');
    await writeFile(outputCSS, current + '\n/* --- Scoped component styles (auto-appended) --- */\n' + scopedCSS + '\n', 'utf-8');
  }
} catch {
  // index.css might not exist if no components use <style> blocks
}

// Stats
const sizeKB = (statSync(outputCSS).size / 1024).toFixed(1);
console.log(`  ✓ styles.css generated (${sizeKB} KB)`);
