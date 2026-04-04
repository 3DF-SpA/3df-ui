import { EditorView, basicSetup } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import {
  createApp, defineComponent,
  ref, computed, reactive, watch, onMounted, onUnmounted,
} from 'vue'
import type { App, Component } from 'vue'
import * as UI from '@3df-spa/ui'

export function initEditor(
  container: HTMLElement,
  onUpdate: (code: string) => void,
  initialContent: string = '',
): EditorView {
  const view = new EditorView({
    doc: initialContent,
    extensions: [
      basicSetup,
      html(),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onUpdate(update.state.doc.toString())
      }),
    ],
    parent: container,
  })
  return view
}

function extractUserVars(scriptContent: string): string {
  const names: string[] = []
  const varRe = /^\s*(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/gm
  const fnRe = /^\s*function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/gm
  let m: RegExpExecArray | null
  while ((m = varRe.exec(scriptContent)) !== null) names.push(m[1]!)
  while ((m = fnRe.exec(scriptContent)) !== null) names.push(m[1]!)
  return names.length ? `return { ${names.join(', ')}, ...UI }` : 'return { ...UI }'
}

export function renderPreview(
  code: string,
  container: HTMLElement,
  previousApp: App | null,
): App | null {
  previousApp?.unmount()
  container.innerHTML = ''

  const templateMatch = code.match(/<template>([\s\S]*)<\/template>/)
  const scriptMatch = code.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/)

  const templateContent = templateMatch?.[1]?.trim()
    ?? '<div style="color:red;padding:1rem">⚠️ Falta la sección &lt;template&gt;</div>'
  const scriptContent = scriptMatch?.[1]?.trim() ?? ''

  try {
    const returnStmt = extractUserVars(scriptContent)
     
    const setupFn = new Function(
      'ref', 'computed', 'reactive', 'watch', 'onMounted', 'onUnmounted', 'UI',
      `${scriptContent}\n${returnStmt}`,
    )

    const UserComponent = defineComponent({
      components: { ...UI } as unknown as Record<string, Component>,
      template: templateContent,
      setup() {
        return setupFn(ref, computed, reactive, watch, onMounted, onUnmounted, UI) as Record<string, unknown>
      },
    })

    const app = createApp(UserComponent)
    app.mount(container)
    return app
  } catch (e) {
    container.innerHTML = `<pre style="color:red;padding:1rem;font-family:monospace;font-size:12px">⚠️ Error:\n${e instanceof Error ? e.message : String(e)}</pre>`
    return null
  }
}
