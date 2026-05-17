/* ─────────── activate docs layout ─────────── */
document.querySelector('.docs-shell')?.classList.add('is-active');

/* ─────────── copy buttons ─────────── */
document.querySelectorAll('[data-copy]').forEach(b => {
  b.addEventListener('click', () => {
    const txt = b.getAttribute('data-copy') || b.parentElement.parentElement.querySelector('pre')?.innerText || '';
    navigator.clipboard?.writeText(txt);
    const orig = b.innerHTML; b.innerHTML = '✓ copied';
    setTimeout(() => b.innerHTML = orig, 1400);
  });
});

/* ─────────── TOC generation ─────────── */
const content = document.querySelector('.docs-content');
const toc = document.getElementById('docsToc');
if (content && toc) {
  const heads = content.querySelectorAll('h2');
  if (heads.length > 0) {
    toc.innerHTML = '<div class="h">On this page</div>' +
      [...heads].map((h, i) => {
        h.id = 'h-' + i;
        return `<a class="toc-item" href="#h-${i}">${h.textContent}</a>`;
      }).join('');
  }
}

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
  } catch {
    el.textContent = 'Star';
  }
})();
