<p align="center">
  <img src="./public/icons/logo-3df.svg" alt="3DF UI" height="60" />
</p>

# Contributing to 3DF UI

Thank you for your interest in contributing to **3DF UI**! This guide covers everything you need to get started — from setting up your local environment to submitting a production-quality pull request. We welcome bug reports, feature proposals, documentation improvements, and new components or chart types.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Component Conventions](#component-conventions)
- [Adding a Component](#adding-a-component)
- [Adding a Chart](#adding-a-chart)
- [Borders Rule](#borders-rule)
- [Commit Conventions](#commit-conventions)
- [Changeset & Release Flow](#changeset--release-flow)
- [Pull Request Process](#pull-request-process)

---

## 🤝 Code of Conduct

This project is open and inclusive. We expect all contributors to engage respectfully and constructively. Harassment, discrimination, or bad-faith behavior of any kind will not be tolerated. If you experience or witness a violation, please contact the maintainers.

In short: **be kind, be patient, and assume good intent.**

---

## 💡 How to Contribute

### Reporting a bug

1. Search [existing issues](../../issues) to avoid duplicates.
2. Open a new issue using the **Bug Report** template.
3. Include: reproduction steps, expected vs. actual behavior, Vue/OS versions.

### Requesting a feature

1. Open an issue using the **Feature Request** template.
2. Describe the problem you're solving, not just the solution.
3. If it's a new component, mention the intended use case and any relevant design references.

### Submitting a pull request

1. Fork the repository and create your branch from `main`.
2. Follow the conventions described in this guide.
3. Open a PR against `main` with a clear description.
4. A maintainer will review your PR, request changes if needed, and merge it.

---

## 🛠 Development Setup

### Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 20.x |
| pnpm | 10.x |

### Getting started

```bash
# 1. Clone the repository
git clone https://github.com/3DF-SpA/3df-ui.git
cd 3df-ui

# 2. Install all workspace dependencies
pnpm install

# 3. Start the component playground
pnpm dev
# → http://localhost:5173
```

### Useful scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the playground dev server |
| `pnpm build:ui` | Build `@3df-spa/ui` (lib mode) |
| `pnpm build:charts` | Build `@3df-spa/charts` (lib mode) |
| `pnpm build` | Build all packages and the playground |
| `pnpm type-check` | Run `vue-tsc` with strict settings |
| `pnpm lint` | Run oxlint + eslint with auto-fix |
| `pnpm format` | Run Prettier across the workspace |
| `pnpm changeset` | Create a new changeset entry |
| `pnpm version-packages` | Apply changesets → bump versions + CHANGELOG |
| `pnpm release` | Build + publish to GitHub Packages |

---

## 🗂 Project Structure

```
3df-ui/                              # Root workspace (playground app)
├── packages/
│   ├── ui/                          # @3df-spa/ui — 199 Vue components
│   │   ├── src/
│   │   │   ├── index.ts             # All public exports
│   │   │   ├── components/ui/       # Component families (48 folders)
│   │   │   ├── lib/utils.ts         # cn() helper (clsx + tailwind-merge)
│   │   │   └── styles/theme.css     # Design tokens (light + dark)
│   │   ├── dist/                    # Build output (do not edit)
│   │   └── package.json
│   └── charts/                      # @3df-spa/charts — 6 chart types (SVG, zero deps)
│       ├── src/
│       │   ├── index.ts
│       │   ├── shared/              # UiChartContainer, UiChartTooltip, UiChartLegend, utils
│       │   ├── chartbar/
│       │   ├── chartline/
│       │   ├── chartpie/
│       │   ├── chartradar/
│       │   ├── chartscatter/
│       │   └── chartgauge/
│       └── package.json
├── src/                             # Playground app (dev/demo only, NOT published)
│   ├── App.vue
│   ├── main.ts
│   ├── router/index.ts
│   └── modules/ui/views/            # Demo pages for each component
├── .changeset/                      # Changesets configuration
├── .npmrc                           # GitHub Packages registry config
├── pnpm-workspace.yaml
└── package.json                     # Root workspace scripts
```

---

## 🧩 Component Conventions

### Required component pattern

Every component in `packages/ui/` **must** follow this exact pattern. No exceptions.

```vue
<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ClassValue } from 'clsx'
import { cn } from '../../../lib/utils'

defineOptions({ name: 'UiComponentName', inheritAttrs: false })

interface Props {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue }

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs
  return rest
})
</script>

<template>
  <div v-bind="restAttrs" :class="cn('base-classes', attrs.class)">
    <slot />
  </div>
</template>
```

### Rules at a glance

| ✅ Do | ❌ Do not |
|---|---|
| `<script setup lang="ts">` | Options API (`defineComponent`, `data()`) |
| `defineOptions({ inheritAttrs: false })` + `useAttrs()` | Omit `inheritAttrs: false` on any component |
| `cn()` for all class concatenation | Template literals or string joins for classes |
| `border-ui` for all component borders | `border`, `border-2`, `ring-1`, `outline-1` |
| Tailwind v4 `@theme` tokens (`bg-primary`, `text-muted-foreground`) | `tailwind.config.js` v3 syntax |
| CVA variants in a separate `[name]-variants.ts` file | Inline variant logic inside `.vue` files |
| Compound contexts typed in `[name]-types.ts` with `InjectionKey` | Untyped `provide`/`inject` |
| Module-scoped counter for unique IDs | `Math.random()` or `Date.now()` for IDs |
| `onBeforeUnmount` for animation / observer cleanup | `onUnmounted` |
| `v-show` + CSS transitions for show/hide animations | `<Transition>` component |

### File naming

- Component file: `Ui[Name].vue`
- Exported as (no prefix): `export { default as Button } from './UiButton.vue'`
- Variants file: `[name]-variants.ts`
- Compound context file: `[name]-types.ts`

### Unique IDs pattern

When a component needs stable, SSR-safe unique IDs (e.g., for `<label for="...">` pairs):

```vue
<script lang="ts">
let _counter = 0
</script>

<script setup lang="ts">
const uid = `my-component-${++_counter}`
</script>
```

### CVA variants

Keep variant logic separate and co-located with the component:

```ts
// button-variants.ts
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-ui border-border bg-transparent hover:bg-muted',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)
```

---

## ➕ Adding a Component

Follow these steps in order:

1. **Create the folder** — `packages/ui/src/components/ui/[name]/`
2. **Create `Ui[Name].vue`** — follow the component pattern above
3. **Add variants** — if the component has visual variants, create `[name]-variants.ts` with CVA
4. **Add context types** — if it's a compound component, create `[name]-types.ts` with a typed `InjectionKey`
5. **Export from the barrel** — add a named export to `packages/ui/src/index.ts` with a JSDoc comment
6. **Add a demo page** — create `src/modules/ui/views/My[Name].vue` and register the route in `src/router/index.ts`
7. **Rebuild the package** — `pnpm build:ui`
8. **Verify** — run `pnpm type-check` and confirm the playground renders correctly

---

## 📈 Adding a Chart

1. **Create the folder** — `packages/charts/src/chart[name]/`
2. **Create `UiChart[Name].vue`** — use the `UiChartContainer` slot pattern to get reactive `width` and `height`:

   ```vue
   <template>
     <UiChartContainer v-bind="$attrs">
       <template #default="{ width: w, height: h }">
         <!-- cache computed values with the v-for trick -->
         <template v-for="c in [{ series: computeSeries(w, h) }]" :key="0">
           <svg :width="w" :height="h">
             <!-- render c.series -->
           </svg>
         </template>
       </template>
     </UiChartContainer>
   </template>
   ```

3. **Store animation IDs** — save any `requestAnimationFrame` handle and cancel it in `onBeforeUnmount`
4. **Export** — add the component to `packages/charts/src/index.ts`, then run `pnpm build:charts`

> **Zero-dependency rule:** `@3df-spa/charts` must never gain a runtime dependency. Only `vue` is allowed as a peer dep. If you need a utility, implement it inline inside the `shared/` folder.

---

## 🔲 Borders Rule

All component borders must use the `border-ui` utility, which reads `--ui-border-width` (default `2px`). This allows consumers to globally change border thickness — including setting it to `0px` for a completely flat UI — without any code changes.

```html
<!-- ✅ Correct — respects the consumer's --ui-border-width setting -->
<div class="border-ui border-border">...</div>
<input class="border-ui border-input" />

<!-- ❌ Wrong — hardcodes the border width, ignores consumer customization -->
<div class="border-2 border-gray-200">...</div>
<div class="border border-zinc-300">...</div>
```

Directional variants are also available: `border-t-ui`, `border-r-ui`, `border-b-ui`, `border-l-ui`.

---

## 📝 Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must have a **type** and a **scope**:

```
<type>(<scope>): <short description>
```

**Types:**

| Type | When to use |
|---|---|
| `feat` | A new component, chart, or user-facing feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `chore` | Tooling, dependencies, config, build scripts |
| `refactor` | Code restructuring with no behavior change |
| `test` | Adding or updating tests |
| `style` | Formatting, whitespace (no logic changes) |

**Scopes:** `ui`, `charts`, `playground`, `deps`, `release`

**Examples:**

```
feat(ui): add Tooltip component with keyboard support
fix(charts): prevent NaN in UiChartGauge when value is 0
docs: expand CONTRIBUTING with charts architecture section
chore(deps): bump vite to 7.3.1
feat(ui): add color-scheme presets to Ui3df customizer
```

Breaking changes must include `!` after the scope and a `BREAKING CHANGE:` footer:

```
feat(ui)!: rename Button size prop from `xs` to `2xs`

BREAKING CHANGE: The `xs` size value has been renamed to `2xs` for consistency.
```

---

## 🔖 Changeset & Release Flow

This monorepo uses [@changesets/cli](https://github.com/changesets/changesets) for versioning and changelog generation.

### Step-by-step

```bash
# 1. After your feature/fix is committed, create a changeset entry
pnpm changeset
# → Select affected packages (@3df-spa/ui, @3df-spa/charts, or both)
# → Choose bump type: patch | minor | major
# → Write a short human-readable summary (goes into CHANGELOG)

# 2. Apply changesets: bumps package versions and generates CHANGELOG entries
pnpm version-packages

# 3. Build and publish to GitHub Packages
pnpm release
```

### Bump type guide

| Change | Bump |
|---|---|
| Bug fix, internal refactor | `patch` (1.3.0 → 1.3.1) |
| New component or chart, new prop | `minor` (1.3.0 → 1.4.0) |
| Breaking API change | `major` (1.3.0 → 2.0.0) |

Consumers update with:

```bash
pnpm update @3df-spa/ui @3df-spa/charts
```

---

## 🔍 Pull Request Process

### Before opening a PR

Ensure all of the following pass locally:

```bash
pnpm type-check   # zero type errors
pnpm lint         # zero lint warnings
pnpm build:ui     # builds without errors
pnpm build:charts # builds without errors (if charts were modified)
```

### PR description checklist

When submitting your PR, include:

- [ ] **What** — a clear description of the change and the problem it solves
- [ ] **Why** — motivation and context (link related issues with `Closes #123`)
- [ ] **How** — any non-obvious implementation decisions worth documenting
- [ ] **Type-check** passes (`pnpm type-check`)
- [ ] **Lint** passes (`pnpm lint`)
- [ ] **Build** succeeds (`pnpm build:ui` / `pnpm build:charts`)
- [ ] New component follows the required component pattern
- [ ] No new runtime dependencies added to `@3df-spa/charts`
- [ ] Borders use `border-ui`, not `border-2` or `border`
- [ ] A changeset has been created (`pnpm changeset`) if this affects published packages
- [ ] A demo page has been added to the playground (for new components)

### Review turnaround

Maintainers aim to review PRs within **3 business days**. If you haven't received feedback after that, feel free to ping on the issue or PR thread.

---

<p align="center">MIT © 2026-present <a href="https://github.com/3DF-SpA">3DF SpA</a></p>
