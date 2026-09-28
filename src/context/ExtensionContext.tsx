"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ExtensionMode, QuickAction, SimulatedWebpage, ExtensionSettings } from "@/types/extension";
import { AI_MODELS, DEFAULT_MODEL_ID, getModelById } from "@/data/models";

export const SIMULATED_WEBPAGES: SimulatedWebpage[] = [
  {
    id: "page-github",
    title: "facebook/react: The library for web and native user interfaces",
    url: "https://github.com/facebook/react",
    domain: "github.com",
    favicon: "https://github.githubassets.com/favicons/favicon.svg",
    category: "Engineering",
    contentSnippet: "React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.",
    fullContent: `React: The Library for Web and Native User Interfaces.
React lets you build user interfaces out of individual pieces called components.
Create your own React components like Thumbnail, LikeButton, and Video. Then combine them into entire screens, pages, and apps.
Whether you work on your own or with thousands of other developers, using React feels the same.
It is designed to let you seamlessly combine components written by independent people, teams, and organizations.
Key Features in React 19:
- Server Components and Actions
- Actions and useActionState
- useOptimistic for immediate state feedback
- Direct Asset Loading & Document Metadata support
- Native Custom Element support`,
    sampleSelection: "React 19 Actions and useOptimistic for immediate state feedback"
  },
  {
    id: "page-arxiv",
    title: "DeepSeek-V3 Technical Report: Architecture & Benchmarks",
    url: "https://arxiv.org/abs/2412.19437",
    domain: "arxiv.org",
    favicon: "https://arxiv.org/favicon.ico",
    category: "AI Research",
    contentSnippet: "We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token. DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architecture...",
    fullContent: `Title: DeepSeek-V3 Technical Report
Authors: DeepSeek-AI Team
Abstract:
We present DeepSeek-V3, a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token.
To achieve efficient inference and cost-effective training, DeepSeek-V3 adopts Multi-head Latent Attention (MLA) and DeepSeekMoE architecture.
Furthermore, DeepSeek-V3 pioneers an auxiliary-loss-free strategy for load balancing, which minimizes the performance degradation that arises from encouraging load balance.
DeepSeek-V3 is pretrained on 14.8 trillion diverse tokens, followed by Supervised Fine-Tuning and Reinforcement Learning stages.
Comprehensive evaluations reveal that DeepSeek-V3 outperforms other open-source models and achieves performance comparable to leading proprietary frontier models.`,
    sampleSelection: "Multi-head Latent Attention (MLA) and auxiliary-loss-free strategy for load balancing"
  },
  {
    id: "page-tc",
    title: "Frontier AI Ecosystems Shift Toward Multi-Model Aggregation",
    url: "https://techcrunch.com/2026/09/multi-ai-ecosystems-shift",
    domain: "techcrunch.com",
    favicon: "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png",
    category: "News",
    contentSnippet: "Enterprises and developers are no longer committing to a single model provider. Tools like EchoGPT that aggregate Claude, OpenAI, and Gemini with side-by-side benchmarking are seeing exponential adoption...",
    fullContent: `Frontier AI Ecosystems Shift Toward Multi-Model Aggregation.
By TechCrunch Silicon Valley Bureau.
Over the past twelve months, developer preferences have decisively shifted from single-model subscriptions toward aggregated workspaces.
With different models excelling at distinct workloads—Claude 3.5 Sonnet for code architecture, GPT-4o for multimodal workflows, and Gemini 1.5 Pro for massive 2M-token document analysis—paying for fragmented tools has created cognitive friction and inflated subscription costs.
EchoGPT, developed by AppifyDevs, has pioneered an integrated ecosystem combining a full-featured web app with a responsive Chrome sidebar extension that bridges in-browser reading with real-time AI assistance.`,
    sampleSelection: "paying for fragmented tools has created cognitive friction and inflated subscription costs"
  }
];

export const EXTENSION_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "act-summarize",
    label: "Summarize Page",
    iconName: "FileText",
    category: "reading",
    promptTemplate: "Summarize the key takeaways and core insights of this webpage in 4 concise bullet points.",
    description: "Extract high-density summary of active tab"
  },
  {
    id: "act-explain",
    label: "Explain Selected",
    iconName: "HelpCircle",
    category: "reading",
    promptTemplate: "Explain this selected concept in clear, simple terms with an intuitive analogy:",
    description: "Break down complex highlighted jargon"
  },
  {
    id: "act-code",
    label: "Review Code",
    iconName: "Code2",
    category: "coding",
    promptTemplate: "Review this code snippet for bugs, performance bottlenecks, and TypeScript best practices:",
    description: "Deep lint and optimize highlighted code"
  },
  {
    id: "act-translate",
    label: "Translate",
    iconName: "Languages",
    category: "translation",
    promptTemplate: "Translate this text accurately into natural, fluent English while preserving technical terms:",
    description: "Translate into English, Spanish, or Bengali"
  },
  {
    id: "act-grammar",
    label: "Fix Grammar",
    iconName: "CheckCheck",
    category: "writing",
    promptTemplate: "Proofread and polish this text for professional grammar, flow, and conciseness:",
    description: "Instant professional writing polish"
  },
  {
    id: "act-reply",
    label: "Draft Reply",
    iconName: "Send",
    category: "writing",
    promptTemplate: "Draft a polite, professional, and actionable email response to this message:",
    description: "Generate contextual smart replies"
  }
];

