// JSCraft — full app logic
const API_BASE = "/api";

// ─── LECTURES ───
const lectures = [
  { id:0, icon:'📜', title:'Introduction to JavaScript', subtitle:'History, origin & why JS exists',
    topics:['Netscape','Java vs JS','Brendan Eich','Glue Lang'],
    toc:['Web Was Born Dead','Sun & Java','War on Microsoft','Why Second Lang?','Ten Days in May','How JS Won'],
    content: `<h2>The Web Was Born Dead</h2><p>Early 1990s — every web page was static. Even checking a form needed a server round-trip.</p><div class="info-box">Netscape needed the page to come alive — react instantly. That seed grew into JS.</div>
<h2>Sun &amp; Java</h2><p>Sun's Java promised "write once, run anywhere" via JVM. Sounded perfect for a heterogeneous web.</p>
<h2>War Against Microsoft</h2><p>Both Sun &amp; Netscape feared Microsoft. Their dream: software running inside the browser would make Windows irrelevant.</p><div class="warn-box">The dream came true — through the "silly little brother", not Java itself.</div>
<h2>Why a SECOND Language?</h2><ul><li><strong>Heavy lifting</strong> → Java's territory</li><li><strong>The glue</strong> → small touches: clicks, form checks</li></ul>
<h2>Ten Days in May 1995</h2><p>Brendan Eich built the glue language in ~<strong>10 days</strong>. Marketing demanded it look Java-like.</p><pre><code>// JavaScript:
console.log("Hello World");</code></pre>
<h2>How JS Won</h2><ul><li>No plugin needed</li><li>Java applet plugin had security holes</li><li>V8 made JS fast</li><li>JS lives inside the document</li></ul><div class="tip-box">Other languages own the computer. <strong>JavaScript owns the browser tab.</strong></div>` },
  { id:1, icon:'🔢', title:'Data Types in JavaScript', subtitle:'Primitives, const/let/var, conversions',
    topics:['const','let','var','Primitives','TDZ'], toc:['Why Data Types','const','let','var','Conversion','Truthy/Falsy'],
    content:`<h2>Why Data Types Exist</h2><p>Computer memory is just bytes. A type tells how many bytes &amp; which operations make sense.</p>
<h2>const</h2><pre><code>const PI = 3.14;
// PI = 3; ❌ TypeError
const CFG = { port: 8080 };
CFG.port = 3000; // ✅ Mutation OK</code></pre>
<h2>let</h2><pre><code>let counter = 0;
counter = 1; counter += 5;
for (let i = 0; i &lt; 3; i++) {} // i only here</code></pre>
<h2>var (Avoid)</h2><div class="warn-box">Default to <strong>const</strong>. Use <strong>let</strong> when reassigning. Skip <strong>var</strong>.</div>
<h2>Type Conversion</h2><pre><code>Number("99.5"); // 99.5
Number(true);   // 1
Number("hi");   // NaN
String(123);    // "123"
Boolean([]);    // true (!)
Boolean(0);     // false</code></pre>
<h2>The 6 Falsy Values</h2><pre><code>false, 0, "", null, undefined, NaN
// Everything else is truthy — even [] and {}</code></pre>` },
  { id:2, icon:'⚡', title:'Operators & Type System', subtitle:'Equality rules, floating-point, typeof',
    topics:['===','&&||','typeof','Ternary'], toc:['Primitives vs Objects','Arithmetic','Strict Equality','Logical','Floating Point'],
    content:`<h2>Primitives vs Objects</h2><pre><code>let a = 5, b = a; b = 10;
console.log(a); // 5 — copy by value
let o1 = {x:1}, o2 = o1;
o2.x = 99;
console.log(o1.x); // 99 — shared reference</code></pre>
<h2>Increment</h2><pre><code>let x = 5;
console.log(x++); // 5 (postfix)
console.log(++x); // 7 (prefix)</code></pre>
<h2>Strict vs Loose</h2><pre><code>7 == "7"   // true  (coercion)
7 === "7"  // false (USE THIS)
NaN === NaN // false (!)
Number.isNaN(NaN) // true ✓</code></pre>
<h2>Logical Operators</h2><pre><code>user && user.name   // safe access
input || "Default"  // fallback
count ?? "no count" // only null/undefined triggers</code></pre>
<h2>Floating Point</h2><pre><code>0.1 + 0.2 === 0.3 // false!
// Use Math.abs(r - 0.3) &lt; Number.EPSILON</code></pre>` },
  { id:3, icon:'🔄', title:'Loops, Math & Strings', subtitle:'Control flow, Math, String methods',
    topics:['if-else','for','while','Math','Strings'], toc:['if-else','for Loop','while','Math','String Methods','Template Literals'],
    content:`<h2>if-else</h2><pre><code>let s = 85;
if (s &gt;= 90) g = 'A';
else if (s &gt;= 80) g = 'B';
else g = 'C';</code></pre>
<h2>for Loop</h2><pre><code>for (let i = 1; i &lt;= 5; i++) console.log(i);
let f = ["apple","banana"];
for (let i = 0; i &lt; f.length; i++) console.log(f[i]);</code></pre>
<h2>while &amp; do-while</h2><pre><code>while (cond) { /* may skip */ }
do { /* runs AT LEAST ONCE */ } while (cond);</code></pre>
<h2>Math</h2><pre><code>Math.floor(4.9); // 4
Math.ceil(4.1);  // 5
Math.max(3,1,7); // 7
Math.sqrt(144);  // 12</code></pre>
<h2>String Methods</h2><pre><code>"hi".toUpperCase();   // "HI"
"  x  ".trim();       // "x"
"abc".includes("b");  // true
"a,b,c".split(",");   // ["a","b","c"]</code></pre>
<h2>Template Literals</h2><pre><code>let n = "Alice";
let msg = \`Hello \${n}! 2+2=\${2+2}\`;</code></pre>` }
];

