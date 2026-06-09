---
applyTo: "**/*.{ts,tsx,js,jsx,json,md}"
---

# Sitecore Content Hub Integration Instructions

Use these instructions for code that integrates with Sitecore Content Hub.

## Product boundary

- Confirm whether the project integrates with classic Sitecore Content Hub DAM/CMP/PCM, Content Hub ONE, SitecoreAI, XM Cloud, or a custom proxy.
- Do not mix documentation or SDK assumptions between these products unless the codebase proves they are relevant.
- Prefer official Sitecore documentation, changelog and tenant-specific release notes for upgrade decisions.

## API integration

- Put all Content Hub calls behind a small typed client.
- Keep endpoint paths, base URL, authentication mode and API version configurable.
- Never hard-code tenant-specific URLs or credentials.
- Avoid scattering raw fetch calls across UI and content scripts.
- Use explicit request and response types.
- Validate external API responses before using them.
- Normalize Content Hub errors into a typed error model.
- Handle pagination, throttling and transient failures intentionally.
- Do not log access tokens, refresh tokens, cookies, user IDs, asset metadata that may be sensitive, or full API payloads by default.

## Upgrade checks

When upgrading, inspect:

- npm package versions for Content Hub-related clients or SDKs.
- Direct REST endpoint usage.
- Authentication flow.
- Search/query APIs.
- Entity and asset schema assumptions.
- Script or action endpoint usage.
- Web Client SDK usage if present.
- CORS and browser-extension host permission assumptions.
- Deprecated endpoint or property usage.
- Custom Content Hub schema fields used by the extension.

## Deliverables for upgrade work

Before implementation, produce:

- Current integration map.
- Target version assumption.
- Breaking-change candidates.
- Files likely impacted.
- Test plan.
- Rollback plan.
