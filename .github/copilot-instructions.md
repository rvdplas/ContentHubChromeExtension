# Copilot Instructions: Chrome Extension for Sitecore Content Hub

You are assisting on a Chrome Extension built with JavaScript and TypeScript that integrates with Sitecore Content Hub.

## Core priorities

- Prefer maintainable TypeScript over clever JavaScript.
- Use Chrome Extension Manifest V3 patterns.
- Keep permissions narrow and explicitly justified.
- Keep Content Hub integration behind small typed API clients.
- Never hard-code Content Hub URLs, tenant IDs, tokens, client secrets or user credentials.
- Treat all Content Hub API responses as untrusted external input.
- Prefer small, reviewable changes.
- Add or update tests when changing behavior.

## Architecture principles

- Keep UI code, browser-extension plumbing and Content Hub API access separate.
- Use typed message contracts between popup, options, content scripts and background service worker.
- Content scripts should only interact with the active page and send typed messages.
- The background service worker should handle privileged extension operations and API calls when possible.
- Store configuration through a typed settings service.
- Use schema validation for external data before using it in UI or domain logic.
- Do not introduce a large framework unless the repository already uses one.

## Upgrade principles for Sitecore Content Hub

- First identify the currently targeted Content Hub version, SDK/client package versions, API endpoints and custom scripts.
- Verify changes against official Sitecore Content Hub documentation and changelog before implementation.
- Produce an impact report before editing upgrade-sensitive code.
- Do not assume Content Hub ONE, XM Cloud or SitecoreAI Content SDK guidance applies to classic Content Hub unless the repository clearly uses it.
- Keep backward compatibility where the extension may connect to multiple Content Hub tenants.

## Code style

- Use `strict` TypeScript.
- Avoid `any`; use `unknown` and narrow it.
- Prefer `async/await`.
- Return typed result objects for recoverable errors.
- Centralize logging and avoid logging secrets or tokens.
- Keep functions small and name them after business intent.
- Do not suppress TypeScript errors unless the reason is documented.

## Definition of done

A change is complete when:

- TypeScript builds without errors.
- Linting and formatting pass if configured.
- Relevant tests pass.
- The extension can be loaded unpacked in Chrome.
- Manifest permissions remain least-privilege.
- Upgrade-sensitive changes include notes about assumptions and verification.