// ─── CHEATSHEET ───
const cheatData = [
  {title:'VARIABLES',code:`const x = 10;\nlet y = 20;\nvar z = 30; // avoid`},
  {title:'PRIMITIVES',code:`number, string,\nboolean, null,\nundefined,\nbigint, symbol`},
  {title:'TYPEOF',code:`typeof 42  // "number"\ntypeof null // "object" BUG\ntypeof []  // "object"`},
  {title:'OPERATORS',code:`+ - * / % **\n=== !== // strict\n&& || ! ??`},
  {title:'STRICT EQUALITY',code:`7 === "7" // false\nNaN === NaN // false\nNumber.isNaN(NaN) // true`},
  {title:'TERNARY',code:`let r = cond\n  ? trueVal\n  : falseVal;`},
  {title:'FOR LOOP',code:`for (let i=0; i<5; i++){}\nfor (let x of arr){}\nfor (let k in obj){}`},
  {title:'WHILE',code:`while (cond) {}\ndo {} while (cond);`},
  {title:'MATH',code:`Math.round(4.6) // 5\nMath.floor(4.9) // 4\nMath.max(1,2,3) // 3\nMath.random()   // [0,1)`},
  {title:'STRINGS',code:`s.toUpperCase()\ns.trim()\ns.includes("x")\ns.slice(0,4)\ns.split(",")`},
  {title:'CONVERSION',code:`Number("99")    // 99\nString(123)     // "123"\nBoolean(0)      // false\nBoolean("false") // true!`},
  {title:'FALSY VALUES',code:`false, 0, "",\nnull, undefined, NaN`},
  {title:'TEMPLATE LITERALS',code:'let n = "World";\n`Hello ${n}!`'},
  {title:'ARRAYS',code:`arr.map(x=>x*2)\narr.filter(x=>x>0)\narr.reduce((a,b)=>a+b,0)\n[...a, ...b]`},
  {title:'OBJECT',code:`const o = {a:1, b:2};\nconst {a,b} = o;\nconst c = {...o, c:3};`},
];

