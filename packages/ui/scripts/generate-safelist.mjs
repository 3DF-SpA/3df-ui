/**
 * Post-build script: generates dist/safelist.html
 *
 * This file contains every Tailwind CSS class token found in the
 * compiled JS output so that consumer projects can reliably detect
 * them with a single @source directive, regardless of their CSS
 * file depth or Tailwind scanner quirks with node_modules.
 *
 * Usage in consumer CSS:
 *   @source "@3df-spa/ui/safelist";
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

async function* walkJs(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkJs(path);
    else if (entry.name.endsWith('.js')) yield path;
  }
}

const tokens = new Set();

for await (const file of walkJs(distDir)) {
  const content = await readFile(file, 'utf-8');

  // Extract every double-quoted string literal from the JS output
  for (const match of content.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)) {
    for (const word of match[1].split(/\s+/)) {
      // Keep only plausible CSS class tokens (skip paths, JS identifiers, etc.)
      if (
        word &&
        word.length > 1 &&
        word.length < 120 &&
        !word.includes('(') &&
        !word.includes('{') &&
        !word.includes('/') &&
        !word.startsWith('.')
      ) {
        tokens.add(word);
      }
    }
  }
}

const html = [
  '<!-- @3df-spa/ui — Tailwind CSS safelist (auto-generated, do not edit) -->',
  `<div class="${[...tokens].join(' ')}"></div>`,
  '',
].join('\n');

await writeFile(join(distDir, 'safelist.html'), html, 'utf-8');
console.log(`  ✓ safelist.html generated (${tokens.size} class tokens)`);
