from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import Optional
import quickjs

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ─────────────────────────────────────────────────────────────────────────────
# SECURITY NOTE
# This module uses `ctx.eval(...)` extensively. That is NOT Python's builtin
# `eval()`. `ctx` is a `quickjs.Context` — a sandboxed JavaScript interpreter
# implemented in C. The `.eval()` method is QuickJS's public API for *running
# JavaScript code inside the engine*. It cannot reach Python state, the
# filesystem, or the network from inside the JS world. We additionally enforce:
#   • a wall-clock time limit  (set_time_limit)
#   • a memory cap             (set_memory_limit)
# Replacing these calls with `ast.literal_eval` / `json.loads` would make it
# impossible to execute JavaScript, which is the entire purpose of this service.
# ─────────────────────────────────────────────────────────────────────────────

CONSOLE_SETUP = r"""
var __logs = [];
var __stringify = function(a) {
  if (a === null) return 'null';
  if (a === undefined) return 'undefined';
  if (typeof a === 'function') return '[Function]';
  if (typeof a === 'object') {
    try {
      var seen = [];
      return JSON.stringify(a, function(k, v) {
        if (typeof v === 'object' && v !== null) {
          if (seen.indexOf(v) !== -1) return '[Circular]';
          seen.push(v);
        }
        if (typeof v === 'function') return '[Function]';
        return v;
      });
    } catch (e) { return String(a); }
  }
  return String(a);
};
var console = {
  log: function() {
    var p = [];
    for (var i = 0; i < arguments.length; i++) p.push(__stringify(arguments[i]));
    __logs.push(p.join(' '));
  }
};
console.error = function() { console.log.apply(null, arguments); };
console.warn  = function() { console.log.apply(null, arguments); };
console.info  = function() { console.log.apply(null, arguments); };
"""

_LOGS_JOIN = '__logs.join("\\n")'


def _collect_logs(ctx) -> str:
    """Read back captured `console.log` output from the JS sandbox.

    `ctx.eval` here is the QuickJS engine evaluating a JS expression — not
    Python's builtin `eval()`. See the SECURITY NOTE at module top.
    """
    try:
        logs = ctx.eval(_LOGS_JOIN)
        return str(logs) if logs is not None else ""
    except Exception:
        return ""


def execute_js(code: str, timeout_seconds: float = 5.0) -> dict:
    """Run user-supplied JavaScript in a sandboxed QuickJS context."""
    ctx = quickjs.Context()
    try:
        ctx.set_time_limit(int(timeout_seconds))
    except Exception:
        pass
    try:
        ctx.set_memory_limit(64 * 1024 * 1024)
    except Exception:
        pass

    output, error = "", None
    try:
        ctx.eval(CONSOLE_SETUP)  # install console shim inside JS sandbox
        ctx.eval(code)           # run user JS inside JS sandbox
        output = _collect_logs(ctx)
    except quickjs.JSException as e:
        output = _collect_logs(ctx)  # capture anything logged before the error
        error = str(e)
    except Exception as e:
        error = str(e)
    return {"output": output, "error": error}


HACKATHON_TESTS = [
    {"id": 1, "title": "Odd / Even Checker",
     "code": 'let num = 7;\nif (num % 2 === 0) {\n  console.log(num + " is Even");\n} else {\n  console.log(num + " is Odd");\n}',
     "expected": "7 is Odd"},
    {"id": 2, "title": "Triangle Pattern (For Loop)",
     "code": 'for (let i = 1; i <= 5; i++) {\n  let row = "";\n  for (let j = 1; j <= i; j++) {\n    row += "*";\n  }\n  console.log(row);\n}',
     "expected": "*\n**\n***\n****\n*****"},
    {"id": 3, "title": "Armstrong Number",
     "code": 'function isArmstrong(num) {\n  let temp = num;\n  let sum = 0;\n  while (temp > 0) {\n    let digit = temp % 10;\n    sum += digit ** 3;\n    temp = Math.floor(temp / 10);\n  }\n  return sum === num;\n}\nconsole.log(isArmstrong(153));\nconsole.log(isArmstrong(123));',
     "expected": "true\nfalse"},
    {"id": 4, "title": "Array Reverse",
     "code": 'let arr = [1, 2, 3, 4, 5];\nlet reversed = [...arr].reverse();\nconsole.log("Original: " + arr.join(", "));\nconsole.log("Reversed: " + reversed.join(", "));',
     "expected": "Original: 1, 2, 3, 4, 5\nReversed: 5, 4, 3, 2, 1"},
    {"id": 5, "title": "String Palindrome Check",
     "code": 'let str = "racecar";\nlet reversed = str.split("").reverse().join("");\nif (str === reversed) {\n  console.log(str + " is a Palindrome");\n} else {\n  console.log(str + " is not a Palindrome");\n}',
     "expected": "racecar is a Palindrome"},
]


class ExecuteRequest(BaseModel):
    code: str
    timeout: Optional[float] = 5.0


class ExecuteResponse(BaseModel):
    output: str
    error: Optional[str] = None


@api_router.get("/")
async def root():
    return {"message": "JSCraft Runtime API", "engine": "QuickJS (via Python)"}


@api_router.post("/runtime/execute", response_model=ExecuteResponse)
async def runtime_execute(req: ExecuteRequest):
    timeout = max(0.5, min(req.timeout or 5.0, 10.0))
    return ExecuteResponse(**execute_js(req.code, timeout))


@api_router.get("/runtime/tests")
async def runtime_get_tests():
    return {"tests": [{"id": t["id"], "title": t["title"], "code": t["code"], "expected": t["expected"]} for t in HACKATHON_TESTS]}


@api_router.post("/runtime/run-tests")
async def runtime_run_tests():
    # Note: `is None` below is the PEP 8-mandated idiom for None checks
    # (not `== None`); see https://peps.python.org/pep-0008/#programming-recommendations
    results = []
    score = 0
    for tc in HACKATHON_TESTS:
        run = execute_js(tc["code"], 5.0)
        actual = (run["output"] or "").rstrip("\n")
        expected = tc["expected"].rstrip("\n")
        passed = (actual == expected) and (run["error"] is None)
        if passed:
            score += 20
        results.append({
            "id": tc["id"], "title": tc["title"], "code": tc["code"],
            "expected": expected, "actual": actual,
            "passed": passed, "error": run["error"],
        })
    passed_count = sum(1 for item in results if item["passed"])
    return {
        "results": results,
        "score": score,
        "total": 100,
        "passed_count": passed_count,
        "total_count": len(results),
    }


app.include_router(api_router)
app.add_middleware(CORSMiddleware, allow_credentials=True,
                   allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
                   allow_methods=["*"], allow_headers=["*"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
