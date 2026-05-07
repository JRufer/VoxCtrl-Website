

# **1\. Context & Vision**

The routing feature introduced in the previous design document changed what kind of tool Whisper-Wayland is. It is no longer just a dictation utility — it is a programmable voice input broker that can send transcribed speech to any destination. That architectural shift opens a door that leads somewhere more interesting: a purpose-built AI audio interface.

This document designs three interconnected capabilities that together complete that transformation: a per-binding LLM processing pipeline (so each hotkey gesture can have its own prompt, model, and transformation logic), an MCP server (so any LLM agent or IDE can use Vox as a standardized voice input tool), and a rebrand that names and positions the product for its actual role.

The goal is that Vox becomes for voice what a keyboard is for text — a universal, low-latency, programmable input interface — but with the additional power that the **meaning** of the input can be shaped by AI at the moment of capture, before it ever reaches its destination.

| 🔧  Design Decision:  Each of the three capabilities in this document can be built and shipped independently in phases. They share data structures and config conventions but have no hard interdependencies at runtime. |
| :---- |

## **2.2  The Per-Binding Pipeline Model**

Each HotkeyBinding (and the target it routes to) can now carry its own LLM pipeline definition — a chain of processing steps applied to the raw transcription before delivery. A pipeline is a named, reusable sequence of stages. Pipelines are defined once and referenced by ID in bindings and targets.

| Transcription (raw text from Whisper)          │          ▼   ┌────────────────────────────────────────┐   │   Pipeline (e.g. 'command\_clean')            │   │                                            │   │   Stage 1: strip\_fillers                   │   │       │  removes um/uh/like               │   │       ▼                                    │   │   Stage 2: ollama\_prompt                   │   │       │  model: llama3.2                  │   │       │  system: 'Rewrite as a terse...'  │   │       │  timeout\_ms: 3000                 │   │       ▼                                    │   │   Stage 3: append\_newline                  │   └────────────────────────────────────────┘          │          ▼   Output Target (hermes pipe, inject, file...) |
| :---- |



## **2.4  The Ollama Stage in Detail**

The ollama\_prompt stage is the most powerful and the most latency-sensitive. Every aspect of the Ollama call is configurable at the stage level, so different bindings can use different models, different system prompts, and different fallback behaviors independently.

| pipelines.toml — Example Definitions |
| :---- |
| \[\[pipeline\]\] id \= "dictation\_polish" label \= "Dictation — Grammar & Polish"   \[\[pipeline.stage\]\]   type \= "strip\_fillers"   \[\[pipeline.stage\]\]   type \= "ollama\_prompt"   model \= "llama3.2"   system\_prompt \= """   You are a transcription editor. The user has dictated the following text.   Correct grammar, remove repetition, and improve clarity.   Preserve the original meaning and voice exactly.   Return only the corrected text — no commentary, no preamble.   """   temperature \= 0.2   timeout\_ms \= 4000   on\_timeout \= "passthrough"  \# deliver original text if Ollama is too slow \--- \[\[pipeline\]\] id \= "command\_clean" label \= "Agent Command — Terse & Exact"   \[\[pipeline.stage\]\]   type \= "strip\_fillers"   \[\[pipeline.stage\]\]   type \= "ollama\_prompt"   model \= "llama3.2"   system\_prompt \= """   You are a command parser. The user has spoken a command to an AI agent.   Rewrite it as a concise, direct instruction. Remove hesitation and    conversational filler. Preserve all technical terms, proper nouns, and   specific instructions exactly. Return only the cleaned command.   """   temperature \= 0.1   timeout\_ms \= 3000   on\_timeout \= "passthrough" \--- \[\[pipeline\]\] id \= "meeting\_note" label \= "Meeting Note — Structured"   \[\[pipeline.stage\]\]   type \= "strip\_fillers"   \[\[pipeline.stage\]\]   type \= "ollama\_prompt"   model \= "llama3.2"   system\_prompt \= """   Convert the following spoken meeting note into a structured bullet point.   Format: start with an action verb if it is an action item, or a topic noun   if it is a discussion note. Keep it under 20 words.   """   temperature \= 0.3   timeout\_ms \= 5000   on\_timeout \= "strip\_fillers"  \# fall back to just the cleaned transcription   \[\[pipeline.stage\]\]   type \= "prepend"   text \= "- " |

