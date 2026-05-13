<?php
$page_title = 'VoxCtr — the audio control layer for your AI stack';
$page_desc  = 'VoxCtr is a programmable voice broker for Linux. 100% on-device Whisper transcription, per-target routing, MCP server, and neural TTS. MIT licensed.';
$active_section = 'home';
?>
<!doctype html>
<html lang="en">
<?php include 'includes/head.php'; ?>
<body>

<div class="bg-stack">
  <div class="grid-bg"></div>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-noise"></div>
</div>

<?php include 'includes/nav.php'; ?>

<!-- ── HERO ── -->
<section class="section hero">
  <span class="ornament huge" style="top: 80px; left: -40px;">{ }</span>
  <span class="ornament huge" style="bottom: 40px; right: -20px;">⌘</span>
  <span class="ornament" style="top: 120px; right: 12%;">// io.voice → ∗</span>
  <span class="ornament" style="bottom: 80px; left: 4%;">⌁ stdin ◌ stdout</span>

  <div class="shell">
    <div class="hero-grid">
      <div>
        <span class="eyebrow fade-up"><span class="dot"></span> Local-first voice control for AI &middot; zero cloud</span>
        <h1 class="h-display fade-up">
          Speak to <span class="accent">anything</span> on your machine.
        </h1>
        <p class="lead fade-up">
          VoxCtr is a programmable voice broker for Linux that runs <strong style="color:var(--txt-0)">100% on your device</strong>. Whisper transcribes locally, your own models do the processing, and not a single byte of audio leaves your machine. Your words. Your hardware. Your control.
        </p>
        <div class="hero-cta fade-up">
          <a class="btn btn-primary" href="<?= $base ?>/docs/quickstart.php">
            <span style="font-family:var(--mono)">⌃</span> Quickstart
          </a>
          <a class="btn btn-ghost" href="https://github.com/jrufer/voxctr" target="_blank">
            <span style="font-family:var(--mono)">↗</span> View on GitHub
          </a>
        </div>
        <div class="install-strip fade-up">
          <span class="prompt">$</span>
          <span class="cmd">curl -fsSL <span class="arg">voxctr.dev/install.sh</span> | bash</span>
          <button class="copy-btn" data-copy="curl -fsSL voxctr.dev/install.sh | bash">⎘ copy</button>
        </div>
      </div>

      <!-- right: the live console -->
      <div class="console fade-up">
        <div class="console-head">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="title">voxctr · live</span>
          <span class="console-status"><span class="dot"></span> RECORDING</span>
        </div>
        <div class="wave-stage">
          <div class="wave-meta">
            <b>◉ MIC</b> &nbsp;·&nbsp; whisper.large-v3 &nbsp;·&nbsp; cuda fp16
          </div>
          <div class="wave-target">
            <span class="glyph">→</span> Hermes Agent
          </div>
          <div class="wave-bars" id="waveBars"></div>
          <svg viewBox="0 0 600 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ridge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#22d4ef" stop-opacity="0"/>
                <stop offset="50%" stop-color="#22d4ef" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#22d4ef" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="60" x2="600" y2="60" stroke="rgba(34,212,239,0.25)" stroke-width="1" stroke-dasharray="2 4"/>
            <path d="M0,60 L600,60" stroke="url(#ridge)" stroke-width="1"/>
          </svg>
        </div>
        <div class="transcript">
          <span class="lbl">▸ raw input</span>
          <span class="raw" id="rawT">um, schedule a team sync, uh, for thursday at three p m</span>
          <span class="arrow">↳ post-processing &nbsp;·&nbsp; strip_fillers + ollama_polish</span>
          <span class="lbl">▸ delivered</span>
          <span class="out" id="outT">Schedule a team sync for Thursday at 3:00 PM<span class="caret"></span></span>
        </div>
        <div class="console-routes">
          <div class="route-chip is-active"><span class="glyph">⊳ inject</span><span class="name">Focused window</span></div>
          <div class="route-chip"><span class="glyph">⇉ pipe</span><span class="name">/tmp/agent.in</span></div>
          <div class="route-chip"><span class="glyph">∷ exec</span><span class="name">claude --print</span></div>
          <div class="route-chip"><span class="glyph">≡ file</span><span class="name">~/journal.md</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── glyph rail ── -->
<div class="shell">
  <div class="glyph-rail">
    <div class="track">
      <span class="item">⌁ <b>evdev</b></span><span class="item">↯ <b>whisper</b></span>
      <span class="item">∷ <b>at-spi2</b></span><span class="item">⊕ <b>piper-tts</b></span>
      <span class="item">⇉ <b>fifo</b></span><span class="item">∴ <b>dbus</b></span>
      <span class="item">⊞ <b>mcp</b></span><span class="item">⊳ <b>ollama</b></span>
      <span class="item">∗ <b>vulkan</b></span><span class="item">▣ <b>cuda</b></span>
      <span class="item">⌬ <b>wayland</b></span><span class="item">◇ <b>x11</b></span>
      <span class="item">⌁ <b>evdev</b></span><span class="item">↯ <b>whisper</b></span>
      <span class="item">∷ <b>at-spi2</b></span><span class="item">⊕ <b>piper-tts</b></span>
      <span class="item">⇉ <b>fifo</b></span><span class="item">∴ <b>dbus</b></span>
      <span class="item">⊞ <b>mcp</b></span><span class="item">⊳ <b>ollama</b></span>
      <span class="item">∗ <b>vulkan</b></span><span class="item">▣ <b>cuda</b></span>
      <span class="item">⌬ <b>wayland</b></span><span class="item">◇ <b>x11</b></span>
    </div>
  </div>
