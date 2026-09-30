# EchoGPT — Modern AI Ecosystem Redesign

> **Frontend Software Engineering Practical Assignment for AppifyDevs**  
> Redesign & Implementation of the **EchoGPT** Multi-AI Chat Ecosystem (Web App, Landing Page, and Chrome Extension Concept).

---

## 🌟 Executive Overview

**EchoGPT** is a next-generation multi-model AI productivity platform that unifies frontier AI models (**OpenAI GPT-4o**, **Anthropic Claude 3.5 Sonnet**, **Google Gemini 1.5 Pro**, **DeepSeek V3**, **Meta Llama 3.3 70B**, and **Mistral Large 2**) into one frictionless ecosystem.

This submission delivers three interconnected, production-ready modules built with **Next.js 15+ (App Router)**, **TypeScript**, and **Tailwind CSS**:

1. **EchoGPT Web App Redesign (`/web-app`)**: A high-velocity, Linear-inspired conversational AI interface featuring multi-model hot-swapping, side-by-side Arena comparison mode, interactive Code Studio sandbox, Web Search grounding with clickable citations, Voice-to-Text, Text-to-Speech audio readout, and local Bring-Your-Own-Key (BYOK) vault.
2. **Single-Page Landing Website (`/`)**: A high-converting SaaS landing page with interactive model test widgets, comparison pricing breakdown, feature bento grid, accessible FAQ accordions, and social proof.
3. **Chrome Extension Redesign Concept (`/extension`)**: An interactive browser simulator that tests the redesigned compact toolbar popup (380×600) and the docked in-browser sidebar (Ctrl+Shift+E) with active webpage context extraction, 1-click summarization, and smart text-selection explanation.

---

## 🚀 Live Demo & Navigation

