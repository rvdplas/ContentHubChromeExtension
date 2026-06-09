---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# TypeScript and JavaScript Instructions

- Prefer TypeScript for new files.
- When editing JavaScript, improve safety without unnecessary rewrites.
- Do not use `any` unless there is no practical alternative; document why.
- Use `unknown` for external input and narrow it with type guards or schema validation.
- Use discriminated unions for extension messages and result types.
- Avoid global mutable state.
- Keep side effects at the edges of the application.
- Prefer named exports for shared utilities.
- Avoid mixing browser API calls directly into domain logic.
- Add unit tests for non-trivial parsing, mapping and error handling.