// ─── QUIZ ───
const quizQuestions = [
  {q:"JavaScript was prototyped in approximately how many days?",opts:["5","10","30","365"],ans:1,exp:"~10 days in May 1995."},
  {q:"What does typeof null return?",opts:['"null"','"undefined"','"object"','"boolean"'],ans:2,exp:"'object' — a long-standing JS bug."},
  {q:"Which is NOT falsy?",opts:["0",'"" (empty string)',"[] (empty array)","null"],ans:2,exp:"[] is truthy. Only 6 falsy values."},
  {q:"0.1 + 0.2 === 0.3 outputs?",opts:["true","false","undefined","Error"],ans:1,exp:"false — IEEE 754 binary float error."},
  {q:"Difference between == and ===?",opts:["None","=== checks type too","== is faster","=== is older"],ans:1,exp:"=== checks value AND type."},
  {q:"let x=5; console.log(x++) prints?",opts:["4","5","6","undefined"],ans:1,exp:"Postfix returns original, then increments."},
  {q:"Block-scoped constant-reference?",opts:["var","let","const","def"],ans:2,exp:"const."},
  {q:"Math.floor(4.9) returns?",opts:["5","4","4.9","NaN"],ans:1,exp:"Always rounds DOWN."},
  {q:"'a,b,c'.split(',') returns?",opts:['"a b c"',"['a','b','c']","3","Error"],ans:1,exp:"Returns array."},
  {q:"Which loop runs at least once?",opts:["for","while","do-while","for-in"],ans:2,exp:"do-while checks AFTER block."},
  {q:"Boolean('false') is?",opts:["false","true","undefined","Error"],ans:1,exp:"Non-empty string is truthy."},
  {q:"parseInt('42.9px') is?",opts:["Error","NaN","42","42.9"],ans:2,exp:"Stops at decimal."},
  {q:"Why JS separate from Java?",opts:["Java slow","Java was sealed; web needed glue","Sun fight","Same lang renamed"],ans:1,exp:"Applets couldn't touch the page."},
  {q:"Temporal Dead Zone (TDZ)?",opts:["Deleted var","V8 bug","Period before let/const declaration","Undef param"],ans:2,exp:"Accessing let/const before declaration throws."},
  {q:"Random int min..max (inclusive)?",opts:["Math.random()*max","Math.floor(Math.random()*max)","Math.floor(Math.random()*(max-min+1))+min","Math.ceil(Math.random()*(max-min))"],ans:2,exp:"Scale, floor, shift."},
];

// ─── CHALLENGES ───
const challenges = [
  {label:"🎲 FizzBuzz",code:`for (let i = 1; i <= 30; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`},
  {label:"🔢 Factorial",code:`function fact(n) { return n <= 1 ? 1 : n * fact(n-1); }
for (let i = 0; i <= 8; i++) console.log(\`\${i}! = \${fact(i)}\`);`},
  {label:"🎯 Palindrome",code:`function isPal(s) {
  let c = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return c === c.split("").reverse().join("");
}
["racecar","hello","level"].forEach(t => console.log(t, "→", isPal(t)));`},
  {label:"⭐ Primes",code:`function sieve(n) {
  let p = new Array(n+1).fill(true); p[0]=p[1]=false;
  for (let i=2; i*i<=n; i++) if (p[i])
    for (let j=i*i; j<=n; j+=i) p[j]=false;
  return p.map((v,i)=>v?i:0).filter(Boolean);
}
console.log("Primes:", sieve(50).join(", "));`},
];

// ─── ROADMAP ───
const roadmapData = [
  {icon:'📜',stage:'FOUNDATION',title:'Why JavaScript Exists',desc:'History, Netscape, Brendan Eich.',lectureId:0},
  {icon:'🔢',stage:'BASICS',title:'Variables & Data Types',desc:'const, let, primitives.',lectureId:1},
  {icon:'⚡',stage:'BASICS',title:'Operators & Types',desc:'===, ||, typeof, floats.',lectureId:2},
  {icon:'🔄',stage:'CONTROL FLOW',title:'Loops, Math & Strings',desc:'for/while, Math, Strings.',lectureId:3},
  {icon:'⚡',stage:'HACKATHON',title:'JS Runtime Challenge',desc:'Run JS through a non-JS backend.',lectureId:null,navTo:'hackathon'},
  {icon:'🧩',stage:'NEXT',title:'Functions',desc:'declarations, expressions, arrows.',lectureId:null},
  {icon:'📦',stage:'NEXT',title:'Arrays & Objects',desc:'map/filter/reduce, destructuring.',lectureId:null},
  {icon:'🌐',stage:'INTERMEDIATE',title:'DOM Manipulation',desc:'querySelector, events.',lectureId:null},
  {icon:'⏳',stage:'INTERMEDIATE',title:'Async JavaScript',desc:'Promises, async/await, fetch.',lectureId:null},
];

