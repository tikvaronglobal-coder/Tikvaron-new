# FarmVoice demonstration application

A responsive, browser-local FarmVoice workspace for the TIKVARON initiative. The interface demonstrates the command centre, six-country research network, editable research leads, knowledge review workflow, scoped assistant, comparative research, project planning and sponsor briefing.

## Run locally

Open `index.html` in a modern browser. No package install, build process, server, account or API credentials are required. Records are saved in that browser's local storage under `farmvoice-demo-v1`. Use the browser's site-data controls to clear the demo records and restore the initial synthetic data.

## Demo interactions

- Navigate between the seven modules using the sidebar; on small screens use the menu button.
- Add and edit research questions, research leads, knowledge entries and research project plans.
- Search and filter the knowledge library. A knowledge entry can become approved only when it has an HTTPS source, permission marked as verified, a reviewer, a future review date and non-synthetic provenance. Expired entries are not eligible for assistant retrieval.
- Ask the assistant about a country and crop. It retrieves only approved, non-synthetic, permission-checked records whose country and crop match exactly, and cites the saved source URL. Without a matching source it says the evidence is insufficient. High-risk questions are escalated without diagnosis or treatment instructions.
- Compare the six starting countries and inspect their different research and validation contexts.
- Open the presentation module for an accurate project-stage briefing.

## Limitations and governance

This is a synthetic, local-first demonstration. It has no authentication, role-based permissions, backend/API, audit log, database service, live AI model, external retrieval, weather, market, voice or referral integration. Browser local storage is not suitable for confidential or production records. There are no real farmer records, interviews, validated recommendations or verified specialists. Organisation entries are uncontacted research leads, not confirmed partners. The demo assistant is deterministic local code and is not professional agricultural advice.

Do not enter personal or sensitive information. Before operational use, implement and independently review secure server-side identity and persistence, access controls, audit logging, evidence licensing and provenance, specialist verification, country-specific ethics and privacy processes, and safety and accessibility evaluations. No production database or paid service is provisioned by this project.

## Checks

Run the safety and retrieval regression tests with `node --test tests/core.test.mjs`. Syntax-check the browser modules with `node --check app.js` and `node --check farmvoice-core.mjs`. This project intentionally has no build step or dependency installation.