</div>

<!-- ── positioning ── -->
<section class="section section-bordered">
  <div class="shell-narrow" style="text-align: center;">
    <span class="eyebrow fade-up">// positioning</span>
    <h2 class="h-section fade-up" style="max-width: 820px; margin-left: auto; margin-right: auto;">
      Voice is the missing primitive in your AI stack.
    </h2>
    <p class="lead fade-up" style="margin-left:auto; margin-right:auto; max-width:740px;">
      Every modern editor speaks MCP. Every shell speaks pipes. Every desktop speaks DBus.
      VoxCtr is the part you've been writing yourself — the bit that turns vibrations into bytes
      and routes them to the right place.
    </p>

    <div class="metrics fade-up" style="margin-top: 48px;">
      <div class="metric"><div class="v">∞</div><div class="l">Output Targets</div></div>
      <div class="metric"><div class="v">7</div><div class="l">Delivery Types</div></div>
      <div class="metric"><div class="v">3</div><div class="l">GPU Backends</div></div>
      <div class="metric"><div class="v">280+</div><div class="l">Tests Passing</div></div>
    </div>
  </div>
</section>

<!-- ── privacy band ── -->
<section class="section section-bordered" id="privacy" style="padding: 64px 0;">
  <div class="shell">
    <div class="privacy-band fade-up">
      <div class="pb-mark">
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M24 4 L40 10 V24 C40 34 32 42 24 44 C16 42 8 34 8 24 V10 Z"/>
          <path d="M17 23 L22 28 L31 18"/>
        </svg>
      </div>
      <div class="pb-body">
        <span class="eyebrow" style="color: var(--cyan-1); margin-bottom: 6px;">// privacy &middot; first-class</span>
        <h2 class="pb-title">Your words. Your machine. Your control.</h2>
        <p class="pb-lead">
          VoxCtr is built for people who don't want their voice on someone else's server. Audio is captured, transcribed, and processed entirely on your hardware — no telemetry, no cloud round-trip, no API key required.
        </p>
        <div class="pb-grid">
          <div class="pb-item"><span class="pb-glyph">∗</span><b>100% on-device</b><span>Whisper runs against your CPU/GPU. Audio buffers never leave RAM.</span></div>
          <div class="pb-item"><span class="pb-glyph">⊘</span><b>Zero telemetry</b><span>No analytics, no crash reporters, no phone-home on launch or update.</span></div>
          <div class="pb-item"><span class="pb-glyph">◯</span><b>Offline after setup</b><span>Models download once, then run locally forever. No network calls during use.</span></div>
          <div class="pb-item"><span class="pb-glyph">◇</span><b>MIT &amp; auditable</b><span>Every byte of the pipeline is open source. Read it, fork it, run it.</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── pipeline ── -->
