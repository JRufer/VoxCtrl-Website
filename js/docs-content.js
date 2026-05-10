/* ─────────── docs content ─────────── */
const DOCS = {
  quickstart: {
    title: 'Quickstart',
    crumbs: 'GETTING STARTED / QUICKSTART',
    lede: "From zero to your first voice transcription in under five minutes. Linux only — Wayland and X11 supported.",
    body: `
      <h2>1. Install</h2>
      <p>Download the AppImage from <code>github.com/jrufer/voxctr/releases</code>, then run the installer to set up system deps, Piper TTS, and udev rules.</p>
      <pre class="code-inline"></pre>
      <h2>2. Permissions</h2>
      <p>Global hotkeys require evdev access. The installer adds you to <code>input</code> and <code>uinput</code> groups. <strong>Log out and back in</strong> for changes to take effect.</p>
      <h2>3. Launch</h2>
      <p>Run <code>voxctr</code>. A tray icon appears. The first-run wizard walks you through choosing a transcription backend and model size — Whisper base (~140MB), large-v3 (~2.9GB), or Moonshine Streaming for low-latency and edge use.</p>
      <h2>4. Speak</h2>
      <p>Click into any text field. Hold <code>Super+Space</code>. Speak. Release. Your transcript appears.</p>
      <div class="note"><span class="icon">ⓘ</span> If your compositor lacks system tray support, the Settings window opens directly on launch.</div>
      <h2>Next</h2>
      <ul>
        <li>Wire up the <strong>MCP server</strong> for Claude Desktop integration</li>
        <li>Define <strong>routing targets</strong> in <code>targets.toml</code></li>
        <li>Customize <strong>hotkeys</strong> in <code>bindings.toml</code></li>
      </ul>
    `,
    next: 'install', prev: null,
  },
  install: {
    title: 'Installation',
    crumbs: 'GETTING STARTED / INSTALLATION',
    lede: "VoxCtr runs natively on Linux. Two install paths: AppImage (recommended) or source.",
    body: `
      <h2>Hardware compatibility</h2>
      <table class="docs-table">
        <thead><tr><th>GPU</th><th>Backend</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>NVIDIA (CUDA 11+)</td><td>faster-whisper</td><td>Install CUDA pip libs — auto-selected</td></tr>
          <tr><td>AMD RDNA / GCN</td><td>whisper.cpp + vulkan</td><td><code>whisper-cpp-vulkan</code> from AUR</td></tr>
          <tr><td>Intel Arc / Iris Xe</td><td>whisper.cpp + vulkan</td><td>Build with <code>GGML_VULKAN=ON</code></td></tr>
          <tr><td>CPU only</td><td>faster-whisper int8</td><td>Out of the box; slower for large models</td></tr>
          <tr><td>Raspberry Pi / Edge (arm)</td><td>moonshine</td><td><code>pip install moonshine-voice</code> — streaming ONNX, no GPU needed</td></tr>
        </tbody>
      </table>
      <h2>Option A: AppImage</h2>
      <p>The installer detects your package manager (apt/pacman/dnf/zypper), installs system libs, downloads Piper TTS to <code>/opt/piper</code>, creates udev rules, and adds you to the <code>input</code>/<code>uinput</code> groups.</p>
      <h3>Steps</h3>
      <ul>
        <li>Download <code>VoxCtr-x86_64.AppImage</code> from Releases</li>
        <li>Run <code>bash install.sh</code></li>
        <li>Log out and back in</li>
        <li>Launch <code>voxctr</code></li>
      </ul>
      <div class="note"><span class="icon">ⓘ</span> <code>pyatspi</code>, <code>mcp</code>, and <code>websockets</code> are bundled inside the AppImage — no manual install needed.</div>

      <h2>Option B: from source</h2>
      <h3>1. System deps (Arch)</h3>
      <p>Install portaudio, wl-clipboard, xdotool, wtype, xclip, alsa-utils, espeak-ng. Optionally socat (Claude Desktop bridge) and python-atspi.</p>
      <h3>2. Permissions</h3>
      <p>Run <code>sudo bash scripts/setup-permissions.sh</code>. Log out and back in.</p>
      <h3>3. Clone &amp; venv</h3>
      <p>Clone, create a virtualenv, and <code>pip install -r requirements.txt</code>. The requirements file includes noisereduce, dbus-python, websockets, mcp, and pyatspi.</p>
      <h3>4. NVIDIA acceleration (optional)</h3>
      <p><code>pip install nvidia-cublas-cu12 nvidia-cudnn-cu12</code></p>
      <h3>5. Launch</h3>
      <p>Run <code>./voxctr.sh</code>.</p>
    `,
    next: 'concepts', prev: 'quickstart',
  },
  concepts: {
    title: 'Core concepts',
    crumbs: 'GETTING STARTED / CORE CONCEPTS',
    lede: "How VoxCtr models voice input, routing, and processing. Read this once and the rest of the docs make sense.",
    body: `
      <h2>The five abstractions</h2>
      <h3>Binding</h3>
      <p>A hotkey gesture mapped to a target. Specifies keys, gesture type (hold / toggle / double-tap), and which named target receives the transcript.</p>
      <h3>Target</h3>
      <p>A named output destination with its own delivery type and post-processing pipeline. You can have many targets and switch between them by using different hotkeys.</p>
      <h3>Pipeline</h3>
      <p>An ordered sequence of processing stages applied to the raw Whisper transcript before delivery. Stages: <code>strip_fillers</code>, <code>snippets</code>, <code>spoken_punct</code>, <code>code_mode</code>, <code>ollama_rewrite</code>.</p>
      <h3>AT-SPI2</h3>
      <p>The Linux accessibility bus. Used for context-aware text injection (avoiding keypress simulation) and to read the text before the cursor to prime Whisper with relevant vocabulary.</p>
      <h3>MCP server</h3>
      <p>VoxCtr's built-in Model Context Protocol server. Exposes <code>transcribe_voice</code>, <code>speak_text</code>, and <code>get_status</code> as tools any MCP-capable AI can call.</p>

      <h2>The broker model</h2>
      <p>VoxCtr is not a dictation app — it is a voice input <strong>broker</strong>. A dictation app types what you say into the focused window. A broker can send the same utterance — or differently processed versions — to multiple independent systems simultaneously.</p>
      <ul>
        <li><strong>Single utterance, multiple destinations.</strong> Inject into your editor, log to a file, send to an agent — all from one keypress.</li>
        <li><strong>Per-destination AI shaping.</strong> Editor target gets grammar correction; agent target gets raw output; journal target gets bullet formatting.</li>
        <li><strong>No coupling between input and processing.</strong> Switch hotkey gestures, switch backends, switch routes — all independently.</li>
      </ul>
    `,
    next: 'hotkeys', prev: 'install',
  },
  hotkeys: {
    title: 'Hotkeys & gestures',
    crumbs: 'INPUT / HOTKEYS',
    lede: "VoxCtr listens at the evdev layer for true global hotkeys — no window focus required, no compositor cooperation needed.",
    body: `
      <h2>Default bindings</h2>
      <table class="docs-table">
        <thead><tr><th>Gesture</th><th>Keys</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>Hold-to-talk</td><td>Super + Space</td><td>Hold while speaking, release to deliver</td></tr>
          <tr><td>Toggle-to-talk</td><td>Ctrl + Super + Space</td><td>Tap to start, tap again to stop</td></tr>
          <tr><td>Double-tap</td><td>Alt</td><td>Double-tap and hold Alt to record</td></tr>
        </tbody>
      </table>
      <p>All configurable in Settings → Hotkeys or directly in <code>bindings.toml</code>. Each gesture can be disabled without deleting it.</p>

      <h2>Gesture modes</h2>
      <h3>Hold</h3><p>Most predictable. Press, speak, release. Mic state is unambiguous — visible in the overlay.</p>
      <h3>Toggle</h3><p>Hands-free. Tap once to start, tap again to stop. VAD also stops on silence if configured.</p>
      <h3>Double-tap</h3><p>Reuses an existing modifier without colliding with normal usage. Double-tapping <code>Alt</code> never fires when <code>Alt</code> is held as part of <code>Alt+Tab</code>. Default tap window: 250ms.</p>

      <h2>Conflict detection</h2>
      <p>The Settings UI checks for collisions as you record new keys:</p>
      <ul>
        <li><strong>Exact duplicate</strong> — both gestures fire simultaneously</li>
        <li><strong>Subset collision</strong> — shorter binding always fires with longer</li>
        <li><strong>Double-tap overlap</strong> — double-tap key appears in a hold/toggle combo</li>
        <li><strong>Bare single key</strong> — non-modifier key alone intercepts every press</li>
      </ul>

      <h2>Recording new bindings</h2>
      <p>Press the <strong>Bind</strong> button next to a key field. The button turns orange and shows "Recording…". Press your keys. The display updates live as keys are held. Release — binding captured.</p>
      <div class="note"><span class="icon">ⓘ</span> For Chord bindings the editor exposes two Bind fields: hold keys (modifiers) and trigger key (held while pressing).</div>

      <h2>Configuration</h2>
      <p>The full schema for <code>~/.config/voxctr/bindings.toml</code> with one binding per gesture:</p>
    `,
    next: 'routing', prev: 'concepts',
  },
  routing: {
    title: 'Routing & targets',
    crumbs: 'INPUT / ROUTING',
    lede: "Targets are named output destinations. Bindings tell VoxCtr which target each hotkey should route to.",
    body: `
      <h2>Delivery types</h2>
      <table class="docs-table">
        <thead><tr><th>Type</th><th>Mechanism</th><th>Use for</th></tr></thead>
        <tbody>
          <tr><td>inject</td><td>at-spi2 → wtype → xdotool</td><td>Default dictation</td></tr>
          <tr><td>clipboard</td><td>wl-copy / xclip</td><td>Copy for manual paste</td></tr>
          <tr><td>exec</td><td>subprocess shell=False</td><td>CLI agents, llm, claude-cli</td></tr>
          <tr><td>pipe</td><td>FIFO write O_NONBLOCK</td><td>Persistent agent processes</td></tr>
          <tr><td>socket</td><td>TCP / Unix domain</td><td>Remote / containerised agents</td></tr>
          <tr><td>file</td><td>append + timestamp</td><td>Voice journal, meeting notes</td></tr>
          <tr><td>dbus</td><td>signal emission</td><td>Waybar, Rofi, automation</td></tr>
        </tbody>
      </table>

      <h2>Post-processing modes</h2>
      <ul>
        <li><code>default</code> — full pipeline: snippets, spoken punctuation, Ollama rewrite</li>
        <li><code>none</code> — raw Whisper output (best for agents)</li>
        <li><code>strip_fillers</code> — remove um/uh/hmm only</li>
        <li><code>snippets_only</code> — expand snippets, no rewriting</li>
        <li><code>ollama_only</code> — skip snippets, run Ollama rewrite only</li>
      </ul>
      <div class="note warn"><span class="icon">!</span> Agent targets (<code>exec</code>, <code>pipe</code>, <code>socket</code>) should almost always use <code>post_processing = "none"</code> or <code>"strip_fillers"</code>. Rewriting alters command semantics.</div>

      <h2>Common patterns</h2>
      <h3>Agent command pipe</h3>
      <p>Send voice commands to a CLI agent via FIFO. Strip fillers so the agent gets clean input. Use <code>response_pipe</code> to stream replies back as TTS.</p>
      <h3>Voice journal</h3>
      <p>Append timestamped entries to a markdown file. Use Ollama to format each utterance as a concise note. Set <code>file_prefix = "- "</code> for bullets.</p>
      <h3>Shell command execution</h3>
      <p>Use <code>delivery = "exec"</code> with <code>command = "claude --print {TEXT}"</code>. The <code>{TEXT}</code> placeholder is substituted as a literal argument with <code>shell=False</code> to prevent injection.</p>
      <h3>TCP socket to remote agent</h3>
      <p>Forward transcripts over TCP for distributed or containerised setups. Set <code>socket_host</code> and <code>socket_port</code>; VoxCtr opens a connection per utterance.</p>

      <h2>Config file locations</h2>
      <ul>
        <li><code>~/.config/voxctr/config.json</code> — global settings (managed by Settings UI)</li>
        <li><code>~/.config/voxctr/targets.toml</code> — output target definitions</li>
        <li><code>~/.config/voxctr/bindings.toml</code> — hotkey → target bindings</li>
        <li><code>~/.config/voxctr/backups/</code> — auto-backups, last 20 kept</li>
      </ul>
    `,
    next: 'atspi', prev: 'hotkeys',
  },
  atspi: {
    title: 'AT-SPI2 integration',
    crumbs: 'INPUT / AT-SPI2',
    lede: "Optional accessibility integration that gives you direct text insertion, context-aware transcription, and automatic code mode for terminals and IDEs.",
    body: `
      <h2>What it does</h2>
      <h3>Direct text insertion</h3>
      <p>Insert text directly via the <code>AT-SPI2 Text.insertText</code> interface instead of simulating keystrokes. No modifier-key conflicts when a hotkey is released at the same time virtual keyboard events are sent. The app falls back automatically to <code>wtype → portal → xdotool → clipboard</code> for widgets that don't expose the <code>Text</code> interface.</p>
      <h3>Context-aware transcription</h3>
      <p>When you press your recording hotkey, VoxCtr reads up to 300 characters of text immediately before the cursor and passes it to Whisper as an <code>initial_prompt</code>. This primes the model with your document's vocabulary, spelling, and style — reducing errors on specialised terminology and proper nouns without manual prompt config.</p>
      <h3>Auto code mode</h3>
      <p>When the focused widget is a terminal or IDE text area (AT-SPI2 role <code>terminal</code> or <code>text</code>), the app switches to code dictation mode automatically without changing your global Settings. Resets on the next recording.</p>

      <h2>Configuration</h2>
      <table class="docs-table">
        <thead><tr><th>Key</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>atspi.injection</td><td>true</td><td>Try insertText before falling back to wtype/xdotool</td></tr>
          <tr><td>atspi.context_prompt</td><td>true</td><td>Feed surrounding text to Whisper as initial_prompt</td></tr>
          <tr><td>atspi.auto_code_mode</td><td>true</td><td>Switch to code mode for terminal/IDE widgets</td></tr>
        </tbody>
      </table>
      <div class="note"><span class="icon">ⓘ</span> AppImage users: pyatspi is bundled. Source users: included in <code>requirements.txt</code>. If absent, AT-SPI2 features are gracefully disabled.</div>
    `,
    next: 'codemode', prev: 'routing',
  },
  codemode: {
    title: 'Code mode',
    crumbs: 'INPUT / CODE MODE',
    lede: "Spoken constructs converted to syntax. Say it, get valid code.",
    body: `
      <h2>How it works</h2>
      <p>Code mode is a post-processing stage. When active, transcribed words like "underscore", "dot", "open paren" are converted to symbols, and identifier-like phrases are camel-cased or snake-cased.</p>
      <h2>Examples</h2>
      <table class="docs-table">
        <thead><tr><th>You say</th><th>Code mode produces</th></tr></thead>
        <tbody>
          <tr><td>get underscore user dot name</td><td><code>get_user.name</code></td></tr>
          <tr><td>function handle user login</td><td><code>handleUserLogin</code></td></tr>
          <tr><td>constant max retries</td><td><code>MAX_RETRIES</code></td></tr>
          <tr><td>open paren x comma y close paren</td><td><code>(x, y)</code></td></tr>
        </tbody>
      </table>
      <h2>Triggering code mode</h2>
      <p>Three ways:</p>
      <ul>
        <li><strong>Per-target setting:</strong> set <code>post_processing = "code_mode"</code> on a target dedicated to your editor</li>
        <li><strong>Global toggle:</strong> Settings → Dictation → Code mode</li>
        <li><strong>Auto code mode:</strong> AT-SPI2 sees a terminal/IDE focused and switches automatically</li>
      </ul>
    `,
    next: 'ai', prev: 'atspi',
  },
  ai: {
    title: 'AI processing',
    crumbs: 'AI / PROCESSING',
    lede: "Optional Ollama integration for grammar correction, tone rewriting, and bullet formatting — all local.",
    body: `
      <h2>Recommended models</h2>
      <table class="docs-table">
        <thead><tr><th>Model</th><th>RAM / VRAM</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td>llama3.2:1b</td><td>~1.3 GB</td><td>Grammar, bullets — fastest</td></tr>
          <tr><td>phi3:mini</td><td>~2 GB</td><td>Simple rewrites</td></tr>
          <tr><td>mistral</td><td>~8 GB VRAM</td><td>Formal/casual rewrites</td></tr>
        </tbody>
      </table>
      <h2>Setup</h2>
      <ul>
        <li>Install Ollama: <code>curl -fsSL https://ollama.com/install.sh | sh</code></li>
        <li>Pull a model: <code>ollama pull llama3.2:1b</code></li>
        <li>Settings → AI → click <strong>Re-check</strong> to detect</li>
        <li>Toggle <strong>Enable AI Post-Processing</strong></li>
      </ul>
      <div class="note"><span class="icon">ⓘ</span> Per-target override: set <code>post_processing = "none"</code> on agent targets to skip Ollama for those routes even when globally enabled.</div>
    `,
    next: 'tts', prev: 'codemode',
  },
  tts: {
    title: 'Voice output (TTS)',
    crumbs: 'AI / VOICE OUTPUT',
    lede: "On-device neural TTS via Piper, with espeak-ng as automatic fallback. Eight curated voices, all downloadable in-app.",
    body: `
      <h2>Voice catalog</h2>
      <table class="docs-table">
        <thead><tr><th>Voice</th><th>Language</th><th>Quality</th><th>Size</th></tr></thead>
        <tbody>
          <tr><td>en-us-lessac-medium</td><td>US English</td><td>Medium</td><td>~55 MB</td></tr>
          <tr><td>en-us-ryan-high</td><td>US English</td><td>High</td><td>~130 MB</td></tr>
          <tr><td>en-us-amy-low</td><td>US English</td><td>Low</td><td>~5 MB</td></tr>
          <tr><td>en-us-joe-medium</td><td>US English</td><td>Medium</td><td>~55 MB</td></tr>
          <tr><td>en-gb-alan-low</td><td>GB English</td><td>Low</td><td>~5 MB</td></tr>
        </tbody>
      </table>
      <h2>Setup</h2>
      <ul>
        <li>Open Settings → Voice Output</li>
        <li>Pick a voice from the dropdown</li>
        <li>Click <strong>⬇ Download</strong> — progress bar in-app, files land in <code>~/.local/share/voxctl/voices/</code></li>
        <li>Click <strong>▶ Test Voice</strong> to preview</li>
        <li>Toggle <strong>Enable TTS</strong></li>
      </ul>
      <h2>Stop key</h2>
      <p>Default <code>Escape</code>. Press it from any window to interrupt TTS playback instantly. Configure in Settings → Voice Output → TTS Stop Key.</p>
      <h2>Response overlay</h2>
      <p>When enabled, a teal floating overlay appears while TTS plays — distinct from the recording overlay so you always know when the app is speaking.</p>
    `,
    next: 'overlays', prev: 'ai',
  },
  overlays: {
    title: 'Overlays',
    crumbs: 'AI / OVERLAYS',
    lede: "Three overlay styles ship by default. Drop a Python file into ~/.config/voxctr/overlays/ and you've made one.",
    body: `
      <h2>Built-in styles</h2>
      <ul>
        <li><strong>Voice Card</strong> (default) — scrolling bar history with horizontal gradient and routing badge in the header</li>
        <li><strong>Waveform</strong> — OpenGL oscilloscope rendering raw min/max envelope</li>
        <li><strong>Pulse Circle</strong> — soft glowing circle that expands with RMS amplitude, 30fps with exponential decay</li>
      </ul>

      <h2>Routing indicator badge</h2>
      <p>Every overlay shows a small label with the active target's human-readable name (Focused Window, Hermes Agent, Voice Journal). When you use multiple hotkeys to route to different destinations, the badge changes with each activation. The label comes from the <code>label</code> field on the active <code>OutputTarget</code>.</p>

      <h2>Custom overlays</h2>
      <p>Drop a <code>.py</code> file into <code>~/.config/voxctr/overlays/</code>. Click <strong>Open Overlays Folder</strong> in Settings to go there directly. A <code>_template.py</code> starter is created automatically the first time you open the folder.</p>

      <h3>Required structure</h3>
      <ul>
        <li><code>DISPLAY_NAME</code> — string shown in the dropdown</li>
        <li><code>class OverlayUI(QWidget)</code> — the widget itself</li>
        <li>Three methods: <code>update_audio(data)</code>, <code>show_mode(label)</code>, <code>hide_mode()</code></li>
      </ul>
      <div class="note"><span class="icon">ⓘ</span> Files whose names begin with <code>_</code> (e.g. <code>_template.py</code>) are ignored by the loader — use this convention for notes, drafts, or helper modules.</div>

      <h3>The three methods</h3>
      <p><code>update_audio(data)</code> — called from the audio thread every 20–60ms. <code>data</code> is a numpy float32 ndarray, ~1024 samples, ±32768 amplitude range. Don't draw here; store and call <code>QMetaObject.invokeMethod(self, "update", QueuedConnection)</code>.</p>
      <p><code>show_mode(label)</code> — called on the Qt main thread when recording starts. <code>label</code> is the active target name (use it for your routing badge or ignore it).</p>
      <p><code>hide_mode()</code> — called on the Qt main thread when recording stops.</p>
    `,
    next: 'mcp', prev: 'tts',
  },
  mcp: {
    title: 'MCP server',
    crumbs: 'INTEGRATIONS / MCP',
    lede: "Built-in Model Context Protocol server. Any MCP-capable AI agent can drive your microphone and speak through your speakers.",
    body: `
      <h2>Three tools</h2>
      <table class="docs-table">
        <thead><tr><th>Tool</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td>transcribe_voice</td><td>Opens the mic, records the user, returns the transcript</td></tr>
          <tr><td>speak_text</td><td>Queues text for TTS playback through the current voice</td></tr>
          <tr><td>get_status</td><td>Returns whether the mic is open and TTS is playing</td></tr>
        </tbody>
      </table>

      <h2>Transport</h2>
      <p>Unix domain socket at <code>/tmp/voxctr-mcp.sock</code>. Each connection gets its own daemon thread. Newline-delimited JSON-RPC 2.0 — one JSON object per line, terminated with <code>\\n</code>.</p>

      <h2>Enabling</h2>
      <p>Settings → AI → MCP Server → toggle <strong>Enable MCP Server</strong>. Or in <code>config.json</code>: <code>{"mcp": {"server_enabled": true}}</code>.</p>

      <h2>Claude Desktop</h2>
      <p>Click <strong>Register in Claude Desktop</strong> in Settings — VoxCtr writes the socat bridge config to <code>~/.config/claude/claude_desktop_config.json</code>. Restart Claude Desktop. The three tools appear in the picker automatically.</p>
      <div class="note"><span class="icon">ⓘ</span> VoxCtr must already be running before Claude Desktop connects. The socket is created at app startup.</div>

      <h2>Protocol handshake</h2>
      <ul>
        <li>Send <code>initialize</code> — receive <code>protocolVersion 2024-11-05</code> and capability list</li>
        <li>Send <code>notifications/initialized</code> (no response expected)</li>
        <li>Send <code>tools/list</code> — receive the three tool definitions</li>
        <li>Call any tool with <code>tools/call</code></li>
      </ul>

      <h2>Behaviour notes</h2>
      <ul>
        <li>While <code>transcribe_voice</code> records, the recording overlay is always shown — the user always has a visual indicator that the mic is live</li>
        <li>The mic is released automatically once VAD detects silence or <code>timeout_seconds</code> elapses</li>
        <li>VoxCtr's full post-processing pipeline is applied before the transcript is returned</li>
        <li><code>speak_text</code> returns as soon as the text is queued — does not block until playback finishes</li>
        <li>Only one <code>transcribe_voice</code> call can be in flight at a time; concurrent calls queue</li>
      </ul>

      <h2>Response loopback (FIFO)</h2>
      <p>For agents that generate responses to a named FIFO, set <code>response_pipe</code> on the target. <code>ResponseListener</code> reads each line and passes it to <code>TTSEngine.speak()</code>. Each line in the FIFO becomes a separate utterance; empty lines are ignored. The listener re-opens the FIFO on EOF so the agent can restart without restarting VoxCtr.</p>
    `,
    next: 'dbus', prev: 'overlays',
  },
  dbus: {
    title: 'DBus control',
    crumbs: 'INTEGRATIONS / DBUS',
    lede: "Control VoxCtr from external scripts, Waybar, Rofi, or any DBus-capable program.",
    body: `
      <h2>Service</h2>
      <p>The DBus service name is <code>ai.voxctl.Dictation</code>, with object path <code>/ai/voxctl/Dictation</code> and interface <code>ai.voxctl.Dictation</code>.</p>
      <h2>Methods</h2>
      <table class="docs-table">
        <thead><tr><th>Method</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td>ToggleRecording</td><td>Start/stop the default target's recording</td></tr>
          <tr><td>GetStatus</td><td>Returns the current state string</td></tr>
          <tr><td>GetWordCount</td><td>Returns total transcribed word count for the session</td></tr>
        </tbody>
      </table>
      <h2>Example: Waybar module</h2>
      <p>Bind the toggle to a click handler on a Waybar status indicator; bind the word count to a tooltip. <code>qdbus</code> and <code>dbus-send</code> both work — use <code>--session</code>.</p>
    `,
    next: 'config', prev: 'mcp',
  },
  config: {
    title: 'Configuration',
    crumbs: 'REFERENCE / CONFIGURATION',
    lede: "All settings live under ~/.config/voxctr/. The Settings UI is a thin layer over these files — they're the source of truth.",
    body: `
      <h2>Files</h2>
      <table class="docs-table">
        <thead><tr><th>File</th><th>Format</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>config.json</td><td>JSON</td><td>Global settings — model, audio, UI, MCP, TTS</td></tr>
          <tr><td>targets.toml</td><td>TOML</td><td>Output target definitions</td></tr>
          <tr><td>bindings.toml</td><td>TOML</td><td>Hotkey → target bindings</td></tr>
          <tr><td>backups/</td><td>—</td><td>Auto-backups of all three (last 20 kept)</td></tr>
          <tr><td>overlays/</td><td>—</td><td>Custom overlay Python files</td></tr>
        </tbody>
      </table>

      <h2>Validation</h2>
      <p>A startup validator catches malformed <code>config.json</code>, <code>targets.toml</code>, and <code>bindings.toml</code> with clear error messages. Errors fall back to defaults rather than crashing the app.</p>

      <h2>Key settings</h2>
      <table class="docs-table">
        <thead><tr><th>Key</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>tts.enabled</td><td>false</td><td>Master TTS on/off</td></tr>
          <tr><td>tts.voice</td><td>en-us-lessac-medium</td><td>Active Piper voice</td></tr>
          <tr><td>tts.stop_key</td><td>[KEY_ESCAPE]</td><td>Global TTS interrupt</td></tr>
          <tr><td>tts.response_overlay</td><td>true</td><td>Show teal overlay during TTS</td></tr>
          <tr><td>mcp.server_enabled</td><td>false</td><td>Start MCP server on launch</td></tr>
          <tr><td>mcp.record_timeout</td><td>15.0</td><td>Default recording timeout (s)</td></tr>
          <tr><td>atspi.injection</td><td>true</td><td>Try at-spi2 insertText first</td></tr>
        </tbody>
      </table>
    `,
    next: 'architecture', prev: 'dbus',
  },
  architecture: {
    title: 'Architecture',
    crumbs: 'REFERENCE / ARCHITECTURE',
    lede: "What's inside the app, and how the parts talk to each other.",
    body: `
      <h2>Source layout</h2>
      <ul>
        <li><code>main.py</code> — application entry point</li>
        <li><code>input_listener.py</code> — evdev hotkey engine (hold / toggle / double-tap / TTS stop)</li>
        <li><code>audio_recorder.py</code> — PyAudio capture + VU meter</li>
        <li><code>inference_engine.py</code> — transcription + post-processing</li>
        <li><code>text_injector.py</code> — text delivery thread + routing dispatch</li>
        <li><code>llm_postprocessor.py</code> — Ollama integration</li>
        <li><code>tts_engine.py</code> — Piper/espeak engine, voice catalog, downloads</li>
        <li><code>tts_responder.py</code> — ResponseListener: FIFO → TTSEngine</li>
        <li><code>mcp_server.py</code> — MCP JSON-RPC server (Unix socket)</li>
        <li><code>atspi_context.py</code> — focus tracking, context reading, injection</li>
      </ul>

      <h2>Threading model</h2>
      <ul>
        <li>One Qt main thread for UI</li>
        <li>One audio thread for capture (~20–60ms callbacks)</li>
        <li>One transcription worker per recording</li>
        <li>One delivery thread per active target</li>
        <li>One MCP accept thread + N short-lived per-connection threads</li>
        <li>One ResponseListener daemon per target with <code>response_pipe</code></li>
      </ul>

      <h2>Backend selection</h2>
      <p>At startup, <code>BackendSelector</code> probes the system in this order:</p>
      <ul>
        <li>nvidia-smi — if it returns devices, prefer faster-whisper</li>
        <li>sysfs DRM vendor IDs (<code>/sys/class/drm/card*/device/vendor</code>) — detect AMD/Intel</li>
        <li>vulkaninfo — confirm a Vulkan-capable device is present</li>
        <li>If GPU detected but no CUDA libs, fall back to whisper.cpp</li>
        <li>If no GPU at all, faster-whisper int8 on CPU</li>
      </ul>

      <h2>Test coverage</h2>
      <p>280+ tests across DoubleTapMachine timing, all delivery types, TOML round-trips, voice catalog, MCP JSON-RPC dispatch, BackendProtocol contract, AT-SPI2 focus tracking, and config validation.</p>
    `,
    next: null, prev: 'config',
  },
};