interface ExtensionContextType {
  mode: ExtensionMode;
  isSidebarOpen: boolean;
  activeWebpage: SimulatedWebpage;
  selectedText: string;
  activeModelId: string;
  extensionChatMessages: Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: number }>;
  isStreaming: boolean;
  settings: ExtensionSettings;

  // Actions
  setMode: (mode: ExtensionMode) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setActiveWebpage: (page: SimulatedWebpage) => void;
  setSelectedText: (text: string) => void;
  setActiveModelId: (modelId: string) => void;
  executeQuickAction: (action: QuickAction, customInput?: string) => Promise<void>;
  sendExtensionMessage: (content: string) => Promise<void>;
  clearExtensionChat: () => void;
  updateSettings: (newSettings: Partial<ExtensionSettings>) => void;
}

const ExtensionContext = createContext<ExtensionContextType | undefined>(undefined);

export function ExtensionProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ExtensionMode>("sidebar");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeWebpage, setActiveWebpage] = useState<SimulatedWebpage>(SIMULATED_WEBPAGES[0]);
  const [selectedText, setSelectedText] = useState<string>(SIMULATED_WEBPAGES[0].sampleSelection);
  const [activeModelId, setActiveModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [extensionChatMessages, setExtensionChatMessages] = useState<
    Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: number }>
  >([
    {
      id: "ext-msg-1",
      role: "assistant",
      content: `👋 Hi! I'm **EchoGPT Sidebar**. I have context on **${SIMULATED_WEBPAGES[0].title}**.\n\nClick any Quick Action below or ask me questions about this page!`,
      timestamp: Date.now() - 60000
    }
  ]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [settings, setSettings] = useState<ExtensionSettings>({
    defaultModelId: DEFAULT_MODEL_ID,
    theme: "dark",
    enableFloatingButton: true,
    autoExtractPageContent: true,
    shortcut: "Ctrl+Shift+E",
    responseLength: "balanced",
    streamSpeed: "fast"
  });

  const updateSettings = useCallback((newSettings: Partial<ExtensionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const sendExtensionMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMsg = {
      id: `ext-u-${Date.now()}`,
      role: "user" as const,
      content: content.trim(),
      timestamp: Date.now()
    };

    const astId = `ext-a-${Date.now()}`;
    const assistantPlaceholder = {
      id: astId,
      role: "assistant" as const,
      content: "",
      timestamp: Date.now() + 50
    };

    setExtensionChatMessages((prev) => [...prev, userMsg, assistantPlaceholder]);
    setIsStreaming(true);

    const model = getModelById(activeModelId);

    // Generate smart response based on page context and query
    let fullResponse = `### ${model.name} Analysis (${activeWebpage.domain})\n\n`;

    if (content.toLowerCase().includes("summar")) {
      fullResponse += `**Summary of ${activeWebpage.title}:**\n\n1. **Core Purpose:** ${activeWebpage.contentSnippet}\n2. **Key Innovation:** Context-aware AI streamlining reading comprehension and synthesis.\n3. **Actionable Takeaway:** Zero friction access without switching away from active browsing.\n\n*Extracted directly via EchoGPT Chrome Sidebar.*`;
    } else if (content.toLowerCase().includes("explain")) {
      fullResponse += `**Concept Explanation:**\n\n> *"${selectedText || content}"*\n\nThis refers to high-velocity modern architecture where state transitions are optimistically rendered on the client for immediate 0ms visual feedback while background network reconciliation occurs asynchronously!`;
    } else {
      fullResponse += `I've analyzed your query against the active page (**${activeWebpage.title}**):\n\n${content}\n\n*Response generated using ${model.provider} ${model.name} with full DOM context awareness.*`;
    }

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx += 8;
      if (charIdx >= fullResponse.length) {
        clearInterval(interval);
        setExtensionChatMessages((prev) =>
          prev.map((m) => (m.id === astId ? { ...m, content: fullResponse } : m))
        );
        setIsStreaming(false);
      } else {
        const partial = fullResponse.slice(0, charIdx);
        setExtensionChatMessages((prev) =>
          prev.map((m) => (m.id === astId ? { ...m, content: partial } : m))
        );
      }
    }, 20);
  };

  const executeQuickAction = async (action: QuickAction, customInput?: string) => {
    let prompt = action.promptTemplate;
    if (customInput) {
      prompt += `\n\n"${customInput}"`;
    } else if (selectedText) {
      prompt += `\n\n"${selectedText}"`;
    } else {
      prompt += `\n\nContext from page: "${activeWebpage.contentSnippet}"`;
    }
    await sendExtensionMessage(prompt);
  };

  const clearExtensionChat = () => {
    setExtensionChatMessages([
      {
        id: `ext-fresh-${Date.now()}`,
        role: "assistant",
        content: `Sidebar session reset for **${activeWebpage.domain}**. How can I help you?`,
        timestamp: Date.now()
      }
    ]);
  };

  return (
    <ExtensionContext.Provider
      value={{
        mode,
        isSidebarOpen,
        activeWebpage,
        selectedText,
        activeModelId,
        extensionChatMessages,
        isStreaming,
        settings,
        setMode,
        setIsSidebarOpen,
        setActiveWebpage,
        setSelectedText,
        setActiveModelId,
        executeQuickAction,
        sendExtensionMessage,
        clearExtensionChat,
        updateSettings
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
}

export function useExtension() {
  const context = useContext(ExtensionContext);
  if (!context) {
    throw new Error("useExtension must be used within an ExtensionProvider");
  }
  return context;
}
