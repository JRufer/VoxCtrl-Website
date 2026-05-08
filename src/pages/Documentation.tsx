import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Terminal, Settings, Zap, Code, Shield, Layout, Brain, Command,
  MousePointer2, Volume2, Info, CheckCircle2, BookOpen,
  FileText, Lock, List, Rocket, Layers, ChevronDown,
  ChevronLeft, ChevronRight, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeBlock from '../components/CodeBlock';

import voiceOverlay from '../assets/voice_overlay.gif';
import boxOverlay from '../assets/box_overlay.gif';
import dotOverlay from '../assets/dot_overlay.gif';

// ─── Sidebar link groups ──────────────────────────────────────────────────────

const linkGroups = [
  {
    heading: 'Getting Started',
    links: [
      { to: '/docs/quickstart', label: 'Quickstart', icon: Rocket },
      { to: '/docs', label: 'Installation', icon: Terminal },
      { to: '/docs/concepts', label: 'Core Concepts', icon: Layers },
    ],
  },
  {
    heading: 'Input & Routing',
    links: [
      { to: '/docs/hotkeys', label: 'Hotkeys', icon: Command },
      { to: '/docs/routing', label: 'Routing & Targets', icon: Settings },
      { to: '/docs/atspi', label: 'AT-SPI2', icon: MousePointer2 },
      { to: '/docs/code-mode', label: 'Code Mode', icon: Code },
    ],
  },
  {
    heading: 'AI & Voice',
    links: [
      { to: '/docs/ai', label: 'AI Processing', icon: Brain },
      { to: '/docs/tts', label: 'Voice Output', icon: Volume2 },
      { to: '/docs/overlays', label: 'Overlays', icon: Layout },
    ],
  },
  {
    heading: 'Integrations',
    links: [
      { to: '/docs/mcp', label: 'MCP Server', icon: Zap },
      { to: '/docs/security', label: 'Security', icon: Lock },
    ],
  },
  {
    heading: 'Reference',
    links: [
      { to: '/docs/configuration', label: 'Configuration', icon: FileText },
      { to: '/docs/tutorials', label: 'Tutorials', icon: BookOpen },
      { to: '/docs/architecture', label: 'Architecture', icon: Shield },
    ],
  },
];

// ─── Root component ───────────────────────────────────────────────────────────

