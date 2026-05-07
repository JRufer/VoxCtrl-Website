import React, { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  lang?: string;
  className?: string;
  copyValue?: string;
}

export default function CodeBlock({ children, lang = '', className = '', copyValue }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!copyValue && !children) return;
    navigator.clipboard.writeText(copyValue || children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (code: string) => {
    let h = code;

    // Comments: tertiary (pink) with opacity
    h = h.replace(/(#.*)/g, '<span class="text-tertiary/50">$1</span>');

    // Strings: secondary (purple)
    h = h.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="text-secondary">$1</span>');

    // Keywords: primary (cyan)
    const keywords = /\b(sudo|pacman|yay|apt|pip|python|git|chmod|mkdir|wget|voxctr|voxctl|source|cat|mkfifo|install|systemctl|ollama|dbus-send|qdbus|pytest|npm|npx|cd|ls|rm|cp|mv|bash|sh|zsh|python3|venv)\b/g;
    h = h.replace(keywords, '<span class="text-primary font-bold">$1</span>');

    // Flags: tertiary (pink)
    h = h.replace(/\s(-[a-zA-Z0-9-]+|--[a-zA-Z0-9-]+)/g, ' <span class="text-tertiary">$1</span>');

    // TOML Sections: [section]
    h = h.replace(/^(\s*)(\[+)([a-zA-Z0-9._-]+)(\]+)/gm, '$1$2<span class="text-secondary font-bold">$3</span>$4');

    // TOML/JSON Keys: key = or "key":
    h = h.replace(/^(\s*)([a-zA-Z0-9_-]+)(\s*)(?==)/gm, '$1<span class="text-primary font-medium">$2</span>$3');
    h = h.replace(/("[^"]+")(?=\s*:)/g, '<span class="text-primary font-medium">$1</span>');

    // Placeholders {TEXT}
    h = h.replace(/(\{TEXT\})/g, '<span class="text-primary font-bold">$1</span>');

    // Symbols/Arrows: tertiary (pink)
    h = h.replace(/([│▼┌┐└┘├─┬┴┼])/g, '<span class="text-tertiary/40">$1</span>');

    return h;
  };

  return (
    <div className={`p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 font-mono text-xs overflow-x-auto group shadow-2xl relative ${className}`}>
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-tertiary/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-secondary/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{lang}</span>
          {(copyValue || children) && (
            <button
              onClick={handleCopy}
              className="p-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-white/20 hover:text-primary"
              title="Copy code"
            >
              {copied ? <CheckCircle2 className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
      <pre className="leading-relaxed text-on-surface-variant/80" dangerouslySetInnerHTML={{ __html: highlight(children) }} />
    </div>
  );
}