// ─── STATE ───
let completed = new Set(JSON.parse(localStorage.getItem('jscraft_done') || '[]'));
let currentLec = 0, currentQ = 0, quizScore = 0, answered = false;
let notes = JSON.parse(localStorage.getItem('jscraft_notes') || '[]');
const sections = ['hero','lectures','content-view','playground','hackathon','cheatsheet','quiz-section','notes-section','roadmap'];

// ─── THEME ───
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('theme-toggle').textContent = t === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('jscraft_theme', t);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  applyTheme(cur === 'dark' ? 'light' : 'dark');
}
window.toggleTheme = toggleTheme;
applyTheme(localStorage.getItem('jscraft_theme') || 'dark');

// ─── NAV ───
function showSection(id) {
  sections.forEach(s => { const el = document.getElementById(s); if (el) el.style.display = 'none'; });
  const t = document.getElementById(id);
  if (t) t.style.display = id === 'hero' ? 'flex' : 'block';
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const map = {hero:'nav-home',lectures:'nav-lectures','content-view':'nav-lectures',playground:'nav-playground',hackathon:'nav-hackathon',cheatsheet:'nav-cheatsheet','quiz-section':'nav-quiz','notes-section':'nav-notes',roadmap:'nav-roadmap'};
  const nb = document.getElementById(map[id]); if (nb) nb.classList.add('active');
  window.scrollTo(0,0); updateProgress();
  if (id === 'lectures') renderLectureGrid();
  if (id === 'roadmap') renderRoadmap();
  if (id === 'hackathon') initHackathon();
}
window.showSection = showSection;

// ─── LECTURES ───
function renderLectureGrid() {
  document.getElementById('lecture-grid').innerHTML = lectures.map((l,i)=>`
    <div class="lecture-card ${completed.has(i)?'completed':''}" data-testid="lecture-card-${i}" onclick="openLecture(${i})">
      <div class="card-num">LECTURE 0${i+1} OF 04</div>
      <div class="card-icon">${l.icon}</div>
      <div class="card-title">${l.title}</div>
      <div class="card-desc">${l.subtitle}</div>
      <div class="card-topics">${l.topics.map(t=>`<span class="topic-chip">${t}</span>`).join('')}</div>
      <div class="card-footer">
        <span class="card-status ${completed.has(i)?'done':''}">${completed.has(i)?'✓ Completed':'○ Not started'}</span>
        <span class="card-arrow">→</span>
      </div>
    </div>`).join('');
}
function openLecture(i) {
  currentLec = i; const l = lectures[i];
  document.getElementById('c-num').textContent = `LECTURE 0${i+1} OF 04`;
  document.getElementById('c-title').textContent = l.title;
  document.getElementById('c-body').innerHTML = l.content;
  document.getElementById('sidebar-lec-title').textContent = l.title;
  document.getElementById('sidebar-toc').innerHTML = l.toc.map((t,idx)=>`<li onclick="scrollToHeading(${idx})">${t}</li>`).join('');
  const b = document.getElementById('mark-btn');
  b.textContent = completed.has(i) ? '✓ Completed!' : 'Mark Complete ✓';
  b.className = completed.has(i) ? 'mark-done-btn done' : 'mark-done-btn';
  document.getElementById('prev-btn').style.display = i === 0 ? 'none' : 'inline-block';
  document.getElementById('next-btn').textContent = i === lectures.length - 1 ? 'Practice →' : 'Next →';
  showSection('content-view');
}
function navigateLecture(d) {
  const n = currentLec + d;
  if (n >= 0 && n < lectures.length) openLecture(n);
  else if (d === 1) showSection('playground');
}
function markDone() {
  if (completed.has(currentLec)) completed.delete(currentLec); else completed.add(currentLec);
  localStorage.setItem('jscraft_done', JSON.stringify([...completed]));
  const b = document.getElementById('mark-btn');
  b.textContent = completed.has(currentLec) ? '✓ Completed!' : 'Mark Complete ✓';
  b.className = completed.has(currentLec) ? 'mark-done-btn done' : 'mark-done-btn';
  updateProgress();
}
function updateProgress() {
  const n = completed.size;
  const pb = document.getElementById('prog-bar'); if (pb) pb.style.width = (n/4*100)+'%';
  const pl = document.getElementById('prog-label'); if (pl) pl.textContent = `PROGRESS — ${n} of 4 lectures completed`;
  document.getElementById('progress-display').textContent = `${n} / 4 done`;
  const hs = document.getElementById('hero-streak'); if (hs) hs.textContent = n;
}
function scrollToHeading(i) {
  const hs = document.querySelectorAll('#c-body h2');
  if (hs[i]) hs[i].scrollIntoView({behavior:'smooth',block:'start'});
}
window.openLecture = openLecture; window.navigateLecture = navigateLecture; window.markDone = markDone; window.scrollToHeading = scrollToHeading;

