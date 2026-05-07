import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Terminal, Settings, Zap, Code, Shield, Layout, Brain, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Documentation() {
  const location = useLocation();

  const links = [
    { to: '/docs', label: 'Installation', icon: Terminal },
    { to: '/docs/pipelines', label: 'Pipelines', icon: Brain },
    { to: '/docs/config', label: 'Configuration', icon: Settings },
    { to: '/docs/mcp', label: 'MCP Server', icon: Zap },
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
          <Route path="/pipelines" element={<PipelinesDocs />} />
          <Route path="/config" element={<ConfigurationDocs />} />
          <Route path="/mcp" element={<MCPDocs />} />
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
          VoxCtr is a native, on-device audio interface for Linux. 
          Follow these steps to set up the runtime on your machine.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">1</div>
          System Dependencies
        </h2>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm space-y-4">
          <p className="text-on-surface-variant border-b border-white/5 pb-2 mb-2"># Core dependencies (Arch Linux)</p>
          <code className="text-primary block">sudo pacman -S portaudio python-pyaudio wl-clipboard dbus pkgconf python-gobject ydotool wtype</code>
          
          <p className="text-on-surface-variant border-b border-white/5 pb-2 mt-6 mb-2"># For TTS voice output (Recommended)</p>
          <code className="text-primary block">sudo pacman -S alsa-utils piper-tts</code>
          
          <p className="text-on-surface-variant border-b border-white/5 pb-2 mt-6 mb-2"># For MCP server bridge</p>
          <code className="text-primary block">sudo pacman -S socat</code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">2</div>
          Clone & Environment
        </h2>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm space-y-4">
          <code className="text-primary block">git clone https://github.com/jrufer/voxctr.git</code>
          <code className="text-primary block">cd voxctr</code>
          <code className="text-primary block">python -m venv venv</code>
          <code className="text-primary block">source venv/bin/activate</code>
          <code className="text-primary block">pip install -r requirements.txt</code>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">3</div>
          GPU Acceleration
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <h3 className="font-bold text-white mb-3">NVIDIA (CUDA)</h3>
            <p className="text-sm text-on-surface-variant mb-4">Install the CUDA runtime libraries for faster-whisper.</p>
            <code className="text-xs bg-black p-2 rounded block text-secondary">pip install nvidia-cublas-cu12 nvidia-cudnn-cu12</code>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <h3 className="font-bold text-white mb-3">AMD/Intel (Vulkan)</h3>
            <p className="text-sm text-on-surface-variant mb-4">Use whisper.cpp with Vulkan acceleration.</p>
            <code className="text-xs bg-black p-2 rounded block text-secondary">yay -S whisper-cpp-vulkan</code>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function PipelinesDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Pipelines</h1>
        <p className="text-lg text-on-surface-variant">
          Pipelines allow you to shape the meaning of your voice input using local LLMs before it reaches its destination. 
          Defined in <code>pipelines.toml</code>, they consist of one or more stages.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Pipeline Stages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'strip_fillers', desc: 'Removes hesitation markers like "um", "uh", and "like".' },
            { name: 'ollama_prompt', desc: 'Rewrites text using a local LLM with custom system prompts.' },
            { name: 'code_mode', desc: 'Converts spoken constructs to syntax (e.g. "snake_case").' },
            { name: 'prepend / append', desc: 'Adds fixed strings to the start or end of the result.' },
            { name: 'ollama_classify', desc: 'Branches to different targets based on intent category.' },
          ].map((stage) => (
            <div key={stage.name} className="p-4 rounded-xl bg-surface-container-low card-outline flex flex-col gap-1">
              <code className="text-secondary font-bold">{stage.name}</code>
              <p className="text-sm text-on-surface-variant">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Example: Meeting Note Pipeline</h2>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs text-primary overflow-x-auto">
          <pre>{`[[pipeline]]
id = "meeting_note"
label = "Meeting Note — Structured"

[[pipeline.stage]]
type = "strip_fillers"

[[pipeline.stage]]
type = "ollama_prompt"
model = "llama3.2"
system_prompt = """
Convert the following spoken meeting note into a structured bullet point.
Return only the corrected text — no commentary.
"""
temperature = 0.3
timeout_ms = 5000

[[pipeline.stage]]
type = "prepend"
text = "- "`}</pre>
        </div>
      </section>
    </motion.div>
  );
}

function ConfigurationDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">Configuration</h1>
        <p className="text-lg text-on-surface-variant">
          VoxCtr uses TOML files in <code>~/.config/voxctr/</code> for targets, bindings, and pipelines.
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
        <h2 className="text-2xl font-display font-bold text-white mb-6">Double-Tap Bindings</h2>
        <p className="text-on-surface-variant mb-6">
          Double-tap modifier keys to switch voice destinations without touching the keyboard. 
          Defined in <code>bindings.toml</code>.
        </p>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm text-secondary">
          <pre>{`[[binding]]
id = "hermes_doubletap"
keys = ["KEY_LEFTCTRL"]
gesture = "double_tap"
target_id = "hermes"
tap_ms = 250`}</pre>
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
          VoxCtr transforms into a gateway for AI agents. Any MCP-capable host connects and immediately discovers voice capabilities.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
        <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Standard Tools
        </h3>
        <ul className="space-y-4 mt-4">
          <li className="flex gap-4">
            <code className="text-white shrink-0">record_and_transcribe</code>
            <p className="text-sm text-on-surface-variant">Triggers recording, runs the transcript through a specified pipeline, and returns the result.</p>
          </li>
          <li className="flex gap-4">
            <code className="text-white shrink-0">deliver_text</code>
            <p className="text-sm text-on-surface-variant">Queues text for local TTS playback. Replaces the legacy speak_text tool.</p>
          </li>
          <li className="flex gap-4">
            <code className="text-white shrink-0">run_pipeline</code>
            <p className="text-sm text-on-surface-variant">Processes raw text through any named pipeline without opening the microphone.</p>
          </li>
          <li className="flex gap-4">
            <code className="text-white shrink-0">get_status</code>
            <p className="text-sm text-on-surface-variant">Queries whether recording or speaking is currently in progress.</p>
          </li>
        </ul>
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Claude Desktop Integration</h2>
        <p className="text-on-surface-variant mb-6">
          VoxCtr handles registration automatically via the Settings UI, or you can add the socat bridge manually:
        </p>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-sm text-secondary">
          <pre>{`{
  "mcpServers": {
    "voxctr": {
      "command": "socat",
      "args": ["STDIO", "UNIX-CONNECT:/tmp/voxctr-mcp.sock"]
    }
  }
}`}</pre>
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
          Visual feedback while the microphone is active. Now includes routing indicator badges.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Waveform', desc: 'Classic OpenGL oscilloscope rendering the raw audio signal.' },
          { name: 'Pulse Circle', desc: 'Glowing circle that expands with audio amplitude.' },
          { name: 'Voice Card', desc: 'Floating terminal-style card with scrolling history.' },
        ].map((overlay) => (
          <div key={overlay.name} className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <h3 className="font-bold text-white mb-2">{overlay.name}</h3>
            <p className="text-sm text-on-surface-variant">{overlay.desc}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Routing Indicators</h2>
        <p className="text-on-surface-variant mb-6 text-sm">
          Every overlay displays a routing indicator badge—a small label showing the active output target (e.g. "Hermes Agent"). This gives unambiguous confirmation of where your speech is being sent.
        </p>
      </section>
    </motion.div>
  );
}

function ArchitectureDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h1 className="text-4xl font-display font-bold text-white mb-6">System Architecture</h1>
      <div className="p-8 rounded-3xl bg-surface-container-low card-outline">
        <pre className="text-xs md:text-sm font-mono text-on-surface-variant leading-relaxed">
{`Input Engine (evdev)
  ├── Hold / Toggle / Double-Tap
  └── TTS stop key interceptor
        ▼
Recording Controller (AudioRecorder)
        ▼
Transcription (faster-whisper / whisper.cpp)
        ▼
Pipelines (pipelines.toml)
  ├── Stage 1: strip_fillers
  ├── Stage 2: ollama_prompt
  └── Stage 3: append/prepend
        ▼
OutputTargetRouter (inject, exec, pipe, socket, etc.)
        ▼
ResponseListener (agent responses)
        ▼
TTSEngine (Piper / espeak-ng)`}
        </pre>
      </div>
    </motion.div>
  );
}
