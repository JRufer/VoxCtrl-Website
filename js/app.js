/**
 * VoxCtrl - Interactive Frontend Logic & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initOverlayGallery();
  initOnboardingWizard();
  initCommandLab();
  initSettingsGallery();
  initTargetTabs();
  initDistroTabs();
  initCopyButtons();
  initSmoothScrollSpy();
  initMobileNav();
});

/* ==========================================================================
   1. Interactive 8-Overlays Gallery
   ==========================================================================
   Keyed by the overlay's *config id* — the value written to `ui.overlay_style`
   — which is also the filename of its clip, so nothing has to be mapped.

   Each style ships as a pair: a short silent WebM recorded from the real
   overlay, and a .webp still taken from the middle of that clip. The still is
   the list thumbnail and the video's poster, so a browser that will not
   autoplay — or a reader who has asked for less motion — still sees the
   overlay rather than a black rectangle. */
const overlayData = {
  blue_wave: {
    title: 'Ocean Wave (Default)',
    desc: 'A glass tide pool at night. The waterline and the wave amplitude swell with your mic level and recede to a calm low tide when you stop, with the active target riding a buoy on the surface.'
  },
  voice_card: {
    title: 'Voice Card',
    desc: 'A literal membership card — gold contact chip, holographic sheen, and a 20\u00d76 LED VU matrix with real ballistics: instant attack, slow decay. It deals in with a flip and flips back out when you finish.'
  },
  waveform: {
    title: 'Waveform',
    desc: 'A green-phosphor oscilloscope with a graticule grid and a live scrolling trace of your microphone signal. It powers on and off like a CRT, collapsing back into a single scanline.'
  },
  pulse: {
    title: 'Pulse Ring',
    desc: 'A sonar dial: a rotating sweep arm with a trailing wedge, expanding rings that brighten with voice intensity, and contact blips that flash as the sweep passes them.'
  },
  mono_bars: {
    title: 'Mono Bars',
    desc: 'A five-bar monochrome meter with no colour at all — the quietest thing on the list, and the one that suits a black-and-white desktop.'
  },
  spectrum: {
    title: 'Neon Spectrum',
    desc: 'Sixteen bands of neon purple and cyan driven by an FFT of the live signal. The most information per pixel of any style here.'
  },
  terminal: {
    title: 'Retro Terminal',
    desc: 'A DOS-blue console window that draws its level meter out of ASCII characters and types its status line one character at a time.'
  },
  vinyl: {
    title: 'Analog VU',
    desc: 'A warm cream-panel needle meter with weighted, physical ballistics — the needle overshoots and settles the way a real one does.'
  }
};

function initOverlayGallery() {
  const items = Array.from(document.querySelectorAll('.overlay-card-item'));
  const video = document.getElementById('overlayPreviewVideo');
  const previewTitle = document.getElementById('previewOverlayTitle');
  const previewDesc = document.getElementById('previewOverlayDesc');
  if (!items.length || !video) return;

  const reduced = prefersReducedMotion();

  // With reduced motion the poster is the whole preview: nothing autoplays and
  // no clip is fetched at all.
  if (reduced) {
    video.removeAttribute('autoplay');
    video.preload = 'none';
  }

  function show(key) {
    const data = overlayData[key];
    if (!data) return;

    items.forEach(item => {
      const on = item.dataset.overlay === key;
      item.classList.toggle('is-active', on);
      item.setAttribute('aria-selected', String(on));
    });

    video.classList.add('is-swapping');
    setTimeout(() => {
      video.poster = 'assets/overlays/' + key + '.webp';
      video.setAttribute('aria-label', data.title + ' overlay, recorded while dictating');
      // With reduced motion no clip is ever attached, so the poster stays.
      if (!reduced) {
        const next = 'assets/overlays/' + key + '.webm';
        if (!video.src.endsWith(next)) {
          video.src = next;
          video.load();
        }
        // Autoplay can still be refused. The poster is already the right
        // frame, so there is nothing to fall back to.
        const p = video.play();
        if (p) p.catch(() => {});
      }
      video.classList.remove('is-swapping');
    }, reduced ? 0 : 160);

    if (previewTitle) previewTitle.textContent = data.title;
    if (previewDesc) previewDesc.textContent = data.desc;
  }

  items.forEach(item => item.addEventListener('click', () => show(item.dataset.overlay)));

  // Don't keep decoding a looping clip that is scrolled off screen.
  if ('IntersectionObserver' in window && !reduced) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { const p = video.play(); if (p) p.catch(() => {}); }
        else video.pause();
      });
    }, { threshold: 0.2 }).observe(video);
  }

  const initial = document.querySelector('.overlay-card-item.is-active') || items[0];
  show(initial.dataset.overlay);
}

/* ==========================================================================
   2. First-Run Setup Wizard — stacked auto-cycling slideshow
   ==========================================================================
   The seven screenshots sit on top of one another in .wizard-stack; only the
   active one is opaque. Every SLIDE_MS the next one fades in and the blurb
   beside it is swapped out with a matching fade, so the whole thing reads as
   somebody stepping through the real wizard. */

const SLIDE_MS = 5200;

