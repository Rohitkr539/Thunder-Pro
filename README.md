# JSCraft — Learn JavaScript + Python-Powered JS Runtime

A full-stack JavaScript learning platform with a built-in **JavaScript runtime executed entirely from Python** — built as a Hackathon submission for the challenge:

> _Build a runtime in a non-JavaScript language that can execute JavaScript._

The app combines:
- **4 hand-written interactive lectures** (History of JS, Data Types, Operators, Loops/Math/Strings)
- **A live in-browser code editor** with two engine modes (browser eval & Python backend)
- **A Hackathon Runtime page** that runs the 5 required test cases server-side through a Python-hosted JS engine and shows **Pass/Fail · 100/100 score live**
- **15-question quiz**, **searchable cheatsheet**, **personal notes** (saved locally), **roadmap** timeline
- **Dark / Light mode toggle** with persistent theme preference

---

## ⚡ The Hackathon Runtime — How It Works

The backend (Python / FastAPI) embeds **QuickJS** — a small, fast JavaScript engine written in C — through the `quickjs` Python binding. Each request creates a fresh sandboxed JS context, installs a `console` shim that captures `console.log` output into an array, evaluates the user's JavaScript, and returns the captured output back to the React frontend.

```
React Frontend  ──HTTP POST──▶  FastAPI (Python)  ──ffi──▶  QuickJS (C)
        ▲                              │                       │
        └────── JSON output ◀──────────┴──── captured logs ◀──┘
```

This means:
- The **primary language of the submission is Python**, satisfying the hackathon rule.
- JS execution is **sandboxed** (no host file/network access from inside the JS).
- A **5-second wall-clock timeout** and **64 MB memory limit** are enforced per execution.
- Modern JS works: `let` / `const`, arrow functions, classes, template literals, spread, `map` / `filter` / `reduce`, `Math`, destructuring, `Map` / `Set`, etc.

### Hackathon Test Cases (all 5 pass — 100/100)

| # | Title                       | Verified |
|---|-----------------------------|:--------:|
| 1 | Odd / Even Checker          | ✅ |
| 2 | Triangle Pattern (for loop) | ✅ |
| 3 | Armstrong Number            | ✅ |
| 4 | Array Reverse               | ✅ |
| 5 | String Palindrome Check     | ✅ |

Run them yourself from the **⚡ Hackathon** tab in the UI, or via cURL:
```bash
curl -X POST http://localhost:8001/api/runtime/run-tests
```

---

## 🛠 Tech Stack

