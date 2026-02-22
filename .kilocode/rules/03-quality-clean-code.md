# Quality & Clean Code Rules

## Hard limits

- No project source file should exceed 250 lines.
  - If a file grows beyond 250 lines, refactor:
    - Extract components
    - Extract composables
    - Extract pure utilities

## No comments policy (mandatory)

- Do NOT add comments in source code files.
- Write self-documenting code: clear names, small functions, explicit structure.
- Allowed exceptions (rare):
  - License headers if required.
  - Minimal TODO with an issue ID (e.g., TODO(#123)) only when unavoidable.

## Clean code principles

- Clear naming over cleverness.
- Small units, single responsibility.
- Avoid duplication (DRY) without over-abstracting.
- Remove unused imports, files, and styles.

## No junk code

- No dead code, no unused components, no unused Tailwind classes “just in case”.
- Delete unused code instead of leaving it around.