const onboardingSteps = [
  {
    step: '01',
    eyebrow: '// 01 · WELCOME',
    title: 'Speak to anything on your machine.',
    blurb: 'The wizard opens itself on a fresh install and says what the next few minutes will cover — engine, hotkey, overlay, a live test, and optionally a voice. Nothing here is permanent: every choice is editable later in Settings.',
    features: [
      'Seven screens, roughly five minutes',
      'Every choice written to the config as you make it',
      'Skip setup is right there if you would rather not'
    ]
  },
  {
    step: '02',
    eyebrow: '// 02 · TRANSCRIPTION ENGINE',
    title: 'Which ears should VoxCtrl use?',
    blurb: 'Pick the engine and the model size, with speed, accuracy, RAM and VRAM drawn side by side — and a quiet-room versus noisy-room comparison, because that is the difference that actually decides it. Prefer to run nothing locally? Point this step at a Remote Speech Engine instead and test the connection live. The model downloads (or the remote endpoint tests clean) before you are allowed to continue, so nothing is half-configured later.',
    features: [
      'whisper.cpp, Moonshine, Parakeet TDT — all on-device — or a Remote Speech Engine over the network',
      'GPU offloading toggle says which engine your build can accelerate',
      'The chosen model is on disk (or the remote endpoint tested) before the wizard moves on'
    ]
  },
  {
    step: '03',
    eyebrow: '// 03 · FIRST KEY BINDING',
    title: 'How do you want to start talking?',
    blurb: 'Choose one of four gestures — tap, double-tap, hold, or double-tap and hold — then record the actual keys. The binding is handed to your desktop through the XDG GlobalShortcuts portal and the wizard confirms it went live before letting you past.',
    features: [
      'Key and mic timelines show what each gesture feels like',
      'Registered system-wide by your desktop, not by a keylogger',
      '“Shortcuts are live (portal)” is a real check, not a label'
    ]
  },
  {
    step: '04',
    eyebrow: '// 04 · ON-SCREEN OVERLAY',
    title: 'Show a signal while listening?',
    blurb: 'Eight built-in overlay styles, previewed live, plus the position they appear in — or no overlay at all for a silent setup. The overlay is how you know VoxCtrl is hearing you and where the words are going, before you say a word.',
    features: [
      'Ocean Wave, Voice Card, Waveform, Pulse Ring, Mono Bars, Neon Spectrum, Retro Terminal, Analog VU',
      'Top, centre or bottom, shown against a mock desktop',
      'Every style carries the active-target indicator'
    ]
  },
  {
    step: '05',
    eyebrow: '// 05 · LIVE TEST',
    title: 'Say something.',
    blurb: 'A real text box and your brand-new binding. Hold it, speak, and watch the words land exactly where the cursor is — so capture, model, portal shortcut and injection are all proven end to end before setup finishes rather than the first time you need them.',
    features: [
      'Proves the whole chain: mic → engine → shortcut → typing',
      'Shows the active engine and model in the corner',
      'If nothing happens, it tells you where to look'
    ]
  },
  {
    step: '06',
    eyebrow: '// 06 · TEXT TO SPEECH · OPTIONAL',
    title: 'Should VoxCtrl talk back?',
    blurb: 'Optional, and easy to skip. Six engines compared on quality, speed and download size, each with a sample you can play before committing — including the new VoxCPM2 neural voice. Breeze-TTS-2 and Pocket TTS are gated HuggingFace downloads, so the token field is right there with links to accept the licences; VoxCPM2 downloads without one.',
    features: [
      'VoxCPM2, Breeze-TTS-2, Pocket TTS, Piper, Inflect Micro, eSpeak-NG',
      'Play a sample before you choose',
      '“Skip for now” — TTS can be enabled later in Settings → TTS'
    ]
  },
  {
    step: '07',
    eyebrow: '// 07 · CONFIGURED',
    title: 'VoxCtrl is ready.',
    blurb: 'A summary of what was actually configured — engine and model, hotkey and gesture, overlay and position, voice — then the window closes and VoxCtrl keeps running in the tray. The wizard also created a Command output, so voice commands work the day you add a second destination without re-binding anything.',
    features: [
      'Everything the wizard set, listed back to you',
      'Points at the tray icon, and at the tabs that hold the rest',
      'Re-runnable: voxctrl --setup, or Settings → General'
    ]
  }
];