| Layer    | Tech                                                        |
|----------|-------------------------------------------------------------|
| Frontend | React 19 + vanilla HTML/CSS/JS (served via Create React App)|
| Backend  | FastAPI (Python 3.11)                                       |
| JS Engine| QuickJS (C) via [`quickjs`](https://pypi.org/project/quickjs/) PyPI binding |
| Database | MongoDB (motor async driver) — used only for status pings   |

---

## 📂 Project Structure

```
.
├── backend/
│   ├── server.py          # FastAPI app + JS runtime endpoints
│   ├── requirements.txt   # Python deps (includes quickjs)
│   └── .env               # MONGO_URL, DB_NAME, CORS_ORIGINS
├── frontend/
│   ├── public/
│   │   ├── jscraft.html   # Full single-page UI (nav, hero, lectures, hackathon, …)
│   │   └── jscraft.js     # All client logic (lectures, quiz, hackathon runner, theme)
│   ├── src/
│   │   ├── App.js         # React shell that hosts jscraft.html in an iframe
│   │   └── App.css
│   ├── package.json
│   └── .env               # REACT_APP_BACKEND_URL
└── README.md
```

---

## 🚀 How to Run This Code

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** with **Yarn** (`npm i -g yarn`)
- **MongoDB** running locally on `mongodb://localhost:27017` (only used for an optional status-check endpoint — feel free to skip and just point the URL anywhere; the runtime endpoints don't touch the DB)

### 1. Clone

```bash
git clone <YOUR_REPO_URL>
cd <repo-folder>
```

### 2. Backend

```bash
cd backend

# (Optional) create a venv
python -m venv .venv && source .venv/bin/activate

# Install Python deps
pip install -r requirements.txt

# Configure environment
cat > .env <<EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=jscraft
CORS_ORIGINS=*
EOF

# Start the FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend is now live at **http://localhost:8001**.

Smoke test:
```bash
curl http://localhost:8001/api/                # {"message":"JSCraft Runtime API",...}
curl -X POST http://localhost:8001/api/runtime/run-tests   # 100/100
```

### 3. Frontend

In a new terminal:

```bash
cd frontend

# Install JS deps
yarn install

# Configure backend URL
cat > .env <<EOF
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Start the dev server
yarn start
```

Open **http://localhost:3000** — the full JSCraft UI loads.

> The page you actually need is **http://localhost:3000/jscraft.html** (the React shell at `/` simply iframes this file).  
> The **⚡ Hackathon** tab in the nav runs all 5 test cases against the Python backend and displays a live pass/fail panel + a 100/100 score pill.

---

## 🌍 Deploying for free — Render (backend) + Netlify (frontend)

> Netlify cannot run a Python backend on its own. We host the FastAPI backend on Render's free tier and the React frontend on Netlify. Netlify transparently proxies `/api/*` to the Render backend — so the browser only ever talks to one origin (no CORS headaches).

### 1. Backend → Render
1. [render.com](https://render.com) → **New +** → **Web Service** → connect this GitHub repo.
2. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. Env vars (all optional — leave blank to skip MongoDB):
   - `CORS_ORIGINS` = `*` (or your Netlify URL once you have it)
   - `MONGO_URL`, `DB_NAME` — only if you want to attach MongoDB later
4. Click **Create Web Service**, copy the public URL (e.g. `https://thunder-pro-backend.onrender.com`).

### 2. Frontend → Netlify
A `frontend/netlify.toml` is already included in this repo. Just:
1. Open the file `frontend/netlify.toml` and replace `REPLACE-WITH-YOUR-RENDER-URL.onrender.com` with the URL from step 1, then push the change to GitHub.
2. [netlify.com](https://netlify.com) → **Add new site** → **Import existing project** → pick this repo.
3. Netlify will auto-detect the build settings from `netlify.toml` (Base directory: `frontend`, Publish: `frontend/build`).
4. Click **Deploy site**.

### 3. Verify
Open the Netlify URL → click **⚡ Hackathon** tab → **▶ Run All Tests** → should show **100 / 100**.

---



All endpoints are prefixed with `/api`.

### `GET /api/`
Health/info ping.
```json
{ "message": "JSCraft Runtime API", "engine": "QuickJS (via Python)" }
```

### `POST /api/runtime/execute`
Execute arbitrary JS code, capturing `console.log` output.

**Request**
```json
{ "code": "console.log(1 + 2);", "timeout": 5 }
```

**Response**
```json
{ "output": "3", "error": null }
```

### `GET /api/runtime/tests`
Returns the 5 hackathon test cases (id, title, code, expected output) without running.

### `POST /api/runtime/run-tests`
Executes all 5 hackathon test cases and returns per-test pass/fail + a 0–100 score.
```json
{
  "results": [
    { "id": 1, "title": "Odd / Even Checker", "expected": "7 is Odd",
      "actual": "7 is Odd", "passed": true, "error": null },
    ...
  ],
  "score": 100,
  "total": 100,
  "passed_count": 5,
  "total_count": 5
}
```

---

## 🎯 Judging Criteria — How JSCraft Delivers

| Criterion | How we score |
|-----------|--------------|
| **Code quality & clarity** | Single tight `server.py` (~180 LOC). One pure function `execute_js()`. No abstractions beyond the minimum. Frontend is split into a structural HTML file and a single logic file — easy to read top-to-bottom. |
| **Innovation of approach** | We don't write our own JS interpreter — we **embed QuickJS (C) inside Python via FFI**. This gives us **real V8-class JS semantics** (classes, spread, destructuring, regex, `Math`, `Map`, `Set`) for a fraction of the work needed to roll our own AST walker, while still being a Python-first submission. |
| **Performance** | QuickJS is a production-grade JIT-less interpreter — all 5 test cases run **in well under 100 ms total**. A 5-second timeout and 64 MB memory cap protect the host. |
| **Earlier timestamp** | Streamlined commit history; minimal dependencies. |

---

## 💡 Design Choices Worth Noting

- **Why QuickJS over `js2py` / `quickjs.js` / a hand-rolled interpreter?**  
  `js2py` only supports ES5, is slow, and chokes on real-world code (`spread`, classes, etc.). A hand-rolled interpreter would take weeks and still miss edge cases. QuickJS is small, modern (ES2020+), and battle-tested.

- **Why a console shim?** QuickJS doesn't ship a `console` global by default. We inject one that pushes every `console.log` argument into a `__logs` array, which we then read back with `__logs.join("\n")`.

- **Why an iframe in App.js?** The lecture content + interactive UI is rendered from a single static HTML file (`/jscraft.html`) for portability — the React shell mounts it via iframe to keep the React side trivial.

---

## 🖼 Screenshots

- Dark mode home page with hero, lecture grid, and progress
- Light mode toggle persists across reloads
- ⚡ Hackathon tab: per-test JS code + expected vs actual + green PASS badges + 100/100 score pill

---

## 📜 License

MIT — feel free to fork, study, or extend.

Built with ❤️ for the JS-Runtime-in-a-Non-JS-Language hackathon.