<section class="section section-bordered" id="pipeline">
  <div class="shell">
    <span class="eyebrow fade-up">// pipeline</span>
    <h2 class="h-section fade-up">One utterance. <span class="accent-gold">Five stages.</span> Many destinations.</h2>
    <p class="lead fade-up" style="margin-bottom: 36px;">
      Press a key. Speech becomes text. Text gets shaped. Shaped text goes wherever you tell it.
      Each leg is configurable per binding.
    </p>

    <div class="pipeline fade-up">
      <span class="ornament" style="top:14px;right:18px;">PROCESS-001</span>
      <span class="ornament" style="bottom:14px;left:18px;">∗ async, lock-free</span>

      <div class="pipeline-grid">
        <div class="pl-col">
          <div class="pl-block">
            <div class="head"><b>◉ INPUT</b><span>evdev</span></div>
            <div class="row"><span>Hold</span><code>super+space</code></div>
            <div class="row"><span>Toggle</span><code>ctrl+super+space</code></div>
            <div class="row"><span>Double-tap</span><code>alt</code></div>
          </div>
          <div class="pl-block">
            <div class="head"><b>↯ CAPTURE</b><span>vad</span></div>
            <div class="row"><span>PyAudio</span><code>16kHz mono</code></div>
            <div class="row"><span>Silero VAD</span><code>silence ⟶ stop</code></div>
          </div>
        </div>

        <div class="arrow">
          <svg viewBox="0 0 64 18" preserveAspectRatio="none">
            <line x1="0" y1="9" x2="56" y2="9" stroke="rgba(34,212,239,0.35)" stroke-dasharray="2 3"/>
            <polyline points="50,3 58,9 50,15" fill="none" stroke="var(--cyan-0)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="pl-col">
          <div class="pl-block">
            <div class="head"><b>∇ TRANSCRIBE</b><span>auto-select</span></div>
            <div class="row"><span>NVIDIA</span><code>faster-whisper</code></div>
            <div class="row"><span>AMD/Intel</span><code>whisper.cpp + vulkan</code></div>
            <div class="row"><span>CPU</span><code>faster-whisper int8</code></div>
            <div class="row"><span>Edge / Pi</span><code>moonshine</code></div>
            <div class="row"><span>Context prime</span><code>at-spi2 → 300ch</code></div>
          </div>
          <div class="pl-block">
            <div class="head"><b>⌬ PROCESS</b><span>per-target</span></div>
            <div class="row"><span>Snippets</span><code>"my email" ⟶ …</code></div>
            <div class="row"><span>Spoken punct</span><code>"period" ⟶ .</code></div>
            <div class="row"><span>Code mode</span><code>get_user.name</code></div>
            <div class="row"><span>Ollama rewrite</span><code>llama3.2:1b</code></div>
          </div>
        </div>

        <div class="arrow">
          <svg viewBox="0 0 64 18" preserveAspectRatio="none">
            <line x1="0" y1="9" x2="56" y2="9" stroke="rgba(34,212,239,0.35)" stroke-dasharray="2 3"/>
            <polyline points="50,3 58,9 50,15" fill="none" stroke="var(--cyan-0)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div class="pl-col">
          <div class="pl-block">
            <div class="head"><b>⊳ ROUTE</b><span>7 types</span></div>
            <div class="row"><span>inject</span><code>at-spi2</code></div>
            <div class="row"><span>clipboard</span><code>wl-copy</code></div>
            <div class="row"><span>exec</span><code>shell=False</code></div>
            <div class="row"><span>pipe</span><code>FIFO</code></div>
            <div class="row"><span>socket</span><code>tcp / unix</code></div>
            <div class="row"><span>file</span><code>append</code></div>
            <div class="row"><span>dbus</span><code>signal</code></div>
          </div>
          <div class="pl-block" style="background: linear-gradient(180deg, rgba(34,212,239,0.06), transparent);">
            <div class="head"><b>↺ RESPOND</b><span>loop</span></div>
            <div class="row"><span>FIFO listener</span><code>response_pipe</code></div>
            <div class="row"><span>TTS engine</span><code>piper / espeak</code></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── feature cards ── -->
<section class="section section-bordered">
  <div class="shell">
    <span class="eyebrow fade-up">// capabilities</span>
    <h2 class="h-section fade-up">A real toolkit, not a transcription widget.</h2>
    <p class="lead fade-up" style="margin-bottom: 36px;">
      Each subsystem composes with the others. Pick what you need, ignore the rest.
    </p>

    <div class="cards cards-3 fade-up">
      <div class="card">
        <span class="corner">01</span>
        <span class="glyph">⌁</span>
        <h3 class="h-card">Global hotkeys</h3>
        <p class="desc">evdev-based input listener works under Wayland and X11. Hold, toggle, or double-tap modes — each gesture mapped to a different output.</p>
        <ul>
          <li>Conflict detection at bind time</li>
          <li>Bare-key bindings &amp; modifier chords</li>
          <li>Per-binding gesture settings</li>
        </ul>
      </div>
      <div class="card" style="border-color: rgba(34,212,239,0.35); background: linear-gradient(180deg, rgba(34,212,239,0.04), transparent 60%), var(--bg-1);">
        <span class="corner">02</span>
        <span class="glyph">∇</span>
        <h3 class="h-card">Three transcription backends</h3>
        <p class="desc">faster-whisper for CUDA, whisper.cpp + Vulkan for AMD/Intel, Moonshine for edge and low-latency streaming. The right backend is selected by GPU probe at startup.</p>
        <ul>
          <li>fp16 / int8 / ONNX quantization</li>
          <li>Moonshine: &lt;200ms streaming on CPU</li>
          <li>Override anytime in Settings</li>
        </ul>
      </div>
      <div class="card">
        <span class="corner">03</span>
        <span class="glyph">∷</span>
        <h3 class="h-card">AT-SPI2 native injection</h3>
        <p class="desc">Insert text directly into widgets via the accessibility bus. No keystroke simulation, no modifier conflicts, no IME headaches.</p>
        <ul>
          <li>Reads 300 chars of context as initial_prompt</li>
          <li>Auto code-mode for terminals &amp; IDEs</li>
          <li>Fallback chain: wtype → portal → xdotool</li>
        </ul>
      </div>
      <div class="card">
        <span class="corner">04</span>
        <span class="glyph">⊞</span>
        <h3 class="h-card">MCP server, built-in</h3>
        <p class="desc">Voxctr ships a Model Context Protocol server. Any MCP-capable agent can drive your mic and speak through your speakers.</p>
        <ul>
          <li><code style="color:var(--cyan-1);font-family:var(--mono)">transcribe_voice</code> · <code style="color:var(--cyan-1);font-family:var(--mono)">speak_text</code> · <code style="color:var(--cyan-1);font-family:var(--mono)">get_status</code></li>
          <li>One-click Claude Desktop registration</li>
          <li>Unix socket, JSON-RPC 2.0</li>
        </ul>
      </div>
      <div class="card">
        <span class="corner">05</span>
        <span class="glyph">⊕</span>
        <h3 class="h-card">Neural TTS &amp; loopback</h3>
        <p class="desc">Piper for high-quality on-device speech. Per-target response_pipe FIFOs let agents stream answers back as audio.</p>
        <ul>
          <li>8 curated voices, in-app downloads</li>
          <li>Configurable global stop key</li>
          <li>Teal response overlay</li>
        </ul>
      </div>
      <div class="card">
        <span class="corner">06</span>
        <span class="glyph">⌬</span>
        <h3 class="h-card">Swappable overlays</h3>
        <p class="desc">Drop a Python file into <code style="color:var(--cyan-1);font-family:var(--mono)">~/.config/voxctl/overlays/</code> and you've made one. Routing badge included.</p>
        <ul>
          <li>3 styles ship: Voice Card, Waveform, Pulse</li>
          <li>30 fps QPainter / OpenGL hosts</li>
          <li>Hot-reload on save</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ── workflow tabs ── -->
