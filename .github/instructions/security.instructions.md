---
applyTo: "**/*.{ts,tsx,js,jsx,json,html}"
---

# Browser Extension Security Instructions

- Follow least privilege for Chrome permissions and host permissions.
- Do not store secrets in source code, committed config or extension package files.
- Prefer OAuth/OIDC or short-lived token flows where applicable.
- Do not expose Content Hub tokens to content scripts unless unavoidable.
- Never log secrets, bearer tokens, cookies or full auth headers.
- Sanitize or safely render any HTML received from external APIs.
- Avoid `innerHTML`; use safe DOM APIs or a trusted sanitizer if HTML is required.
- Validate all runtime messages.
- Validate all external API responses.
- Treat the active webpage as untrusted.
- Avoid broad network access.
- Add explicit error handling for auth failures, permission failures and API throttling.
