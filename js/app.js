/* ─────────── routing ─────────── */
function go(route, doc) {
  const landing = document.getElementById('landing');
  const docs = document.getElementById('docs');
  const links = document.querySelectorAll('.nav-link[data-route]');
  links.forEach(l => l.classList.toggle('is-active', l.dataset.route === route));

  if (route === 'docs') {
    landing.classList.add('is-hidden');
    docs.classList.add('is-active');
    showDoc(doc || 'quickstart');
  } else {
    landing.classList.remove('is-hidden');
    docs.classList.remove('is-active');
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function showDoc(key) {
  const d = DOCS[key];
  if (!d) return;
  const c = document.getElementById('docsContent');
  c.innerHTML = `
    <div class="crumbs">${d.crumbs.replace(/\//g, '<span>/</span>')}</div>
    <h1>${d.title}</h1>
    <p class="lede">${d.lede}</p>
    ${d.body}
    <div class="docs-foot">
      ${d.prev ? `<a data-doc="${d.prev}"><small>← previous</small><span>${DOCS[d.prev].title}</span></a>` : '<div></div>'}
      ${d.next ? `<a data-doc="${d.next}" style="text-align:right;"><small>next →</small><span>${DOCS[d.next].title}</span></a>` : '<div></div>'}
    </div>
  `;
  /* sidebar */
  document.querySelectorAll('.docs-side .item').forEach(el => {
    el.classList.toggle('is-active', el.dataset.doc === key);
  });
  /* TOC */
  const toc = document.getElementById('docsToc');
  const heads = c.querySelectorAll('h2');
  toc.innerHTML = `<div class="h">On this page</div>` +
    [...heads].map((h, i) => {
      h.id = 'h-' + i;
      return `<a class="toc-item" href="#h-${i}">${h.textContent.replace(/^§\s*/, '')}</a>`;
    }).join('');
  document.querySelector('.docs-content').scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

document.body.addEventListener('click', (e) => {
  const r = e.target.closest('[data-route]');
  if (r) {
    e.preventDefault();
    go(r.dataset.route, r.dataset.doc);
    return;
  }
  const d = e.target.closest('[data-doc]');
  if (d && document.getElementById('docs').classList.contains('is-active')) {
    e.preventDefault();
    showDoc(d.dataset.doc);
    return;
  }
  if (d && !document.getElementById('docs').classList.contains('is-active')) {
    e.preventDefault();
    go('docs', d.dataset.doc);
    return;
  }
});

/* ─────────── tabs ─────────── */
document.querySelectorAll('#wfTabs .tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('#wfTabs .tab').forEach(x => x.classList.toggle('is-active', x === t));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === t.dataset.wf));
  });
});

/* ─────────── copy buttons ─────────── */
document.querySelectorAll('[data-copy]').forEach(b => {
  b.addEventListener('click', () => {
    const txt = b.getAttribute('data-copy') || b.parentElement.parentElement.querySelector('pre')?.innerText || '';
    navigator.clipboard?.writeText(txt);
    const orig = b.innerHTML; b.innerHTML = '✓ copied';
    setTimeout(() => b.innerHTML = orig, 1400);
  });
});

/* ─────────── live waveform sim in hero ─────────── */
const barsEl = document.getElementById('waveBars');
const N = 64;
const bars = [];
for (let i = 0; i < N; i++) {
  const b = document.createElement('i');
  b.style.height = '4px';
  barsEl.appendChild(b);
  bars.push(b);
}
let phase = 0;
function tickBars() {
  phase += 0.07;
  for (let i = 0; i < N; i++) {
    const x = i / N;
    /* central envelope, spoken-word-ish */
    const env = Math.exp(-Math.pow((x - 0.5) * 3.6, 2));
    const wob = Math.sin(phase + i * 0.42) * 0.4 + Math.sin(phase * 1.7 + i * 0.21) * 0.4 + Math.random() * 0.3;
    const v = Math.max(0.06, env * (0.55 + wob * 0.5));
    const h = Math.min(80, Math.max(3, v * 80));
    bars[i].style.height = h + 'px';
    bars[i].style.opacity = (0.55 + v * 0.4).toFixed(2);
  }
  requestAnimationFrame(tickBars);
}
tickBars();

/* ─────────── reveal on scroll ─────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

/* ─────────── transcript cycle ─────────── */
const cycles = [
  { raw: 'um, schedule a team sync, uh, for thursday at three p m', out: 'Schedule a team sync for Thursday at 3:00 PM' },
  { raw: 'open the readme dot md and add a section about install', out: 'open ./README.md\n# add: ## Installation' },
  { raw: 'tell hermes to deploy the staging branch please', out: '$ hermes deploy --branch staging' },
  { raw: 'note for journal — finished the routing refactor today', out: '- Finished routing refactor (Thu 14:32)' },
];
let ci = 0;
setInterval(() => {
  ci = (ci + 1) % cycles.length;
  const c = cycles[ci];
  const raw = document.getElementById('rawT'); const out = document.getElementById('outT');
  raw.style.opacity = 0.2; out.style.opacity = 0.2;
  setTimeout(() => {
    raw.textContent = c.raw;
    out.innerHTML = c.out + '<span class="caret"></span>';
    raw.style.opacity = 1; out.style.opacity = 1;
  }, 250);
}, 4200);

/* ─────────── support ?docs=… deep links ─────────── */
const params = new URLSearchParams(location.search);
if (params.get('view') === 'docs') go('docs', params.get('doc') || 'quickstart');

/* ─────────── ⌘K opens docs ─────────── */
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    go('docs', 'quickstart');
  }
});
/* searchBtn removed — ⌘K shortcut still works above */

/* ─────────── github star count ─────────── */
(async () => {
  const el = document.getElementById('gh-star-count');
  if (!el) return;
  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(n);
  try {
    const r = await fetch('https://api.github.com/repos/JRufer/VoxCtr', { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    if (typeof j.stargazers_count === 'number') el.textContent = fmt(j.stargazers_count);
    else el.textContent = '★';
  } catch (e) {
    el.textContent = 'Star';
  }
})();