<section class="section section-bordered">
  <div class="shell">
    <span class="eyebrow fade-up">// workflow</span>
    <h2 class="h-section fade-up">Same engine. Three different jobs.</h2>
    <p class="lead fade-up" style="margin-bottom: 28px;">
      Bind a different gesture to each. Switch destinations without switching focus.
    </p>

    <div class="tabs fade-up" id="wfTabs">
      <button class="tab is-active" data-wf="coding"><span class="glyph">⟨/⟩</span> Voice coding</button>
      <button class="tab" data-wf="agent"><span class="glyph">⊞</span> AI agent backend</button>
      <button class="tab" data-wf="desktop"><span class="glyph">⌘</span> Hands-free desktop</button>
    </div>

    <div class="tab-panel is-active" data-panel="coding">
      <div>
        <h3 class="h-card" style="font-size: 22px; margin-bottom: 14px;">IDE-aware code dictation</h3>
        <p class="muted" style="font-size:14.5px; line-height:1.65;">
          VoxCtr detects when VS Code, Neovim, or any terminal is focused via AT-SPI2 and switches
          to Code Mode automatically — reformatting speech into valid syntax without touching
          your global Settings.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 18px; display: flex; flex-direction: column; gap: 10px;">
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>"function handle user login" → <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">handleUserLogin()</code></span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>"constant max retries" → <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">MAX_RETRIES</code></span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Reads 300 chars before cursor as Whisper prompt</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Direct insertion via AT-SPI2 — no keypress simulation</span></li>
        </ul>
      </div>
      <div class="code">
        <div class="head"><span class="lang">~/.config/voxctr/targets.toml</span><button class="copy" data-copy="">⎘</button></div>
<pre><span class="c"># IDE target — uses code mode and reads cursor context</span>
[[<span class="t">target</span>]]
<span class="k">id</span>              = <span class="s">"editor"</span>
<span class="k">label</span>           = <span class="s">"Code Editor"</span>
<span class="k">delivery</span>        = <span class="s">"inject"</span>
<span class="k">post_processing</span> = <span class="s">"snippets_only"</span>

[<span class="t">target.code_mode</span>]
<span class="k">camel_case</span>      = <span class="n">true</span>
<span class="k">snake_case</span>      = <span class="n">false</span>
<span class="k">auto_punctuate</span>  = <span class="n">false</span>
<span class="k">context_chars</span>   = <span class="n">300</span>

[<span class="t">target.atspi</span>]
<span class="k">injection</span>       = <span class="n">true</span>
<span class="k">auto_code_mode</span>  = <span class="n">true</span></pre>
      </div>
    </div>

    <div class="tab-panel" data-panel="agent">
      <div>
        <h3 class="h-card" style="font-size: 22px; margin-bottom: 14px;">AI agent voice backend</h3>
        <p class="muted" style="font-size:14.5px; line-height:1.65;">
          Pipe your voice into any CLI agent — Hermes, llm, claude-cli — through a named FIFO.
          The agent's response can stream back through <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">response_pipe</code> and be spoken
          aloud automatically.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 18px; display: flex; flex-direction: column; gap: 10px;">
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Bidirectional: agent reads from <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">.in</code>, writes to <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">.out</code></span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Per-target post-processing — keep agent input clean</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Each line in <code style="color:var(--cyan-1);font-family:var(--mono);background:rgba(34,212,239,0.06);padding:1px 6px;border-radius:4px;">response_pipe</code> = one TTS utterance</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Listener auto-reopens FIFO on agent restart</span></li>
        </ul>
      </div>
      <div class="code">
        <div class="head"><span class="lang">~/.config/voxctr/targets.toml</span><button class="copy" data-copy="">⎘</button></div>