// ─── EDITOR ───
async function runCode() {
  const code = document.getElementById('code-editor').value;
  const out = document.getElementById('output-panel');
  const useBackend = document.getElementById('use-backend-engine')?.checked;
  out.innerHTML = '';
  const add = (m, t='') => { const d = document.createElement('div'); d.className='output-line'+(t?' '+t:''); d.textContent = '> '+m; out.appendChild(d); };
  if (useBackend) {
    add('Running on Python runtime...', 'info');
    try {
      const r = await fetch(`${API_BASE}/runtime/execute`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({code, timeout:5})});
      const d = await r.json(); out.innerHTML = '';
      if (d.output) d.output.split('\n').forEach(l => add(l));
      if (d.error) add('❌ '+d.error, 'error');
      if (!d.output && !d.error) add('(no output)', 'info');
    } catch (e) { out.innerHTML=''; add('❌ Network: '+e.message, 'error'); }
    return;
  }
  const o = {log: console.log, error: console.error, warn: console.warn};
  console.log = (...a) => add(a.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' '));
  console.error = (...a) => add(a.join(' '), 'error');
  console.warn = (...a) => add('⚠ '+a.join(' '), 'warn');
  try { eval(code); if (out.children.length === 0) add('(no output)', 'info'); }
  catch (e) { add('❌ '+e.message, 'error'); }
  console.log = o.log; console.error = o.error; console.warn = o.warn;
}
function clearOutput() { document.getElementById('output-panel').innerHTML = '<span class="output-line info">// Output yahaan aayega...</span>'; }
function loadChallenge(c) { document.getElementById('code-editor').value = c; document.getElementById('output-panel').innerHTML = '<span class="output-line info">// Challenge loaded! ▶ RUN</span>'; }
window.runCode = runCode; window.clearOutput = clearOutput; window.loadChallenge = loadChallenge;
document.addEventListener('keydown', e => { if ((e.ctrlKey||e.metaKey) && e.key === 'Enter') { runCode(); e.preventDefault(); } });

// ─── CHEATSHEET ───
function renderCheatsheet() {
  document.getElementById('cheat-grid').innerHTML = cheatData.map(c => `<div class="cheat-card"><div class="cheat-title">${c.title}</div><pre class="cheat-code">${c.code}</pre></div>`).join('');
}

