import { type Ref, ref } from 'vue';

import { type Highlighter, createHighlighter } from 'shiki';

const isReady = ref(false);
let highlighterInstance: Highlighter | null = null;
let initPromise: Promise<void> | null = null;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initHighlighter(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = createHighlighter({
    themes: ['github-dark-default'],
    langs: ['vue', 'typescript', 'html', 'css', 'bash'],
  }).then((instance) => {
    highlighterInstance = instance;
    isReady.value = true;
  });

  return initPromise;
}

export function useHighlighter(): {
  highlight: (code: string, lang?: string) => string;
  isReady: Ref<boolean>;
} {
  initHighlighter();

  function highlight(code: string, lang = 'vue'): string {
    if (!highlighterInstance) return `<pre><code>${escapeHtml(code)}</code></pre>`;

    return highlighterInstance.codeToHtml(code, {
      lang,
      theme: 'github-dark-default',
    });
  }

  return { highlight, isReady };
}
