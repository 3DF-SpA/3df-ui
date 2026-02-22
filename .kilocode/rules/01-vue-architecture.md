# Vue Architecture & File Tree Rules

## Goals

- Modern Vue best practices.
- Maintainable, reusable, readable structure.
- Clear separation of concerns: views/pages, components, composables, services, utilities, tests.

## Recommended structure (adapt as needed)

- src/
  - main.ts
  - App.vue
  - router/ (if using Vue Router)
  - views/ (route-level pages, thin composition only)
  - components/
    - ui/ (atoms: Button, Input, Modal)
    - layout/ (Header, Footer, Navigation, Shell)
    - feature/ (feature-scoped components)
  - composables/ (useX composables: state + logic)
  - services/ (API clients, domain services, side effects)
  - utils/ (pure functions: formatters, mappers)
  - lib/ (shared non-UI logic if needed)
  - tests/ (test utilities if needed)

## Component design rules

- Keep views thin: compose components, avoid heavy logic in views.
- Prefer small, single-purpose components.
- Reuse UI components instead of duplicating markup/styles.

## Imports & boundaries

- Composables should be testable and keep side effects minimal and explicit.
- Utils should be pure functions whenever possible.
- Services isolate side effects (network/storage).
