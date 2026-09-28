"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Conversation, Message, Attachment, WebSource, CodeArtifact } from "@/types/chat";
import { AIModel } from "@/types/models";
import { AI_MODELS, DEFAULT_MODEL_ID, DEFAULT_COMPARE_MODEL_ID, getModelById } from "@/data/models";
import { MOCK_CONVERSATIONS } from "@/data/mockConversations";

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string | null;
  activeConversation: Conversation | null;
  activeModelId: string;
  compareModelId: string;
  isCompareMode: boolean;
  isStreaming: boolean;
  webSearchEnabled: boolean;
  searchQuery: string;
  activeArtifact: CodeArtifact | null;
  isArtifactPanelOpen: boolean;
  isSettingsOpen: boolean;
  isPromptLibraryOpen: boolean;
  isSidebarOpen: boolean;
  userApiKey: string;
  customSystemPrompt: string;
  temperature: number;

  // Actions
  setActiveConversationId: (id: string) => void;
  setActiveModelId: (modelId: string) => void;
  setCompareModelId: (modelId: string) => void;
  setIsCompareMode: (enabled: boolean) => void;
  setWebSearchEnabled: (enabled: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveArtifact: (artifact: CodeArtifact | null) => void;
  setIsArtifactPanelOpen: (isOpen: boolean) => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  setIsPromptLibraryOpen: (isOpen: boolean) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setUserApiKey: (key: string) => void;
  setCustomSystemPrompt: (prompt: string) => void;
  setTemperature: (temp: number) => void;

  // Core Operations
  createNewChat: (initialModelId?: string) => string;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  stopStreaming: () => void;
  regenerateMessage: (messageId: string) => Promise<void>;
  editUserMessage: (messageId: string, newContent: string) => Promise<void>;
  deleteConversation: (conversationId: string) => void;
  renameConversation: (conversationId: string, newTitle: string) => void;
  togglePinConversation: (conversationId: string) => void;
  toggleLikeMessage: (messageId: string) => void;
  toggleDislikeMessage: (messageId: string) => void;
  exportConversation: (format: "markdown" | "json" | "text") => void;
  clearAllConversations: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(MOCK_CONVERSATIONS[0].id);
  const [activeModelId, setActiveModelId] = useState<string>(DEFAULT_MODEL_ID);
  const [compareModelId, setCompareModelId] = useState<string>(DEFAULT_COMPARE_MODEL_ID);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArtifact, setActiveArtifact] = useState<CodeArtifact | null>(null);
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [customSystemPrompt, setCustomSystemPrompt] = useState<string>("You are EchoGPT, an elite multi-model AI system. Provide precise, well-structured, code-rich responses.");
  const [temperature, setTemperature] = useState<number>(0.7);

  const abortControllerRef = React.useRef<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem("echogpt-conversations");
      if (savedConversations) {
        const parsed = JSON.parse(savedConversations);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          setActiveConversationId(parsed[0].id);
        }
      }
      const savedApiKey = localStorage.getItem("echogpt-api-key");
      if (savedApiKey) setUserApiKey(savedApiKey);

      const savedSysPrompt = localStorage.getItem("echogpt-sys-prompt");
      if (savedSysPrompt) setCustomSystemPrompt(savedSysPrompt);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("echogpt-conversations", JSON.stringify(conversations));
    } catch (e) {
      // quota or localstorage error
    }
  }, [conversations]);

  const activeConversation = React.useMemo(() => {
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  // Sync active conversation models
  useEffect(() => {
    if (activeConversation) {
      setActiveModelId(activeConversation.modelId || DEFAULT_MODEL_ID);
      if (activeConversation.compareModelId) {
        setCompareModelId(activeConversation.compareModelId);
      }
      if (activeConversation.isCompareMode !== undefined) {
        setIsCompareMode(activeConversation.isCompareMode);
      }
      if (activeConversation.webSearchEnabled !== undefined) {
        setWebSearchEnabled(activeConversation.webSearchEnabled);
      }
    }
  }, [activeConversationId]);

  const createNewChat = useCallback((initialModelId?: string): string => {
    const selectedModel = initialModelId || activeModelId || DEFAULT_MODEL_ID;
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: "New Conversation",
      modelId: selectedModel,
      compareModelId: compareModelId,
      isCompareMode: isCompareMode,
      systemPrompt: customSystemPrompt,
      temperature: temperature,
      webSearchEnabled: webSearchEnabled,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false,
      tags: [],
      tokensTotal: 0
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    return newId;
  }, [activeModelId, compareModelId, isCompareMode, customSystemPrompt, temperature, webSearchEnabled]);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current = true;
    setIsStreaming(false);
  }, []);

  // AI Response generator
  const generateMockAIResponse = (
    prompt: string,
    model: AIModel,
    isWeb: boolean,
    attachments?: Attachment[]
  ): { text: string; sources?: WebSource[]; artifacts?: CodeArtifact[] } => {
    const lower = prompt.toLowerCase();

    let sources: WebSource[] | undefined = undefined;
    if (isWeb) {
      sources = [
        {
          title: `${model.name} Research & Documentation`,
          url: "https://echogpt.live/docs",
          siteName: "EchoGPT Live Docs",
          snippet: `Live web verified context retrieved for query: "${prompt.slice(0, 60)}..."`
        },
        {
          title: "MDN Web Docs - Modern Web Architecture",
          url: "https://developer.mozilla.org",
          siteName: "developer.mozilla.org",
          snippet: "Official guidelines for responsive design, accessibility, and high-performance frontend APIs."
        }
      ];
    }

    if (lower.includes("virtual") || lower.includes("list") || lower.includes("scroll")) {
      return {
        text: `### High-Performance Virtualization (${model.name})

To efficiently render large datasets in React, windowing keeps the DOM node count constant by only painting visible viewport nodes plus an overscan buffer.

\`\`\`tsx
import React, { useState, useMemo } from 'react';

export function VirtualizedList<T>({
  items,
  itemHeight = 50,
  containerHeight = 400,
  renderItem
}: {
  items: T[];
  itemHeight?: number;
  containerHeight?: number;
  renderItem: (item: T, idx: number) => React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + 3);

  const visible = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, i) => ({
      item,
      index: startIndex + i,
      top: (startIndex + i) * itemHeight
    }));
  }, [items, startIndex, endIndex, itemHeight]);

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: containerHeight }}
      className="overflow-y-auto relative rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-inner"
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visible.map(({ item, index, top }) => (
          <div key={index} style={{ position: 'absolute', top, left: 0, right: 0, height: itemHeight }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

#### Key Architecture Takeaways:
1. **Overscan Buffering:** Prevents blank white flashes during fast mobile scrolling.
2. **GPU Acceleration:** Adding \`will-change-transform\` promotes items to separate render compositors.
3. **Memory Footprint:** Scalable to 1,000,000+ items with <15MB heap memory!`,
        sources,
        artifacts: [
          {
            id: `art-${Date.now()}`,
            title: "VirtualizedList.tsx",
            language: "typescript",
            code: "export function VirtualizedList() { /* Full implementation */ }",
            description: "High-performance React virtualized list"
          }
        ]
      };
    }

    if (lower.includes("compare") || lower.includes("vs") || lower.includes("difference")) {
      return {
        text: `### Comparative Analysis (${model.name})

When architecting scalable frontend systems, selecting the right abstraction depends on state velocity, caching requirements, and network topology:

| Dimension | Option A (Direct Stream) | Option B (Aggregated State) |
| :--- | :--- | :--- |
| **Latency (TTFT)** | Blazing (<120ms) | Moderate (~400ms) |
| **Throughput** | High concurrency | Batch-limited |
| **Edge Cacheability** | Partial (Chunked) | Full CDN Static/ISR |
| **DX & Debugging** | Requires stream hooks | Standard Promise/async |

#### Strategic Recommendation:
For interactive AI applications like **EchoGPT**, streaming responses with optimistic UI state delivers the lowest perceived latency and highest perceived user delight!`,
        sources
      };
    }

    if (lower.includes("dashboard") || lower.includes("component") || lower.includes("button") || lower.includes("card")) {
      return {
        text: `Here is a modern, accessible UI component designed with **Tailwind CSS**, **Framer Motion**, and strict **TypeScript**:

\`\`\`tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl hover:border-indigo-500/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
        <span className={\`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold \${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
        }\`}>
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
      </div>
    </motion.div>
  );
};
\`\`\`

This component includes smooth GPU hover animations, dynamic color tokens, and accessible semantic markup.`,
        sources,
        artifacts: [
          {
            id: `art-ui-${Date.now()}`,
            title: "MetricCard.tsx",
            language: "tsx",
            code: "export const MetricCard = () => { /* ... */ };",
            description: "Modern analytics metric card"
          }
        ]
      };
    }

    // Default intelligent response
    return {
      text: `### ${model.name} Response

I have analyzed your query with **${model.provider}** architecture.

> **Key Insight:** ${prompt.length > 80 ? prompt.slice(0, 80) + "..." : prompt}

Here is a structured breakdown:

1. **Architecture & Design:**
   * Uses clear separation of concerns with composable UI modules.
   * Leverages Tailwind CSS design tokens for instantaneous dark/light mode switching.
2. **Speed & Scalability:**
   * Response rendered with **${model.speedRating * 20}ms** simulated token velocity.
   * Model reasoning verified against current knowledge cutoff (${model.knowledgeCutoff}).
3. **Actionable Recommendations:**
   * Use keyboard shortcuts (\`Cmd/Ctrl+K\` for quick search, \`Enter\` to submit).
   * Try the side-by-side Arena comparison mode to inspect alternative model viewpoints!

Let me know if you would like me to deep dive into code, write test suites, or generate an interactive preview!`,
      sources
    };
  };

  const sendMessage = async (content: string, attachments: Attachment[] = []) => {
    if (!content.trim() && attachments.length === 0) return;
    if (isStreaming) return;

    abortControllerRef.current = false;
    setIsStreaming(true);

    let currentConvId = activeConversationId;
    let targetConv = conversations.find((c) => c.id === currentConvId);

    if (!targetConv || !currentConvId) {
      currentConvId = createNewChat(activeModelId);
      targetConv = {
        id: currentConvId,
        title: content.slice(0, 32) || "New Conversation",
        modelId: activeModelId,
        compareModelId: compareModelId,
        isCompareMode: isCompareMode,
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tokensTotal: 0
      };
    }

    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
      modelId: activeModelId,
      attachments: attachments.length > 0 ? attachments : undefined
    };

    const activeModel = getModelById(activeModelId);
    const compareModel = getModelById(compareModelId);

    // Placeholder Assistant message(s)
    const assistantMsgA: Message = {
      id: `msg-ast-a-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: Date.now() + 100,
      modelId: activeModel.id,
      modelName: activeModel.name,
      isStreaming: true,
      reasoningDurationSeconds: 0.8,
      tokensUsed: { prompt: Math.ceil(content.length / 4), completion: 0, total: 0 }
    };

    let assistantMsgB: Message | null = null;
    if (isCompareMode) {
      assistantMsgB = {
        id: `msg-ast-b-${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: Date.now() + 150,
        modelId: compareModel.id,
        modelName: compareModel.name,
        isStreaming: true,
        reasoningDurationSeconds: 1.0,
        tokensUsed: { prompt: Math.ceil(content.length / 4), completion: 0, total: 0 }
      };
    }

    // Determine conversation title if it's the first message
    const isFirstMessage = targetConv.messages.length === 0;
    const newTitle = isFirstMessage ? (content.trim().slice(0, 38) || "Conversation") : targetConv.title;

    // Update conversation state with user message and streaming placeholder
    const initialAssistantList = assistantMsgB ? [assistantMsgA, assistantMsgB] : [assistantMsgA];
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === currentConvId) {
          return {
            ...c,
            title: newTitle,
            updatedAt: Date.now(),
            messages: [...c.messages, userMsg, ...initialAssistantList]
          };
        }
        return c;
      })
    );

    // Generate Full Response Mock
    const fullResponseA = generateMockAIResponse(content, activeModel, webSearchEnabled, attachments);
    const fullResponseB = isCompareMode
      ? generateMockAIResponse(content, compareModel, webSearchEnabled, attachments)
      : null;

    // Simulate Token-by-Token Streaming
    const responseTextA = fullResponseA.text;
    const responseTextB = fullResponseB ? fullResponseB.text : "";
    const maxLength = Math.max(responseTextA.length, responseTextB.length);

    let charIdx = 0;
    const chunkSize = 6;
    const delayMs = 25;

    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (abortControllerRef.current || charIdx >= maxLength) {
          clearInterval(interval);
          setIsStreaming(false);

          // Finalize messages state
          setConversations((prev) =>
            prev.map((c) => {
              if (c.id === currentConvId) {
                const updatedMessages = c.messages.map((m) => {
                  if (m.id === assistantMsgA.id) {
                    return {
                      ...m,
                      content: responseTextA,
                      isStreaming: false,
                      webSources: fullResponseA.sources,
                      artifacts: fullResponseA.artifacts,
                      tokensUsed: {
                        prompt: Math.ceil(content.length / 4),
                        completion: Math.ceil(responseTextA.length / 4),
                        total: Math.ceil((content.length + responseTextA.length) / 4)
                      }
                    };
                  }
                  if (assistantMsgB && m.id === assistantMsgB.id) {
                    return {
                      ...m,
                      content: responseTextB,
                      isStreaming: false,
                      webSources: fullResponseB?.sources,
                      artifacts: fullResponseB?.artifacts,
                      tokensUsed: {
                        prompt: Math.ceil(content.length / 4),
                        completion: Math.ceil(responseTextB.length / 4),
                        total: Math.ceil((content.length + responseTextB.length) / 4)
                      }
                    };
                  }
                  return m;
                });
                return {
                  ...c,
                  messages: updatedMessages,
                  tokensTotal: (c.tokensTotal || 0) + Math.ceil((content.length + responseTextA.length + responseTextB.length) / 4)
                };
              }
              return c;
            })
          );
          resolve();
          return;
        }

        charIdx += chunkSize;
        const currentA = responseTextA.slice(0, charIdx);
        const currentB = responseTextB.slice(0, charIdx);

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === currentConvId) {
              return {
                ...c,
                messages: c.messages.map((m) => {
                  if (m.id === assistantMsgA.id) {
                    return { ...m, content: currentA };
                  }
                  if (assistantMsgB && m.id === assistantMsgB.id) {
                    return { ...m, content: currentB };
                  }
                  return m;
                })
              };
            }
            return c;
          })
        );
      }, delayMs);
    });
  };

  const regenerateMessage = async (messageId: string) => {
    if (!activeConversation) return;
    const msgIndex = activeConversation.messages.findIndex((m) => m.id === messageId);
    if (msgIndex === -1) return;

    // Find preceding user message
    let lastUserMessage = "";
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (activeConversation.messages[i].role === "user") {
        lastUserMessage = activeConversation.messages[i].content;
        break;
      }
    }

    if (!lastUserMessage) lastUserMessage = "Regenerate answer";

    // Delete everything from msgIndex onwards and resend
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            messages: c.messages.slice(0, msgIndex)
          };
        }
        return c;
      })
    );

    await sendMessage(lastUserMessage);
  };

  const editUserMessage = async (messageId: string, newContent: string) => {
    if (!activeConversation) return;
    const msgIndex = activeConversation.messages.findIndex((m) => m.id === messageId);
    if (msgIndex === -1) return;

    // Truncate messages after this point and resend
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            messages: c.messages.slice(0, msgIndex)
          };
        }
        return c;
      })
    );

    await sendMessage(newContent);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations((prev) => {
      const remaining = prev.filter((c) => c.id !== conversationId);
      if (remaining.length === 0) {
        const fallbackId = `conv-${Date.now()}`;
        const fallbackConv: Conversation = {
          id: fallbackId,
          title: "New Conversation",
          modelId: DEFAULT_MODEL_ID,
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        setActiveConversationId(fallbackId);
        return [fallbackConv];
      }
      if (activeConversationId === conversationId) {
        setActiveConversationId(remaining[0].id);
      }
      return remaining;
    });
  };

  const renameConversation = (conversationId: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, title: newTitle.trim() || "Untitled" } : c))
    );
  };

  const togglePinConversation = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  const toggleLikeMessage = (messageId: string) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === messageId ? { ...m, isLiked: !m.isLiked, isDisliked: false } : m
        )
      }))
    );
  };

  const toggleDislikeMessage = (messageId: string) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === messageId ? { ...m, isDisliked: !m.isDisliked, isLiked: false } : m
        )
      }))
    );
  };

  const exportConversation = (format: "markdown" | "json" | "text") => {
    if (!activeConversation) return;

    let content = "";
    let filename = `${activeConversation.title.replace(/\s+/g, "_").toLowerCase()}.${format === "markdown" ? "md" : format}`;
    let mimeType = "text/plain";

    if (format === "markdown") {
      content = `# ${activeConversation.title}\n\n*Created: ${new Date(activeConversation.createdAt).toLocaleString()}*\n*Model: ${activeConversation.modelId}*\n\n---\n\n`;
      activeConversation.messages.forEach((m) => {
        content += `### ${m.role === "user" ? "👤 User" : `🤖 Assistant (${m.modelName || m.modelId})`}\n\n${m.content}\n\n---\n\n`;
      });
      mimeType = "text/markdown";
    } else if (format === "json") {
      content = JSON.stringify(activeConversation, null, 2);
      mimeType = "application/json";
    } else {
      activeConversation.messages.forEach((m) => {
        content += `[${m.role.toUpperCase()} - ${m.modelName || m.modelId}]:\n${m.content}\n\n`;
      });
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllConversations = () => {
    const freshId = `conv-${Date.now()}`;
    const freshConv: Conversation = {
      id: freshId,
      title: "New Conversation",
      modelId: DEFAULT_MODEL_ID,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setConversations([freshConv]);
    setActiveConversationId(freshId);
    try {
      localStorage.removeItem("echogpt-conversations");
    } catch (e) {}
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversationId,
        activeConversation,
        activeModelId,
        compareModelId,
        isCompareMode,
        isStreaming,
        webSearchEnabled,
        searchQuery,
        activeArtifact,
        isArtifactPanelOpen,
        isSettingsOpen,
        isPromptLibraryOpen,
        isSidebarOpen,
        userApiKey,
        customSystemPrompt,
        temperature,
        setActiveConversationId,
        setActiveModelId,
        setCompareModelId,
        setIsCompareMode,
        setWebSearchEnabled,
        setSearchQuery,
        setActiveArtifact,
        setIsArtifactPanelOpen,
        setIsSettingsOpen,
        setIsPromptLibraryOpen,
        setIsSidebarOpen,
        setUserApiKey,
        setCustomSystemPrompt,
        setTemperature,
        createNewChat,
        sendMessage,
        stopStreaming,
        regenerateMessage,
        editUserMessage,
        deleteConversation,
        renameConversation,
        togglePinConversation,
        toggleLikeMessage,
        toggleDislikeMessage,
        exportConversation,
        clearAllConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
