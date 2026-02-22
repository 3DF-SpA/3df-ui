# Components, Composables & SFC Rules (Vue)

## Separation of concerns

- Do not cram everything into a single SFC script.
- Prefer composables for reusable logic and state.
- Keep components focused on rendering and orchestration.
- Put reusable logic in composables and pure utilities.

## When to create a composable

- Logic reused across components.
- Non-trivial state transitions.
- Async flows, watchers, derived state.

## Component rules

- Keep components small and composable.
- Extract reusable UI patterns into components/ui.
- Prefer explicit props with types.

## TypeScript

- Prefer TypeScript for safety if the project uses it.
- Keep shared types in a sensible location if needed.