## **2.8  Use Cases Unlocked**

| Use Case | Pipeline Configuration |
| :---- | :---- |
| Command to AI agent | strip\_fillers → ollama\_prompt (terse command rewriter, low temperature) |
| Grammar-corrected dictation | strip\_fillers → ollama\_prompt (grammar editor, medium temperature) |
| Meeting notes to bullets | strip\_fillers → ollama\_prompt (bullet formatter) → prepend('- ') |
| Code comment dictation | code\_mode → ollama\_prompt ('Rewrite as a concise code comment starting with //') |
| Translate before delivery | ollama\_prompt ('Translate to French, return only the translation') |
| Classify and route | ollama\_classify → branch to different targets based on intent category |
| Shell command from English | ollama\_prompt ('Convert to a bash command. Return only the command.') → exec target |
| Email draft from bullet points | ollama\_prompt ('Expand these spoken bullet points into a professional email body') |
| Commit message from description | ollama\_prompt ('Write a git commit message in conventional commit format') |

# **3\. The Vox MCP Server**

## **3.1  Why an MCP Server Changes Everything**

The Model Context Protocol is the emerging standard for connecting LLMs to tools and data sources. It is natively supported by Claude, ChatGPT, Cursor, Zed, and dozens of other AI-first applications. **An MCP server turns Vox into a first-class citizen of the AI tool ecosystem** — any LLM agent or IDE that speaks MCP can use Vox as a voice input device without any custom integration code.

Without MCP: each agent integration requires custom wiring — a named pipe here, an exec target there. The user configures each separately. Each integration is ad hoc and non-discoverable.

With MCP: any MCP-capable host connects to Vox's MCP server and immediately discovers its capabilities through the standard protocol. The host can ask Vox to record audio, transcribe it, run it through any named pipeline, and return the result — all through a standardized interface.

| 🚀  Vision:  MCP makes Vox's voice capabilities composable. An agent can combine voice input from Vox with file access from another MCP server, web search from a third, and code execution from a fourth — all coordinated by a single LLM with no custom glue code. |
| :---- |

## **3.2  What the MCP Server Exposes**

The Vox MCP server exposes three categories of capabilities, matching MCP's native primitives: Tools (actions the LLM can invoke), Resources (data the LLM can read), and Prompts (reusable prompt templates).


### **3.2.3  Prompts**

MCP Prompts are reusable templates that the host LLM can use to frame interactions with Vox. These are served alongside tools and resources.

| Prompt Name | Parameters | What It Produces |
| :---- | :---- | :---- |
| transcribe\_and\_act | task\_description: str | A prompt that instructs the LLM to call record\_and\_transcribe and then perform a specific task with the result |
| voice\_note\_session | topic: str | A multi-turn prompt for a structured voice note-taking session |
| voice\_command\_loop | agent\_name: str | A prompt for a continuous voice command loop: record → act → confirm → repeat |
| dictate\_document\_section | section\_title: str, style: str | A prompt for dictating a section of a document with specified style |


| Scenario | How It Works |
| :---- | :---- |
| Claude in Cursor: 'Ask the user verbally' | Claude calls record\_and\_transcribe. User speaks. Claude receives the text as a tool result and continues its task. |
| Hermes Agent: voice-interactive session | Hermes calls record\_and\_transcribe in a loop. Each response is spoken back via TTS. Pure voice interface, no keyboard. |
| Claude Code: 'Describe the bug you're seeing' | Claude calls record\_and\_transcribe with pipeline\_id='command\_clean'. User describes the bug. Claude files an issue. |
| Ambient transcription resource | An agent subscribes to vox://transcription/latest as a resource. When the user presses their hotkey and speaks, the agent is notified and acts on the transcription. |
| Multi-modal document drafting | Agent alternates between asking questions (text), recording answers (voice via Vox), and assembling a document. Each answer is polished by the dictation\_polish pipeline. |
| Voice-controlled automation | Agent uses deliver\_text to send voice-transcribed commands to shell scripts or home automation without the user switching focus. |

## **3.8  Security Model**

* Localhost-only by default: The server binds to 127.0.0.1 and is inaccessible from the network without explicit opt-in.

* Microphone confirmation: When require\_confirmation \= true, a system tray notification asks the user to approve each MCP-initiated recording before the mic opens.

