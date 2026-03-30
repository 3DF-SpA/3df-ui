# Changelog

All notable changes to `@3df-spa/ui` are documented here.

---

## [1.5.3] — 2026-03-30

### Fixed

#### Menubar — Scrollbar Arrows Still Visible in Consumer Builds
- **Files:** `packages/ui/src/styles/theme.css`, `packages/ui/src/components/ui/menubar/UiMenubar.vue`
- **Problem:** After v1.5.2, consumers who updated the package still saw native browser scrollbar arrows (▲▼) on the right edge of the `Menubar`, even though the fix appeared to work correctly in the library's own playground.
- **Root Cause:** The v1.5.2 fix used Tailwind CSS arbitrary classes: `[&::-webkit-scrollbar]:hidden` and `[scrollbar-width:none]`. These arbitrary classes work in the playground because Tailwind scans the source `.vue` files directly. However, when a consumer installs the package and runs their own Tailwind build, Tailwind scans the compiled `dist/` files. Arbitrary classes containing CSS pseudo-elements (like `::-webkit-scrollbar`) are not reliably extracted from compiled JavaScript bundles by Tailwind's content scanner — they require the CSS to already be present in the output.
- **Fix:** Replaced the arbitrary classes approach with a proper `@utility scrollbar-hide` declaration added directly to `packages/ui/src/styles/theme.css`:
  ```css
  @utility scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ```
  This compiles the `scrollbar-hide` CSS directly into the package's distributed stylesheet (`dist/style.css`). The CSS is now always present when a consumer imports the theme — no re-scanning or re-compilation needed on their end. `UiMenubar.vue` now uses the class `scrollbar-hide` instead of the two arbitrary classes.
- **Consumer action required:** Just update to v1.5.3 — `pnpm update @3df-spa/ui`. No code changes needed in their app.

---

## [1.5.2] — 2026-03-29

### Fixed

#### Menubar — Scroll Arrows Visible on Windows / Chrome
- **File:** `packages/ui/src/components/ui/menubar/UiMenubar.vue`
- **Problem:** On Windows browsers (and some macOS configurations), the `Menubar` component displayed native scrollbar arrows (▲▼ stepper buttons) at the right edge of the bar. These appeared even when no horizontal scrolling was needed, cluttering the UI and looking unintentional.
- **Root Cause:** The `overflow-x-auto` class on the root element enables horizontal scrolling as a fallback when menu items overflow the available width. This is intentional and necessary. However, all Chromium-based browsers on Windows render their native scrollbar with arrow buttons by default, and `overflow-x-auto` is enough to trigger that rendering even when the scrollbar is not actively needed.
- **Fix:** Added `[&::-webkit-scrollbar]:hidden` (hides the entire WebKit scrollbar element, including its arrow buttons, on Chrome/Safari/Edge) and `[scrollbar-width:none]` (Firefox equivalent). The overflow behavior is preserved — content can still be scrolled programmatically or via trackpad/touch — but the scrollbar UI (arrows, track, thumb) is no longer visible. This is the same technique used by scrollable panels throughout the library.

#### Menubar — Background Invisible in Dark Mode
- **File:** `packages/ui/src/components/ui/menubar/UiMenubar.vue`
- **Problem:** In dark mode, the `Menubar` had no visible background. It appeared as floating text labels (`File`, `Edit`, `View`, etc.) against the page background with no bar, container, or border visible behind them.
- **Root Cause:** The menubar used `bg-card` as its background color. In the dark theme, `--card` is defined as `hsl(240 10% 3.9%)` — which is **identical** to `--background: hsl(240 10% 3.9%)`. Since both surface and page are the same color, the menubar blended completely into the page. The `border-ui border-border` border was also very subtle at 50% opacity against a same-color background, providing minimal visual separation.
- **Fix:** Changed `bg-card` → `bg-muted`. In dark mode, `--muted: hsl(240 3.7% 15.9%)` is a meaningfully elevated surface compared to the dark background, making the menubar clearly visible. In light mode, `--muted: hsl(240 4.8% 95.9%)` renders as a soft gray — consistent with native OS-style menu bars. In the `3df` theme, `--muted: hsl(145 12% 15%)` provides appropriate forest-tinted contrast. The existing `border-ui border-border` border remains and is now clearly visible on top of the elevated surface.