<pre><span class="c"># bidirectional voice ⇄ agent</span>
[[<span class="t">target</span>]]
<span class="k">id</span>              = <span class="s">"hermes"</span>
<span class="k">label</span>           = <span class="s">"Hermes Agent"</span>
<span class="k">delivery</span>        = <span class="s">"pipe"</span>
<span class="k">pipe_path</span>       = <span class="s">"/tmp/hermes.in"</span>
<span class="k">response_pipe</span>   = <span class="s">"/tmp/hermes.out"</span>
<span class="k">post_processing</span> = <span class="s">"strip_fillers"</span>
<span class="k">append_newline</span>  = <span class="n">true</span>

<span class="c"># shell-side</span>
<span class="c"># mkfifo /tmp/hermes.in /tmp/hermes.out</span>
<span class="c"># cat /tmp/hermes.in | hermes &gt; /tmp/hermes.out</span></pre>
      </div>
    </div>

    <div class="tab-panel" data-panel="desktop">
      <div>
        <h3 class="h-card" style="font-size: 22px; margin-bottom: 14px;">Hands-free desktop control</h3>
        <p class="muted" style="font-size:14.5px; line-height:1.65;">
          Three different gestures, three different destinations. Hold to dictate. Double-tap
          to fire commands at an agent. Press a meta-binding to append to your daily journal.
          All without touching the mouse.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 18px; display: flex; flex-direction: column; gap: 10px;">
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Routing indicator badge confirms which destination is live</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>DBus interface — wire it into Waybar &amp; Rofi</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Quiet mode &amp; noise suppression for open offices</span></li>
          <li style="display:flex;gap:12px;align-items:baseline; font-size: 13.5px;"><span style="color:var(--cyan-1);font-family:var(--mono)">»</span><span>Persistent searchable transcription history</span></li>
        </ul>
      </div>
      <div class="code">
        <div class="head"><span class="lang">~/.config/voxctr/bindings.toml</span><button class="copy" data-copy="">⎘</button></div>
<pre>[[<span class="t">binding</span>]]
<span class="k">id</span>      = <span class="s">"dictate_hold"</span>
<span class="k">keys</span>    = [<span class="s">"KEY_LEFTMETA"</span>, <span class="s">"KEY_SPACE"</span>]
<span class="k">gesture</span> = <span class="s">"hold"</span>
<span class="k">target_id</span> = <span class="s">"default"</span>

[[<span class="t">binding</span>]]
<span class="k">id</span>      = <span class="s">"agent_command"</span>
<span class="k">keys</span>    = [<span class="s">"KEY_LEFTCTRL"</span>]
<span class="k">gesture</span> = <span class="s">"double_tap"</span>
<span class="k">target_id</span> = <span class="s">"hermes"</span>
<span class="k">tap_ms</span>  = <span class="n">280</span>

[[<span class="t">binding</span>]]
<span class="k">id</span>      = <span class="s">"journal_capture"</span>
<span class="k">keys</span>    = [<span class="s">"KEY_LEFTMETA"</span>, <span class="s">"KEY_J"</span>]
<span class="k">gesture</span> = <span class="s">"hold"</span>
<span class="k">target_id</span> = <span class="s">"journal"</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- ── per-target showcase ── -->
<section class="section section-bordered">
  <div class="shell">
    <div class="per-target-grid">
      <div class="fade-up">
        <span class="eyebrow">// per-target processing</span>
        <h2 class="h-section">Same words. <span style="color:var(--cyan-1)">Different shapes.</span></h2>
        <p class="lead">
          Each target gets its own post-processing pipeline. The agent gets raw text.
          Your editor gets polished prose. Your journal gets bullets. From the same utterance.
        </p>
      </div>
      <div class="target-fan fade-up">
        <span class="ornament" style="top:10px;right:14px;font-size:11px;">▣ FAN-OUT</span>
        <div class="src">
          <b>▸ raw whisper</b>
          uh, i think we should, like, schedule a meeting for friday at three
        </div>
        <div class="lines">
          <svg viewBox="0 0 360 56" preserveAspectRatio="none">
            <path d="M180,0 C180,28 60,28 60,56" stroke="rgba(34,212,239,0.4)" stroke-width="1" fill="none" stroke-dasharray="2 3"/>
            <path d="M180,0 C180,28 180,28 180,56" stroke="rgba(34,212,239,0.4)" stroke-width="1" fill="none" stroke-dasharray="2 3"/>
            <path d="M180,0 C180,28 300,28 300,56" stroke="rgba(34,212,239,0.4)" stroke-width="1" fill="none" stroke-dasharray="2 3"/>
            <circle cx="180" cy="0" r="3" fill="var(--cyan-0)"/>
            <circle cx="60" cy="56" r="3" fill="var(--cyan-0)"/>
            <circle cx="180" cy="56" r="3" fill="var(--cyan-0)"/>
            <circle cx="300" cy="56" r="3" fill="var(--cyan-0)"/>
          </svg>
        </div>
        <div class="outs">
          <div class="out">
            <b>→ editor</b>
            <span class="badge">strip_fillers</span><span class="badge">ollama</span>
            <div style="margin-top:6px; color: var(--txt-0);">Schedule a meeting for Friday at 3:00 PM.</div>
          </div>
          <div class="out">
            <b>→ agent.in</b>
            <span class="badge">none</span>
            <div style="margin-top:6px; color: var(--txt-0);">schedule a meeting for friday at three</div>
          </div>
          <div class="out">
            <b>→ journal.md</b>
            <span class="badge">ollama_only</span>
            <div style="margin-top:6px; color: var(--txt-0);">- Schedule meeting · Fri 3pm</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── MCP showcase ── -->