* Tool allowlist: Each tool can be individually disabled. Operators deploying Vox in a team setting can restrict which tools are exposed.

* Target allowlist: The allowed\_targets config limits which output targets an MCP client can route to, preventing an agent from sending transcribed text to unexpected destinations.

* No auth by default for localhost: MCP over localhost does not require authentication. If network binding is enabled, the user must configure an API key in the \[mcp.auth\] section.


## **4.2  The New Identity: Vox**

◆  Vox  (Latin: voice). Short, memorable, one syllable, works in every language, zero collisions in the Linux tool ecosystem, and it says exactly what the product is about without constraining the implementation.

| Dimension | Whisper-Wayland | Vox |
| :---- | :---- | :---- |
| Category signal | STT utility for a specific display protocol | AI audio interface / voice platform |
| Who it's for | Linux power users who know what Whisper is | Developers building AI systems; any Linux user |
| Model binding | Implies Whisper only | Model-agnostic: Whisper, Parakeet, Vosk, etc. |
| Platform binding | Implies Wayland only | Works on Wayland and X11 |
| Extensibility signal | None — sounds like a finished utility | Implies a platform with APIs and integrations |
| Memorable | No (9 syllables, hyphenated) | Yes (1 syllable) |
| Domain availability | N/A (tool name) | vox-audio.dev / getvox.dev available to check |

## **4.3  Positioning Statement**

| ◆  VOX  ◆ The Intelligent Audio Interface for Linux Vox is a programmable voice input platform that connects your voice to any AI agent, tool, or workflow. It speaks MCP, runs locally, and keeps your audio private. |
| :---: |

## **4.4  Tagline Options**

| Tagline | Angle |
| :---- | :---- |
| "Your voice. Any agent." | Partnership / interoperability — best for developer marketing |
| "Speak to your stack." | Developer culture — works for CLI/AI developer audience |
| "The voice layer for AI." | Platform positioning — signals infrastructure, not a utility |
| "Private. Local. Programmable." | Privacy-first — resonates with Linux / open source community |
| "From whisper to action." | Journey framing — subtle Whisper nod for existing users |

## **4.7  The New README Opening**

| README.md — New Opening |
| :---- |
| \# ◆ Vox — Intelligent Audio Interface Vox is a programmable voice input platform for Linux. It connects your voice to any AI agent, CLI tool, or workflow — locally, privately, and with zero cloud dependency. \#\# What Vox does \- Transcribes speech in real time using faster-whisper or whisper.cpp \- Routes transcribed text to named destinations: terminals, agents,   files, sockets, or the focused window \- Processes text through per-binding LLM pipelines (local Ollama models)   before delivery — so each hotkey can have its own AI transformation \- Exposes an MCP server so any LLM agent (Claude, ChatGPT, Cursor, Zed)   can use your microphone as a first-class tool \- Double-tap modifier keys to switch voice destinations without touching   the keyboard \#\# Quick example Double-tap Left Ctrl → speak a question → Hermes Agent receives it, already cleaned and formatted, as if you'd typed it. \#\# Who it's for Vox is built for developers and power users who work with AI tooling and want voice as a native input channel — not an afterthought. |

## **5.2  The New User Story Matrix**

| Who | What They Do | Features Used |
| :---- | :---- | :---- |
| Developer with Claude Code | Speaks task descriptions to Claude while keeping focus in the editor | MCP server → record\_and\_transcribe → command\_clean pipeline |
| Developer with Hermes | Double-taps Left Ctrl to issue voice commands to agent | Double-tap binding → pipe target → command\_clean pipeline |
| Writer doing long-form dictation | Holds Super+Space and dictates paragraphs | Hold binding → inject target → dictation\_polish pipeline (Ollama grammar) |
| Researcher taking meeting notes | Holds Super+J to capture voice bullets | Hold binding → journal file target → meeting\_note pipeline (Ollama bullets) |
| Power user building automation | Speaks English commands that Ollama converts to shell commands | exec target → shell\_command pipeline → bash \-c '{TEXT}' |
| Accessibility user | Entire desktop interaction is voice-driven; Vox is always listening for target selection | toggle bindings → multiple targets → minimal pipelines |
| AI engineer testing prompts | Uses MCP client to call run\_pipeline with different pipeline IDs on test text | MCP run\_pipeline tool → direct pipeline testing without audio |