// ─── QUIZ ───
function renderQuestion() {
  if (currentQ >= quizQuestions.length) {
    const pct = Math.round(quizScore/quizQuestions.length*100);
    const e = pct>=80?'🏆':pct>=60?'👍':'📚';
    document.getElementById('q-text').innerHTML = `${e} Quiz complete!<br><br>Score: <strong style="color:var(--accent)">${quizScore} / ${quizQuestions.length}</strong> (${pct}%)`;
    document.getElementById('q-options').innerHTML = `<button class="btn-primary" data-testid="quiz-restart-btn" onclick="restartQuiz()">↺ Restart</button>`;
    document.getElementById('q-num').textContent = 'Finished!';
    document.getElementById('quiz-prog-fill').style.width = '100%';
    document.getElementById('next-q-btn').style.display = 'none';
    return;
  }
  const q = quizQuestions[currentQ]; answered = false;
  document.getElementById('q-num').textContent = `Question ${currentQ+1} / ${quizQuestions.length}`;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-options').innerHTML = q.opts.map((o,i)=>`<button class="quiz-option" data-testid="quiz-option-${i}" onclick="selectAnswer(${i})">${o}</button>`).join('');
  document.getElementById('q-feedback').className = 'quiz-feedback';
  document.getElementById('q-feedback').textContent = '';
  document.getElementById('next-q-btn').style.display = 'none';
  document.getElementById('q-score').textContent = `Score: ${quizScore}`;
  document.getElementById('quiz-prog-fill').style.width = `${currentQ/quizQuestions.length*100}%`;
}
function selectAnswer(i) {
  if (answered) return; answered = true;
  const q = quizQuestions[currentQ];
  document.querySelectorAll('.quiz-option').forEach((b,idx) => {
    if (idx === q.ans) b.classList.add('correct');
    else if (idx === i && i !== q.ans) b.classList.add('wrong');
    b.disabled = true;
  });
  const f = document.getElementById('q-feedback');
  if (i === q.ans) { quizScore++; f.textContent = '✓ Correct! '+q.exp; f.className = 'quiz-feedback show correct'; }
  else { f.textContent = '✗ Wrong. '+q.exp; f.className = 'quiz-feedback show wrong'; }
  document.getElementById('q-score').textContent = `Score: ${quizScore}`;
  document.getElementById('next-q-btn').style.display = 'inline-block';
}
function nextQuestion() { currentQ++; renderQuestion(); }
function restartQuiz() { currentQ = 0; quizScore = 0; renderQuestion(); }
window.selectAnswer = selectAnswer; window.nextQuestion = nextQuestion; window.restartQuiz = restartQuiz;

// ─── NOTES ───
function escapeHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function renderNotes() {
  const l = document.getElementById('notes-list');
  if (notes.length === 0) { l.innerHTML = '<div style="color:var(--muted);font-size:0.8rem;padding:1rem 0;">Koi note nahi abhi.</div>'; return; }
  l.innerHTML = notes.slice().reverse().map((n,i)=>`<div class="note-item" data-testid="note-item-${i}"><div class="note-item-tag">${n.tag} · ${n.date}</div><div class="note-item-text">${escapeHtml(n.text)}</div><button class="note-item-del" onclick="deleteNote(${i})">✕</button></div>`).join('');
}
function saveNote() {
  const t = document.getElementById('note-input').value.trim();
  const tag = document.getElementById('note-tag').value;
  if (!t) return;
  notes.push({text:t, tag, date: new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})});
  localStorage.setItem('jscraft_notes', JSON.stringify(notes));
  document.getElementById('note-input').value = ''; renderNotes();
}
function deleteNote(i) { notes.splice(notes.length-1-i, 1); localStorage.setItem('jscraft_notes', JSON.stringify(notes)); renderNotes(); }
function clearAllNotes() { if (notes.length && confirm('Sare notes delete karo?')) { notes = []; localStorage.setItem('jscraft_notes', '[]'); renderNotes(); } }
window.saveNote = saveNote; window.deleteNote = deleteNote; window.clearAllNotes = clearAllNotes;

// ─── ROADMAP ───
function renderRoadmap() {
  document.getElementById('roadmap-items').innerHTML = roadmapData.map(item => {
    const done = item.lectureId !== null && completed.has(item.lectureId);
    const current = item.lectureId !== null && !done;
    const locked = item.lectureId === null && !item.navTo;
    const click = item.lectureId !== null ? `onclick="openLecture(${item.lectureId})"` : (item.navTo ? `onclick="showSection('${item.navTo}')"` : '');
    return `<div class="roadmap-item"><div class="roadmap-dot ${done?'done':current?'current':''}">${done?'✓':item.icon}</div><div class="roadmap-content" ${click}><div class="roadmap-stage">${item.stage} ${done?'· ✓ DONE':locked?'· COMING SOON':''}</div><div class="roadmap-title">${item.title}</div><div class="roadmap-desc">${item.desc}</div></div></div>`;
  }).join('');
}