let currentWizardStep = 0;
let wizardTimer = null;
let wizardPlaying = true;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initOnboardingWizard() {
  const stack = document.getElementById('wizardStack');
  if (!stack) return;

  const slides = Array.from(stack.querySelectorAll('.wizard-slide'));
  const stepNodes = Array.from(document.querySelectorAll('.step-node'));
  const prevBtn = document.getElementById('btnWizardPrev');
  const nextBtn = document.getElementById('btnWizardNext');
  const playBtn = document.getElementById('btnWizardPlay');
  const playLabel = document.getElementById('wizardPlayLabel');
  const progressBar = document.getElementById('wizardProgressBar');

  const copyEl = document.getElementById('wizardCopy');
  const eyebrowEl = document.getElementById('wizardEyebrow');
  const headingEl = document.getElementById('wizardHeading');
  const descEl = document.getElementById('wizardDesc');
  const featuresList = document.getElementById('wizardFeaturesList');
  const stepNumEl = document.getElementById('currentStepNum');

  const reduced = prefersReducedMotion();

  function paintCopy(data) {
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (headingEl) headingEl.textContent = data.title;
    if (descEl) descEl.textContent = data.blurb;
    if (featuresList) {
      featuresList.innerHTML = data.features.map((f, i) => `
        <li style="--i:${i}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${f}</span>
        </li>
      `).join('');
    }
  }

  function renderStep(index, { restart = true } = {}) {
    const total = onboardingSteps.length;
    index = ((index % total) + total) % total;
    currentWizardStep = index;
    const data = onboardingSteps[index];

    slides.forEach((img, i) => img.classList.toggle('is-active', i === index));

    stepNodes.forEach((node, i) => {
      node.classList.toggle('active', i === index);
      node.classList.toggle('completed', i < index);
      node.setAttribute('aria-current', i === index ? 'step' : 'false');
    });
    document.querySelectorAll('.step-connector').forEach((c, i) => {
      c.classList.toggle('completed', i < index);
    });

    if (stepNumEl) stepNumEl.textContent = index + 1;

    // Cross-fade the blurb so the words change with the picture.
    if (copyEl && !reduced) {
      copyEl.classList.add('is-swapping');
      setTimeout(() => {
        paintCopy(data);
        copyEl.classList.remove('is-swapping');
      }, 220);
    } else {
      paintCopy(data);
    }

    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.textContent = index === total - 1 ? 'Back to the start →' : 'Continue →';

    if (restart) restartTimer();
  }

  function restartTimer() {
    if (wizardTimer) clearTimeout(wizardTimer);
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.transform = 'scaleX(0)';
      // force reflow so the reset is not coalesced with the animation below
      void progressBar.offsetWidth;
      if (wizardPlaying && !reduced) {
        progressBar.style.transition = `transform ${SLIDE_MS}ms linear`;
        progressBar.style.transform = 'scaleX(1)';
      }
    }
    if (!wizardPlaying) return;
    wizardTimer = setTimeout(() => renderStep(currentWizardStep + 1), SLIDE_MS);
  }

  function setPlaying(on) {
    wizardPlaying = on;
    if (playBtn) {
      playBtn.classList.toggle('is-paused', !on);
      playBtn.setAttribute('aria-pressed', String(on));
      playBtn.setAttribute('aria-label', on ? 'Pause the walkthrough' : 'Play the walkthrough');
    }
    if (playLabel) playLabel.textContent = on ? 'Pause' : 'Play';
    if (on) {
      restartTimer();
    } else {
      if (wizardTimer) clearTimeout(wizardTimer);
      if (progressBar) {
        const w = progressBar.getBoundingClientRect().width;
        const full = progressBar.parentElement.getBoundingClientRect().width || 1;
        progressBar.style.transition = 'none';
        progressBar.style.transform = `scaleX(${w / full})`;
      }
    }
  }

  stepNodes.forEach((node, i) => {
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.addEventListener('click', () => { setPlaying(false); renderStep(i); });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying(false); renderStep(i); }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { setPlaying(false); renderStep(currentWizardStep - 1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { setPlaying(false); renderStep(currentWizardStep + 1); });
  if (playBtn) playBtn.addEventListener('click', () => setPlaying(!wizardPlaying));

  // Hovering (or touching) the picture pauses it, so nobody loses the screen
  // they were reading.
  const frame = document.querySelector('.wizard-image-frame');
  if (frame) {
    frame.addEventListener('mouseenter', () => { if (wizardPlaying && wizardTimer) clearTimeout(wizardTimer); });
    frame.addEventListener('mouseleave', () => { if (wizardPlaying) restartTimer(); });
  }

  // Swipe on touch devices.
  if (stack) {
    let x0 = null;
    stack.addEventListener('touchstart', (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    stack.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { setPlaying(false); renderStep(currentWizardStep + (dx < 0 ? 1 : -1)); }
      x0 = null;
    }, { passive: true });
  }

  // Don't animate a section nobody is looking at.
  if ('IntersectionObserver' in window) {
    const section = document.getElementById('onboarding');
    if (section) {
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!wizardPlaying) return;
          if (entry.isIntersecting) restartTimer();
          else if (wizardTimer) clearTimeout(wizardTimer);
        });
      }, { threshold: 0.15 }).observe(section);
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (wizardTimer) clearTimeout(wizardTimer); }
    else if (wizardPlaying) restartTimer();
  });

  if (reduced) wizardPlaying = false;
  renderStep(0);
  setPlaying(wizardPlaying);
}

/* ==========================================================================
   3. Voice Command Lab — a faithful port of the router's own matcher
   ==========================================================================
   crates/voxctrl-routing/src/targets.rs :: parse_voice_command. Kept in step
   with the Rust deliberately: the point of the demo is that what you type here
   is matched the way the app matches it, not the way a marketing page wishes
   it did. */

const CMD_TARGETS = [
  { id: 'notes',          label: 'Notes',          delivery: 'file',     detail: '~/.notes',
    result: t => `Appended to <code>~/.notes</code> with a UTC timestamp:<br><span class="cr-quote">[2026-09-08T14:02:11Z] ${t}</span>` },
  { id: 'personal_notes', label: 'Personal Notes', delivery: 'file',     detail: '~/.notes.txt',
    result: t => `Appended to <code>~/.notes.txt</code>:<br><span class="cr-quote">${t}</span>` },
  { id: 'say',            label: 'Say',            delivery: 'speak',    detail: 'local TTS',
    result: t => `Spoken aloud by the configured TTS engine — the “SYSTEM RESPONDING” pill appears while it plays:<br><span class="cr-quote">${t}</span>` },
  { id: 'commit',         label: 'Commit',         delivery: 'exec',     detail: 'git commit -m {TEXT}',
    result: t => `Spawned without a shell, so the text cannot inject a command:<br><span class="cr-quote">git commit -m "${t}"</span>` },
  { id: 'home',           label: 'Home',           delivery: 'webhook',  detail: 'HMAC-SHA256',
    result: t => `POSTed to your Home Assistant endpoint, signed with a shared secret:<br><span class="cr-quote">X-Signature: sha256=…  {"text": "${t}"}</span>` },
  { id: 'chat',           label: 'Chat',           delivery: 'chat',     detail: 'localhost:11434',
    result: t => `Added to the running conversation with your OpenAI-compatible server and the reply read back:<br><span class="cr-quote">→ ${t}</span>` },
  // The router itself. Excluded from name matching, exactly as the Rust does.
  { id: 'command',        label: 'Command',        delivery: 'command',  detail: 'the router',
    result: () => '' }
];

