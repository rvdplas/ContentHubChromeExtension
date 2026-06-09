---
description: Review and improve the Sitecore Content Hub API client boundary.
tools: ['search/codebase', 'search/usages', 'edit', 'web/fetch', 'runCommands', 'read/terminalLastCommand']
---

Review the Sitecore Content Hub API integration boundary.

Goals:

- Find scattered raw API calls.
- Propose or improve a typed API client.
- Normalize errors.
- Validate responses.
- Keep tenant-specific settings configurable.
- Avoid exposing tokens to unsafe extension contexts.

Make only small edits if the required change is clear; otherwise return a proposed plan.
