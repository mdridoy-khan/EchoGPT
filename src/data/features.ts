export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: "models" | "workflow" | "extension" | "privacy";
  highlightBadge?: string;
  statBadge?: string;
  bulletPoints: string[];
}

export const ECOSYSTEM_FEATURES: FeatureItem[] = [
  {
    id: "multi-model-switcher",
    title: "Unified Multi-Model Hub",
    tagline: "Every leading model under one unified, blazing fast roof",
    description: "Switch seamlessly between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek V3, and Llama 3.3 in the same conversation without losing context or history.",
    icon: "Boxes",
    category: "models",
    highlightBadge: "Zero Tab Switching",
    statBadge: "6+ Frontier LLMs",
    bulletPoints: [
      "Retain full chat context when hot-swapping active models",
      "Per-model temperature and system instruction tuning",
      "Model-specific token windows up to 2M tokens"
    ]
  },
  {
    id: "arena-compare",
    title: "Side-by-Side Arena Comparison",
    tagline: "Directly pit two AI titans against each other",
    description: "Send one prompt to two models simultaneously in a dual-pane split view. Compare code quality, reasoning speed, nuances, and accuracy in real time.",
    icon: "Columns2",
    category: "workflow",
    highlightBadge: "Benchmark in Real Time",
    statBadge: "2x Productivity",
    bulletPoints: [
      "Synchronized dual-stream response generation",
      "Comparative token and speed telemetry metrics",
      "Branch off from the winning model response with a single click"
    ]
  },
  {
    id: "browser-sidebar",
    title: "EchoGPT Chrome Extension",
    tagline: "Your AI co-pilot docked to any webpage you browse",
    description: "Summon the lightweight sidebar with Ctrl+Shift+E on GitHub, Docs, Research papers, or news. Summarize articles, explain selected text, and generate smart replies instantly.",
    icon: "PanelRight",
    category: "extension",
    highlightBadge: "Chrome Store Verified",
    statBadge: "Instant Keyboard Shortcut",
    bulletPoints: [
      "1-click active webpage summarization and takeaway extraction",
      "Floating instant text-selection translation and explanation",
      "Full 2-way cloud sync with your EchoGPT web workspace"
    ]
  },
  {
    id: "code-artifacts",
    title: "Live Code Studio & Interactive Sandbox",
    tagline: "Render, edit, and preview frontend code in real time",
    description: "Write TypeScript, React components, Tailwind layouts, or SVG designs and view interactive visual previews directly inside your chat workspace.",
    icon: "Terminal",
    category: "workflow",
    highlightBadge: "Interactive Canvas",
    statBadge: "HTML / React / SVG",
    bulletPoints: [
      "Syntax highlighting with line numbers and one-click copy",
      "Live interactive canvas sandbox for UI mockups",
      "Export code snippets straight to GitHub or local files"
    ]
  },
  {
    id: "web-grounding",
    title: "Live Web Grounding & Search",
    tagline: "Always fresh, citation-backed answers with zero hallucination",
    description: "Toggle Web Search intelligence to scrape live sources, verify breaking news, review documentation updates, and view clickable source citations with favicons.",
    icon: "Globe",
    category: "workflow",
    highlightBadge: "Real-time Intelligence",
    statBadge: "Clickable Citations",
    bulletPoints: [
      "Scrapes fresh web data with domain-level source breakdown",
      "Inline footnote citations with domain previews",
      "Automatic source verification and summary extraction"
    ]
  },
  {
    id: "privacy-vault",
    title: "Local Privacy & BYOK Architecture",
    tagline: "Your chats, keys, and data stay under your total control",
    description: "Bring Your Own Key (BYOK) support for direct provider API routing. Local storage encryption guarantees your prompts and sensitive workflows never train third-party models.",
    icon: "ShieldCheck",
    category: "privacy",
    highlightBadge: "Enterprise Ready",
    statBadge: "100% Client-Side Vault",
    bulletPoints: [
      "Zero prompt logging on intermediate servers",
      "Encrypted API key storage directly in your browser",
      "Instant data purge and JSON/Markdown chat export"
    ]
  }
];
