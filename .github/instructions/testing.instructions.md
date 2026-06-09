---
applyTo: "**/*.{test.ts,spec.ts,test.tsx,spec.tsx,vitest.config.*,jest.config.*,playwright.config.*}"
---

# Testing Instructions

- Prefer unit tests for pure mapping, parsing and validation logic.
- Add integration-style tests for extension message handlers where possible.
- Mock Chrome APIs behind wrappers instead of mocking global browser APIs everywhere.
- Add regression tests before refactoring upgrade-sensitive Content Hub code.
- Cover success, validation failure, auth failure and network failure paths.
- Keep tests deterministic and independent from a real Content Hub tenant unless explicitly marked as integration tests.