| Deliverable           | URL Route                                                                                | Description                                                    |
| :-------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| **Landing Page**      | [`/`](file:///f:/front-end-basic%20practice/EchoGPT/src/app/page.tsx)                    | Hero, interactive LLM preview, features, pricing, and FAQs     |
| **Web App Redesign**  | [`/web-app`](file:///f:/front-end-basic%20practice/EchoGPT/src/app/web-app/page.tsx)     | Full multi-model chat workspace, arena split view, and canvas  |
| **Extension Concept** | [`/extension`](file:///f:/front-end-basic%20practice/EchoGPT/src/app/extension/page.tsx) | Interactive browser simulator with docked sidebar & popup mode |

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Components & Client Hydration)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety across models, messages, and state)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with semantic color tokens and dark/light mode
- **Motion & Micro-interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context + Custom Hooks + Persistent LocalStorage
- **Audio APIs**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## 📁 Project Architecture & Folder Organization

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Theme, Chat & Extension providers
│   ├── globals.css             # Design tokens, scrollbars, and dark/light themes
│   ├── page.tsx                # Single-Page EchoGPT Marketing Landing Page
│   ├── web-app/
│   │   └── page.tsx            # Redesigned EchoGPT Web Application
│   └── extension/
│       └── page.tsx            # Interactive Chrome Extension Concept & Sandbox
├── components/
│   ├── ui/                     # Reusable UI primitives
│   │   ├── Button.tsx          # Accessible buttons with variants & loading spinners
│   │   ├── Badge.tsx           # Status, model, and category pill badges
│   │   ├── Modal.tsx           # Accessible dialog with ESC & backdrop traps
│   │   └── MarkdownRenderer.tsx# Markdown parser with code highlighting & copy
│   ├── landing/                # Landing page sections
│   │   ├── LandingNavbar.tsx   # Glassmorphic sticky navbar with mobile drawer
│   │   ├── HeroSection.tsx     # Hero banner with live interactive model tester
│   │   ├── ModelsShowcase.tsx  # Interactive frontier LLM comparison matrix
│   │   ├── ComparisonArena.tsx # Side-by-side benchmarking & $80 vs $12 savings
│   │   ├── FeaturesSection.tsx # Bento grid with micro-interactions
│   │   ├── ExtensionShowcase.tsx # Floating in-browser sidebar preview
│   │   ├── WhyChooseSection.tsx# Direct feature matrix vs ChatGPT / Claude
│   │   ├── PricingSection.tsx  # Monthly/Annual toggle with 3 pricing tiers
│   │   ├── TestimonialsSection.tsx # Social proof with developer reviews
│   │   ├── FaqSection.tsx      # WCAG-compliant accessible accordion
│   │   ├── CtaSection.tsx      # High-conversion gradient CTA card
│   │   └── LandingFooter.tsx   # Comprehensive sitemap and AppifyDevs credits
│   ├── chat/                   # Web App Redesign components
│   │   ├── ChatLayout.tsx      # Main 3-pane responsive chat workspace
│   │   ├── Sidebar.tsx         # Search, pinned chats, history, prompt library
│   │   ├── ChatHeader.tsx      # Model selectors, Arena mode toggle, Web Search, Export
│   │   ├── ChatMessages.tsx    # Message stream, reasoning timers, and action bars
│   │   ├── PromptComposer.tsx  # Multi-line textarea, attachments, voice mic, token meter
│   │   ├── SettingsModal.tsx   # Temperature slider, BYOK keys, system persona
│   │   ├── PromptLibraryModal.tsx # 30+ curated engineering & strategy prompt templates
│   │   └── ArtifactsPanel.tsx  # Live Code Studio & interactive React sandbox
│   └── extension/              # Chrome Extension Concept components
│       ├── ExtensionPopup.tsx  # 380x600 compact popup with quick actions
│       └── ExtensionLayout.tsx # Browser simulator with active tab switcher
├── context/
│   ├── ThemeContext.tsx        # Persistent Dark / Light mode state
│   ├── ChatContext.tsx         # Multi-model chat state, streaming, arena compare
│   └── ExtensionContext.tsx    # Chrome extension simulator state & quick actions
├── data/
│   ├── models.ts               # Frontier AI models specifications (GPT-4o, Claude, etc.)
│   ├── features.ts             # Feature breakdown & category metadata
│   ├── prompts.ts              # Curated prompt suggestions & prompt library
│   ├── faqs.ts                 # Categorized FAQ questions and answers
│   ├── testimonials.ts         # User reviews & testimonials data
│   └── mockConversations.ts    # Rich preloaded conversation threads
├── hooks/
│   ├── useSpeechRecognition.ts # Web Speech voice input with simulation fallback
│   └── useTextToSpeech.ts      # Web Speech audio readout with voice synthesis
├── lib/
│   └── utils.ts                # cn() class utility, token estimator, date formatters
└── types/
    ├── chat.ts                 # Conversation, Message, and Artifact interfaces
    ├── models.ts               # AIModel, AIProvider, and ModelCategory types
    └── extension.ts            # ExtensionMode, QuickAction, and Webpage types
```

---

## ⚡ Key Features & Engineering Innovations

### 1. Unified Multi-Model Orchestration

- Seamlessly hot-swap between **GPT-4o**, **Claude 3.5 Sonnet**, **Gemini 1.5 Pro**, **DeepSeek V3**, **Llama 3.3**, and **Mistral Large 2** within the same conversation without resetting chat history.
- Model-specific parameter tuning (Temperature, Max Output Tokens, System Persona).

### 2. Side-by-Side Arena Comparison Mode

- Direct dual-stream response generation for comparing two models simultaneously against identical prompts.
- Telemetry badges displaying Time-To-First-Token (TTFT), tokens per second, and code precision.

### 3. Chrome Extension Concept & Sandbox

- Dual simulation modes: **Docked Browser Sidebar** (`Ctrl+Shift+E`) and **Compact Popup** (`380×600`).
- Context-aware Quick Actions: _Summarize Active Page_, _Explain Selected Text_, _Review Code_, _Translate_, and _Fix Grammar_.

### 4. Live Code Studio & Interactive Artifacts Canvas

- Syntax-highlighted code blocks with line numbers and one-click clipboard copying.
- Side-drawer preview panel rendering interactive mockups and component output.

### 5. Multimodal Input & Audio Intelligence

- **Voice-to-Text**: Dictate prompts using the Web Speech API with microphone visualizer.
- **Text-to-Speech**: Listen to assistant responses out loud with native speech synthesis.
- **File Attachments**: Upload and preview code snippets, images, and documents.

### 6. Local Privacy & BYOK Vault

- Bring-Your-Own-Key support stored strictly in browser `localStorage`.
- Zero prompt retention and instant data purge capability.

---

## 🎨 Design System & Accessibility (WCAG 2.1 AA)

- **Semantic HTML5**: Full adoption of `<main>`, `<nav>`, `<header>`, `<article>`, `<aside>`, `<section>`, and `<button>`.
- **Keyboard Navigation**:
  - `Enter`: Send message
  - `Shift + Enter`: New line in prompt composer
  - `Ctrl + Shift + E`: Toggle Chrome Sidebar extension
  - `Esc`: Close open dialogs and drawers
- **Contrast & Token System**: Handcrafted dark mode (`#090D16` / `#0F172A`) and light mode (`#F8FAFC` / `#FFFFFF`) ensuring >4.5:1 contrast ratios for text readability.
- **Focus Indicators**: Explicit `focus-visible:ring-2 focus-visible:ring-indigo-500` outlines on all interactive controls.

---

## 💻 Installation & Local Development

### Prerequisites

- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/EchoGPT.git
   cd EchoGPT
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start local development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Assumptions & Scope Notes

- **Frontend-First Scope**: In accordance with the assignment guidelines, this project focuses on frontend architecture, UI/UX polish, responsive design, and component reusability. AI responses and streaming tokens are simulated client-side to ensure zero rate-limit errors and instant demo reliability.
- **BYOK Architecture**: Users can input real API keys in the Settings modal to demonstrate how the client routes direct provider requests.

---

## 👨‍💻 Authors & Credits

Developed by Md Majedul Islam.
Email: mdridoy9902@gmail.com
