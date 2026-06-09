---
applyTo: "**/{manifest.json,src/**/*.ts,src/**/*.tsx,src/**/*.js,src/**/*.jsx,extension/**/*.ts,extension/**/*.js}"
---

# Chrome Extension Manifest V3 Instructions

- Target Manifest V3 unless the current manifest proves otherwise.
- Background logic must work as an event-driven service worker.
- Do not rely on long-lived background state.
- Use typed messages between popup, content scripts, options pages and background worker.
- Validate `sender`, `tab`, `frameId` and request shape before acting on messages.
- Keep `permissions` and `host_permissions` narrow.
- Avoid `<all_urls>` unless there is a documented business reason.
- Do not inject remote scripts.
- Do not use `eval`, dynamic script strings or unsafe CSP.
- Use `chrome.storage` through a typed wrapper.
- Treat content scripts as untrusted boundary code because they run in page context.
- Keep build output paths aligned with `manifest.json`.
