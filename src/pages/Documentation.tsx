import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Terminal, Settings, Zap, Code, Shield, Layout, Brain, Command, MousePointer2, Volume2, Cpu, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Documentation() {
  const location = useLocation();

  const links = [
    { to: '/docs', label: 'Installation', icon: Terminal },
    { to: '/docs/hotkeys', label: 'Hotkeys', icon: Command },
    { to: '/docs/routing', label: 'Routing', icon: Settings },
    { to: '/docs/atspi', label: 'AT-SPI2', icon: MousePointer2 },
    { to: '/docs/tts', label: 'Voice Output', icon: Volume2 },
    { to: '/docs/mcp', label: 'MCP Server', icon: Zap },
    { to: '/docs/ai', label: 'AI Processing', icon: Brain },
    { to: '/docs/overlays', label: 'Overlays', icon: Layout },
    { to: '/docs/architecture', label: 'Architecture', icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 py-12">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        <div className="sticky top-32 p-6 rounded-3xl bg-surface-container-low card-outline">
          <h2 className="text-sm font-bold tracking-wider uppercase text-on-surface-variant mb-6 px-4">Documentation</h2>
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-w-0 max-w-4xl">
        <Routes>
          <Route path="/" element={<InstallationDocs />} />
          <Route path="/hotkeys" element={<HotkeyDocs />} />
          <Route path="/routing" element={<RoutingDocs />} />
          <Route path="/atspi" element={<ATSPIDocs />} />
          <Route path="/tts" element={<TTSDocs />} />
          <Route path="/mcp" element={<MCPDocs />} />
          <Route path="/ai" element={<AIDocs />} />
          <Route path="/overlays" element={<OverlayDocs />} />
          <Route path="/architecture" element={<ArchitectureDocs />} />
        </Routes>
      </div>
    </div>
  );
}

function InstallationDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Installation</h1>
        <p className="text-lg text-on-surface-variant">
          VoxCtl is a native, on-device voice-to-text tool for Linux. 
          Follow these steps to set up the runtime on your machine.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Hardware Compatibility</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">GPU Vendor</th>
                <th className="p-4 font-bold text-white">Backend</th>
                <th className="p-4 font-bold text-white">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-4 text-sm text-on-surface">NVIDIA (CUDA 11+)</td>
                <td className="p-4 text-sm text-primary font-mono">faster-whisper</td>
                <td className="p-4 text-sm text-on-surface-variant">Install CUDA libraries — no extra steps</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 text-sm text-on-surface">AMD (RDNA/GCN)</td>
                <td className="p-4 text-sm text-primary font-mono">whisper.cpp</td>
                <td className="p-4 text-sm text-on-surface-variant">Vulkan driver required</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-4 text-sm text-on-surface">Intel Arc / Iris Xe</td>
                <td className="p-4 text-sm text-primary font-mono">whisper.cpp</td>
                <td className="p-4 text-sm text-on-surface-variant">Build with GGML_VULKAN=ON</td>
              </tr>
              <tr>
                <td className="p-4 text-sm text-on-surface">No GPU (CPU only)</td>
                <td className="p-4 text-sm text-primary font-mono">faster-whisper int8</td>
                <td className="p-4 text-sm text-on-surface-variant">Slower for large models</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">A</div>
          AppImage (Easiest)
        </h2>
        <p className="text-on-surface-variant mb-4">Download the latest AppImage from Releases, then run the installer:</p>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm space-y-2">
          <code className="text-primary block">chmod +x install.sh</code>
          <code className="text-primary block">./install.sh</code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">B</div>
          Run from Source
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">1. System Dependencies</h3>
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs space-y-4">
              <code className="text-primary block">sudo pacman -S portaudio python-pyaudio wl-clipboard dbus pkgconf python-gobject ydotool wtype</code>
              <p className="text-on-surface-variant/60"># For TTS and MCP</p>
              <code className="text-primary block">sudo pacman -S alsa-utils piper-tts socat</code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">2. Setup Virtual Environment</h3>
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs space-y-2">
              <code className="text-primary block">git clone https://github.com/jrufer/voxctr.git && cd voxctr</code>
              <code className="text-primary block">python -m venv venv && source venv/bin/activate</code>
              <code className="text-primary block">pip install -r requirements.txt</code>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function HotkeyDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Hotkeys & Gestures</h1>
        <p className="text-lg text-on-surface-variant">
          VoxCtl uses low-level evdev listening to capture global hotkeys without needing window focus.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Gesture Modes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Command className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">Hold-to-Talk</h3>
            <p className="text-sm text-on-surface-variant">Hold while speaking, release to transcribe and deliver.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">Toggle-to-Talk</h3>
            <p className="text-sm text-on-surface-variant">Tap once to start, tap again to stop recording.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-2">Double-Tap</h3>
            <p className="text-sm text-on-surface-variant">Double-tap a modifier (e.g. Alt) and hold on the second tap.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Conflict Detection</h2>
        <p className="text-on-surface-variant mb-6">
          The Settings UI automatically validates your hotkeys for common collisions:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Exact Duplicate', desc: 'Two gestures share identical keys.' },
            { title: 'Subset Collision', desc: 'One binding is a subset of another.' },
            { title: 'Double-tap Overlap', desc: 'A double-tap key appears in a combo.' },
            { title: 'Bare Single Key', desc: 'Intercepts every press of a normal key.' },
          ].map((item) => (
            <li key={item.title} className="p-4 rounded-xl bg-white/5 flex gap-4 items-start">
              <div className="mt-1"><Info className="w-4 h-4 text-primary" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}

function RoutingDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Routing & Targets</h1>
        <p className="text-lg text-on-surface-variant">
          Assign different hotkey gestures to named destinations to route speech to the right tool automatically.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Delivery Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'inject', desc: 'Standard dictation into focused window' },
            { name: 'clipboard', desc: 'Copy transcript to system clipboard' },
            { name: 'exec', desc: 'Execute a CLI tool with {TEXT} placeholder' },
            { name: 'pipe', desc: 'Write directly to a named FIFO' },
            { name: 'socket', desc: 'TCP or Unix domain socket output' },
            { name: 'file', desc: 'Append to a voice journal or meeting notes' },
            { name: 'dbus', desc: 'Emit a custom DBus signal' },
          ].map((type) => (
            <div key={type.name} className="p-4 rounded-xl bg-surface-container-low card-outline flex flex-col gap-1">
              <code className="text-primary font-bold">{type.name}</code>
              <p className="text-sm text-on-surface-variant">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Post-Processing Modes</h2>
        <p className="text-on-surface-variant mb-6">Configure how text is processed per-target:</p>
        <div className="space-y-4">
          {[
            { name: 'default', desc: 'Full pipeline: snippets, punctuation, Ollama rewrite' },
            { name: 'none', desc: 'Raw Whisper output — best for agent targets' },
            { name: 'strip_fillers', desc: 'Remove um/uh/hmm only' },
            { name: 'snippets_only', desc: 'Expand snippets, no AI rewriting' },
          ].map((mode) => (
            <div key={mode.name} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <code className="text-secondary font-bold shrink-0">{mode.name}</code>
              <p className="text-sm text-on-surface-variant">{mode.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Config Example</h2>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs text-primary overflow-x-auto">
          <pre>{`# ~/.config/voxctl/targets.toml
[[target]]
id = "hermes"
label = "Hermes Agent"
delivery = "pipe"
pipe_path = "/tmp/hermes.in"
post_processing = "strip_fillers"
append_newline = true`}</pre>
        </div>
      </section>
    </motion.div>
  );
}

function ATSPIDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">AT-SPI2 Integration</h1>
        <p className="text-lg text-on-surface-variant">
          Optional accessibility integration for direct text insertion and context-aware transcription.
        </p>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
          <h3 className="font-bold text-white mb-2">Direct Insertion</h3>
          <p className="text-sm text-on-surface-variant">Inserts text directly via AT-SPI2 without simulating keystrokes, avoiding modifier conflicts.</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
          <h3 className="font-bold text-white mb-2">Context Reading</h3>
          <p className="text-sm text-on-surface-variant">Reads text before the cursor to prime Whisper with document-specific vocabulary.</p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
          <h3 className="font-bold text-white mb-2">Auto Code Mode</h3>
          <p className="text-sm text-on-surface-variant">Automatically switches to code dictation when a terminal or IDE is focused.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Configuration</h2>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm text-primary">
          <pre>{`{
  "atspi_injection": true,
  "atspi_context_prompt": true,
  "atspi_auto_code_mode": true
}`}</pre>
        </div>
      </section>
    </motion.div>
  );
}

function TTSDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Voice Output (TTS)</h1>
        <p className="text-lg text-on-surface-variant">
          Neural speech synthesis using Piper for high-quality, on-device audio responses.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: '8 Curated Voices', desc: 'Choose from various US and GB English models.' },
            { title: 'One-Click Download', desc: 'Manage models directly from the Settings UI.' },
            { title: 'TTS Stop Key', desc: 'Configurable key (default: Escape) to interrupt playback.' },
            { title: 'Response Overlay', desc: 'Teal visual indicator shown while the app is speaking.' },
          ].map((feature) => (
            <div key={feature.title} className="p-4 rounded-xl bg-surface-container-low card-outline">
              <h4 className="font-bold text-white text-sm">{feature.title}</h4>
              <p className="text-xs text-on-surface-variant mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function MCPDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">MCP Server</h1>
        <p className="text-lg text-on-surface-variant">
          Expose voice I/O as tools for any MCP-capable AI agent (like Claude Desktop).
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Available Tools</h2>
        <div className="space-y-4">
          {[
            { name: 'transcribe_voice', desc: 'AI triggers the mic, user speaks, transcript returned.' },
            { name: 'speak_text', desc: 'AI queues spoken responses through Piper/espeak.' },
            { name: 'get_status', desc: 'AI queries whether recording or speaking is in progress.' },
          ].map((tool) => (
            <div key={tool.name} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5 items-center">
              <code className="text-primary font-bold shrink-0">{tool.name}</code>
              <p className="text-sm text-on-surface-variant">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Claude Integration</h2>
        <p className="text-on-surface-variant mb-4">Click "Register in Claude Desktop" in Settings for automatic setup, or use this bridge config:</p>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs text-secondary overflow-x-auto">
          <pre>{`{
  "mcpServers": {
    "voxctl": {
      "command": "socat",
      "args": ["STDIO", "UNIX-CONNECT:/tmp/voxctl-mcp.sock"]
    }
  }
}`}</pre>
        </div>
      </section>
    </motion.div>
  );
}

function AIDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">AI Post-Processing</h1>
        <p className="text-lg text-on-surface-variant">
          Optionally post-process transcriptions through a local Ollama model for grammar, tone, or formatting.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Recommended Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { model: 'llama3.2:1b', ram: '~1.3 GB', use: 'Grammar & Bullets' },
            { model: 'phi3:mini', ram: '~2 GB', use: 'Simple Rewrites' },
            { model: 'mistral', ram: '~8 GB', use: 'Complex Rewriting' },
          ].map((m) => (
            <div key={m.model} className="p-4 rounded-2xl bg-surface-container-low card-outline">
              <code className="text-primary font-bold block mb-2">{m.model}</code>
              <p className="text-xs text-white mb-1">RAM: {m.ram}</p>
              <p className="text-xs text-on-surface-variant">{m.use}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function OverlayDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Recording Overlays</h1>
        <p className="text-lg text-on-surface-variant">
          Visual feedback while the microphone is active. Includes a routing indicator badge showing the active target.
        </p>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Voice Card', desc: 'Scrolling bar waveform in a floating card (Default).' },
          { name: 'Waveform', desc: 'Classic OpenGL oscilloscope rendering.' },
          { name: 'Pulse Circle', desc: 'Glowing circle that expands with amplitude.' },
        ].map((overlay) => (
          <div key={overlay.name} className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <h3 className="font-bold text-white mb-2">{overlay.name}</h3>
            <p className="text-sm text-on-surface-variant">{overlay.desc}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Custom Overlays</h2>
        <p className="text-on-surface-variant">
          Drop a single Python file into <code>~/.config/voxctl/overlays/</code> to create your own. 
          Overlays receive audio amplitude and the active routing label in real-time.
        </p>
      </section>
    </motion.div>
  );
}

function ArchitectureDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h1 className="text-4xl font-display font-bold text-white mb-6">System Architecture</h1>
      
      <section className="p-8 rounded-3xl bg-[#0e0e0e] border border-white/10 overflow-x-auto">
        <pre className="text-xs md:text-sm font-mono text-primary leading-relaxed">
{`Input Engine (evdev)
  ├── Hold / Toggle / Double-Tap
  └── TTS stop key interceptor
        ▼
Recording Controller (AudioRecorder)
        ▼
Transcription (faster-whisper / whisper.cpp)
        ▼
Post-Processing (per target)
  ├── snippets + spoken punct + Ollama
  ├── raw output / strip_fillers
        ▼
OutputTargetRouter (inject, exec, pipe, socket, etc.)
        ▼
ResponseListener (agent responses)
        ▼
TTSEngine (Piper / espeak-ng)`}
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Source Layout</h2>
        <div className="grid md:grid-cols-2 gap-8 text-xs font-mono">
          <div className="space-y-2">
            <p className="text-secondary">src/</p>
            <p className="text-on-surface-variant pl-4">├── main.py (Entry point)</p>
            <p className="text-on-surface-variant pl-4">├── input_listener.py (evdev engine)</p>
            <p className="text-on-surface-variant pl-4">├── inference_engine.py (Transcription)</p>
            <p className="text-on-surface-variant pl-4">├── tts_engine.py (Piper/espeak)</p>
            <p className="text-on-surface-variant pl-4">└── gui/ (PyQt6 Windows)</p>
          </div>
          <div className="space-y-2">
            <p className="text-secondary">tests/</p>
            <p className="text-on-surface-variant pl-4">├── test_targets.py (16 tests)</p>
            <p className="text-on-surface-variant pl-4">├── test_mcp_server.py (16 tests)</p>
            <p className="text-on-surface-variant pl-4">├── test_tts_engine.py (30 tests)</p>
            <p className="text-on-surface-variant pl-4">└── ... (Over 280 tests total)</p>
          </div>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-surface-container-low card-outline flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">Running Tests</h3>
          <p className="text-sm text-on-surface-variant">Ensure stability with pytest</p>
        </div>
        <code className="bg-black px-4 py-2 rounded text-primary text-xs font-mono">python -m pytest tests/</code>
      </section>
    </motion.div>
  );
}