// ─── CHALLENGES ───
function renderChallenges() {
  document.getElementById('challenges-strip').innerHTML = challenges.map((c,i) => `<div class="challenge-pill" data-testid="challenge-pill-${i}" onclick='loadChallenge(${JSON.stringify(c.code)})'>${c.label}</div>`).join('');
}

// ─── HACKATHON ───
let hackInit = false;
async function initHackathon() {
  if (hackInit) return;
  try {
    const r = await fetch(`${API_BASE}/runtime/tests`);
    const d = await r.json();
    renderHackTests(d.tests.map(t => ({...t, actual:'', passed:null, error:null})));
    hackInit = true;
  } catch (e) {
    document.getElementById('hack-tests').innerHTML = `<div style="color:var(--accent3);padding:1rem;">Failed: ${e.message}</div>`;
  }
}
function renderHackTests(tests) {
  document.getElementById('hack-tests').innerHTML = tests.map(t => {
    const cls = t.passed === true ? 'pass' : t.passed === false ? 'fail' : '';
    const sCls = t.passed === true ? 'pass' : t.passed === false ? 'fail' : 'pending';
    const sTxt = t.passed === true ? '✓ PASS' : t.passed === false ? '✗ FAIL' : '○ Not run';
    const actSec = (t.actual !== '' || t.error) ? `<div class="hack-test-pane" style="grid-column:1/-1;"><span class="hack-pane-label">Actual Output</span><pre class="hack-pane-code actual ${t.passed===false?'diff':''}">${escapeHtml(t.error?'❌ '+t.error:(t.actual||'(empty)'))}</pre></div>` : '';
    return `<div class="hack-test-card ${cls}" data-testid="hack-test-${t.id}"><div class="hack-test-head"><div><span class="hack-test-num">TC-${t.id}</span><span class="hack-test-title">${t.title}</span></div><span class="hack-test-status ${sCls}" data-testid="hack-test-${t.id}-status">${sTxt}</span></div><div class="hack-test-body"><div class="hack-test-pane"><span class="hack-pane-label">JS Code</span><pre class="hack-pane-code">${escapeHtml(t.code)}</pre></div><div class="hack-test-pane"><span class="hack-pane-label">Expected Output</span><pre class="hack-pane-code expected">${escapeHtml(t.expected)}</pre></div>${actSec}</div></div>`;
  }).join('');
}
async function runHackTests() {
  const btn = document.getElementById('hack-run-all-btn');
  const pill = document.getElementById('hack-score');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Running...';
  pill.textContent = '...'; pill.classList.remove('pass');
  try {
    const r = await fetch(`${API_BASE}/runtime/run-tests`, {method:'POST'});
    const d = await r.json();
    renderHackTests(d.results);
    pill.textContent = `${d.score} / ${d.total}`;
    if (d.score === d.total) pill.classList.add('pass');
  } catch (e) { pill.textContent = 'ERR'; }
  finally { btn.disabled = false; btn.textContent = '▶ Run All Tests'; }
}
async function runHackCustom() {
  const code = document.getElementById('hack-code').value;
  const out = document.getElementById('hack-output');
  out.innerHTML = '<span class="spinner"></span><span style="color:var(--muted);">Executing on Python runtime...</span>';
  try {
    const r = await fetch(`${API_BASE}/runtime/execute`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({code, timeout:5})});
    const d = await r.json();
    let h = '';
    if (d.output) h += `<span style="color:var(--text);">${escapeHtml(d.output)}</span>`;
    if (d.error) h += `\n<span style="color:var(--accent3);">❌ ${escapeHtml(d.error)}</span>`;
    if (!d.output && !d.error) h = '<span style="color:var(--muted);font-style:italic;">(no output)</span>';
    out.innerHTML = h;
  } catch (e) { out.innerHTML = `<span style="color:var(--accent3);">❌ ${e.message}</span>`; }
}
window.runHackTests = runHackTests; window.runHackCustom = runHackCustom;

// ─── INIT ───
renderLectureGrid(); renderCheatsheet(); renderChallenges(); renderNotes(); renderQuestion(); updateProgress(); showSection('hero');