<section class="section section-bordered" id="mcp">
  <div class="shell">
    <span class="eyebrow fade-up">// mcp gateway</span>
    <h2 class="h-section fade-up">A voice gateway any MCP agent can call.</h2>
    <p class="lead fade-up" style="margin-bottom: 36px;">
      VoxCtr exposes its full pipeline as JSON-RPC 2.0 tools. Claude Desktop, Cursor, Zed —
      anything that speaks MCP — can open your mic, get a transcript, and queue a spoken response.
    </p>

    <div class="mcp-grid">
      <div class="mcp-tools fade-up">
        <div class="mcp-tool">
          <div class="h"><code>transcribe_voice</code><span class="pill">tool</span></div>
          <p>Opens the microphone, returns a transcript when speech ends.</p>
          <div class="ex">
            <span class="arrow">→</span> args: { timeout_seconds: 15 }<br>
            <span class="arrow">←</span> "Schedule a sync for Thursday"
          </div>
        </div>
        <div class="mcp-tool">
          <div class="h"><code>speak_text</code><span class="pill">tool</span></div>
          <p>Queues text for playback through the configured TTS voice.</p>
          <div class="ex">
            <span class="arrow">→</span> args: { text: "On it." }<br>
            <span class="arrow">←</span> "spoken"
          </div>
        </div>
        <div class="mcp-tool">
          <div class="h"><code>get_status</code><span class="pill">tool</span></div>
          <p>Returns whether the mic is open and TTS is playing.</p>
          <div class="ex">
            <span class="arrow">←</span> { recording: false, speaking: true }
          </div>
        </div>
      </div>
      <div class="code fade-up">
        <div class="head"><span class="lang">~/.config/claude/claude_desktop_config.json</span><button class="copy" data-copy="">⎘</button></div>
<pre>{
  <span class="k">"mcpServers"</span>: {
    <span class="k">"voxctr"</span>: {
      <span class="k">"command"</span>: <span class="s">"socat"</span>,
      <span class="k">"args"</span>: [
        <span class="s">"STDIO"</span>,
        <span class="s">"UNIX-CONNECT:/tmp/voxctr-mcp.sock"</span>
      ]
    }
  }
}</pre>
      </div>
    </div>
  </div>
</section>

<!-- ── overlays ── -->
<section class="section section-bordered">
  <div class="shell">
    <span class="eyebrow fade-up">// overlays</span>
    <h2 class="h-section fade-up">Three overlays out of the box. Drop in your own in 50 lines.</h2>
    <p class="lead fade-up" style="margin-bottom: 28px;">
      Every overlay shows the routing indicator badge — so you always know where your speech is going,
      before you say a word.
    </p>

    <div class="overlays-row fade-up">
      <div class="overlay-card featured">
        <div class="frame"><img src="<?= $base ?>/assets/voice_overlay.gif" alt="Voice Card overlay" /></div>
        <div class="body">
          <div>
            <div class="name">Voice Card</div>
            <div class="meta">scrolling bars · gradient</div>
          </div>
          <span style="font-family:var(--mono); color: var(--cyan-1); font-size: 14px;">⊟</span>
        </div>
      </div>
      <div class="overlay-card">
        <div class="frame"><img src="<?= $base ?>/assets/box_overlay.gif" alt="Waveform overlay" /></div>
        <div class="body">
          <div>
            <div class="name">Waveform</div>
            <div class="meta">opengl oscilloscope</div>
          </div>
          <span style="font-family:var(--mono); color: var(--cyan-1); font-size: 14px;">⌇</span>
        </div>
      </div>
      <div class="overlay-card">
        <div class="frame"><img src="<?= $base ?>/assets/dot_overlay.gif" alt="Pulse Circle overlay" /></div>
        <div class="body">
          <div>
            <div class="name">Pulse Circle</div>
            <div class="meta">rms-driven · 30fps</div>
          </div>
          <span style="font-family:var(--mono); color: var(--cyan-1); font-size: 14px;">◌</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── hardware ── -->
