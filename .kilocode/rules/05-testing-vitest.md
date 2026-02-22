# Testing Rules (Vitest Mandatory)

## Mandatory

- After each task/request/new component/action, add or update tests using Vitest.
- Tests are part of “done”.

## What to test

- Components: rendering, props behavior, events, conditional UI.
- Composables: state transitions, outputs, side effects (mock where needed).
- Utils: pure function inputs/outputs.

## Practices

- Keep tests focused and readable.
- Prefer small unit tests over giant integration tests unless needed.
- Avoid brittle assertions; test behavior.

## File placement

Use a consistent convention (adapt to project):

- src/components/\*_/**tests**/_.test.ts
- src/composables/\*_/**tests**/_.test.ts
- src/utils/\*_/**tests**/_.test.ts
