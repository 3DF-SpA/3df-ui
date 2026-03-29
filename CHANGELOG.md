# Changelog

All notable changes to `@3df-spa/ui` are documented here.

---

## [1.5.0] — 2026-03-29

### Added

#### `3df` Theme Mode — Forest Green Dark Theme
- **Files:** `packages/ui/src/styles/theme.css`, `packages/ui/src/components/ui/3df/use-3df-config.ts`, `packages/ui/src/components/ui/3df/Ui3dfTheme.vue`, `src/composables/useTheme.ts`, `src/components/ThemeSwitcher.vue`
- **What:** Introduces a new first-class theme mode called `'3df'` — a full forest green dark theme with its own complete CSS variable palette. This is a standalone theme comparable to `light` and `dark`, not a color preset override.
- **Activation:** Adds class `.theme-3df` to `document.documentElement`. All semantic tokens are redefined within this class selector.
- **Color palette highlights:**
  - `--background: hsl(145 20% 7%)` — near-black with a deep green tint
  - `--foreground: hsl(145 8% 92%)` — light cream with a subtle green tint
  - `--card / --popover: hsl(145 18% 10%)` — slightly elevated dark green surfaces
  - `--primary: hsl(145 50% 45%)` — forest green, used for buttons, active states, focus rings
  - `--ring: hsl(145 50% 45%)` — focus ring matches primary
  - `--muted: hsl(145 12% 15%)` — dark forest muted backgrounds
  - `--accent: hsl(145 15% 18%)` — hover/highlight surfaces
  - All `--chart-*` colors re-tuned for green-tinted dark backgrounds
  - Sidebar tokens adapted to forest palette
  - Shadow opacities increased for dark-surface legibility

- **`@custom-variant theme-3df`** added to `theme.css` so Tailwind utility variants (e.g. `theme-3df:bg-card`) work automatically for consumers using the theme.

- **`Theme` type updated:** `'light' | 'dark' | 'system' | '3df'` in `use-3df-config.ts`. `applyTheme()` now removes both `.dark` and `.theme-3df` before applying the requested mode, preventing class conflicts.

- **`applyColorVars` isDark detection updated:** The MutationObserver and `applyCSS()` now check for both `.dark` AND `.theme-3df` when determining whether to use dark-variant preset colors, so color presets render correctly on top of the 3df theme.

- **`Ui3dfTheme.vue`:** Added 4th option `{ value: '3df', label: '3DF', icon: 'leaf' }` with a leaf SVG icon. Grid changed from 3 to 4 columns to accommodate the new option.

- **Playground (`useTheme.ts`, `ThemeSwitcher.vue`):** `BaseMode` extended to `'light' | 'dark' | '3df'`. A 3DF button with leaf icon added to the navbar ThemeSwitcher dropdown.

---

## [1.4.6]— 2026-03-29

### Fixed

#### CardContent — Top Padding Regression
- **File:** `packages/ui/src/components/ui/card/UiCardContent.vue`
- **Problem:** `UiCardContent` had `pt-0` and `sm:pt-0` hardcoded as default classes. This caused the content to sit flush against the top border of the card whenever `CardContent` was used without a `CardHeader` (i.e., "content-only" cards). The text was visually clipped to the top edge.
- **Root Cause:** The `pt-0` was originally intended for cards where a `CardHeader` provides the top spacing, but it was applied unconditionally regardless of whether a header existed.
- **Fix:** Removed `pt-0` and `sm:pt-0` from the default class string. `UiCardContent` now uses full symmetric padding `p-3 sm:p-6`.
- **Migration:** Consumers who use `CardHeader` + `CardContent` and want to reduce the gap between them can manually pass `class="pt-0"` to `CardContent`.

#### CommandPalette — Enter Key Does Not Navigate
- **File:** `packages/ui/src/components/ui/command-palette/UiCommandPalette.vue`
- **Problem:** Pressing `Enter` on a highlighted item in the `CommandPalette` did not trigger navigation or the `@select` emit. Items could only be selected by clicking.
- **Root Cause:** `UiCommand`'s `onKeydown` handler calls `handleSelect(selectedValue.value)` where `selectedValue` stores the *searchable value* — a composite string built from `item.value + item.label + group.label + ...keywords` (e.g., `/ui/button Button Navegación`). This value was emitted as the `select` event payload. `UiCommandPalette.onSelectItem(value)` then called `findItem(value)` which searches for `item.value === value`. Since the emitted payload was the composite searchable string and not the original `item.value`, `findItem` always returned `null`, silently dropping the selection.
- **Fix:** `onSelectItem` now performs a dual lookup:
  ```typescript
  const item = findItem(value) ?? searchableToItem.value.get(value) ?? null;
  ```
  This handles both cases: click events (emit original `item.value`) and Enter key events (emit `searchableValue`).