#### Input / Textarea — Border Not Visible
- **Files:** `packages/ui/src/components/ui/input/input-variants.ts`, `packages/ui/src/components/ui/textarea/UiTextarea.vue`
- **Problem:** `Input` and `Textarea` components appeared to have no visible border, making it impossible to distinguish them from the surrounding page content, especially in light mode.
- **Root Cause:** Both components used `border-ui border-input`. The `border-ui` custom `@utility` sets `border-width: var(--ui-border-width, 2px)`, which reads a CSS variable. The `border-input` color utility references `--color-input` which internally resolves to `hsl(var(--input-hsl) / var(--ui-border-opacity, 0.5))` — another CSS variable for opacity. The `3DF Customizer` allows consumers to change both `--ui-border-width` and `--ui-border-opacity` globally. If the consumer (or the playground) had customized these variables to lower values, the border would become invisible or very faint. By contrast, `UiCard` uses `border border-border/28` where the opacity modifier `/28` is hardcoded via Tailwind's `color-mix()` — it does **not** read from any CSS variable, so it is always visible regardless of customizer state.
- **Fix:** Changed `border-ui border-input` → `border border-border/50` on both `Input` and `Textarea`. This matches the `UiCard` pattern:
  - `border` — standard Tailwind 1 px border, not controlled by any CSS variable, always rendered
  - `border-border/50` — uses the semantic `--border` color at a hardcoded 50 % opacity via `color-mix()`, ensuring visibility across all themes (light, dark, 3df) and regardless of any customizer override
  - 50 % opacity (vs card's 28 %) gives form inputs slightly more visual prominence than panel borders, which is appropriate UX for interactive fields
- **Also fixed:** `Textarea` received the same fix for consistency, since it previously shared the identical `border-ui border-input` pattern.

---

## [1.5.1] — 2026-03-29

### Fixed

#### Combobox — Dropdown Requires Two Clicks to Open
- **File:** `packages/ui/src/composables/use-floating-lifecycle.ts`
- **Problem:** The first click on a `Combobox` trigger opened the dropdown and immediately closed it, making the user click a second time for it to actually stay open.
- **Root Cause:** A race condition in `useFloatingLifecycle`. When the dropdown first renders via `v-if`, `positionStyle` starts as an empty object (no `position: fixed`), so the element is placed in normal document flow at the bottom of `<body>`. `UiCommand` has a `watch(visibleValues, { immediate: true })` that auto-selects the first visible item, which then calls `scrollIntoView({ block: 'nearest' })` to scroll it into view. Because the dropdown was outside the viewport (at the bottom of the body), `scrollIntoView` triggered a window scroll. The scroll event fired the `useFloatingLifecycle` scroll handler, which called `closeFn()` and closed the dropdown — all before the user perceived anything. On the second click, `positionStyle` had already been calculated from the first open cycle (Vue reactive state persists across `v-if` unmount/remount), so the dropdown rendered in the correct viewport position, no scroll occurred, and it stayed open.
- **Fix:** Wrapped scroll and resize listener registration in `setTimeout(0)` inside `useFloatingLifecycle`. This ensures any scroll triggered during the initial render macro-task (including `scrollIntoView` from `UiCommand`) fires *before* the listeners are active. A guard `if (!options.isOpen.value) return;` inside the timeout prevents adding listeners if the dropdown was closed immediately. `onBeforeUnmount` now also calls `clearTimeout(scrollListenerTimeout)` to prevent memory leaks.
- **Pattern note:** This matches the existing `setTimeout(0)` guard already used for click-outside listeners in `UiCombobox.vue` and `UiPopover.vue`.

#### Combobox — Complete Rewrite as Self-Contained Component
- **File:** `packages/ui/src/components/ui/combobox/UiCombobox.vue`
- **Problem:** The previous implementation relied on `UiPopoverTrigger` which had its own open/close toggle. This double-toggle architecture caused conflicts and was fragile.
- **Fix:** `UiCombobox` is now fully self-contained. It manages its own `isOpen` state, uses `useFloatingPosition` + `useFloatingLifecycle` for positioning, and renders the dropdown via `Teleport to="body"`. The trigger is a plain `<button @click="toggle">` with no nested popover primitives.
- **New props:** `searchPlaceholder` (string, default `'Search...'`) and `emptyMessage` (string, default `'No results found.'`).
- **Disabled options:** The `options` array now accepts `{ value, label, disabled?: boolean }` — individual options can be disabled.
- **Dropdown width:** The dropdown `min-width` is set dynamically to match the trigger's `offsetWidth`, preventing narrower-than-trigger dropdowns.
- **Animation:** Enter/leave transitions via `isEntering` ref — `scale-[0.97] opacity-0` → `scale-100 opacity-100` over 150 ms.

#### Checkbox — Invisible When Unchecked
- **File:** `packages/ui/src/components/ui/checkbox/UiCheckbox.vue`
- **Problem:** The checkbox was completely invisible against the page background when in the unchecked state — consumers could not see where to click.
- **Root Cause:** The `inputClasses` computed used `bg-background`, which is identical to the page background color in all themes (light, dark, and 3df). The checkbox blended in completely; only the border was supposed to be visible, but the overall perception was that nothing was there.
- **Fix:** Changed `bg-background` → `bg-foreground/5` (5 % opacity of the foreground color). This is the same tint used by `UiInput` and provides a clearly visible but subtle fill that contrasts against all backgrounds without looking heavy. In light mode this renders as a very light gray; in dark and 3df themes it renders as a soft white tint.

### Added

#### Checkbox — `size` Prop
- **File:** `packages/ui/src/components/ui/checkbox/UiCheckbox.vue`
- **What:** New `size` prop with three values:
  - `sm` — `size-3.5` (14 px) for dense lists or compact form layouts
  - `default` — `size-4` (16 px, unchanged default)
  - `lg` — `size-5` (20 px) for touch-friendly or prominent checkboxes
- **Scope:** The size is applied uniformly to the wrapper `<span>`, the `<input>`, and both SVG overlays (checkmark and indeterminate dash), so proportions remain consistent at every size.
- **Backward compatible:** Existing usage with no `size` prop continues to render at `size-4` (default).

#### Checkbox — Demo Page in Playground
- **Files:** `src/modules/ui/views/MyCheckbox.vue`, `src/router/index.ts`, `src/i18n/locales/en.ts`, `src/i18n/locales/es.ts`
- **What:** Added a full demo page for `Checkbox` in the playground, under the *Formularios* sidebar group. The page demonstrates: basic usage with `Label`, all states (unchecked / checked / indeterminate / disabled), all three sizes, the indeterminate select-all pattern, and a notification preferences form mock-up.

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
