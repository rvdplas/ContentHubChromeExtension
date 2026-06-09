---
description: Refactor one area to stricter TypeScript safely.
tools: ['search/codebase', 'search/usages', 'edit', 'runCommands', 'read/terminalLastCommand']
---

Refactor one focused area of the codebase to stricter TypeScript.

Rules:

- Keep the change small.
- Do not change behavior unless explicitly needed.
- Replace unsafe `any` with explicit types, `unknown`, narrowing or schema validation.
- Add/update tests when changing non-trivial logic.
- Run available build/tests.
- Summarize the exact files changed.