const CMD_EXAMPLES = [
  { tag: 'direct',      phrase: 'VoxCtrl notes, remember to call the plumber',
    note: 'The plain form: trigger, command name, text.' },
  { tag: 'natural',     phrase: 'VoxCtrl, add this to my Personal Notes: the spare key is under the mat',
    note: 'Filler words are allowed before the name — and “Personal Notes” beats “Notes”.' },
  { tag: 'connector',   phrase: 'VoxCtrl say saying that the build finished',
    note: '“saying that” is a connector, so it is trimmed off the payload.' },
  { tag: 'fuzzy',       phrase: 'Vox control commit fix the audio buffer race',
    note: 'A mis-transcribed trigger still counts.' },
  { tag: 'fan-out',     phrase: 'VoxCtrl put this in Home, turn the office lamp off',
    note: 'Any command is reachable, including a signed webhook.' },
  { tag: 'no trigger',  phrase: 'Implement a zero-copy ring buffer for the capture path',
    note: 'No trigger phrase, so it goes wherever your hotkey already points.' }
];

const CMD_FILLERS = new Set([
  'add','put','send','write','save','log','append','record','post','push',
  'dispatch','deliver','type','copy','place','insert','route','direct','pass',
  'transfer','go','get','take','set','store','keep',
  'this','that','it','us','me','is','them','some','these','those',
  'message','text','note','entry','content','data','info','information','payload',
  'to','in','into','for','on','at','with','from','onto','through',
  'my','the','a','an','our','your','its',
  'please','can','you','could','would','i','want','like','need','have','too','2',
  'so','just','now','here','also'
]);