<section class="section section-bordered" id="hardware">
  <div class="shell">
    <span class="eyebrow fade-up">// hardware</span>
    <h2 class="h-section fade-up">Auto-detect your GPU. Pick the right backend.</h2>
    <p class="lead fade-up" style="margin-bottom: 28px;">
      On startup VoxCtr probes nvidia-smi, sysfs DRM vendor IDs, and vulkaninfo to pick the fastest
      Whisper engine for your hardware. Override anytime in Settings.
    </p>

    <div class="tbl-wrap fade-up">
      <table class="tbl">
        <thead>
          <tr>
            <th>Hardware</th>
            <th>Backend</th>
            <th>Quantization</th>
            <th>Latency</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>NVIDIA</b><div class="muted" style="font-size:11.5px;font-family:var(--mono)">CUDA 11+</div></td>
            <td class="mono">faster-whisper</td>
            <td class="mono">fp16</td>
            <td><span class="pill pill-good">near-instant</span></td>
            <td class="muted" style="font-size:12.5px;">Install <code style="font-family:var(--mono);color:var(--cyan-1);background:rgba(34,212,239,0.06);padding:1px 5px;border-radius:3px;">nvidia-cublas-cu12</code></td>
          </tr>
          <tr>
            <td><b>AMD RDNA / GCN</b><div class="muted" style="font-size:11.5px;font-family:var(--mono)">vulkan</div></td>
            <td class="mono">whisper.cpp</td>
            <td class="mono">q5_k_m</td>
            <td><span class="pill pill-good">high-speed</span></td>
            <td class="muted" style="font-size:12.5px;"><code style="font-family:var(--mono);color:var(--cyan-1);background:rgba(34,212,239,0.06);padding:1px 5px;border-radius:3px;">whisper-cpp-vulkan</code> (AUR)</td>
          </tr>
          <tr>
            <td><b>Intel Arc / Iris Xe</b><div class="muted" style="font-size:11.5px;font-family:var(--mono)">vulkan</div></td>
            <td class="mono">whisper.cpp</td>
            <td class="mono">q5_k_m</td>
            <td><span class="pill pill-mid">fast</span></td>
            <td class="muted" style="font-size:12.5px;">Build with <code style="font-family:var(--mono);color:var(--cyan-1);background:rgba(34,212,239,0.06);padding:1px 5px;border-radius:3px;">GGML_VULKAN=ON</code></td>
          </tr>
          <tr>
            <td><b>CPU only</b><div class="muted" style="font-size:11.5px;font-family:var(--mono)">x86_64 / arm</div></td>
            <td class="mono">faster-whisper</td>
            <td class="mono">int8</td>
            <td><span class="pill pill-low">reliable</span></td>
            <td class="muted" style="font-size:12.5px;">Out of the box, no extra steps</td>
          </tr>
          <tr>
            <td><b>Raspberry Pi / Edge</b><div class="muted" style="font-size:11.5px;font-family:var(--mono)">arm · onnxruntime</div></td>
            <td class="mono">moonshine</td>
            <td class="mono">int8 ONNX</td>
            <td><span class="pill pill-good">streaming</span></td>
            <td class="muted" style="font-size:12.5px;"><code style="font-family:var(--mono);color:var(--cyan-1);background:rgba(34,212,239,0.06);padding:1px 5px;border-radius:3px;">pip install moonshine-voice</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── backend comparison ── -->