export default function Documentation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const activeLinkLabel = linkGroups
    .flatMap(g => g.links)
    .find(l => l.to === location.pathname || (l.to === '/docs' && location.pathname === '/docs'))?.label || 'Installation';

  const allLinks = linkGroups.flatMap(g => g.links);
  const currentIndex = allLinks.findIndex(l =>
    l.to === location.pathname || (l.to === '/docs' && location.pathname === '/docs')
  );

  const prev = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const next = currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 lg:py-12">
      {/* Sidebar */}
      <aside className="lg:w-52 shrink-0 px-6 lg:px-0">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-full flex items-center justify-between p-4 rounded-2xl bg-surface-container-low card-outline mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <List className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">{activeLinkLabel}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Sidebar (Collapsible) */}
        <div className="lg:hidden">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden p-6 rounded-3xl bg-surface-container-low card-outline mb-8"
              >
                <SidebarContent location={location} />
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Sidebar (Sticky) */}
        <nav className="hidden lg:block sticky top-32 p-6 rounded-3xl bg-surface-container-low card-outline">
          <SidebarContent location={location} />
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 min-w-0 max-w-4xl px-6 lg:px-0 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<InstallationDocs />} />
            <Route path="/quickstart" element={<QuickstartDocs />} />
            <Route path="/concepts" element={<ConceptsDocs />} />
            <Route path="/hotkeys" element={<HotkeyDocs />} />
            <Route path="/routing" element={<RoutingDocs />} />
            <Route path="/atspi" element={<ATSPIDocs />} />
            <Route path="/code-mode" element={<CodeModeDocs />} />
            <Route path="/ai" element={<AIDocs />} />
            <Route path="/tts" element={<TTSDocs />} />
            <Route path="/overlays" element={<OverlayDocs />} />
            <Route path="/mcp" element={<MCPDocs />} />
            <Route path="/security" element={<SecurityDocs />} />
            <Route path="/configuration" element={<ConfigDocs />} />
            <Route path="/tutorials" element={<TutorialsDocs />} />
            <Route path="/architecture" element={<ArchitectureDocs />} />
          </Routes>
        </div>

        {/* Scroll to Top */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/5 text-on-surface-variant hover:text-primary hover:border-primary/20 transition-all text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </button>
        </div>

        {/* Navigation Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {prev ? (
            <Link
              to={prev.to}
              className="group flex flex-col items-start gap-2 p-4 rounded-2xl bg-surface-container-low card-outline hover:bg-surface-container transition-all w-full sm:w-auto min-w-[200px]"
            >
              <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
                <ChevronLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">{prev.label}</span>
            </Link>
          ) : <div className="hidden sm:block" />}

          {next ? (
            <Link
              to={next.to}
              className="group flex flex-col items-end gap-2 p-4 rounded-2xl bg-surface-container-low card-outline hover:bg-surface-container transition-all w-full sm:w-auto min-w-[200px] text-right"
            >
              <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
                Next <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-sm font-bold text-white group-hover:-translate-x-1 transition-transform">{next.label}</span>
            </Link>
          ) : <div className="hidden sm:block" />}
        </footer>
      </main>
    </div>
  );
}

function SidebarContent({ location }: { location: any }) {
  return (
    <>
      {linkGroups.map((group) => (
        <div key={group.heading} className="mb-6 last:mb-0">
          <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 px-4 mb-2">
            {group.heading}
          </p>
          <div className="flex flex-col gap-1">
            {group.links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to ||
                (link.to === '/docs' && location.pathname === '/docs');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex gap-3">
      <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <p className="text-sm text-on-surface-variant">{children}</p>
    </div>
  );
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex gap-3">
      <Info className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
      <p className="text-sm text-on-surface-variant">{children}</p>
    </div>
  );
}

function FeatureGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.title} className="p-4 rounded-xl bg-surface-container-low card-outline">
          <h4 className="font-bold text-white text-sm">{item.title}</h4>
          <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div>
      <h1 className="text-4xl font-display font-bold text-white mb-4">{title}</h1>
      {desc && <p className="text-lg text-on-surface-variant">{desc}</p>}
    </div>
  );
}

// ─── Quickstart ───────────────────────────────────────────────────────────────

function QuickstartDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Quickstart"
        desc="From zero to your first voice transcription in under five minutes."
      />

      <ol className="space-y-10 list-none">
        {/* Step 1 */}
        <li>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">1</div>
            <h2 className="text-xl font-display font-bold text-white">Install VoxCtr</h2>
          </div>
          <p className="text-on-surface-variant mb-4 ml-12">Choose the AppImage for the fastest path, or clone the repository to run from source.</p>
          <div className="ml-12 space-y-4">
            {/* FIX: Removed non-existent `pip install voxctr`. README only lists AppImage and source. */}
            <CodeBlock lang="bash">{`# Option A — AppImage (recommended)
# Download VoxCtr-x86_64.AppImage from Releases, then:
bash install.sh

# Option B — build from source
git clone https://github.com/JRufer/VoxCtr && cd VoxCtr
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt`}</CodeBlock>
          </div>
        </li>

        {/* Step 2 */}
        <li>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">2</div>
            <h2 className="text-xl font-display font-bold text-white">Install system dependencies</h2>
          </div>
          <p className="text-on-surface-variant mb-4 ml-12">The AppImage installer handles this automatically. For source installs, run the setup script or install manually:</p>
          <div className="ml-12">
            <CodeBlock lang="bash (Arch/Manjaro)">{`sudo pacman -S portaudio wl-clipboard xdotool wtype xclip alsa-utils espeak-ng

# Optional: MCP / Claude Desktop bridge
sudo pacman -S socat

# Optional: AT-SPI2 accessibility
sudo pacman -S python-atspi`}</CodeBlock>
          </div>
        </li>

        {/* Step 3 */}
        <li>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">3</div>
            <h2 className="text-xl font-display font-bold text-white">Set up permissions</h2>
          </div>
          <p className="text-on-surface-variant mb-4 ml-12">Global hotkeys require evdev access. The installer handles this; for source installs run:</p>
          <div className="ml-12">
            <CodeBlock lang="bash">{`sudo bash scripts/setup-permissions.sh
# Then log out and back in for group changes to take effect`}</CodeBlock>
          </div>
        </li>

        {/* Step 4 */}
        <li>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">4</div>
            <h2 className="text-xl font-display font-bold text-white">Launch VoxCtr</h2>
          </div>
          <p className="text-on-surface-variant mb-4 ml-12">Run the app. A system tray icon appears—right-click it to access Settings. On first launch a wizard guides you through choosing a Whisper model and configuring hotkeys.</p>
          <div className="ml-12">
            <CodeBlock lang="bash">{`voxctr
# or from source:
./voxctr.sh`}</CodeBlock>
          </div>
        </li>

        {/* Step 5 */}
        <li>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">5</div>
            <h2 className="text-xl font-display font-bold text-white">Speak your first sentence</h2>
          </div>
          <p className="text-on-surface-variant mb-4 ml-12">Click into any text field. Hold <code className="text-primary bg-white/5 px-1 rounded">Super+Space</code> (default), say something, then release. The overlay animates while the mic is active—your text appears when you let go.</p>
          <div className="ml-12">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm font-bold text-primary mb-1">You said:</p>
              <p className="text-xs text-on-surface-variant">"Schedule a team sync for Thursday at 2 PM"</p>
              <div className="my-2 border-t border-primary/20" />
              <p className="text-sm font-bold text-primary mb-1">Injected:</p>
              <p className="text-xs text-white">Schedule a team sync for Thursday at 2 PM.</p>
            </div>
          </div>
        </li>
      </ol>

      <section className="p-6 rounded-2xl bg-surface-container-low card-outline">
        <h3 className="font-bold text-white mb-4">Next steps</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Add more targets', to: '/docs/routing', desc: 'Route to agents, files, sockets' },
            { label: 'Enable MCP', to: '/docs/mcp', desc: 'Connect Claude Desktop' },
            { label: 'Code Mode', to: '/docs/code-mode', desc: 'IDE-aware syntax dictation' },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <p className="font-bold text-primary text-sm">{item.label}</p>
              <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ─── Core Concepts ────────────────────────────────────────────────────────────

function ConceptsDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Core Concepts"
        desc="Understanding how VoxCtr models voice input, routing, and processing."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">The Life of a Request</h2>
        <p className="text-on-surface-variant mb-6">Every spoken utterance travels through the same pipeline, but each leg is configurable per hotkey binding.</p>
        <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs overflow-x-auto">
          <pre className="text-primary leading-loose">{`Hotkey gesture (evdev)
  └─ Hold / Toggle / Double-Tap
         │
         ▼
AudioRecorder  ←─ VAD silence detection
         │
         ▼
Transcription Engine
  ├─ faster-whisper  (NVIDIA CUDA)
  └─ whisper.cpp     (AMD/Intel Vulkan, CPU)
         │
         ▼
Post-Processing Pipeline  [per-target]
  ├─ strip_fillers
  ├─ snippets + spoken_punct
  ├─ ollama_prompt  (local LLM rewrite)
  └─ code_mode
         │
         ▼
OutputTargetRouter
  ├─ inject   (AT-SPI2 → focused window)
  ├─ clipboard
  ├─ exec     (shell command)
  ├─ pipe     (named FIFO)
  ├─ socket   (TCP / Unix)
  ├─ file     (append)
  └─ dbus     (DBus signal)
         │
         ▼
ResponseListener  (optional)
         │
         ▼
TTSEngine  (Piper / espeak-ng)`}</pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Key Abstractions</h2>
        <div className="space-y-6">
          {[
            {
              term: 'Binding',
              def: 'A hotkey gesture mapped to a target. Each binding specifies keys, gesture type (hold/toggle/double-tap), and which named target receives the transcript.',
            },
            {
              term: 'Target',
              def: 'A named output destination with its own delivery type and post-processing pipeline. You can have many targets and switch between them by using different hotkeys.',
            },
            {
              term: 'Pipeline',
              def: 'An ordered sequence of processing stages applied to the raw Whisper transcript before delivery. Stages include strip_fillers, ollama_prompt, snippets, spoken_punct, and code_mode.',
            },
            {
              term: 'AT-SPI2',
              def: 'The Linux accessibility bus. VoxCtr uses it for context-aware text injection (avoiding keypress simulation) and to read the text before the cursor to prime Whisper with relevant vocabulary.',
            },
            {
              term: 'MCP Server',
              def: 'VoxCtr\'s built-in Model Context Protocol server. Exposes transcribe_voice, speak_text, and get_status as tools any MCP-capable AI agent can call.',
            },
          ].map((item) => (
            <div key={item.term} className="p-5 rounded-2xl bg-surface-container-low card-outline">
              <h3 className="font-bold text-primary mb-2 font-mono">{item.term}</h3>
              <p className="text-sm text-on-surface-variant">{item.def}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">The Broker Model</h2>
        <p className="text-on-surface-variant mb-4">
          VoxCtr is not a dictation app—it is a voice input <em className="text-white">broker</em>. The distinction matters:
          a dictation app types what you say into the focused window. A broker can send the same utterance—
          or differently processed versions—to multiple independent systems simultaneously.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Single utterance, multiple destinations', desc: 'The same spoken sentence can be injected into your editor, logged to a file, and sent to an agent pipeline in one gesture.' },
            { title: 'Per-destination AI shaping', desc: 'Your editor target uses grammar correction; your agent target uses raw output; your journal target uses bullet formatting—all from the same speech.' },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-xl bg-white/5 card-outline flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-xs text-on-surface-variant mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ─── Installation ─────────────────────────────────────────────────────────────

function InstallationDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Installation"
        desc="VoxCtr is a native, on-device voice-to-text tool for Linux. Follow these steps to set up the runtime on your machine."
      />

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
              {[
                { gpu: 'NVIDIA (CUDA 11+)', be: 'faster-whisper', note: 'Install CUDA libraries — no extra steps' },
                { gpu: 'AMD (RDNA/GCN)', be: 'whisper.cpp', note: 'Vulkan driver required' },
                { gpu: 'Intel Arc / Iris Xe', be: 'whisper.cpp', note: 'Build with GGML_VULKAN=ON' },
                { gpu: 'No GPU (CPU only)', be: 'faster-whisper int8', note: 'Slower for large models; reliable fallback' },
              ].map((row, i, arr) => (
                <tr key={row.gpu} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm text-on-surface">{row.gpu}</td>
                  <td className="p-4 text-sm text-primary font-mono">{row.be}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-on-surface-variant mt-4">The backend is chosen automatically at startup using GPU detection via <code className="text-primary bg-white/5 px-1 rounded">nvidia-smi</code>, sysfs DRM vendor IDs, and <code className="text-primary bg-white/5 px-1 rounded">vulkaninfo</code>. Override it in <strong className="text-white">Settings → Engine</strong>.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">A</span>
          AppImage (Recommended)
        </h2>
        <p className="text-on-surface-variant mb-4">Download the latest <code className="text-primary bg-white/5 px-1 rounded">VoxCtr-x86_64.AppImage</code> from <a href="https://github.com/JRufer/VoxCtr/releases" className="text-primary hover:underline">Releases</a>, then run the installer:</p>
        <CodeBlock lang="bash">{`bash install.sh`}</CodeBlock>
        <p className="text-sm text-on-surface-variant mt-4">The installer detects your package manager, installs system libraries, downloads Piper TTS, creates udev rules, and adds you to the <code className="text-primary bg-white/5 px-1 rounded">input</code>/<code className="text-primary bg-white/5 px-1 rounded">uinput</code> groups. <strong className="text-white">Log out and back in</strong> after it completes.</p>
        <p className="text-sm text-on-surface-variant mt-2">Or build the AppImage from source first:</p>
        <CodeBlock lang="bash">{`bash scripts/build_appimage.sh`}</CodeBlock>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">B</span>
          Run from Source
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">1. System Dependencies</h3>
            <CodeBlock lang="bash (Arch/Manjaro)">{`sudo pacman -S portaudio wl-clipboard xdotool wtype xclip alsa-utils espeak-ng
# Optional: MCP / Claude Desktop bridge
sudo pacman -S socat
# Optional: AT-SPI2 accessibility
sudo pacman -S python-atspi`}</CodeBlock>
            <div className="mt-4">
              <CodeBlock lang="bash (Debian/Ubuntu)">{`sudo apt install libportaudio2 wl-clipboard xdotool wtype xclip alsa-utils espeak-ng
# Optional
sudo apt install socat python3-pyatspi`}</CodeBlock>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">2. Permissions (evdev hotkeys)</h3>
            <CodeBlock lang="bash">{`sudo bash scripts/setup-permissions.sh
# Log out and back in after this step`}</CodeBlock>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">3. Clone and Set Up Virtual Environment</h3>
            <CodeBlock lang="bash">{`git clone https://github.com/jrufer/voxctr.git && cd voxctr
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt`}</CodeBlock>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">4. Optional: NVIDIA GPU Acceleration</h3>
            <CodeBlock lang="bash">{`pip install nvidia-cublas-cu12 nvidia-cudnn-cu12`}</CodeBlock>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">5. Launch</h3>
            <CodeBlock lang="bash">{`./voxctr.sh`}</CodeBlock>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Whisper Model Download</h2>
        <p className="text-on-surface-variant mb-4">On first launch a wizard guides you through choosing a model size. The model downloads automatically (~140 MB for <code className="text-primary bg-white/5 px-1 rounded">base</code>, ~2.9 GB for <code className="text-primary bg-white/5 px-1 rounded">large-v3</code>). Change the model anytime in <strong className="text-white">Settings → Engine</strong>.</p>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Model</th>
                <th className="p-4 font-bold text-white">VRAM</th>
                <th className="p-4 font-bold text-white">Speed</th>
                <th className="p-4 font-bold text-white">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {[
                { model: 'tiny.en', vram: '~1 GB', speed: 'Fastest', acc: 'Good for commands' },
                { model: 'small.en / base', vram: '~2 GB', speed: 'Fast', acc: 'Recommended default' },
                { model: 'medium.en', vram: '~5 GB', speed: 'Moderate', acc: 'High accuracy prose' },
                { model: 'large-v3', vram: '~10 GB', speed: 'Slow', acc: 'Multilingual, best quality' },
              ].map((row, i, arr) => (
                <tr key={row.model} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 font-mono text-sm text-primary">{row.model}</td>
                  <td className="p-4 text-sm text-on-surface">{row.vram}</td>
                  <td className="p-4 text-sm text-on-surface">{row.speed}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.acc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

// ─── Hotkeys ──────────────────────────────────────────────────────────────────

function HotkeyDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Hotkeys & Gestures"
        desc="VoxCtr uses low-level evdev listening to capture global hotkeys without needing window focus."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Default Hotkeys</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Gesture</th>
                <th className="p-4 font-bold text-white">Keys</th>
                <th className="p-4 font-bold text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { gesture: 'Hold-to-Talk', keys: 'Super + Space', action: 'Hold while speaking, release to transcribe and inject' },
                { gesture: 'Toggle-to-Talk', keys: 'Ctrl + Super + Space', action: 'Tap to start recording, tap again to stop' },
                { gesture: 'Double-Tap', keys: 'Alt', action: 'Double-tap and hold Alt to record, release to deliver' },
              ].map((row, i, arr) => (
                <tr key={row.gesture} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm font-bold text-white">{row.gesture}</td>
                  <td className="p-4 font-mono text-sm text-primary">{row.keys}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-on-surface-variant mt-4">All hotkeys are configurable in <strong className="text-white">Settings → Hotkeys</strong> or directly in <code className="text-primary bg-white/5 px-1 rounded">bindings.toml</code>. Each gesture can be individually disabled without deleting the binding.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Gesture Modes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Command className="w-5 h-5" />, color: 'primary', name: 'Hold-to-Talk', desc: 'Hold while speaking, release to transcribe and deliver.' },
            { icon: <Zap className="w-5 h-5" />, color: 'secondary', name: 'Toggle-to-Talk', desc: 'Tap once to start, tap again to stop recording.' },
            { icon: <MousePointer2 className="w-5 h-5" />, color: 'tertiary', name: 'Double-Tap', desc: 'Double-tap a modifier (e.g. Alt) and hold on the second tap to record.' },
          ].map((g) => (
            <div key={g.name} className="p-6 rounded-2xl bg-surface-container-low card-outline">
              <div className={`w-10 h-10 rounded-xl bg-${g.color}/10 flex items-center justify-center text-${g.color} mb-4`}>
                {g.icon}
              </div>
              <h3 className="font-bold text-white mb-2">{g.name}</h3>
              <p className="text-sm text-on-surface-variant">{g.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <InfoBox>Double-tap hotkeys avoid collisions with normal modifier usage—double-tapping <code>Alt</code> never fires when <code>Alt</code> is held as part of a normal chord like <code>Alt+Tab</code>. The tap window defaults to 250 ms.</InfoBox>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Configuration</h2>
        {/* FIX: `target` → `target_id` to match actual TOML format in examples/bindings-multi.toml */}
        <CodeBlock lang="~/.config/voxctr/bindings.toml">{`format_version = "1.1"

[[binding]]
id      = "default_hold"
label   = "Dictate (Hold)"
keys    = ["KEY_LEFTMETA", "KEY_SPACE"]
gesture = "hold"
target_id = "default"
tap_ms  = 250
hold_threshold_ms = 200

[[binding]]
id      = "hermes_doubletap"
label   = "Voice to Hermes (double-tap Ctrl)"
keys    = ["KEY_LEFTCTRL"]
gesture = "double_tap"
target_id = "hermes"
tap_ms  = 280
hold_threshold_ms = 200

[[binding]]
id      = "journal_hold"
label   = "Journal Note"
keys    = ["KEY_F18"]
gesture = "hold"
target_id = "journal"
disabled = false   # set true to disable without deleting

# TTS stop key (global, in config.json)
# tts_stop_key = ["KEY_ESCAPE"]`}</CodeBlock>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Recording Key Bindings</h2>
        <p className="text-on-surface-variant mb-4">In the binding editor, press the <strong className="text-white">Bind</strong> button next to a key field. The button turns orange and displays "Recording…". Press your desired keys simultaneously — the display updates live as keys are held. When you release all keys the binding is captured automatically.</p>
        <p className="text-on-surface-variant">For <strong className="text-white">Chord</strong> bindings the editor shows two separate Bind fields: <strong className="text-white">Hold keys</strong> (modifier keys you hold) and <strong className="text-white">Trigger key</strong> (the additional key pressed while holding). Keys are sorted automatically so modifiers appear before the trigger key.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Conflict Detection</h2>
        <p className="text-on-surface-variant mb-6">The Settings UI automatically validates hotkeys for common collisions:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Exact Duplicate', desc: 'Two gestures share identical keys—both fire simultaneously.' },
            { title: 'Subset Collision', desc: 'One binding\'s keys are a subset of another\'s—the shorter one always fires with the longer.' },
            { title: 'Double-Tap Overlap', desc: 'A double-tap key appears in a hold or toggle combo—may cause mis-fires.' },
            { title: 'Bare Single Key', desc: 'A non-modifier key used alone intercepts every press of that key.' },
          ].map((item) => (
            <li key={item.title} className="p-4 rounded-xl bg-white/5 flex gap-4 items-start">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
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

// ─── Routing & Targets ────────────────────────────────────────────────────────

function RoutingDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Routing & Targets"
        desc="Assign different hotkey gestures to named destinations to route speech to the right tool automatically."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Delivery Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'inject', desc: 'Direct text insertion into the focused window via AT-SPI2 → wtype → xdotool fallback chain.' },
            { name: 'clipboard', desc: 'Copy transcript to the system clipboard (wl-copy on Wayland, xclip on X11).' },
            { name: 'exec', desc: 'Execute a shell command, substituting {TEXT} with the transcript. Uses shell=False to prevent injection attacks.' },
            { name: 'pipe', desc: 'Write directly to a named FIFO with O_NONBLOCK. Ideal for agent integrations.' },
            { name: 'socket', desc: 'Send over a TCP or Unix domain socket to distributed systems.' },
            { name: 'file', desc: 'Append transcript to a voice journal or meeting notes file, with optional timestamp.' },
            { name: 'dbus', desc: 'Emit a custom DBus signal—useful for Waybar integration and desktop automation.' },
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
        <p className="text-on-surface-variant mb-6">Configure how text is shaped per-target before delivery using the <code className="text-primary bg-white/5 px-1 rounded">post_processing</code> key:</p>
        {/* FIX: Added ollama_only (real mode from README); removed code_mode (not a post_processing value) */}
        <div className="space-y-3">
          {[
            { name: 'default', desc: 'Full pipeline: snippets, spoken punctuation, filler removal, Ollama rewrite (if enabled).' },
            { name: 'none', desc: 'Raw Whisper output — best for agent targets that do their own processing.' },
            { name: 'strip_fillers', desc: 'Remove um/uh/hmm only. No AI rewriting.' },
            { name: 'snippets_only', desc: 'Expand text snippets; no AI rewriting or spoken punctuation.' },
            { name: 'ollama_only', desc: 'Skip snippets and code mode; run Ollama rewrite only.' },
          ].map((mode) => (
            <div key={mode.name} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <code className="text-secondary font-bold shrink-0 w-36">{mode.name}</code>
              <p className="text-sm text-on-surface-variant">{mode.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <InfoBox>Agent targets (<code>exec</code>, <code>pipe</code>, <code>socket</code>) should almost always use <code>post_processing = "none"</code> or <code>"strip_fillers"</code> — rewriting alters command semantics.</InfoBox>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Quiet Mode</h2>
        <p className="text-on-surface-variant mb-4">
          Enable <strong className="text-white">Quiet Mode</strong> per-target for boosted VAD sensitivity during soft-spoken dictation—useful in open-plan offices or when speaking quietly. Combine it with optional noise suppression via <code className="text-primary bg-white/5 px-1 rounded">noisereduce</code>:
        </p>
        <CodeBlock lang="targets.toml">{`[[target]]
id              = "office_quiet"
label           = "Office (Noise Suppressed)"
delivery        = "inject"
post_processing = "default"
processing = {noise_suppression = true, quiet_mode = true, remove_fillers = true}`}</CodeBlock>
        <p className="text-sm text-on-surface-variant mt-3">Noise suppression requires the <code className="text-primary bg-white/5 px-1 rounded">noisereduce</code> package, included in <code className="text-primary bg-white/5 px-1 rounded">requirements.txt</code>. The global noise suppression toggle must also be on for target-level overrides to apply.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Named Target Gallery</h2>
        <p className="text-on-surface-variant mb-8">Copy-paste these patterns into <code className="text-primary bg-white/5 px-1 rounded">~/.config/voxctr/targets.toml</code> as a starting point. Ready-to-use example files are also in the <code className="text-primary bg-white/5 px-1 rounded">examples/</code> directory.</p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Pattern: Agent Command Pipe</h3>
            <p className="text-sm text-on-surface-variant mb-3">Send voice commands to a CLI agent via FIFO. Post-processing strips fillers so the agent gets clean input.</p>
            <CodeBlock lang="toml">{`[[target]]
id              = "hermes"
label           = "Hermes Agent"
delivery        = "pipe"
pipe_path       = "/tmp/hermes.in"
post_processing = "strip_fillers"
append_newline  = true

# Agent writes responses here → VoxCtr speaks them via TTS
response_pipe   = "/tmp/hermes.out"`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Pattern: Voice Journal</h3>
            <p className="text-sm text-on-surface-variant mb-3">Append timestamped entries to a markdown journal. Ollama formats each utterance as a concise note.</p>
            <CodeBlock lang="toml">{`[[target]]
id              = "journal"
label           = "Daily Journal"
delivery        = "file"
file_path       = "~/journal.md"
file_prefix     = "> "
file_timestamp  = true
post_processing = "default"
append_newline  = true`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Pattern: Shell Command Execution</h3>
            {/* FIX: `exec_command` → `command` to match actual TOML key from examples/targets-multi.toml */}
            <p className="text-sm text-on-surface-variant mb-3">Execute arbitrary commands. Use <code className="text-primary bg-white/5 px-1 rounded">{'{TEXT}'}</code> as the placeholder—it is substituted as a literal argument with <code className="text-primary bg-white/5 px-1 rounded">shell=False</code> to prevent injection attacks.</p>
            <CodeBlock lang="toml">{`[[target]]
id              = "cliphist"
label           = "Cliphist"
delivery        = "exec"
command         = "wl-copy {TEXT}"
post_processing = "strip_fillers"
append_newline  = false`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3">Pattern: TCP Socket to Remote Agent</h3>
            <p className="text-sm text-on-surface-variant mb-3">Forward transcripts over TCP for distributed or containerised agent setups.</p>
            <CodeBlock lang="toml">{`[[target]]
id              = "remote_agent"
label           = "Remote Service"
delivery        = "socket"
socket_host     = "192.168.1.50"
socket_port     = 9000
post_processing = "none"
append_newline  = true`}</CodeBlock>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Agent Example Summary</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Target</th>
                <th className="p-4 font-bold text-white">Delivery</th>
                <th className="p-4 font-bold text-white">Config snippet</th>
              </tr>
            </thead>
            <tbody>
              {[
                { target: 'Hermes Agent', delivery: 'pipe', conf: 'pipe_path = "/tmp/hermes.in"' },
                { target: 'Claude Code', delivery: 'exec', conf: 'command = "claude --print {TEXT}"' },
                { target: 'llm (Simon Willison)', delivery: 'exec', conf: 'command = "llm -m gpt-4o {TEXT}"' },
                { target: 'Remote GPU server', delivery: 'socket', conf: 'socket_host = "192.168.1.50", socket_port = 9000' },
                { target: 'Voice journal', delivery: 'file', conf: 'file_path = "~/journal.md", file_prefix = "- "' },
              ].map((row, i, arr) => (
                <tr key={row.target} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm text-white">{row.target}</td>
                  <td className="p-4 font-mono text-xs text-primary">{row.delivery}</td>
                  <td className="p-4 font-mono text-xs text-on-surface-variant">{row.conf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

// ─── AT-SPI2 ──────────────────────────────────────────────────────────────────

function ATSPIDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="AT-SPI2 Integration"
        desc="Optional accessibility integration for direct text insertion and context-aware transcription."
      />

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Direct Insertion', desc: 'Inserts text directly via AT-SPI2 Text.insertText without simulating keystrokes, avoiding modifier key conflicts and IME issues.' },
          { title: 'Context Reading', desc: 'Reads up to 300 characters before the cursor to prime Whisper with document-specific vocabulary for higher accuracy on specialised terms.' },
          { title: 'Auto Code Mode', desc: 'Automatically switches to code dictation when a terminal or IDE text widget (AT-SPI2 role terminal or text) is focused.' },
        ].map((f) => (
          <div key={f.title} className="p-6 rounded-2xl bg-surface-container-low card-outline">
            <h3 className="font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-on-surface-variant">{f.desc}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Why AT-SPI2 over Key Simulation</h2>
        <p className="text-on-surface-variant mb-4">
          Legacy dictation tools simulate keypresses using <code className="text-primary bg-white/5 px-1 rounded">wtype</code> or <code className="text-primary bg-white/5 px-1 rounded">xdotool</code>.
          This causes problems when modifier keys are held during a hotkey gesture and breaks in applications that intercept raw input.
          AT-SPI2 bypasses the input stack entirely—it writes text directly into the widget's text buffer via <code className="text-primary bg-white/5 px-1 rounded">Text.insertText</code>.
        </p>
        <p className="text-on-surface-variant mb-4">
          The app falls back automatically to <code className="text-primary bg-white/5 px-1 rounded">wtype</code> → portal → <code className="text-primary bg-white/5 px-1 rounded">xdotool</code> → clipboard for widgets that don't expose the <code className="text-primary bg-white/5 px-1 rounded">Text</code> interface (e.g. Electron apps, native terminal emulators using raw PTY I/O).
        </p>
        <InfoBox>AppImage users: <code>pyatspi</code> is bundled inside the AppImage — no manual steps needed. Source users: it is included in <code>requirements.txt</code>. If the library is absent, AT-SPI2 features are gracefully disabled.</InfoBox>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Configuration</h2>
        <CodeBlock lang="~/.config/voxctr/config.json">{`{
  "atspi_injection":      true,
  "atspi_context_prompt": true,
  "atspi_auto_code_mode": true
}`}</CodeBlock>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Key</th>
                <th className="p-4 font-bold text-white">Default</th>
                <th className="p-4 font-bold text-white">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'atspi_injection', def: 'true', desc: 'Try AT-SPI2 insertText before falling back to wtype/xdotool' },
                { key: 'atspi_context_prompt', def: 'true', desc: 'Feed surrounding text to Whisper as initial_prompt at recording start' },
                { key: 'atspi_auto_code_mode', def: 'true', desc: 'Switch to code dictation mode when a terminal/IDE widget is focused' },
              ].map((row, i, arr) => (
                <tr key={row.key} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 font-mono text-xs text-primary">{row.key}</td>
                  <td className="p-4 text-sm text-on-surface">{row.def}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

// ─── Code Mode ────────────────────────────────────────────────────────────────

function CodeModeDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Code Mode"
        desc="IDE-aware voice dictation that transforms natural speech into valid code identifiers and syntax."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Voice-to-Syntax Mapping</h2>
        <p className="text-on-surface-variant mb-6">
          In Code Mode, VoxCtr applies a spoken-language-to-code transformation layer on top of the raw transcript.
          You speak in natural English; VoxCtr formats it according to the active naming convention.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">You say</th>
                <th className="p-4 font-bold text-white">camelCase</th>
                <th className="p-4 font-bold text-white">snake_case</th>
                <th className="p-4 font-bold text-white">SCREAMING_SNAKE</th>
              </tr>
            </thead>
            <tbody>
              {[
                { say: 'function handle user login', cc: 'handleUserLogin()', sc: 'handle_user_login()', ss: '' },
                { say: 'constant max retries', cc: '', sc: '', ss: 'MAX_RETRIES' },
                { say: 'class user authentication', cc: 'UserAuthentication', sc: 'user_authentication', ss: '' },
                { say: 'get underscore user dot name', cc: '', sc: 'get_user.name', ss: '' },
                { say: 'equals new array open close', cc: '= []', sc: '= []', ss: '' },
              ].map((row, i, arr) => (
                <tr key={row.say} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm text-on-surface-variant italic">"{row.say}"</td>
                  <td className="p-4 font-mono text-xs text-primary">{row.cc}</td>
                  <td className="p-4 font-mono text-xs text-secondary">{row.sc}</td>
                  <td className="p-4 font-mono text-xs text-tertiary">{row.ss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Spoken Constructs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { phrase: '"open paren … close paren"', result: '(…)' },
            { phrase: '"open bracket … close bracket"', result: '[…]' },
            { phrase: '"open brace … close brace"', result: '{…}' },
            { phrase: '"dot"', result: '.' },
            { phrase: '"equals"', result: ' = ' },
            { phrase: '"double equals"', result: ' == ' },
            { phrase: '"fat arrow"', result: ' => ' },
            { phrase: '"new line"', result: '\\n' },
            { phrase: '"tab"', result: '\\t' },
            { phrase: '"colon"', result: ':' },
          ].map((item) => (
            <div key={item.phrase} className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e0e] border border-white/5">
              <span className="text-sm text-on-surface-variant italic">{item.phrase}</span>
              <code className="text-primary font-mono text-sm">{item.result}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Auto Code Mode Triggers</h2>
        <p className="text-on-surface-variant mb-4">
          When <code className="text-primary bg-white/5 px-1 rounded">atspi_auto_code_mode</code> is enabled,
          VoxCtr switches to Code Mode automatically based on the focused widget's AT-SPI2 role. The mode resets to your configured default on the next recording.
        </p>
        <div className="space-y-3">
          {[
            { app: 'VS Code / Codium', trigger: 'AT-SPI2 role: text, WM_CLASS contains "code"' },
            { app: 'Neovim (terminal)', trigger: 'AT-SPI2 role: terminal, active process is nvim' },
            { app: 'Terminal emulators', trigger: 'AT-SPI2 role: terminal (alacritty, kitty, wezterm, foot)' },
            { app: 'JetBrains IDEs', trigger: 'AT-SPI2 role: text, WM_CLASS contains "jetbrains"' },
          ].map((item) => (
            <div key={item.app} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <span className="font-bold text-white text-sm w-48 shrink-0">{item.app}</span>
              <code className="text-on-surface-variant text-xs">{item.trigger}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Configuration</h2>
        <CodeBlock lang="~/.config/voxctr/targets.toml">{`[[target]]
id              = "code"
label           = "Code Editor"
delivery        = "inject"
post_processing = "default"
initial_prompt  = "Python code. Variables use snake_case. Functions defined with def."
processing = {code_mode = true, remove_fillers = false, spoken_punctuation = false, apply_snippets = true, ollama_enabled = false, atspi_context = false}`}</CodeBlock>
      </section>
    </motion.div>
  );
}

// ─── Voice Output (TTS) ───────────────────────────────────────────────────────

function TTSDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Voice Output (TTS)"
        desc="Neural speech synthesis using Piper for high-quality, on-device audio responses."
      />

      <FeatureGrid items={[
        { title: '8 Curated Voices', desc: 'US and GB English models ranging from 5 MB to 130 MB.' },
        { title: 'One-Click Download', desc: 'Manage and update models directly from Settings → Voice Output with an in-app progress bar.' },
        { title: 'TTS Stop Key', desc: 'Configurable global key (default: Escape) interrupts playback from any window.' },
        { title: 'Response Overlay', desc: 'Distinct teal overlay shown while the app is speaking—separate from the recording overlay.' },
        { title: 'espeak-ng Fallback', desc: 'If Piper is unavailable or a model is missing, espeak-ng is used automatically.' },
        { title: 'Response Loopback', desc: 'Agents write to a response_pipe FIFO; VoxCtr speaks each line. Listener re-opens on EOF so agents can restart.' },
      ]} />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Available Voices</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Voice ID</th>
                <th className="p-4 font-bold text-white">Language</th>
                <th className="p-4 font-bold text-white">Quality</th>
                <th className="p-4 font-bold text-white">Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'en-us-lessac-medium', lang: 'US English', q: 'Medium', size: '~55 MB' },
                { id: 'en-us-ryan-medium', lang: 'US English', q: 'Medium', size: '~55 MB' },
                { id: 'en-us-ryan-high', lang: 'US English', q: 'High', size: '~130 MB' },
                { id: 'en-us-amy-low', lang: 'US English', q: 'Low', size: '~5 MB' },
                { id: 'en-us-joe-medium', lang: 'US English', q: 'Medium', size: '~55 MB' },
                { id: 'en-us-kusal-medium', lang: 'US English', q: 'Medium', size: '~55 MB' },
                { id: 'en-us-danny-low', lang: 'US English', q: 'Low', size: '~5 MB' },
                { id: 'en-gb-alan-low', lang: 'GB English', q: 'Low', size: '~5 MB' },
              ].map((row, i, arr) => (
                <tr key={row.id} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 font-mono text-sm text-primary">{row.id}</td>
                  <td className="p-4 text-sm text-on-surface">{row.lang}</td>
                  <td className="p-4 text-sm text-on-surface">{row.q}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-on-surface-variant mt-4">
          Download voices in <strong className="text-white">Settings → Voice Output → Voice Picker → ⬇ Download</strong>.
          Models are stored in <code className="text-primary bg-white/5 px-1 rounded">~/.local/share/voxctr/voices/</code>.
          Download once, use offline forever.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Response Loopback via FIFO</h2>
        <p className="text-on-surface-variant mb-4">Agents that generate text responses can write them to a named FIFO; VoxCtr's <code className="text-primary bg-white/5 px-1 rounded">ResponseListener</code> reads each line and speaks it automatically. Empty lines are ignored.</p>
        <CodeBlock lang="bash">{`# Create the FIFOs once (or in your shell rc)
mkfifo /tmp/my-agent.in /tmp/my-agent.out

# Simple agent loop
while true; do
  read -r cmd < /tmp/my-agent.in
  response=$(ollama run llama3.2 "$cmd")
  echo "$response" > /tmp/my-agent.out
done`}</CodeBlock>
        <div className="mt-4">
          <CodeBlock lang="targets.toml">{`[[target]]
id              = "my-agent"
label           = "My Agent"
delivery        = "pipe"
pipe_path       = "/tmp/my-agent.in"
response_pipe   = "/tmp/my-agent.out"
post_processing = "none"
append_newline  = true`}</CodeBlock>
        </div>
      </section>
    </motion.div>
  );
}

// ─── MCP Server ───────────────────────────────────────────────────────────────

function MCPDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="MCP Server"
        desc="VoxCtr ships a built-in Model Context Protocol server that exposes voice I/O as tools any MCP-capable AI agent can call."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Available Tools</h2>
        <div className="space-y-4">
          {[
            { name: 'transcribe_voice', sig: 'timeout_seconds?: number → string', desc: 'Opens the microphone and returns the transcript when speech ends or the timeout elapses. The recording overlay is always shown while recording. VoxCtr\'s full post-processing pipeline is applied before the text is returned.' },
            { name: 'speak_text', sig: 'text: string → "spoken"', desc: 'Queues text for TTS playback via Piper. Returns as soon as the text is queued—does not block until playback finishes. The TTS response overlay is shown while playback continues.' },
            { name: 'get_status', sig: '→ { recording: bool, speaking: bool }', desc: 'Returns the current audio I/O state. Useful for agents that want to avoid overlapping recordings.' },
          ].map((tool) => (
            <div key={tool.name} className="p-5 rounded-xl bg-[#0e0e0e] border border-white/5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <code className="text-primary font-bold">{tool.name}</code>
                <code className="text-secondary text-xs font-mono shrink-0">{tool.sig}</code>
              </div>
              <p className="text-sm text-on-surface-variant">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Enabling the Server</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-white mb-3">Via Settings UI</h3>
            <ol className="space-y-2 text-sm text-on-surface-variant">
              {[
                'Open Settings → Voice Output',
                'Scroll to the MCP Server section',
                'Toggle "Enable MCP Server"',
                'Note the socket path (default: /tmp/voxctr-mcp.sock)',
                'Optionally click "Register in Claude Desktop" for auto-setup',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Via config.json</h3>
            <CodeBlock>{`{
  "mcp_server_enabled": true,
  "mcp_record_timeout": 15.0
}`}</CodeBlock>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Claude Desktop Integration</h2>
        <p className="text-on-surface-variant mb-4">Click <strong className="text-white">"Register in Claude Desktop"</strong> in Settings for automatic setup, or add this manually to <code className="text-primary bg-white/5 px-1 rounded">~/.config/claude/claude_desktop_config.json</code>:</p>
        <CodeBlock lang="json">{`{
  "mcpServers": {
    "voxctr": {
      "command": "socat",
      "args": ["STDIO", "UNIX-CONNECT:/tmp/voxctr-mcp.sock"]
    }
  }
}`}</CodeBlock>
        <p className="text-sm text-on-surface-variant mt-4">Restart Claude Desktop. The tools <code className="text-primary">transcribe_voice</code>, <code className="text-primary">speak_text</code>, and <code className="text-primary">get_status</code> appear automatically in the tool picker.</p>
        <WarnBox>VoxCtr must already be running before Claude Desktop connects. The socket is created when the app starts.</WarnBox>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">JSON-RPC 2.0 Protocol</h2>
        <p className="text-on-surface-variant mb-4">The server listens on a Unix domain socket at <code className="text-primary bg-white/5 px-1 rounded">/tmp/voxctr-mcp.sock</code>. Each connection gets its own daemon thread. The protocol is newline-delimited JSON-RPC 2.0—one JSON object per line, terminated with <code className="text-primary bg-white/5 px-1 rounded">\n</code>.</p>

        <h3 className="font-bold text-white mb-3">Handshake</h3>
        <CodeBlock lang="json">{`→ {"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}
← {"jsonrpc":"2.0","id":1,"result":{
     "protocolVersion":"2024-11-05",
     "capabilities":{"tools":{}},
     "serverInfo":{"name":"voxctr","version":"1.0.0"}
   }}
# No response expected:
→ {"jsonrpc":"2.0","method":"notifications/initialized","params":{}}`}</CodeBlock>

        <h3 className="font-bold text-white mt-6 mb-3">transcribe_voice request</h3>
        <CodeBlock lang="json">{`{
  "jsonrpc": "2.0", "id": 3,
  "method": "tools/call",
  "params": {
    "name": "transcribe_voice",
    "arguments": {"timeout_seconds": 10.0}
  }
}
// Response — speech detected:
{
  "jsonrpc": "2.0", "id": 3,
  "result": {
    "content": [{"type": "text", "text": "Schedule a meeting for Thursday at 3 pm"}]
  }
}
// Response — silence / timeout:
{
  "jsonrpc": "2.0", "id": 3,
  "result": {
    "content": [{"type": "text", "text": "(no speech detected)"}]
  }
}`}</CodeBlock>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Python Client Example</h2>
        <CodeBlock lang="python">{`import socket, json

SOCK = "/tmp/voxctr-mcp.sock"

def rpc(s, method, params=None, rpc_id=1):
    req = {"jsonrpc": "2.0", "id": rpc_id, "method": method, "params": params or {}}
    s.sendall((json.dumps(req) + "\\n").encode())
    data = b""
    while True:
        chunk = s.recv(4096)
        if not chunk: break
        data += chunk
        if b"\\n" in data: break
    return json.loads(data.split(b"\\n")[0])

with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as s:
    s.connect(SOCK)
    rpc(s, "initialize")
    s.sendall((json.dumps({"jsonrpc":"2.0","method":"notifications/initialized","params":{}}) + "\\n").encode())

    rpc(s, "tools/call", {"name": "speak_text",
        "arguments": {"text": "What would you like to do?"}}, rpc_id=2)

    resp = rpc(s, "tools/call", {"name": "transcribe_voice",
        "arguments": {"timeout_seconds": 15}}, rpc_id=3)
    print("User said:", resp["result"]["content"][0]["text"])`}</CodeBlock>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Error Codes</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Code</th>
                <th className="p-4 font-bold text-white">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: '-32601', msg: 'Method not found' },
                { code: '-32602', msg: 'Unknown tool name' },
                { code: '-32603', msg: 'Internal error (missing required argument, callback exception)' },
              ].map((row, i, arr) => (
                <tr key={row.code} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 font-mono text-sm text-secondary">{row.code}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{row.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          {[
            { problem: 'Socket does not exist', fix: 'VoxCtr is not running, or MCP server is disabled. Enable it in Settings → Voice Output or set "mcp_server_enabled": true in config.json and restart.' },
            { problem: 'socat connection refused', fix: 'The socket exists but the server is not ready yet. Wait a moment after launch, or check console output for errors.' },
            { problem: 'TTS plays but no audio', fix: 'Check that aplay is installed (which aplay). Verify the voice model is downloaded under ~/.local/share/voxctr/voices/. Try tts_engine = "espeak" as a fallback.' },
            { problem: 'transcribe_voice returns "(no speech detected)"', fix: 'Confirm your microphone is selected in Settings → Audio. Try raising timeout_seconds or lowering the VAD threshold in Settings → Audio.' },
            { problem: 'Claude Desktop does not see the tools', fix: 'Restart Claude Desktop after editing claude_desktop_config.json. Confirm socat is installed and the socket path is correct (ls -la /tmp/*.sock).' },
          ].map((item) => (
            <div key={item.problem} className="p-4 rounded-xl bg-surface-container-low card-outline">
              <p className="font-bold text-white text-sm mb-1">{item.problem}</p>
              <p className="text-xs text-on-surface-variant">{item.fix}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ─── Security ─────────────────────────────────────────────────────────────────

function SecurityDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Security"
        desc="VoxCtr is designed to be secure by default. This guide covers the security model and deployment hardening options."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Default Security Model</h2>
        <div className="space-y-4">
          {[
            { title: 'Localhost-only MCP', desc: 'The MCP server binds to a Unix domain socket at /tmp/voxctr-mcp.sock. It is only accessible to processes on the same machine and same user session. No network port is opened by default.' },
            { title: 'Zero outbound traffic', desc: 'All transcription (Whisper), text-to-speech (Piper), and AI post-processing (Ollama) run locally. No audio, transcript, or text is transmitted to any external service.' },
            { title: 'Microphone confirmation', desc: 'When require_confirmation = true in config, a system tray notification asks for approval before each MCP-initiated recording opens the mic.' },
            { title: 'Tool allowlist', desc: 'Each MCP tool (transcribe_voice, speak_text, get_status) can be individually disabled in config. Operators can restrict which tools are exposed to connected agents.' },
            { title: 'Target allowlist', desc: 'The allowed_targets config limits which output targets an MCP client can route to, preventing an agent from sending transcribed text to unexpected destinations.' },
            { title: 'exec injection protection', desc: 'The exec delivery type passes {TEXT} as a literal argument with shell=False—the transcript cannot inject shell metacharacters or escape the command.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-surface-container-low card-outline">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Hardening Configuration</h2>
        <CodeBlock lang="~/.config/voxctr/config.json">{`{
  "mcp_server_enabled":   true,
  "mcp_require_confirmation": true,

  "mcp_allowed_tools": [
    "transcribe_voice",
    "get_status"
  ],

  "mcp_allowed_targets": [
    "focused_window",
    "clipboard"
  ]
}`}</CodeBlock>
        <InfoBox>
          API key authentication is only needed if you expose the server over a network. For localhost use, Unix socket permissions are sufficient.
        </InfoBox>
      </section>
    </motion.div>
  );
}

// ─── AI Processing ────────────────────────────────────────────────────────────

function AIDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="AI Post-Processing"
        desc="Optionally post-process transcriptions through a local Ollama model for grammar, tone, or formatting—per target."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Recommended Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { model: 'llama3.2:1b', ram: '~1.3 GB', use: 'Grammar & Bullets — fastest' },
            { model: 'phi3:mini', ram: '~2 GB', use: 'Simple Rewrites' },
            { model: 'mistral', ram: '~8 GB VRAM', use: 'Complex Formal/Casual Rewrites' },
          ].map((m) => (
            <div key={m.model} className="p-4 rounded-2xl bg-surface-container-low card-outline">
              <code className="text-primary font-bold block mb-2">{m.model}</code>
              <p className="text-xs text-white mb-1">RAM: {m.ram}</p>
              <p className="text-xs text-on-surface-variant">{m.use}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <CodeBlock lang="bash">{`# Pull a model
ollama pull llama3.2:1b`}</CodeBlock>
        </div>
        <p className="text-sm text-on-surface-variant mt-3">Enable in <strong className="text-white">Settings → AI</strong>: click <strong className="text-white">Re-check</strong> to detect Ollama, then toggle <strong className="text-white">"Enable AI Post-Processing"</strong>. Set <code className="text-primary bg-white/5 px-1 rounded">post_processing = "none"</code> on agent targets to skip Ollama for those routes even when it is globally enabled.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Post-Processing Mode Reference</h2>
        <div className="space-y-3">
          {[
            { stage: 'default', desc: 'Full pipeline: snippets, spoken punctuation, filler removal, Ollama rewrite (if enabled globally).' },
            { stage: 'none', desc: 'Raw Whisper output — pass through unmodified. Best for agent targets.' },
            { stage: 'strip_fillers', desc: 'Remove um, uh, hmm, like, you know.' },
            { stage: 'snippets_only', desc: 'Expand user-defined text abbreviations; no AI rewriting.' },
            { stage: 'ollama_only', desc: 'Skip snippets and code mode; run Ollama rewrite only.' },
          ].map((s) => (
            <div key={s.stage} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <code className="text-secondary font-bold shrink-0 w-36">{s.stage}</code>
              <p className="text-sm text-on-surface-variant">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Use Case Matrix</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Use Case</th>
                <th className="p-4 font-bold text-white">Mode / Pipeline</th>
              </tr>
            </thead>
            <tbody>
              {[
                { uc: 'Command to AI agent', pl: 'none or strip_fillers' },
                { uc: 'Grammar-corrected dictation', pl: 'default (with Ollama grammar prompt)' },
                { uc: 'Meeting notes to bullets', pl: 'default (Ollama bullet formatter)' },
                { uc: 'Ollama-only rewrite (no snippets)', pl: 'ollama_only' },
                { uc: 'Expand abbreviations only', pl: 'snippets_only' },
                { uc: 'Raw code injection', pl: 'none + code_mode = true in processing' },
                { uc: 'Translate before delivery', pl: 'ollama_only with translate prompt' },
              ].map((row, i, arr) => (
                <tr key={row.uc} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 text-sm text-white">{row.uc}</td>
                  <td className="p-4 text-xs font-mono text-on-surface-variant">{row.pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

// ─── Overlays ─────────────────────────────────────────────────────────────────

function OverlayDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Recording Overlays"
        desc="Visual feedback while the microphone is active. Fully swappable — choose built-in styles or drop in your own Python file."
      />

      <section className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Voice Card', image: voiceOverlay, desc: 'Scrolling bar waveform in a floating card. Gradient from dim purple (oldest) to bright pink-white (newest). Default style.' },
          { name: 'Waveform', image: boxOverlay, desc: 'Classic OpenGL oscilloscope rendering the raw audio signal as a min/max envelope.' },
          { name: 'Pulse Circle', image: dotOverlay, desc: 'Soft glowing circle that expands with RMS amplitude. Smooth 30 fps animation with exponential decay.' },
        ].map((overlay) => (
          <div key={overlay.name} className="p-6 rounded-2xl bg-surface-container-low card-outline overflow-hidden flex flex-col">
            <div className="max-h-[calc(100%-10px)] mb-6 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/5 group">
              <img
                src={overlay.image}
                alt={overlay.name}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="font-bold text-white mb-2">{overlay.name}</h3>
            <p className="text-sm text-on-surface-variant flex-1">{overlay.desc}</p>
          </div>
        ))}
      </section>

      {/* FIX: Add Routing Indicator Badge section — missing entirely from previous version */}
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Routing Indicator Badge</h2>
        <p className="text-on-surface-variant mb-4">
          Every overlay displays a <strong className="text-white">routing indicator badge</strong> while recording — a small label showing the human-readable name of the active output target (e.g. <code className="text-primary bg-white/5 px-1 rounded">Focused Window</code>, <code className="text-primary bg-white/5 px-1 rounded">Hermes Agent</code>, <code className="text-primary bg-white/5 px-1 rounded">Voice Journal</code>). This gives you an unambiguous, at-a-glance confirmation of where your speech is being sent before you say a word.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { name: 'Voice Card', pos: 'Top-right corner of the card' },
            { name: 'Waveform', pos: 'Centered above the waveform box' },
            { name: 'Pulse Circle', pos: 'Centered above the pulse ring' },
          ].map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-surface-container-low card-outline">
              <p className="font-bold text-white text-sm">{item.name}</p>
              <p className="text-xs text-on-surface-variant mt-1">{item.pos}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant">The badge text comes from the <code className="text-primary bg-white/5 px-1 rounded">label</code> field of the active target in <code className="text-primary bg-white/5 px-1 rounded">targets.toml</code>. Custom overlays receive it through the <code className="text-primary bg-white/5 px-1 rounded">label</code> parameter of <code className="text-primary bg-white/5 px-1 rounded">show_mode(label)</code> and can use it or ignore it.</p>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Creating a Custom Overlay</h2>
        <p className="text-on-surface-variant mb-4">
          Drop a single <code className="text-primary bg-white/5 px-1 rounded">.py</code> file into{' '}
          <code className="text-primary bg-white/5 px-1 rounded">~/.config/voxctr/overlays/</code>.
          VoxCtr scans this directory on each settings save and adds your overlay to the dropdown automatically.
          Click <strong className="text-white">"Open Overlays Folder"</strong> in Settings to go there directly.
        </p>
        <InfoBox>Files whose names begin with <code>_</code> are ignored—a <code>_template.py</code> starter file is created automatically the first time you open the overlays folder.</InfoBox>

        <div className="mt-6">
          <h3 className="font-bold text-white mb-3">Required Interface</h3>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 font-bold text-white">Item</th>
                  <th className="p-4 font-bold text-white">Required</th>
                  <th className="p-4 font-bold text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: 'DISPLAY_NAME (str)', req: 'Yes', desc: 'Name shown in the Settings dropdown' },
                  { item: 'DESCRIPTION (str)', req: 'No', desc: 'One-line description shown below the dropdown' },
                  { item: 'VERSION (str)', req: 'No', desc: 'Version string (informational only)' },
                  { item: 'class OverlayUI(QWidget)', req: 'Yes', desc: 'The overlay widget itself' },
                  { item: 'update_audio(data: np.ndarray)', req: 'Yes', desc: 'Called from audio thread ~every 20–60 ms while recording' },
                  { item: 'show_mode(label: str = "")', req: 'Yes', desc: 'Called on Qt main thread when recording starts; receives routing label' },
                  { item: 'hide_mode()', req: 'Yes', desc: 'Called on Qt main thread when recording stops' },
                ].map((row, i, arr) => (
                  <tr key={row.item} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 font-mono text-xs text-primary">{row.item}</td>
                    <td className="p-4 text-sm text-on-surface">{row.req}</td>
                    <td className="p-4 text-sm text-on-surface-variant">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          {/* FIX: show_mode now correctly accepts `label: str = ""` parameter */}
          <CodeBlock lang="python — ~/.config/voxctr/overlays/my_overlay.py">{`DISPLAY_NAME = "My Custom Overlay"
DESCRIPTION  = "A simple pulsing circle"
VERSION      = "1.0"

import numpy as np
from PyQt6.QtWidgets import QWidget, QApplication
from PyQt6.QtCore import Qt, QMetaObject, QTimer
from PyQt6.QtGui import QPainter, QColor, QBrush

class OverlayUI(QWidget):

    def __init__(self):
        super().__init__()
        self.setWindowFlags(
            Qt.WindowType.ToolTip |
            Qt.WindowType.FramelessWindowHint |
            Qt.WindowType.WindowStaysOnTopHint |
            Qt.WindowType.X11BypassWindowManagerHint |
            Qt.WindowType.WindowTransparentForInput
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
        self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
        self._amp = 0.0
        self._routing_label = ""
        self._timer = QTimer(self)
        self._timer.timeout.connect(self.update)
        self._timer.start(30)
        self.hide()

    def update_audio(self, data: np.ndarray) -> None:
        """Called from audio thread ~every 20-60 ms. Never draw directly here."""
        rms = float(np.sqrt(np.mean(data.astype(float) ** 2)))
        self._amp = min(1.0, rms / 8192.0)
        QMetaObject.invokeMethod(self, "update", Qt.ConnectionType.QueuedConnection)

    def show_mode(self, label: str = "") -> None:
        """Called when recording starts. label is the active target name (routing badge)."""
        self._routing_label = label   # store for use in paintEvent
        screen = QApplication.primaryScreen()
        if screen:
            g = screen.geometry()
            self.setGeometry(g)
            self.setFixedSize(g.width(), g.height())
            self.move(g.x(), g.y())
        self.show()
        self.raise_()

    def hide_mode(self) -> None:
        """Called when recording stops."""
        self.hide()

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        cx, cy = self.width() // 2, self.height() - 65
        r = int(20 + self._amp * 25)
        painter.setBrush(QBrush(QColor(74, 158, 255, 180)))
        painter.setPen(Qt.PenStyle.NoPen)
        painter.drawEllipse(cx - r, cy - r, r * 2, r * 2)`}</CodeBlock>
        </div>
      </section>
    </motion.div>
  );
}

// ─── Configuration Reference ──────────────────────────────────────────────────

function ConfigDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Configuration Reference"
        desc="VoxCtr uses three configuration files: config.json for global settings, targets.toml for output destinations, and bindings.toml for hotkey mappings."
      />

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">File Locations</h2>
        {/* FIX: Added backups/ auto-backup directory (last 20 kept) */}
        <div className="space-y-3">
          {[
            { path: '~/.config/voxctr/config.json', desc: 'Global settings (audio device, models, MCP, TTS)' },
            { path: '~/.config/voxctr/targets.toml', desc: 'Named output targets and post-processing pipelines' },
            { path: '~/.config/voxctr/bindings.toml', desc: 'Hotkey bindings mapped to target IDs' },
            { path: '~/.config/voxctr/backups/', desc: 'Auto-backups before each config save — last 20 kept automatically' },
            { path: '~/.local/share/voxctr/voices/', desc: 'Downloaded Piper TTS voice models' },
          ].map((item) => (
            <div key={item.path} className="flex gap-4 p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <code className="text-primary text-xs font-mono w-72 shrink-0">{item.path}</code>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FIX: Added Config Validation section — missing from previous version */}
      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Config Validation</h2>
        <p className="text-on-surface-variant mb-4">
          VoxCtr validates <code className="text-primary bg-white/5 px-1 rounded">config.json</code>, <code className="text-primary bg-white/5 px-1 rounded">targets.toml</code>, and <code className="text-primary bg-white/5 px-1 rounded">bindings.toml</code> on startup. If any file is malformed, a clear error message is shown identifying the exact problem before the app continues. This prevents silent failures from bad configuration.
        </p>
        <InfoBox>The Settings UI also performs live validation—keybind conflicts and unknown target IDs are flagged inline as you edit, before you save.</InfoBox>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">DBus Control</h2>
        <p className="text-on-surface-variant mb-4">
          VoxCtr exposes a DBus interface for external control from Waybar widgets, scripts, or Rofi launchers. Service name: <code className="text-primary bg-white/5 px-1 rounded">ai.voxctl.Dictation</code>.
        </p>
        <div className="space-y-3">
          {[
            { action: 'Toggle recording', cmd: 'dbus-send --session --type=method_call --dest=ai.voxctl.Dictation /ai/voxctl/Dictation ai.voxctl.Dictation.ToggleRecording' },
            { action: 'Get status', cmd: 'qdbus ai.voxctl.Dictation /ai/voxctl/Dictation GetStatus' },
            { action: 'Get word count', cmd: 'qdbus ai.voxctl.Dictation /ai/voxctl/Dictation GetWordCount' },
          ].map((item) => (
            <div key={item.action} className="p-4 rounded-xl bg-[#0e0e0e] border border-white/5">
              <p className="text-xs font-bold text-white mb-2">{item.action}</p>
              <code className="text-xs text-on-surface-variant break-all">{item.cmd}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">config.json — All Keys</h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-container-low">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-bold text-white">Key</th>
                <th className="p-4 font-bold text-white">Type</th>
                <th className="p-4 font-bold text-white">Default</th>
                <th className="p-4 font-bold text-white">Description</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { key: 'whisper_model', type: 'string', def: '"small.en"', desc: 'Whisper model name (tiny.en, small.en, medium.en, large-v3)' },
                { key: 'audio_device_index', type: 'int|null', def: 'null', desc: 'PortAudio device index. null = system default.' },
                { key: 'vad_threshold', type: 'float', def: '0.5', desc: 'Voice activity detection sensitivity (0.0–1.0)' },
                { key: 'tts_enabled', type: 'bool', def: 'false', desc: 'Master TTS on/off switch' },
                { key: 'tts_engine', type: 'string', def: '"piper"', desc: '"piper" or "espeak"' },
                { key: 'tts_voice', type: 'string', def: '"en-us-lessac-medium"', desc: 'Piper voice ID' },
                { key: 'tts_stop_key', type: 'string[]', def: '["KEY_ESCAPE"]', desc: 'evdev key(s) to interrupt TTS playback globally' },
                { key: 'tts_response_overlay', type: 'bool', def: 'true', desc: 'Show teal overlay while TTS plays' },
                { key: 'mcp_server_enabled', type: 'bool', def: 'false', desc: 'Start MCP server on launch' },
                { key: 'mcp_record_timeout', type: 'float', def: '15.0', desc: 'Default transcribe_voice timeout in seconds' },
                { key: 'mcp_require_confirmation', type: 'bool', def: 'false', desc: 'Show system tray confirm before each MCP recording' },
                { key: 'atspi_injection', type: 'bool', def: 'true', desc: 'Use AT-SPI2 for text injection' },
                { key: 'atspi_context_prompt', type: 'bool', def: 'true', desc: 'Read cursor context to prime Whisper' },
                { key: 'atspi_auto_code_mode', type: 'bool', def: 'true', desc: 'Auto-switch to Code Mode in IDEs/terminals' },
                { key: 'show_overlay', type: 'bool', def: 'true', desc: 'Show recording overlay while mic is active' },
                { key: 'overlay_style', type: 'string', def: '"voice_card"', desc: '"voice_card", "waveform", or "pulse_circle"' },
              ].map((row, i, arr) => (
                <tr key={row.key} className={i < arr.length - 1 ? 'border-b border-white/5' : ''}>
                  <td className="p-4 font-mono text-xs text-primary">{row.key}</td>
                  <td className="p-4 text-xs text-secondary font-mono">{row.type}</td>
                  <td className="p-4 text-xs text-on-surface font-mono">{row.def}</td>
                  <td className="p-4 text-xs text-on-surface-variant">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-4">Full config.json Example</h2>
        <CodeBlock lang="json">{`{
  "whisper_model":           "small.en",
  "audio_device_index":      null,
  "vad_threshold":           0.5,

  "tts_enabled":             true,
  "tts_engine":              "piper",
  "tts_voice":               "en-us-ryan-high",
  "tts_stop_key":            ["KEY_ESCAPE"],
  "tts_response_overlay":    true,

  "mcp_server_enabled":      true,
  "mcp_record_timeout":      15.0,
  "mcp_require_confirmation": false,

  "atspi_injection":         true,
  "atspi_context_prompt":    true,
  "atspi_auto_code_mode":    true,

  "show_overlay":            true,
  "overlay_style":           "voice_card"
}`}</CodeBlock>
      </section>
    </motion.div>
  );
}

// ─── Tutorials ────────────────────────────────────────────────────────────────

function TutorialsDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="Tutorials & Cookbooks"
        desc="Step-by-step guides for common VoxCtr workflows."
      />

      {/* Tutorial 1 */}
      <section className="p-6 rounded-2xl bg-surface-container-low card-outline space-y-6">
        <div>
          <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">Tutorial 1</p>
          <h2 className="text-2xl font-display font-bold text-white">Voice-Powered Claude Desktop</h2>
          <p className="text-on-surface-variant mt-2">Connect VoxCtr to Claude Desktop so Claude can ask you verbal questions during a task.</p>
        </div>
        <ol className="space-y-4 text-sm text-on-surface-variant">
          {[
            'Enable the MCP server in Settings → Voice Output → Enable MCP Server.',
            'Click "Register in Claude Desktop" — VoxCtr writes the socat bridge config automatically.',
            'Restart Claude Desktop.',
            'In a Claude conversation, Claude can now call transcribe_voice when it needs verbal input from you.',
            'When Claude calls speak_text, you\'ll hear the response through your speakers via Piper TTS.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <CodeBlock lang="Claude prompt example">{`You: "Help me draft an email about the project delay."
Claude: [calls transcribe_voice] "Please describe the key points you want to cover."
You: [speak] "We're two weeks behind due to API changes. We need more time."
Claude: [receives transcript, drafts email, calls speak_text to read it back]`}</CodeBlock>
      </section>

      {/* Tutorial 2 */}
      <section className="p-6 rounded-2xl bg-surface-container-low card-outline space-y-6">
        <div>
          <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">Tutorial 2</p>
          <h2 className="text-2xl font-display font-bold text-white">Voice Journal with Ollama Bullets</h2>
          <p className="text-on-surface-variant mt-2">Speak meeting notes; VoxCtr formats them as structured bullet points and appends them to a markdown file.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">1. Add a journal target</h3>
          <CodeBlock lang="~/.config/voxctr/targets.toml">{`[[target]]
id              = "journal"
label           = "Daily Journal"
delivery        = "file"
file_path       = "~/journal.md"
file_prefix     = "> "
file_timestamp  = true
post_processing = "default"
append_newline  = true`}</CodeBlock>
        </div>
        <div>
          <h3 className="font-bold text-white mb-3">2. Bind a hotkey</h3>
          {/* FIX: `target` → `target_id` */}
          <CodeBlock lang="~/.config/voxctr/bindings.toml">{`[[binding]]
id        = "journal_hold"
label     = "Journal Note"
keys      = ["KEY_LEFTMETA", "KEY_J"]
gesture   = "hold"
target_id = "journal"`}</CodeBlock>
        </div>
        <p className="text-sm text-on-surface-variant">Hold <code className="text-primary bg-white/5 px-1 rounded">Super+J</code>, speak your note, release. Each utterance becomes a timestamped entry in your journal file.</p>
      </section>

      {/* Tutorial 3 */}
      <section className="p-6 rounded-2xl bg-surface-container-low card-outline space-y-6">
        <div>
          <p className="text-xs text-tertiary font-bold uppercase tracking-widest mb-2">Tutorial 3</p>
          <h2 className="text-2xl font-display font-bold text-white">Voice Shell Commands</h2>
          <p className="text-on-surface-variant mt-2">Speak English descriptions; a local LLM converts them to bash commands and executes them.</p>
        </div>
        {/* FIX: exec_command → command */}
        <CodeBlock lang="~/.config/voxctr/targets.toml">{`[[target]]
id              = "shell_voice"
label           = "Voice Shell"
delivery        = "exec"
command         = "bash -c '{TEXT}'"
post_processing = "ollama_only"`}</CodeBlock>
        <WarnBox>The exec delivery type runs commands as your user. Review any Ollama rewriting carefully to prevent unexpected command execution.</WarnBox>
      </section>

      {/* Tutorial 4 */}
      <section className="p-6 rounded-2xl bg-surface-container-low card-outline space-y-6">
        <div>
          <p className="text-xs text-primary font-bold uppercase tracking-widest mb-2">Tutorial 4</p>
          <h2 className="text-2xl font-display font-bold text-white">IDE Code Mode Setup</h2>
          <p className="text-on-surface-variant mt-2">Configure VoxCtr to automatically switch to Code Mode when VS Code or Neovim is focused.</p>
        </div>
        <ol className="space-y-3 text-sm text-on-surface-variant">
          {[
            'In config.json, set "atspi_auto_code_mode": true.',
            'Add a "code" target in targets.toml with processing = {code_mode = true, ...}.',
            'Bind a hotkey to the "code" target_id.',
            'When VS Code or a terminal is focused, VoxCtr automatically applies Code Mode formatting for that session only.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <Link to="/docs/code-mode" className="inline-flex items-center gap-2 text-primary text-sm hover:underline">
          Full Code Mode reference →
        </Link>
      </section>
    </motion.div>
  );
}

// ─── Architecture ─────────────────────────────────────────────────────────────

function ArchitectureDocs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <SectionHeader
        title="System Architecture"
        desc="A tour of how VoxCtr's components fit together."
      />

      <CodeBlock lang="System Diagram">
        {`Input Engine (evdev)
  ├── Hold / Toggle gesture handlers
  ├── DoubleTapMachine per double_tap binding
  └── TTS stop key interceptor → TTSEngine.stop()
        │ on_press(target_id)
        ▼
Recording Controller (AudioRecorder)
        │ numpy float32 audio
        ▼
Transcription (faster-whisper / whisper.cpp + Silero VAD)
  └── Backend selected via BackendSelector (GPU probe)
        │ (text, target_id)
        ▼
Post-Processing (per target_id setting)
  ├── default: snippets + spoken punct + Ollama
  ├── none: raw Whisper output
  ├── strip_fillers: remove um/uh only
  ├── snippets_only: expand snippets
  └── ollama_only: Ollama rewrite only
        │
        ▼
OutputTargetRouter
  ├── inject    → AT-SPI2 insertText / wtype / xdotool / clipboard+paste
  ├── clipboard → wl-copy
  ├── exec      → subprocess (shell=False)
  ├── pipe      → O_NONBLOCK write to FIFO
  ├── socket    → TCP or Unix domain socket
  ├── file      → append with optional timestamp
  └── dbus      → DBus signal emission
        │
        ▼ (response_pipe per target)
ResponseListener(s)  ←── agent writes response text to FIFO
        │ tts_speak(line)
        ▼
TTSEngine (queue + worker thread)
  ├── piper --model … --output_raw | aplay …
  └── espeak-ng fallback
        │
        ▼
TTSResponseOverlay (teal floating widget, shown while speaking)

              ┌─────────────────────────┐
              │    MCP Server           │
              │  Unix socket JSON-RPC   │
              │  transcribe_voice ──────┼──→ triggers recording
              │  speak_text ────────────┼──→ TTSEngine.speak()
              │  get_status ────────────┼──→ recording/speaking flags
              └─────────────────────────┘`}
      </CodeBlock>

      <section>
        <h2 className="text-2xl font-display font-bold text-white mb-6">Source Layout</h2>
        <div className="grid md:grid-cols-2 gap-8 text-xs font-mono">
          <div className="space-y-1.5">
            <p className="text-secondary">src/</p>
            <p className="text-on-surface-variant pl-4">├── main.py                  <span className="text-on-surface-variant/40">(entry point)</span></p>
            <p className="text-on-surface-variant pl-4">├── config.py                <span className="text-on-surface-variant/40">(JSON config)</span></p>
            <p className="text-on-surface-variant pl-4">├── config_validator.py      <span className="text-on-surface-variant/40">(startup validation)</span></p>
            <p className="text-on-surface-variant pl-4">├── input_listener.py        <span className="text-on-surface-variant/40">(evdev engine)</span></p>
            <p className="text-on-surface-variant pl-4">├── audio_recorder.py        <span className="text-on-surface-variant/40">(PyAudio capture)</span></p>
            <p className="text-on-surface-variant pl-4">├── inference_engine.py      <span className="text-on-surface-variant/40">(transcription + post-proc)</span></p>
            <p className="text-on-surface-variant pl-4">├── text_injector.py         <span className="text-on-surface-variant/40">(delivery thread)</span></p>
            <p className="text-on-surface-variant pl-4">├── tts_engine.py            <span className="text-on-surface-variant/40">(Piper/espeak TTS)</span></p>
            <p className="text-on-surface-variant pl-4">├── tts_responder.py         <span className="text-on-surface-variant/40">(ResponseListener)</span></p>
            <p className="text-on-surface-variant pl-4">├── mcp_server.py            <span className="text-on-surface-variant/40">(JSON-RPC server)</span></p>
            <p className="text-on-surface-variant pl-4">├── atspi_context.py         <span className="text-on-surface-variant/40">(AT-SPI2 integration)</span></p>
            <p className="text-on-surface-variant pl-4">├── backends/                <span className="text-on-surface-variant/40">(faster-whisper, whisper.cpp)</span></p>
            <p className="text-on-surface-variant pl-4">├── hotkeys/                 <span className="text-on-surface-variant/40">(DoubleTapMachine)</span></p>
            <p className="text-on-surface-variant pl-4">├── routing/                 <span className="text-on-surface-variant/40">(models, targets, loader, router)</span></p>
            <p className="text-on-surface-variant pl-4">└── gui/                     <span className="text-on-surface-variant/40">(PyQt6 windows + overlays)</span></p>
          </div>
          <div className="space-y-1.5">
            <p className="text-secondary">tests/</p>
            {/* FIX: Corrected test count — README totals 257, not "280+" */}
            {[
              { file: 'test_double_tap.py', count: '9', desc: 'DoubleTapMachine timing & state' },
              { file: 'test_targets.py', count: '16', desc: 'All delivery types' },
              { file: 'test_routing_loader.py', count: '31', desc: 'TOML round-trips' },
              { file: 'test_tts_engine.py', count: '30', desc: 'Voice catalog, download, engine' },
              { file: 'test_tts_responder.py', count: '6', desc: 'ResponseListener FIFO' },
              { file: 'test_mcp_server.py', count: '16', desc: 'JSON-RPC dispatch & tools' },
              { file: 'test_backend_protocol.py', count: '40', desc: 'BackendResult contract & selector' },
              { file: 'test_atspi_context.py', count: '28', desc: 'AT-SPI2 injection & context' },
              { file: 'test_audio_recorder.py', count: '15', desc: 'Device enumeration' },
              { file: 'test_config_validator.py', count: '36', desc: 'Config validation rules' },
              { file: 'test_setup_dialog.py', count: '20', desc: 'Permissions wizard logic' },
              { file: 'test_populate_audio_devices.py', count: '10', desc: 'Audio device list' },
            ].map((row) => (
              <p key={row.file} className="text-on-surface-variant pl-4">
                ├── <span className="text-primary">{row.file}</span>
                {' '}<span className="text-on-surface-variant/40">({row.count} — {row.desc})</span>
              </p>
            ))}
          </div>
        </div>
        <p className="text-sm text-on-surface-variant mt-4 text-right">Total: <strong className="text-white">257 tests</strong></p>
      </section>

      <section className="p-6 rounded-2xl bg-surface-container-low card-outline flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white">Running the Test Suite</h3>
          <p className="text-sm text-on-surface-variant mt-1">Ensure stability with pytest before contributing</p>
        </div>
        <div className="w-full md:w-auto">
          <CodeBlock lang="test command">python -m pytest tests/ -v</CodeBlock>
        </div>
      </section>
    </motion.div>
  );
}