const CMD_CONNECTORS = ['saying that', 'saying', 'that says', 'that', 'with text', 'with content', 'with'];
const PUNCT = /[!-\/:-@\[-`{-~]/;

function isPunct(ch) { return PUNCT.test(ch); }
function trimMatch(str, pred) {
  let a = 0, b = str.length;
  while (a < b && pred(str[a])) a++;
  while (b > a && pred(str[b - 1])) b--;
  return str.slice(a, b);
}

function validLeadIn(pre) {
  const cleaned = trimMatch(pre, c => /\s/.test(c) || isPunct(c));
  if (!cleaned) return true;
  const words = cleaned.split(/\s+/);
  if (words.length > 10) return false;
  return words.every(w => {
    const c = trimMatch(w, isPunct).toLowerCase();
    return c === '' || CMD_FILLERS.has(c);
  });
}

function cleanPayload(post) {
  const strip = s => {
    let i = 0;
    while (i < s.length && /[\s:,.;\-!?"']/.test(s[i])) i++;
    return s.slice(i).trim();
  };
  const withoutPunct = strip(post.trim());
  const lower = withoutPunct.toLowerCase();
  for (const conn of CMD_CONNECTORS) {
    if (lower.startsWith(conn)) {
      const cleaned = strip(withoutPunct.slice(conn.length));
      if (cleaned) return cleaned;
    }
  }
  return withoutPunct;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}

/** Returns null when nothing matched — i.e. plain dictation. */
function parseVoiceCommand(text, targets) {
  const lower = text.toLowerCase();
  let pos = null, triggerLen = 0;

  for (const trigger of ['voxctrl', 'vox ctrl', 'vox-ctrl', 'vox control']) {
    const at = lower.indexOf(trigger);
    if (at !== -1 && (pos === null || at < pos)) { pos = at; triggerLen = trigger.length; }
  }

  if (pos === null) {
    const words = lower.split(/\s+/).filter(Boolean);
    for (const word of words) {
      const clean = trimMatch(word, isPunct);
      if (['control', 'ctrl', 'ctl', 'kontrol'].includes(clean) && words.indexOf(word) > 0) {
        const start = Math.max(lower.indexOf(words[0]), 0);
        const end = lower.indexOf(word) + word.length;
        pos = start; triggerLen = end - start;
        break;
      }
    }
  }

  if (pos === null) {
    const words = lower.split(/\s+/).filter(Boolean);
    for (let len = Math.min(2, words.length); len >= 1; len--) {
      const cand = trimMatch(words.slice(0, len).join(' '), isPunct);
      if (levenshtein(cand, 'voxctrl') <= 2 || levenshtein(cand, 'vox control') <= 3) {
        const at = lower.indexOf(cand);
        if (at !== -1) { pos = at; triggerLen = cand.length; break; }
      }
    }
  }

  if (pos === null) return null;

  const after = text.slice(pos + triggerLen);
  const afterLower = after.toLowerCase();

  // Longest candidate first, so "Personal Notes" wins over "Notes".
  const candidates = [];
  for (const t of targets) {
    if (t.delivery === 'command') continue;
    if (t.id) candidates.push([t.id, t.id]);
    if (t.label) candidates.push([t.id, t.label]);
  }
  candidates.sort((a, b) => b[1].length - a[1].length);

  for (const [targetId, candidate] of candidates) {
    const cand = candidate.toLowerCase();
    let from = 0, idx;
    while ((idx = afterLower.indexOf(cand, from)) !== -1) {
      const end = idx + cand.length;
      const okStart = idx === 0 || /\s/.test(after[idx - 1]) || isPunct(after[idx - 1]);
      const okEnd = end === after.length || /\s/.test(after[end]) || isPunct(after[end]);
      if (okStart && okEnd) {
        const pre = after.slice(0, idx);
        if (validLeadIn(pre)) {
          const post = after.slice(end);
          return {
            targetId,
            triggerText: text.slice(pos, pos + triggerLen),
            before: text.slice(0, pos),
            lead: pre,
            name: after.slice(idx, end),
            post,
            payload: cleanPayload(post)
          };
        }
      }
      from = idx + 1;
    }
  }
  return null;
}

function initCommandLab() {
  const railList = document.getElementById('cmdRailList');
  const exampleRow = document.getElementById('cmdExampleRow');
  const input = document.getElementById('cmdPhraseInput');
  const speakBtn = document.getElementById('cmdSpeakBtn');
  const tokensEl = document.getElementById('cmdTokens');
  const resultEl = document.getElementById('cmdResult');
  const pill = document.getElementById('cmdOverlayPill');
  const pillTarget = document.getElementById('copTarget');
  const pillPayload = document.getElementById('copPayload');
  const waveform = document.getElementById('cmdWaveform');
  if (!input || !tokensEl) return;

  const esc = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── the command rail ──
  if (railList) {
    railList.innerHTML = CMD_TARGETS.map(t => `
      <button class="cmd-card${t.delivery === 'command' ? ' is-router' : ''}" type="button" data-id="${t.id}">
        <span class="cmd-card-top">
          <strong>${esc(t.label)}</strong>
          <span class="cmd-badge cmd-badge-${t.delivery}">${t.delivery}</span>
        </span>
        <span class="cmd-card-id">id = "${esc(t.id)}" · ${esc(t.detail)}</span>
      </button>
    `).join('');

    railList.querySelectorAll('.cmd-card').forEach(card => {
      card.addEventListener('click', () => {
        const t = CMD_TARGETS.find(x => x.id === card.dataset.id);
        if (!t) return;
        if (t.delivery === 'command') {
          input.value = 'VoxCtrl notes, the router picks the destination, not the hotkey';
        } else {
          input.value = `VoxCtrl, send this to my ${t.label}: hello from the command router`;
        }
        run(true);
      });
    });
  }

  // ── example chips ──
  if (exampleRow) {
    exampleRow.innerHTML = CMD_EXAMPLES.map((ex, i) => `
      <button class="cmd-chip${i === 0 ? ' is-active' : ''}" type="button" data-i="${i}">
        <span class="cmd-chip-tag">${esc(ex.tag)}</span>
        <span class="cmd-chip-phrase">“${esc(ex.phrase)}”</span>
      </button>
    `).join('');
    exampleRow.querySelectorAll('.cmd-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        exampleRow.querySelectorAll('.cmd-chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        input.value = CMD_EXAMPLES[+chip.dataset.i].phrase;
        run(true);
      });
    });
  }

  let speakTimer = null;

  function paint(parsed, phrase) {
    const activeChip = exampleRow && exampleRow.querySelector('.cmd-chip.is-active');
    const note = activeChip ? CMD_EXAMPLES[+activeChip.dataset.i].note : '';

    if (!parsed) {
      tokensEl.innerHTML = `<span class="tok tok-plain">${esc(phrase)}</span>`;
      resultEl.innerHTML = `
        <div class="cmd-res-line">
          <span class="cmd-res-key">Trigger</span>
          <span class="cmd-res-val cmd-res-muted">none found</span>
        </div>
        <div class="cmd-res-line">
          <span class="cmd-res-key">Delivered to</span>
          <span class="cmd-res-val"><span class="cmd-badge cmd-badge-inject">inject</span> whatever your hotkey is bound to</span>
        </div>
        <div class="cmd-res-body">
          Typed straight into the focused window via <code>wtype</code> (Wayland), <code>xdotool</code> (X11) or
          clipboard-and-paste — the same thing that happens if you never set up a command at all.
        </div>
        ${note ? `<div class="cmd-res-note">${esc(note)}</div>` : ''}`;
      if (pill) pill.classList.remove('is-visible');
      return;
    }

    const target = CMD_TARGETS.find(t => t.id === parsed.targetId);
    const idx = parsed.payload ? parsed.post.indexOf(parsed.payload) : parsed.post.length;
    const connector = parsed.post.slice(0, idx < 0 ? 0 : idx);
    const tail = idx < 0 ? '' : parsed.post.slice(idx + parsed.payload.length);

    tokensEl.innerHTML = [
      parsed.before ? `<span class="tok tok-plain">${esc(parsed.before)}</span>` : '',
      `<span class="tok tok-trigger">${esc(parsed.triggerText)}</span>`,
      parsed.lead ? `<span class="tok tok-lead">${esc(parsed.lead)}</span>` : '',
      `<span class="tok tok-name">${esc(parsed.name)}</span>`,
      connector ? `<span class="tok tok-drop">${esc(connector)}</span>` : '',
      parsed.payload ? `<span class="tok tok-payload">${esc(parsed.payload)}</span>` : '<span class="tok tok-drop">(empty payload)</span>',
      tail ? `<span class="tok tok-drop">${esc(tail)}</span>` : ''
    ].join('');

    resultEl.innerHTML = `
      <div class="cmd-res-line">
        <span class="cmd-res-key">Matched</span>
        <span class="cmd-res-val"><code>${esc(parsed.name)}</code> → command <strong>${esc(target ? target.label : parsed.targetId)}</strong>
          <span class="cmd-badge cmd-badge-${target ? target.delivery : 'inject'}">${target ? target.delivery : 'inject'}</span></span>
      </div>
      <div class="cmd-res-line">
        <span class="cmd-res-key">Payload</span>
        <span class="cmd-res-val">${parsed.payload ? esc(parsed.payload) : '<span class="cmd-res-muted">nothing after the name</span>'}</span>
      </div>
      <div class="cmd-res-body">${target && parsed.payload ? target.result(esc(parsed.payload)) : 'Nothing to deliver — say something after the command name.'}</div>
      ${note ? `<div class="cmd-res-note">${esc(note)}</div>` : ''}`;

    if (pill && target) {
      pillTarget.textContent = (target.label || target.id).toUpperCase();
      pillPayload.textContent = parsed.payload || '…';
      pill.classList.remove('is-visible');
      void pill.offsetWidth;
      pill.classList.add('is-visible');
    }
  }

  function run(animate) {
    const phrase = input.value;
    const parsed = parseVoiceCommand(phrase, CMD_TARGETS);

    if (animate && !prefersReducedMotion()) {
      if (speakTimer) clearTimeout(speakTimer);
      if (waveform) waveform.classList.add('is-live');
      if (speakBtn) speakBtn.classList.add('is-listening');
      tokensEl.classList.add('is-thinking');
      tokensEl.innerHTML = '<span class="tok tok-wait">listening…</span>';
      resultEl.innerHTML = '<div class="cmd-res-body cmd-res-muted">transcribing on-device…</div>';
      if (pill) pill.classList.remove('is-visible');
      speakTimer = setTimeout(() => {
        if (waveform) waveform.classList.remove('is-live');
        if (speakBtn) speakBtn.classList.remove('is-listening');
        tokensEl.classList.remove('is-thinking');
        paint(parsed, phrase);
      }, 620);
    } else {
      paint(parsed, phrase);
    }
  }

  input.addEventListener('input', () => {
    if (exampleRow) exampleRow.querySelectorAll('.cmd-chip').forEach(c => c.classList.remove('is-active'));
    run(false);
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); run(true); } });
  if (speakBtn) speakBtn.addEventListener('click', () => run(true));

  // Build the waveform bars once.
  if (waveform && !waveform.childElementCount) {
    waveform.innerHTML = Array.from({ length: 28 },
      (_, i) => `<i style="--d:${(i % 7) * 90}ms"></i>`).join('');
  }

  // The chips are the source of truth for the opening phrase, so the
  // highlighted chip and the box always agree.
  if (CMD_EXAMPLES.length) input.value = CMD_EXAMPLES[0].phrase;
  run(false);
}

/* ==========================================================================
   3b. Settings screenshot gallery
   ========================================================================== */
const SETTINGS_SHOTS = [
  {
    title: 'General',
    text: 'Re-run the first-launch wizard whenever you like, decide whether VoxCtrl asks GitHub for a newer release on startup, and switch the local MCP JSON-RPC server on or off. The socket path is spelled out for both platforms: <code>/tmp/voxctrl-mcp.sock</code> on Linux, <code>\\\\.\\pipe\\voxctrl-mcp</code> on Windows.'
  },
  {
    title: 'Output Commands',
    text: 'Every destination your speech can reach, listed with its delivery type. The panel explains the spoken form in the app itself — say <em>“VoxCtrl”</em>, the command name, then the text — and the <strong>Command</strong> entry at the bottom is the router that makes it work.'
  }
];

function initSettingsGallery() {
  const rail = document.getElementById('settingsRail');
  if (!rail) return;
  const tabs = Array.from(rail.querySelectorAll('.set-tab'));
  const shots = Array.from(document.querySelectorAll('.settings-shot'));
  const caption = document.getElementById('settingsCaption');
  const capTitle = document.getElementById('settingsCaptionTitle');
  const capText = document.getElementById('settingsCaptionText');

  function show(i) {
    tabs.forEach((t, n) => t.classList.toggle('is-active', n === i));
    shots.forEach((s, n) => s.classList.toggle('is-active', n === i));
    const data = SETTINGS_SHOTS[i];
    if (!data || !caption) return;
    caption.classList.add('is-swapping');
    setTimeout(() => {
      capTitle.textContent = data.title;
      capText.innerHTML = data.text;
      caption.classList.remove('is-swapping');
    }, prefersReducedMotion() ? 0 : 180);
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));
  show(0);
}

/* ==========================================================================
   4. Delivery Type Reference Tabs
   ========================================================================== */
const targetDetails = {
  inject: {
    label: 'inject',
    name: 'Keystroke Injection',
    desc: 'Simulates typing directly into the active focused window. Uses native Wayland wtype, X11 xdotool, or clipboard Ctrl+V fallback.',
    usecase: 'Perfect for hands-free code dictation, emails, slack messages, and editor writing.',
    toml: `[[target]]\nid = "default"\nlabel = "Focused Window"\ndelivery = "inject"\nstrip_newlines = false`
  },
  clipboard: {
    label: 'clipboard',
    name: 'System Clipboard',
    desc: 'Populates the desktop clipboard via the native arboard library without altering active focus or pasting prematurely.',
    usecase: 'Ideal for staging notes, prompt drafts, or code snippets to paste manually with precision.',
    toml: `[[target]]\nid = "clipboard"\nlabel = "System Clipboard"\ndelivery = "clipboard"`
  },
  exec: {
    label: 'exec',
    name: 'Shell Command Execution',
    desc: 'Spawns a shell command substituting {TEXT} cleanly and securely with shell=False to strictly prevent command injection.',
    usecase: 'Triggering git commits (git commit -m "{TEXT}"), web searches, or passing text into terminal scripts.',
    toml: `[[target]]\nid = "commit"\nlabel = "Git Commit"\ndelivery = "exec"\ncommand = "git commit -m {TEXT}"`
  },
  pipe: {
    label: 'pipe',
    name: 'Unix Named Pipe (FIFO)',
    desc: 'Writes raw transcription bytes directly to a local FIFO pipe on the filesystem (~/.cache/voxctrl/pipe).',
    usecase: 'Interfacing seamlessly with CLI agents, shell loops, or vim/neovim buffers listening on a pipe.',
    toml: `[[target]]\nid = "terminal_agent"\nlabel = "CLI Agent"\ndelivery = "pipe"\npipe_path = "/tmp/hermes.in"\nresponse_pipe = "/tmp/hermes.out"`
  },
  socket: {
    label: 'socket',
    name: 'TCP & Unix Domain Socket',
    desc: 'Streams text over a local Unix Domain Socket or TCP connection directly to listening background daemons.',
    usecase: 'Communicating with dev containers, Docker environments, or background automation services.',
    toml: `[[target]]\nid = "daemon_sock"\nlabel = "Local Daemon"\ndelivery = "socket"\nsocket_unix = "/tmp/automation.sock"\n# or: socket_host = "127.0.0.1" / socket_port = 9009`
  },
  file: {
    label: 'file',
    name: 'File Append / Journal',
    desc: 'Appends transcriptions to any local file with customizable prefixes, separators, and optional UTC timestamps.',
    usecase: 'Automatic voice journaling, standup logs, scratchpad thoughts, or tracking daily developer task lists.',
    toml: `[[target]]\nid = "notes"\nlabel = "Voice Journal"\ndelivery = "file"\nfile_path = "~/notes.txt"\nfile_prefix = "- "\nfile_timestamp = true\nfile_timestamp_format = "%Y-%m-%dT%H:%M:%SZ"`
  },
  dbus: {
    label: 'dbus',
    name: 'Linux DBus Signal',
    desc: 'Broadcasts a signal over the local Linux session bus at ai.voxctrl.Dictation containing the transcribed text.',
    usecase: 'Triggering system widgets, desktop notifications, Waybar modules, or custom desktop automation.',
    toml: `[[target]]\nid = "desktop_event"\nlabel = "Desktop Notification"\ndelivery = "dbus"\ndbus_signal = "Transcription"`
  },
  http: {
    label: 'http',
    name: 'HTTP POST / GET Webhook',
    desc: 'Sends a fast HTTP request containing the transcription formatted inside a JSON payload template.',
    usecase: 'Streaming voice triggers to webhooks, cloud databases, REST APIs, or local microservices.',
    toml: `[[target]]\nid = "webhook_api"\nlabel = "Event Webhook"\ndelivery = "http"\nhttp_url = "http://localhost:8000/api/dictation"\nhttp_method = "POST"`
  },
  webhook: {
    label: 'webhook',
    name: 'HMAC-SHA256 Signed Webhook',
    desc: 'Sends a cryptographically signed HTTP POST request with an HMAC-SHA256 header using a shared secret.',
    usecase: 'Securely controlling Home Assistant lights/appliances or production APIs without exposing endpoints.',
    toml: `[[target]]\nid = "home_assistant"\nlabel = "Smart Home"\ndelivery = "webhook"\nwebhook_url = "https://ha.local/api/voice"\nwebhook_secret = "…shared secret…"`
  },
  speak: {
    label: 'speak',
    name: 'Neural TTS Playback',
    desc: 'Transcribes speech and plays it back aloud through your speakers via the configured local neural TTS engine.',
    usecase: 'Audio playback verification, voice memo confirmations, or hearing synthesized summaries.',
    toml: `[[target]]\nid = "speak_echo"\nlabel = "Voice Feedback"\ndelivery = "speak"\n# uses the engine and voice from Settings → TTS`
  },
  chat: {
    label: 'chat',
    name: 'OpenAI / Ollama Conversational LLM',
    desc: 'Maintains an ongoing multi-turn conversation with an OpenAI-compatible /v1/chat/completions server (Ollama, LM Studio).',
    usecase: 'Talking directly to local LLMs (Hermes, Llama 3) hands-free, with answers spoken aloud or typed at your cursor.',
    toml: `[[target]]\nid = "chat_ollama"\nlabel = "Local AI Assistant"\ndelivery = "chat"\nchat_url = "http://localhost:11434/v1/chat/completions"\nchat_model = "llama3:latest"\nchat_reply_mode = "speak"\nchat_reset_phrase = "start over"`
  },
  mcp: {
    label: 'mcp',
    name: 'Model Context Protocol Call',
    desc: 'Calls a tool on any local or networked MCP server over a Unix socket or Windows named pipe, performing the full initialize → notifications/initialized → tools/call handshake.',
    usecase: 'Driving a strict third-party MCP server with your voice, or looping speech back through VoxCtrl\'s own speak_text tool.',
    toml: `[[target]]\nid = "self_speak"\nlabel = "Speech Loopback"\ndelivery = "mcp"\nmcp_path = "/tmp/voxctrl-mcp.sock"\nmcp_tool = "speak_text"\n\n[target.mcp_args]\ntext = "{TEXT}"`
  },
  command: {
    label: 'command',
    name: 'Voice Command Router',
    desc: 'Not a destination — a dispatcher. It reads the transcription, looks for the "VoxCtrl" trigger followed by one of your command names, and hands the rest of the sentence to that command instead.',
    usecase: 'Bind it once and every command you ever add becomes reachable by voice. With no trigger phrase present it behaves exactly like inject, so it is safe as your default binding.',
    toml: `[[target]]\nid = "command"\nlabel = "Command"\ndelivery = "command"\n\n# The first-run wizard creates this one for you\n# and binds your first hotkey to it.`
  }
};

