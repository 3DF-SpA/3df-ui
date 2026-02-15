# AGENTS.md — Project Context for AI Agents

> This file provides structured context for AI coding assistants (GitHub Copilot, Claude, Cursor, etc.) to understand and work effectively with this codebase.

## Project Identity

- **Name**: `@3df-spa/ui` + `@3df-spa/charts`
- **Type**: Private Vue 3 component library (monorepo)
- **Purpose**: Design system & chart library for internal 3DF projects
- **Language**: TypeScript (strict)
- **Human language**: The team communicates in **Spanish**. Respond in Spanish unless asked otherwise.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Vue 3 | ^3.5 |
| Language | TypeScript | ~5.9 |
| Styling | Tailwind CSS | v4 (`@theme` tokens, NOT v3 `tailwind.config`) |
| Variants | class-variance-authority (CVA) | ^0.7 |
| Class merging | clsx + tailwind-merge via `cn()` | - |
| Build | Vite (lib mode) | ^7.3 |
| Package manager | pnpm (workspace) | ^10 |
| Versioning | @changesets/cli | ^2.29 |
| Linting | oxlint + eslint | - |
| Type checking | vue-tsc | ^3.2 |
| Registry | GitHub Packages (restricted) | - |

## Monorepo Structure

```
3df-ui/                          # Root workspace (playground app)
├── packages/
│   ├── ui/                      # @3df-spa/ui — 199 Vue components
│   │   ├── src/
│   │   │   ├── index.ts         # All public exports
│   │   │   ├── components/ui/   # Component families (48 folders)
│   │   │   ├── lib/utils.ts     # cn() helper
│   │   │   └── styles/theme.css # Design tokens (light + dark)
│   │   ├── dist/                # Build output
│   │   └── package.json
│   └── charts/                  # @3df-spa/charts — 6 chart types (SVG, zero deps)
│       ├── src/
│       │   ├── index.ts
│       │   ├── shared/          # UiChartContainer, UiChartTooltip, UiChartLegend, utils
│       │   ├── chartbar/
│       │   ├── chartline/
│       │   ├── chartpie/
│       │   ├── chartradar/
│       │   ├── chartscatter/
│       │   └── chartgauge/
│       └── package.json
├── src/                         # Playground app (dev/demo only, NOT published)
│   ├── App.vue
│   ├── main.ts
│   ├── router/index.ts
│   └── modules/ui/views/        # Demo pages for each component
├── .changeset/                  # Changesets config
├── .npmrc                       # GitHub Packages registry config
└── package.json                 # Root workspace scripts
```

## Critical Conventions

### Component Pattern (ALWAYS follow this)

Every component in `packages/ui/` follows this exact pattern:

```vue
<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '../../../lib/utils';

defineOptions({ name: 'UiComponentName', inheritAttrs: false });

interface Props {
  // typed props here
}

const props = withDefaults(defineProps<Props>(), {
  // defaults here
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="restAttrs" :class="cn('base-classes', attrs.class)">
    <slot />
  </div>
</template>
```

**Key rules:**
1. **Always** use `<script setup lang="ts">`
2. **Always** `defineOptions({ inheritAttrs: false })` + `useAttrs()` for class override support
3. **Always** use `cn()` (clsx + tailwind-merge) for all class concatenation — NEVER string templates
4. **Never** use Options API
5. **Never** use `!important` in classes
6. **Never** hardcode user-visible text — use props/slots
7. Files are named `Ui[Name].vue`, exported WITHOUT prefix: `export { default as Button } from './UiButton.vue'`
8. CVA variants go in separate `[name]-variants.ts` files

### Compound Components (provide/inject)

Components that form families (e.g., `DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent`) use typed provide/inject:

```typescript
// [name]-types.ts
import type { InjectionKey, Ref } from 'vue';

export interface DropdownMenuContext {
  isOpen: Ref<boolean>;
  toggle: () => void;
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContext> = Symbol('dropdown-menu');
```

- Root component: `provide(KEY, context)`
- Child components: `inject(KEY)!`
- All keys and context types are exported from `@3df-spa/ui` for consumer access

### Tailwind CSS v4 Tokens

This project uses Tailwind v4 `@theme` syntax (NOT v3 `tailwind.config.js`). Tokens are defined in `packages/ui/src/styles/theme.css`:

