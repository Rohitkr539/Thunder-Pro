# JSCraft — PRD

## Original Problem Statement
Hackathon: Build a JavaScript runtime in a **non-JavaScript language**.
The runtime must pass 5 visible test cases (odd/even, triangle pattern, Armstrong number, array reverse, palindrome) and may face hidden tests.

User additionally requested:
- A full JavaScript learning app (JSCraft) wrapped around the runtime.
- Dark / Light mode toggle.
- Public GitHub repo + README.

## Architecture
- **Backend**: FastAPI (Python) embedding QuickJS (C) via the `quickjs` PyPI binding.
- **Frontend**: Static HTML/CSS/JS (jscraft.html + jscraft.js) wrapped in a minimal React shell.
- **Endpoints**: `/api/runtime/execute`, `/api/runtime/tests`, `/api/runtime/run-tests`.

## Implemented (2026-01)
- ✅ Python-hosted JS runtime with sandboxed QuickJS context, 5s timeout, 64MB cap.
- ✅ All 5 hackathon test cases — 100/100 score.
- ✅ Hackathon UI tab: live "Run All Tests" button, per-test pass/fail, expected vs actual diff.
- ✅ Custom code runner on Hackathon tab (POST /api/runtime/execute).
- ✅ 4 interactive lectures with TOC sidebar, mark-complete, progress bar.
- ✅ Live code editor with browser-eval AND Python-runtime toggle.
- ✅ 15-question quiz, 15-card cheatsheet, notes (localStorage), roadmap timeline.
- ✅ Dark / Light mode toggle, persisted in localStorage.
- ✅ Comprehensive README.md with setup, API reference, judging-criteria mapping.

## Files
- `/app/backend/server.py` — runtime + API.
- `/app/backend/requirements.txt` — includes `quickjs==1.19.4`.
- `/app/frontend/public/jscraft.html` — full UI structure.
- `/app/frontend/public/jscraft.js` — all client logic + hackathon runner + theme toggle.
- `/app/frontend/src/App.js` — React shell (iframes jscraft.html).
- `/app/README.md` — submission README.

## Next / Backlog
- P2: Save quiz scores to MongoDB (currently localStorage only).
- P2: Add Functions, Arrays/Objects, DOM, Async lectures (placeholders in roadmap).
- P2: Hidden-test endpoint with secret token for graders.