<section class="section section-bordered" id="backends">
  <div class="shell">
    <span class="eyebrow fade-up">// backends</span>
    <h2 class="h-section fade-up">Three engines. One voice layer.</h2>
    <p class="lead fade-up" style="margin-bottom: 36px;">
      Each backend targets a different latency profile and hardware constraint. VoxCtr selects automatically — or you can lock one in Settings.
    </p>

    <div class="cards cards-3 fade-up">
      <div class="card">
        <span class="corner" style="font-family:var(--mono);font-size:11px;">01</span>
        <span class="glyph" style="font-size:22px;">⚡</span>
        <h3 class="h-card">faster-whisper</h3>
        <p class="desc">CTranslate2-based Whisper inference. Best-in-class throughput on NVIDIA CUDA hardware. The default for GPU-accelerated desktops.</p>
        <ul>
          <li>fp16 on CUDA, int8 on CPU</li>
          <li>Whisper large-v3 at near-instant latency</li>
          <li>Best for high-accuracy offline batch</li>
          <li>Requires: NVIDIA GPU or x86 CPU</li>
        </ul>
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-family:var(--mono);font-size:11px;color:var(--txt-2);">WER (Whisper large-v3)</span>
          <div style="font-family:var(--mono);font-size:13px;color:var(--cyan-1);margin-top:4px;">7.44% · 1.5B params</div>
        </div>
      </div>

      <div class="card">
        <span class="corner" style="font-family:var(--mono);font-size:11px;">02</span>
        <span class="glyph" style="font-size:22px;">⬡</span>
        <h3 class="h-card">whisper.cpp</h3>
        <p class="desc">Pure C++ Whisper port with Vulkan compute backend. Runs on AMD and Intel GPUs where CUDA is unavailable. No Python runtime overhead.</p>
        <ul>
          <li>q5_k_m quantization via llama.cpp GGUF</li>
          <li>Vulkan on AMD RDNA / Intel Arc</li>
          <li>Pywhispercpp in-process binding</li>
          <li>Requires: Vulkan-capable GPU</li>
        </ul>
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-family:var(--mono);font-size:11px;color:var(--txt-2);">WER (Whisper small)</span>
          <div style="font-family:var(--mono);font-size:13px;color:var(--cyan-1);margin-top:4px;">8.59% · 244M params</div>
        </div>
      </div>

      <div class="card" style="border-color: rgba(232,160,25,0.45); background: linear-gradient(180deg, rgba(232,160,25,0.05), transparent 60%), var(--bg-1);">
        <span class="corner" style="font-family:var(--mono);font-size:11px;">03</span>
        <span class="glyph" style="font-size:22px;">◎</span>
        <h3 class="h-card">Moonshine</h3>
        <p class="desc">Streaming-first ASR from Moonshine AI. Caches encoder state and decoder context during live speech, enabling sub-200ms responses — even on a Raspberry Pi.</p>
        <ul>
          <li>Flexible input window — no 30s chunk limit</li>
          <li>ONNX int8 weights, CPU-native runtime</li>
          <li>527ms on RPi 5 · 165ms on Linux x86</li>
          <li>Beats Whisper large-v3 accuracy at 6× fewer params</li>
        </ul>
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-family:var(--mono);font-size:11px;color:var(--txt-2);">WER (Moonshine Medium Streaming)</span>
          <div style="font-family:var(--mono);font-size:13px;color:var(--cyan-1);margin-top:4px;">6.65% · 245M params</div>
        </div>
      </div>
    </div>

    <div class="tbl-wrap fade-up" style="margin-top: 40px;">
      <table class="tbl">
        <thead>
          <tr>
            <th>Feature</th>
            <th>faster-whisper</th>
            <th>whisper.cpp</th>
            <th style="color:var(--gold-1);">Moonshine ✦</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Inference style</b></td>
            <td class="mono">batch / offline</td>
            <td class="mono">batch / offline</td>
            <td class="mono" style="color:var(--gold-1);">streaming / live</td>
          </tr>
          <tr>
            <td><b>Audio window</b></td>
            <td class="mono">fixed 30s</td>
            <td class="mono">fixed 30s</td>
            <td class="mono" style="color:var(--gold-1);">flexible length</td>
          </tr>
          <tr>
            <td><b>CPU latency (x86)</b></td>
            <td class="mono">3,425ms</td>
            <td class="mono">~2,000ms</td>
            <td class="mono" style="color:var(--gold-1);">165ms</td>
          </tr>
          <tr>
            <td><b>Edge / RPi 5</b></td>
            <td class="mono muted">impractical</td>
            <td class="mono muted">impractical</td>
            <td class="mono" style="color:var(--gold-1);">527ms ✓</td>
          </tr>
          <tr>
            <td><b>Model format</b></td>
            <td class="mono">CTranslate2</td>
            <td class="mono">GGUF</td>
            <td class="mono" style="color:var(--gold-1);">ONNX (.ort)</td>
          </tr>
          <tr>
            <td><b>GPU requirement</b></td>
            <td class="mono">NVIDIA preferred</td>
            <td class="mono">Vulkan GPU</td>
            <td class="mono" style="color:var(--gold-1);">none (CPU-first)</td>
          </tr>
          <tr>
            <td><b>Best WER (English)</b></td>
            <td class="mono">7.44%</td>
            <td class="mono">8.59%</td>
            <td class="mono" style="color:var(--gold-1);">6.65%</td>
          </tr>
          <tr>
            <td><b>Install</b></td>
            <td class="mono">pip + cublas</td>
            <td class="mono">AUR / cmake</td>
            <td class="mono" style="color:var(--cyan-1);">pip install moonshine-voice</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── final CTA ── -->
<section class="section">
  <div class="shell-narrow" style="text-align: center; padding: 56px 0;">
    <span class="eyebrow fade-up">// open source · MIT</span>
    <h2 class="h-display fade-up" style="font-size: clamp(36px, 5vw, 64px); margin-top: 18px;">Ready when you are.</h2>
    <p class="lead fade-up" style="margin: 0 auto 32px;">
      Install in five minutes. Forks, custom overlays, and contributions welcome.
    </p>
    <div class="hero-cta fade-up" style="justify-content: center;">
      <a class="btn btn-primary" href="<?= $base ?>/docs/quickstart.php">
        <span style="font-family:var(--mono)">⌃</span> Read the quickstart
      </a>
      <a class="btn btn-ghost" href="https://github.com/jrufer/voxctr" target="_blank">
        <span style="font-family:var(--mono)">★</span> Star on GitHub
      </a>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
<script src="<?= $base ?>/js/landing.js"></script>
</body>
</html>