#### CommandPalette — Orphaned Group Headers During Search
- **File:** `packages/ui/src/components/ui/command-palette/UiCommandPalette.vue`
- **Problem:** When typing in the search input, items were correctly hidden via `UiCommandItem`'s `v-if="isVisible"`. However, `UiCommandGroup` itself never hid, so its header label (e.g., "LAYOUT", "OVERLAY") remained visible even when all items in that group were filtered out — creating orphaned, empty section headers.
- **Fix:**
  - Added `localSearch = ref('')` in `UiCommandPalette`'s script.
  - Synced it via `v-model="localSearch"` on `UiCommandInput` (which also emits `update:modelValue`).
  - Added `isGroupVisible(group: CommandPaletteGroup): boolean` helper that returns `true` if at least one item in the group matches the current search term (same `buildSearchable` logic used elsewhere).
  - Applied `v-show="isGroupVisible(group)"` to each `UiCommandGroup` in the template.
  - `onOpenChange` now also resets `localSearch` to `''` when the palette closes, so the next open starts with a clean search state.

### Added

#### CommandPalette — Keyboard Hints Footer
- **File:** `packages/ui/src/components/ui/command-palette/UiCommandPalette.vue`
- **What:** A sticky footer bar is now rendered at the bottom of the `CommandPalette` dialog (below the split panel area). It displays keyboard shortcut hints using styled `<kbd>` elements:
  - `↑↓` — navigate
  - `↵` — select
  - `esc` — close
- **Design:** `border-t border-border/40`, `text-[11px] text-muted-foreground/70`, `bg-muted` kbd chips with `border border-border/60`.
- **Implementation:** Wrapped the existing `h-[540px]` panels div and the new footer in a `flex flex-col` container inside `UiCommandDialog`'s slot.

---

## [1.4.4] — 2026-03-28

### Added

- **CommandPalette component:** New high-level component exported from `@3df-spa/ui`. Provides a split-panel command palette layout (grouped list + customizable preview panel) built on top of the `Command` primitive family.
- **CommandPaletteItem / CommandPaletteGroup types:** TypeScript interfaces exported for consumer type safety.
- **UiCommand auto-selection:** First visible item is now auto-selected when the command opens and when the search term changes (via `watch(visibleValues, { immediate: true })`).

### Fixed

- **CommandList height:** Resolved `sm:max-h-[20rem]` overriding full-height usage. Consumers must now explicitly pass `sm:max-h-none` alongside `max-h-none` to fully override the responsive cap.

### Playground

- Added `/ui/command-palette` demo route with live interactive example, props table, slots table, and code snippets.
- `AppLayout.vue` now inlines the `CommandPalette` logic directly (no intermediate wrapper component). The search button in the navbar opens the palette; items navigate to their respective demo routes.
- `src/components/CommandPalette.vue` wrapper made obsolete (retained for reference).

---

## [1.4.1] — 2026-03-27

### Changed

- **Sidebar architecture:** Removed all internal mobile logic (Sheet, Teleport, matchMedia, `body.overflow`). `SidebarMobileTrigger` removed from exports. Consumers are responsible for their own mobile layout.
- **Sidebar layout:** Removed `position: fixed`. Sidebar is now an in-flow flex child (`shrink-0 h-svh`), fixing the overlay-on-content bug.
- **SidebarTrigger / SidebarRail:** Now emit a `toggle` event instead of managing internal state.
- **Sidebar color:** `--sidebar` CSS variable now references `var(--background)` so the sidebar always matches the active theme background.

### Playground

- Sidebar hidden on tablet/mobile (`hidden lg:flex`); hamburger + Sheet added for mobile navigation.
- Search bar moved to the right side of the navbar (next to the locale switcher).
- i18n keys added: `demo.nav.documentation`, `demo.nav.support`, `demo.nav.whatsNew` (en + es).

---

## [1.3.4] — 2026-03-26

### Added

- **SidebarMobileTrigger:** New component, hamburger button visible only on mobile.

### Fixed

- **Sidebar border:** Panel now uses `border-r-ui` / `border-l-ui` (reads `--ui-border-width`). Removed hardcoded `border-sidebar-border`.
- **Responsive improvements:** 20+ components improved for tablet and mobile (Badge, Tabs, Slider, Breadcrumb, Accordion, Banner, Menubar, Pagination, Command, Sonner, etc.).
- **UiCard responsive:** Added `overflow-hidden min-w-0 w-full`; responsive padding `p-3 sm:p-6` in Header/Content/Footer; `break-words` in Title/Description.
