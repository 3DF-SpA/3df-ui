# TailwindCSS Only Rules (No Custom CSS)

## Mandatory

- Styling must be done with TailwindCSS utilities only.
- Do NOT add or expand custom CSS files.
- Do NOT add component <style> blocks unless strictly necessary per exceptions below.

## Tailwind-first policy

- Use Tailwind utilities for layout, spacing, typography, colors, borders, shadows.
- Prefer consistent tokens via Tailwind config/theme over random one-off values.
- Avoid inline style attributes.

## Allowed exceptions (rare)

Custom CSS is allowed ONLY if Tailwind cannot reasonably express the requirement:

- Complex keyframes/animations that become unreadable as utilities.
- Vendor-specific quirks requiring advanced selectors.
- A small set of global tokens/variables required by the project (if already present).

If an exception is used:

- Keep it minimal and scoped.
- Prefer a single centralized place (existing global stylesheet) rather than scattered new CSS.
- Document the reason in the PR description or task output (NOT in code comments).

## Maintainability

- If a Tailwind class string becomes too long/complex:
  - Extract into a reusable component.
  - Or use a composable/class builder function if project conventions allow (keep it readable).
- Avoid duplicating large class strings across components.
