import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Terminal, Cpu, Layout, Code, Zap, ArrowRight, Brain, Sparkles,
  CheckCircle2, GitBranch,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';

type WorkflowTab = 'coding' | 'desktop' | 'agent';

export default function Landing() {
  const [workflowTab, setWorkflowTab] = useState<WorkflowTab>('coding');

  return (
    <div className="max-w-7xl mx-auto">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center relative py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(34,212,239,0.15),transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/20 text-primary font-medium text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          The Intelligent Audio Interface
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your voice. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Any agent.</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          VoxCtr is a programmable voice input platform for Linux.
          Connect your voice to any AI agent, CLI tool, or workflow—locally, privately, and with zero cloud dependency.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-2xl mx-auto px-4 mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/docs/quickstart" className="btn-primary flex-1 group">
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Get Started in 5 Minutes</span>
          </Link>
          <Link to="/docs" className="btn-ghost flex-1 group">
            <span>View Documentation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </motion.div>

        {/* Terminal install block */}
        <motion.div
          className="w-full max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CodeBlock lang="terminal" copyValue="pip install voxctr">
{`# Option A — pip (recommended)
pip install voxctr

# Option B — build from source
git clone https://github.com/JRufer/VoxCtr && cd VoxCtr && ./install.sh`}
          </CodeBlock>
        </motion.div>
      </section>

      {/* ── Positioning ────────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/5 bg-surface-container-lowest/50 -mx-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
            A first-class citizen of the AI tool ecosystem
          </h2>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            VoxCtr turns voice into a universal, low-latency, programmable input interface.
            By speaking the Model Context Protocol (MCP), VoxCtr integrates natively with Claude, Cursor, Zed,
            and any AI agent—no custom glue code required.
          </p>
        </div>
      </section>

      {/* ── Workflow Selector ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Choose Your Workflow</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            VoxCtr adapts to how you work. Select a scenario to see how it fits your stack.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {([
            { id: 'coding',  label: 'Voice Coding',         icon: <Code    className="w-4 h-4" /> },
            { id: 'desktop', label: 'Hands-Free Desktop',   icon: <Layout  className="w-4 h-4" /> },
            { id: 'agent',   label: 'AI Agent Backend',     icon: <Brain   className="w-4 h-4" /> },
          ] as { id: WorkflowTab; label: string; icon: React.ReactNode }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setWorkflowTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                workflowTab === tab.id
                  ? 'bg-primary text-black'
                  : 'glass-panel border border-white/10 text-on-surface-variant hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {workflowTab === 'coding' && (
          <motion.div
            key="coding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
                <h3 className="text-2xl font-display font-bold text-white mb-4">IDE-Aware Dictation</h3>
                <p className="text-on-surface-variant mb-6">
                  VoxCtr detects when VS Code, Neovim, or any terminal is focused via AT-SPI2 and automatically
                  switches to Code Mode—reformatting speech into valid syntax.
                </p>
                <ul className="space-y-3">
                  {[
                    'Say "function handle user login" → types handleUserLogin()',
                    'Say "constant max retries" → types MAX_RETRIES',
                    'Reads 300 chars of context to prime Whisper vocabulary',
                    'Inserts text directly via AT-SPI2—no keypress simulation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/docs/code-mode" className="btn-ghost w-full justify-center">
                Code Mode Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <CodeBlock lang="targets.toml">
{`[[target]]
id = "editor"
label = "Code Editor"
delivery = "inject"
post_processing = "code_mode"

[target.code_mode]
camel_case        = true
snake_case        = false
auto_punctuate    = false
context_chars     = 300
atspi_injection   = true`}
            </CodeBlock>
          </motion.div>
        )}

        {workflowTab === 'desktop' && (
          <motion.div
            key="desktop" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
                <h3 className="text-2xl font-display font-bold text-white mb-4">Full Desktop Control</h3>
                <p className="text-on-surface-variant mb-6">
                  Assign different hotkeys to different destinations. Hold Super+Space to dictate.
                  Double-tap Ctrl to issue agent commands. All without touching the mouse.
                </p>
                <ul className="space-y-3">
                  {[
                    'Hold-to-Talk, Toggle-to-Talk, or Double-Tap modes',
                    'Global hotkeys via evdev — works on any app, any desktop',
                    'Route to clipboard, focused window, or shell commands',
                    'Visual overlays confirm mic state in real time',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/docs/hotkeys" className="btn-ghost w-full justify-center">
                Hotkeys Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <CodeBlock lang="bindings.toml">
{`[[binding]]
keys    = ["KEY_LEFTMETA", "KEY_SPACE"]
gesture = "hold"
target  = "focused_window"
label   = "Dictate"

[[binding]]
keys    = ["KEY_LEFTCTRL"]
gesture = "double_tap"
target  = "hermes_agent"
label   = "Agent Command"

[[binding]]
keys    = ["KEY_LEFTMETA", "KEY_J"]
gesture = "hold"
target  = "journal"
label   = "Meeting Note"`}
            </CodeBlock>
          </motion.div>
        )}

        {workflowTab === 'agent' && (
          <motion.div
            key="agent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface-container-low card-outline">
                <h3 className="text-2xl font-display font-bold text-white mb-4">MCP Voice Interface</h3>
                <p className="text-on-surface-variant mb-6">
                  VoxCtr exposes its full voice pipeline as MCP tools. Claude, Cursor, Zed, and any
                  MCP-capable agent can trigger the mic, receive transcriptions, and queue spoken
                  responses—all through a standardized JSON-RPC 2.0 protocol.
                </p>
                <ul className="space-y-3">
                  {[
                    'transcribe_voice — agent triggers mic, you speak, text returned',
                    'speak_text — agent queues a spoken TTS response',
                    'get_status — query whether mic or TTS is currently active',
                    'One-click Claude Desktop registration via Settings UI',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                      <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/docs/mcp" className="btn-ghost w-full justify-center">
                MCP Server Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <CodeBlock lang="claude_desktop_config.json">
{`{
  "mcpServers": {
    "voxctr": {
      "command": "socat",
      "args": [
        "STDIO",
        "UNIX-CONNECT:/tmp/voxctr-mcp.sock"
      ]
    }
  }
}`}
            </CodeBlock>
          </motion.div>
        )}
      </section>

      {/* ── Use Cases Grid ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Built for the AI-First Workflow</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            From coding to research, VoxCtr shapes the meaning of your input before it ever reaches its destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UseCaseCard
            title="Claude in Cursor"
            scenario="Ask the user verbally"
            desc="Claude calls transcribe_voice. You speak. Claude receives the polished text and continues the task without you touching the keyboard."
            icon={<Brain className="text-primary" />}
          />
          <UseCaseCard
            title="Meeting Notes to Bullets"
            scenario="Hold Super+J to capture"
            desc="Spoken meeting notes are converted into structured bullet points via a local Ollama pipeline before being appended to your journal."
            icon={<Sparkles className="text-secondary" />}
          />
          <UseCaseCard
            title="Shell Commands from English"
            scenario="Voice-controlled automation"
            desc="Speak a command in plain English. VoxCtr converts it to a bash command using a local LLM and executes it directly."
            icon={<Terminal className="text-tertiary" />}
          />
          <UseCaseCard
            title="Code Comment Dictation"
            scenario="Context-aware Code Mode"
            desc="VoxCtr automatically detects your IDE, switches to Code Mode, and rewrites your speech as a concise, properly formatted code comment."
            icon={<Code className="text-primary" />}
          />
        </div>
      </section>

      {/* ── Per-Target Processing ──────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative p-8 rounded-3xl bg-surface-container-low card-outline overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-48 h-48 text-secondary" />
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-6">Per-Target Processing</h2>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
              Assign different gestures to different destinations. Each route can have its own
              post-processing mode—from raw transcription for agents to AI-polished prose for emails.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-container-highest/50 card-outline">
                <p className="text-sm font-bold text-white mb-1">Transcription (raw)</p>
                <p className="text-xs text-on-surface-variant">"Uh, I think we should, like, schedule a meeting for Friday at 3."</p>
              </div>
              <div className="flex justify-center py-2">
                <ArrowRight className="w-5 h-5 text-primary rotate-90" />
              </div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm font-bold text-primary mb-1">Route: Focused Window (Polish Mode)</p>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider mb-2">
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">strip_fillers</span>
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">ollama_rewrite</span>
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">spoken_punct</span>
                </div>
                <p className="text-xs text-white">"Schedule a meeting for Friday at 3:00 PM."</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-display font-bold text-white mb-6">Local &amp; Private</h3>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              VoxCtr keeps everything on your hardware. Using local Ollama models and on-device neural
              TTS (Piper), it delivers near-zero latency and absolute privacy.
              No data leaves your machine—not even for voice output.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low card-outline">
                <p className="text-sm font-bold text-white mb-1">AT-SPI2 Injection</p>
                <p className="text-xs text-on-surface-variant">Direct text insertion without keyboard simulation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low card-outline">
                <p className="text-sm font-bold text-white mb-1">Neural TTS</p>
                <p className="text-xs text-on-surface-variant">High-quality on-device speech synthesis with Piper.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hardware Performance Matrix ────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Automatic Hardware Acceleration</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            VoxCtr detects your GPU and selects the optimal transcription backend automatically.
            No configuration required.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-5 font-bold text-white">Hardware</th>
                <th className="p-5 font-bold text-white">Backend</th>
                <th className="p-5 font-bold text-white">Best For</th>
                <th className="p-5 font-bold text-white">Performance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-5">
                  <span className="text-sm font-bold text-white">NVIDIA GPU</span><br />
                  <span className="text-xs text-on-surface-variant">CUDA 11+</span>
                </td>
                <td className="p-5 font-mono text-sm text-primary">faster-whisper</td>
                <td className="p-5 text-sm text-on-surface-variant">Real-time Code Mode dictation</td>
                <td className="p-5">
                  <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary font-bold">Near-instant</span>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-5">
                  <span className="text-sm font-bold text-white">AMD / Intel GPU</span><br />
                  <span className="text-xs text-on-surface-variant">RDNA / Arc (Vulkan)</span>
                </td>
                <td className="p-5 font-mono text-sm text-secondary">whisper.cpp</td>
                <td className="p-5 text-sm text-on-surface-variant">High-efficiency system interaction</td>
                <td className="p-5">
                  <span className="px-2 py-1 rounded text-xs bg-secondary/20 text-secondary font-bold">High-speed</span>
                </td>
              </tr>
              <tr>
                <td className="p-5">
                  <span className="text-sm font-bold text-white">CPU Only</span><br />
                  <span className="text-xs text-on-surface-variant">Any x86_64 / ARM</span>
                </td>
                <td className="p-5 font-mono text-sm text-on-surface-variant">faster-whisper int8</td>
                <td className="p-5 text-sm text-on-surface-variant">Basic prose and system commands</td>
                <td className="p-5">
                  <span className="px-2 py-1 rounded text-xs bg-white/10 text-on-surface font-bold">Reliable</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-center text-sm text-on-surface-variant mt-6">
          <Link to="/docs" className="text-primary hover:underline">Full hardware compatibility guide →</Link>
        </p>
      </section>

      {/* ── Ecosystem Integrations ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Integrates with Your Stack</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Any MCP-capable agent or IDE can use VoxCtr as a first-class voice input layer.
            Zero custom integration code.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {[
            { name: 'Claude',     desc: 'Desktop & API' },
            { name: 'Cursor',     desc: 'IDE Agent' },
            { name: 'Zed',        desc: 'AI Editor' },
            { name: 'VS Code',    desc: 'MCP Extension' },
            { name: 'Neovim',     desc: 'Plugin' },
            { name: 'Any MCP',    desc: 'Protocol Standard' },
          ].map((item) => (
            <div key={item.name} className="p-4 rounded-2xl bg-surface-container-low card-outline text-center hover:bg-surface-container transition-colors">
              <p className="font-bold text-white text-sm">{item.name}</p>
              <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-surface-container-low card-outline">
          <p className="text-sm text-on-surface-variant text-center leading-relaxed">
            VoxCtr speaks the <span className="text-primary font-bold">Model Context Protocol</span>—the emerging standard
            for connecting LLMs to tools and data sources. Once running, any MCP-capable host discovers VoxCtr's
            capabilities automatically through a standard JSON-RPC 2.0 handshake.
          </p>
        </div>
      </section>

      {/* ── Core Messages ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MessageCard
            icon={<Shield className="text-primary" />}
            title="Private by Architecture"
            desc="Zero outbound traffic during dictation. Everything runs on your hardware, utilizing CUDA or Vulkan automatically. Your data stays yours."
          />
          <MessageCard
            icon={<Zap className="text-secondary" />}
            title="Wayland-Native"
            desc="The first AI audio interface built for Wayland. Native integration with modern Linux desktops and AT-SPI2 accessibility buses."
          />
          <MessageCard
            icon={<Code className="text-tertiary" />}
            title="Programmable Broker"
            desc="Composability is key. Route voice to DBus, inject via AT-SPI2, pipe to shell scripts, or feed AI agents—each with its own processing pipeline."
          />
        </div>
      </section>

      {/* ── Community / Stats ──────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Open Source &amp; MIT Licensed</h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Built in the open. Contributions, custom overlays, and forks are welcome.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
          <div className="p-8 rounded-3xl bg-surface-container-low card-outline text-center">
            <GitBranch className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white mb-2">280+</p>
            <p className="text-on-surface-variant text-sm">Automated Tests</p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-container-low card-outline text-center">
            <Cpu className="w-8 h-8 text-secondary mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white mb-2">3</p>
            <p className="text-on-surface-variant text-sm">GPU Backends</p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-container-low card-outline text-center">
            <Zap className="w-8 h-8 text-tertiary mx-auto mb-4" />
            <p className="text-3xl font-display font-bold text-white mb-2">7</p>
            <p className="text-on-surface-variant text-sm">Output Target Types</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/JRufer/VoxCtr"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <GitBranch className="w-5 h-5" />
            View on GitHub
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link to="/docs/quickstart" className="btn-primary">
            <Terminal className="w-5 h-5" />
            Quick Start Guide
          </Link>
        </div>
      </section>
    </div>
  );
}

function UseCaseCard({ title, scenario, desc, icon }: {
  title: string; scenario: string; desc: string; icon: React.ReactNode;
}) {
  return (
    <div className="p-8 rounded-3xl bg-surface-container-low card-outline hover:bg-surface-container transition-all group border-b-4 border-b-transparent hover:border-b-primary/50">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center card-outline group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">{title}</h3>
          <p className="text-xs text-primary font-bold uppercase tracking-widest">{scenario}</p>
        </div>
      </div>
      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  );
}

function MessageCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-surface-container-low card-outline relative overflow-hidden group">
      <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-6 relative z-10 card-outline">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed relative z-10">{desc}</p>
    </div>
  );
}
