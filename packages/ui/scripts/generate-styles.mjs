/**
 * Post-build script: minifies src/styles/theme.css → dist/theme.css
 *
 * - Removes comments and collapses whitespace
 * - Fixes @source path (from ../../dist to . since we're now inside dist/)
 *
 * Consumers only need:
 *   @import '@3df-spa/ui/theme.css';
 */

import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, '..');
const src = readFileSync(join(pkgRoot, 'src/styles/theme.css'), 'utf-8');

const minified = src
  .replace(/\/\*[\s\S]*?\*\//g, '')          // remove block comments
  .replace(/"\.\.\/\.\.\/dist"/g, '"."')      // fix @source path for dist/ location
  .replace(/[ \t]*\n[ \t]*/g, '\n')          // trim leading/trailing spaces on lines
  .replace(/\n{2,}/g, '\n')                  // collapse blank lines
  .trim();

const outputPath = join(pkgRoot, 'dist/theme.css');
writeFileSync(outputPath, minified, 'utf-8');

const sizeKB = (statSync(outputPath).size / 1024).toFixed(1);
console.log(`  ✓ dist/theme.css generated (${sizeKB} KB)`);