```css
@theme {
  --color-background: hsl(0 0% 98%);
  --color-foreground: hsl(0 0% 0%);
  --color-primary: hsl(0 0% 0%);
  --color-primary-foreground: hsl(0 0% 100%);
  --color-muted: hsl(0 0% 96%);
  --color-muted-foreground: hsl(0 0% 35%);
  --color-destructive: hsl(0 84% 50%);
  --color-border: hsl(0 0% 89%);
  --radius-md: 0.625rem;
  /* ... etc */
}
```

Use token classes like `bg-primary`, `text-muted-foreground`, `bg-card`, `rounded-md`, etc. Dark mode is handled via `.dark` class with `@custom-variant dark`.

**Borderless design:** Components do NOT use `border`, `ring`, or `outline` for visual edges. Separation is achieved via elevated background tokens (`bg-card` at 5% in dark mode vs `bg-background` at 0%) and shadows. Form controls use `bg-foreground/5` for a subtle adaptive fill. The `outline` variant on buttons/badges uses `bg-foreground/[0.06]`.

### Charts Architecture

Charts are **pure SVG, zero external dependencies**. Architecture:

1. `UiChartContainer` — shared wrapper with ResizeObserver, provides `{ width, height }` via slot props and `ChartContext` via provide
2. Each chart component receives `data` (array of row objects) and `config` (series configuration)
3. Compute functions (`computeSeriesData`, `computeGridAndAxes`, etc.) are **cached in templates** using the single-iteration `v-for` trick or `computed()` to avoid redundant calls per render
4. Animations use `requestAnimationFrame` with proper cleanup in `onBeforeUnmount`

```vue
<!-- Cache pattern used in Line, Bar, Pie, Scatter, Radar charts -->
<template #default="{ width: w, height: h }">
  <template v-for="c in [{ series: computeSeriesData(w, h), grid: computeGridAndAxes(w, h) }]" :key="0">
    <!-- use c.series, c.grid — each computed exactly once per render -->
  </template>
</template>
```

## Scripts Reference

| Script | What it does |
|--------|-------------|
| `pnpm dev` | Start playground dev server |
| `pnpm build:ui` | Build `@3df-spa/ui` package |
| `pnpm build:charts` | Build `@3df-spa/charts` package |
| `pnpm build` | Build everything (packages + playground) |
| `pnpm type-check` | Run vue-tsc strict type checking |
| `pnpm lint` | oxlint + eslint with auto-fix |
| `pnpm format` | Prettier formatting |
| `pnpm changeset` | Create a new changeset |
| `pnpm version-packages` | Apply changesets → bump versions + CHANGELOG |
| `pnpm release` | Build + publish to GitHub Packages |

## Adding a New Component

1. Create folder in `packages/ui/src/components/ui/[name]/`
2. Create `Ui[Name].vue` following the component pattern above
3. If using variants: create `[name]-variants.ts` with CVA
4. If compound component: create `[name]-types.ts` with InjectionKey
5. Export from `packages/ui/src/index.ts`
6. Rebuild: `pnpm build:ui`
7. (Optional) Add demo page in `src/modules/ui/views/` and route in `src/router/index.ts`

## Adding a New Chart

1. Create folder in `packages/charts/src/chart[name]/`
2. Create `UiChart[Name].vue` using `UiChartContainer` slot pattern
3. Use `computeXxx()` functions with template caching (`v-for` trick or `computed`)
4. Store rAF IDs and cancel in `onBeforeUnmount`
5. Export from `packages/charts/src/index.ts`
6. Rebuild: `pnpm build:charts`

## Publishing

Packages are private on GitHub Packages (`@3df` scope). Flow:
1. Make changes
2. `pnpm changeset` → describe what changed (patch/minor/major)
3. `pnpm version-packages` → bumps versions + generates CHANGELOG
4. `pnpm release` → builds + publishes
5. Consumers update with `pnpm update @3df-spa/ui @3df-spa/charts`

## Do NOT

- Use Tailwind v3 config syntax (`tailwind.config.js`) — this is v4 with `@theme`
- Install shadcn/ui or Radix Vue — this is a custom implementation inspired by shadcn
- Use `scoped` styles — all styling is via Tailwind utility classes + `cn()`
- Import from `dist/` paths — always import from package name (`@3df-spa/ui`, `@3df-spa/charts`)
- Add runtime dependencies to chart package — it must remain zero-dependency (only `vue` peer)
- Use `<Transition>` in complex components — manual animation classes are used for control
- Create components without `inheritAttrs: false` + `useAttrs()` pattern
- Add `border`, `ring-1`, or `outline-1` to component edges — the design system is **borderless**
- Use `border-border` or `outline-border` on Cards, Dialogs, Popovers, Inputs, or Buttons — use elevated backgrounds and shadows instead
