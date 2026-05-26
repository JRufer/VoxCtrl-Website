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

/* ─────────── github: stars + version ─────────── */
(async () => {
  const starEl = document.getElementById('gh-star-count');
  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k' : String(n);

  const applyVersion = (tag) => {
    document.querySelectorAll('.nav-version').forEach(el => { el.textContent = tag; });
    document.querySelectorAll('.foot-bottom .left span').forEach(el => {
      el.textContent = el.textContent.replace(/v[\d.]+/, tag);
    });
  };

  const [repoRes, tagsRes] = await Promise.allSettled([
    fetch('https://api.github.com/repos/JRufer/VoxCtr', { headers: { 'Accept': 'application/vnd.github+json' } }),
    fetch('https://api.github.com/repos/JRufer/VoxCtr/tags',  { headers: { 'Accept': 'application/vnd.github+json' } }),
  ]);

  if (repoRes.status === 'fulfilled' && repoRes.value.ok && starEl) {
    try {
      const repo = await repoRes.value.json();
      starEl.textContent = typeof repo.stargazers_count === 'number' ? fmt(repo.stargazers_count) : '★';
    } catch { starEl.textContent = 'Star'; }
  } else if (starEl) { starEl.textContent = 'Star'; }

  if (tagsRes.status === 'fulfilled' && tagsRes.value.ok) {
    try {
      const tags = await tagsRes.value.json();
      if (Array.isArray(tags) && tags.length > 0) applyVersion(tags[0].name);
    } catch { /* leave static fallback */ }
  }
})();
