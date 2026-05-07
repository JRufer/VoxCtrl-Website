import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const roadmapItems = [
  {
    quarter: 'Q3 2026',
    title: 'Core Wayland Engine',
    status: 'completed',
    items: [
      'Dual transcription backends (faster-whisper, whisper.cpp)',
      'Hold-to-Talk, Toggle-to-Talk, and Double-Tap gestures',
      'AT-SPI2 direct text insertion integration',
      'Basic voice snippet engine',
    ]
  },
  {
    quarter: 'Q4 2026',
    title: 'AI Composability',
    status: 'completed',
    items: [
      'Built-in MCP Server for AI Voice Gateway',
      'Claude Desktop integration',
      'Per-target Output Routing (inject, pipe, dbus, socket)',
      'Neural TTS with Piper & Voice Picker',
    ]
  },
  {
    quarter: 'Q1 2027',
    title: 'Desktop Integration Polish',
    status: 'in-progress',
    items: [
      'Advanced GUI Settings using PyQt6',
      'Keybind conflict detection and warnings',
      'Context-aware transcription via AT-SPI2',
      'Auto code mode detection for IDEs',
    ]
  },
  {
    quarter: 'Q2 2027',
    title: 'Ecosystem Expansion',
    status: 'planned',
    items: [
      'Flatpak sandboxing with proper portal support',
      'Pre-built NixOS flakes',
      'Community snippet registry',
      'Extended DBus API for third-party widget developers',
    ]
  }
];

export default function Roadmap() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Product Roadmap</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
          The future of Wayland-native voice interaction. Built in the open, for power users.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/10">
        {roadmapItems.map((phase, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-highest card-outline shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_0_8px_#131313]">
              {phase.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : phase.status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-secondary" />
              ) : (
                <Circle className="w-5 h-5 text-on-surface-variant" />
              )}
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-3xl bg-surface-container-low card-outline">
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-sm font-bold tracking-wider uppercase ${
                  phase.status === 'completed' ? 'text-primary' : 
                  phase.status === 'in-progress' ? 'text-secondary' : 
                  'text-on-surface-variant'
                }`}>
                  {phase.quarter}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">{phase.title}</h3>
              <ul className="space-y-3">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-on-surface-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