function initTargetTabs() {
  const tabBtns = document.querySelectorAll('.target-tab-btn');
  const nameEl = document.getElementById('targetName');
  const badgeEl = document.getElementById('targetBadge');
  const descEl = document.getElementById('targetDesc');
  const usecaseEl = document.getElementById('targetUsecase');
  const tomlEl = document.getElementById('targetToml');

  function show(btn) {
    const data = targetDetails[btn.getAttribute('data-target')];
    if (!data) return;

    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    if (nameEl) nameEl.textContent = data.name;
    if (badgeEl) badgeEl.textContent = data.label;
    if (descEl) descEl.textContent = data.desc;
    if (usecaseEl) usecaseEl.textContent = data.usecase;
    if (tomlEl) tomlEl.textContent = data.toml;
  }

  tabBtns.forEach(btn => btn.addEventListener('click', () => show(btn)));

  const initial = document.querySelector('.target-tab-btn.active') || tabBtns[0];
  if (initial) show(initial);
}

/* ==========================================================================
   5. Distro Installer Tabs
   ========================================================================== */
const APPIMAGE = 'VoxCtrl-linux-x86_64-vulkan.AppImage';

const distroSnippets = {
  appimage: `# 1. Grab the one Linux build from the latest release
#    https://github.com/JRufer/VoxCtrl/releases/latest
#    (Vulkan-accelerated, and falls back to the CPU when there is no GPU)

# 2. Make it executable
chmod +x ${APPIMAGE}

# 3. Run it. The first-run wizard opens, and VoxCtrl registers its own
#    desktop entry and icon under ~/.local/share — no install step, no
#    udev rule, no permissions to grant.
./${APPIMAGE}`,

  ubuntu: `# Ubuntu 22.04+, Debian 12+, Linux Mint 21+ (glibc 2.35 or newer)
# Optional, and only for typing into other windows — the setup window
# will offer to do this for you if the helper is missing:
sudo apt update && sudo apt install -y wtype xdotool

chmod +x ${APPIMAGE}
./${APPIMAGE}

# Or let the AppImage install just those packages up front:
# ./${APPIMAGE} --install`,

  fedora: `# Fedora 36+
sudo dnf install -y wtype xdotool

chmod +x ${APPIMAGE}
./${APPIMAGE}

# libfuse2 is not required: the bundled runtime uses your FUSE 3,
# and extracts and runs itself when FUSE is unavailable.`,

  arch: `# Arch / CachyOS / EndeavourOS
sudo pacman -S --needed wtype xdotool

chmod +x ${APPIMAGE}
./${APPIMAGE}

# Building from source instead (Vulkan is the standard build;
# CUDA is opt-in at compile time):
# npm install && npx tauri build --features vulkan`,

  windows: `# Windows 10 (21H2+) or Windows 11 — EARLY BETA, please report what breaks
#
# Download the installer from the latest release:
#   VoxCtrl-windows-x86_64-webgpu.exe   (Moonshine accelerated on any D3D12 GPU,
#                                        falls back to the CPU when there is none)
#
# The installer is not code-signed yet, so SmartScreen will say the
# publisher is unknown: click "More info" then "Run anyway".
#
# If dictation produces nothing at all, check this first — Windows denies
# microphone access silently:
#   Settings > Privacy & security > Microphone
#   > "Let desktop apps access your microphone"
#
# Then tell me what broke: VoxCtrl Settings > Bug Report.
# No GitHub account needed, and it shows you the whole report first.`
};

function initDistroTabs() {
  const tabs = document.querySelectorAll('.distro-tab');
  const codeEl = document.getElementById('terminalCodeSnippet');

  function show(tab, scrollIntoView = false) {
    const snippet = distroSnippets[tab.getAttribute('data-distro')];
    if (!snippet) return;
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    if (codeEl) codeEl.textContent = snippet;

    // On a phone the rail scrolls, so a tab picked at the far end should not
    // sit half off the edge afterwards.
    if (scrollIntoView && tab.parentElement.scrollWidth > tab.parentElement.clientWidth) {
      tab.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }

  tabs.forEach(tab => tab.addEventListener('click', () => show(tab, true)));

  // Render the active tab on load, so the snippet in the box is never a stale
  // copy of the one in this file.
  const initial = document.querySelector('.distro-tab.active') || tabs[0];
  if (initial) show(initial);
}

/* ==========================================================================
   6. One-Click Copy Buttons
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy-target]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const text = targetEl.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<span style="color:#34d399;">✔ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   7. Smooth Scroll & Active Nav Spy
   ========================================================================== */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    toggleBtn.classList.toggle('open');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      toggleBtn.classList.remove('open');
    });
  });
}

