import { Conversation } from "@/types/chat";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "React Virtualized List Optimization",
    modelId: "claude-3-5-sonnet",
    createdAt: Date.now() - 1000 * 60 * 35, // 35 minutes ago
    updatedAt: Date.now() - 1000 * 60 * 15,
    isPinned: true,
    tags: ["React", "Performance", "TypeScript"],
    tokensTotal: 1420,
    webSearchEnabled: false,
    messages: [
      {
        id: "m-101",
        role: "user",
        content: "How do I build a smooth, high-performance windowed virtual list in React for 100,000 items without dropping frames on mobile?",
        timestamp: Date.now() - 1000 * 60 * 35,
        modelId: "claude-3-5-sonnet"
      },
      {
        id: "m-102",
        role: "assistant",
        content: `To achieve 60fps rendering with 100,000 items on mobile, we only render the items visible within the active scroll viewport plus an overscan buffer (e.g. 5 items above and below).

Here is a clean, dependency-free React Virtualizer hook in TypeScript:

\`\`\`tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  viewportHeight: number;
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({
  items,
  itemHeight,
  viewportHeight,
  overscan = 4,
  renderItem,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;

  // Calculate visible range based on scroll position
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + viewportHeight) / itemHeight) + overscan
  );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      index: startIndex + index,
      offsetTop: (startIndex + index) * itemHeight,
    }));
  }, [items, startIndex, endIndex, itemHeight]);

  return (
    <div
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: viewportHeight, overflowY: 'auto', position: 'relative' }}
      className="border rounded-xl bg-slate-900 text-white will-change-scroll"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, offsetTop }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: offsetTop,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Key Performance Benefits:
1. **Constant DOM Nodes:** Regardless of 10k or 1M items, only ~20 DOM elements exist at any time.
2. **GPU Layer Promotion:** \`will-change-scroll\` instructs the browser compositor to isolate the scroll layer.
3. **Memory Footprint:** Keeps memory consumption under ~12MB.`,
        timestamp: Date.now() - 1000 * 60 * 34,
        modelId: "claude-3-5-sonnet",
        modelName: "Claude 3.5 Sonnet",
        reasoningDurationSeconds: 1.4,
        tokensUsed: {
          prompt: 48,
          completion: 420,
          total: 468
        },
        isLiked: true,
        artifacts: [
          {
            id: "art-1",
            title: "VirtualList.tsx",
            language: "typescript",
            code: `export function VirtualListDemo() { ... }`,
            description: "High-performance React virtualized list"
          }
        ]
      }
    ]
  },
  {
    id: "conv-2",
    title: "AI Model Benchmark Comparison: GPT-4o vs Claude 3.5",
    modelId: "gpt-4o",
    compareModelId: "claude-3-5-sonnet",
    isCompareMode: true,
    createdAt: Date.now() - 1000 * 60 * 180, // 3 hours ago
    updatedAt: Date.now() - 1000 * 60 * 120,
    isPinned: true,
    tags: ["Arena", "Benchmark", "Comparison"],
    tokensTotal: 2850,
    webSearchEnabled: true,
    messages: [
      {
        id: "m-201",
        role: "user",
        content: "Explain the mathematical intuition behind the Attention Mechanism in Transformers and why Multi-Head Attention improves representation capacity.",
        timestamp: Date.now() - 1000 * 60 * 180,
        modelId: "gpt-4o"
      },
      {
        id: "m-202",
        role: "assistant",
        content: `### Scaled Dot-Product Attention Formula

The core intuition behind attention is dynamic retrieval: computing similarity between a Query ($Q$) and Keys ($K$) to take a weighted sum of Values ($V$):

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

#### Why Scale by $\\sqrt{d_k}$?
For large key dimensions $d_k$, the dot product $QK^T$ grows large in magnitude, pushing the softmax function into regions with extremely small gradients (vanishing gradient problem). Dividing by $\\sqrt{d_k}$ stabilizes the variance to $1$.

#### Why Multi-Head Attention?
Single-head attention forces the model to average over multiple linguistic relationships. Multi-Head Attention projects $Q, K, V$ into $h$ distinct subspaces ($h=8$ or $16$):

$$\\text{MHA}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O$$

Each head specializes in different relationships:
* **Head 1:** Grammatical dependencies (e.g. Subject - Verb)
* **Head 2:** Coreference resolution (e.g. "it" -> "the cat")
* **Head 3:** Long-range semantic context`,
        timestamp: Date.now() - 1000 * 60 * 179,
        modelId: "gpt-4o",
        modelName: "GPT-4o",
        reasoningDurationSeconds: 1.1,
        tokensUsed: { prompt: 56, completion: 390, total: 446 },
        webSources: [
          {
            title: "Attention Is All You Need (Vaswani et al.)",
            url: "https://arxiv.org/abs/1706.03762",
            snippet: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...",
            siteName: "arXiv.org"
          }
        ]
      }
    ]
  },
  {
    id: "conv-3",
    title: "Next.js 15 Server Actions & Optimistic UI",
    modelId: "deepseek-v3",
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    updatedAt: Date.now() - 1000 * 60 * 60 * 22,
    isPinned: false,
    tags: ["Next.js", "Server Actions", "Full-Stack"],
    tokensTotal: 1890,
    webSearchEnabled: false,
    messages: [
      {
        id: "m-301",
        role: "user",
        content: "What is the best way to handle optimistic UI updates with Next.js Server Actions and useOptimistic hook?",
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
        modelId: "deepseek-v3"
      },
      {
        id: "m-302",
        role: "assistant",
        content: `In React 19 / Next.js 15, \`useOptimistic\` allows updating the UI immediately before the Server Action completes on the server. If the server action errors out, React rolls back the optimistic state automatically!

\`\`\`tsx
'use client';
import { useOptimistic, useTransition } from 'react';

export function LikeButton({ initialLikes, postId }: { initialLikes: number; postId: string }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (state, delta: number) => state + delta
  );

  async function handleLike() {
    startTransition(async () => {
      setOptimisticLikes(1);
      await toggleLikeServerAction(postId);
    });
  }

  return (
    <button onClick={handleLike} disabled={isPending} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white">
      <span>❤️</span>
      <span>{optimisticLikes}</span>
    </button>
  );
}
\`\`\``,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 + 2000,
        modelId: "deepseek-v3",
        modelName: "DeepSeek V3",
        reasoningDurationSeconds: 0.9,
        tokensUsed: { prompt: 42, completion: 310, total: 352 }
      }
    ]
  }
];
