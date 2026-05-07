import { motion } from 'framer-motion';
import { Shield, Terminal, Mic, Cpu, Lock, Layout, MapIcon, Code, Zap, Headphones, MessageSquare, History, Sliders, ArrowRight, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center relative py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/20 text-primary font-medium text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          The Intelligent Audio Interface
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your voice. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Any agent.</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          VoxCtr is a programmable voice input platform for Linux. 
          Connect your voice to any AI agent, CLI tool, or workflow—locally, privately, and with zero cloud dependency.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/docs" className="btn-primary flex-1 group">
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Install VoxCtr</span>
          </Link>
          <Link to="/docs" className="btn-ghost flex-1 group">
            <span>Speak to your stack</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </motion.div>
      </section>

      {/* Positioning Section */}
      <section className="py-24 border-y border-white/5 bg-surface-container-lowest/50 -mx-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">A first-class citizen of the AI tool ecosystem</h2>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            VoxCtr turns voice into a universal, low-latency, programmable input interface. 
            By speaking the Model Context Protocol (MCP), VoxCtr integrates natively with Claude, Cursor, Zed, and any AI agent—no custom glue code required.
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-24">
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
            desc="Claude calls record_and_transcribe. You speak. Claude receives the polished text and continues the task without you touching the keyboard."
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
            scenario="Context-aware mode"
            desc="VoxCtr automatically detects your IDE, switches to code mode, and rewrites your speech as a concise code comment."
            icon={<Code className="text-primary" />}
          />
        </div>
      </section>

      {/* Per-Binding Pipelines Section */}
      <section className="py-24 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative p-8 rounded-3xl bg-surface-container-low card-outline overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-48 h-48 text-secondary" />
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-6">Per-Binding Pipelines</h2>
            <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
              Every hotkey gesture can carry its own LLM processing pipeline. 
              A pipeline is a chain of stages—strip fillers, Ollama prompts, or custom prepends—applied to the raw transcription at the moment of capture.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-container-highest/50 card-outline">
                <p className="text-sm font-bold text-white mb-1">Transcription</p>
                <p className="text-xs text-on-surface-variant">"Uh, I think we should, like, schedule a meeting for Friday at 3."</p>
              </div>
              <div className="flex justify-center py-2">
                <ArrowRight className="w-5 h-5 text-primary rotate-90" />
              </div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm font-bold text-primary mb-1">Pipeline: dictation_polish</p>
                <div className="flex gap-2 text-[10px] uppercase tracking-wider mb-2">
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">strip_fillers</span>
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">ollama_prompt</span>
                  <span className="bg-primary/20 px-2 py-0.5 rounded text-primary">prepend</span>
                </div>
                <p className="text-xs text-white">"Schedule a meeting for Friday at 3:00 PM."</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-display font-bold text-white mb-6">Local & Private</h3>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              VoxCtr keeps everything on your hardware. The pipelines use local Ollama models like <code className="text-primary">llama3.2:1b</code> for near-zero latency and absolute privacy. 
              No data leaves your machine—not even the transcription.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low card-outline">
                <p className="text-sm font-bold text-white mb-1">Zero Latency</p>
                <p className="text-xs text-on-surface-variant">Small, quantized models for instant feedback.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low card-outline">
                <p className="text-sm font-bold text-white mb-1">100% Offline</p>
                <p className="text-xs text-on-surface-variant">Work in the terminal or airplane without loss of functionality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Negotiable Messages Section (Refined) */}
      <section className="py-24 border-t border-white/5 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MessageCard 
            icon={<Shield className="text-primary" />} 
            title="Private by Architecture"
            desc="Zero outbound traffic during dictation. Everything runs on your hardware, utilizing CUDA or Vulkan automatically."
          />
          <MessageCard 
            icon={<Zap className="text-secondary" />} 
            title="Wayland-Native"
            desc="The first AI audio interface built for Wayland. Native integration with modern Linux desktops and accessibility buses."
          />
          <MessageCard 
            icon={<Code className="text-tertiary" />} 
            title="Programmable Broker"
            desc="Composability is key. Route voice to DBus, inject via AT-SPI2, or pipe to shell scripts with AI-shaped meaning."
          />
        </div>
      </section>
    </div>
  );
}

function UseCaseCard({ title, scenario, desc, icon }: { title: string, scenario: string, desc: string, icon: React.ReactNode }) {
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

function MessageCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
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
