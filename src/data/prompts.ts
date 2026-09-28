export interface PromptTemplate {
  id: string;
  category: "Code" | "Writing" | "Brainstorming" | "Analysis" | "Productivity";
  title: string;
  prompt: string;
  icon: string;
  recommendedModelId: string;
}

export const PROMPT_SUGGESTIONS: PromptTemplate[] = [
  {
    id: "p1",
    category: "Code",
    title: "Build a Modern React Dashboard",
    prompt: "Create a modern, responsive analytics dashboard component using React, TypeScript, and Tailwind CSS with glassmorphism cards and chart placeholders.",
    icon: "LayoutDashboard",
    recommendedModelId: "claude-3-5-sonnet"
  },
  {
    id: "p2",
    category: "Code",
    title: "Debug & Optimize TypeScript Architecture",
    prompt: "Review the following TypeScript state machine pattern for potential memory leaks, unhandled edge cases, and performance bottlenecks.",
    icon: "Cpu",
    recommendedModelId: "deepseek-v3"
  },
  {
    id: "p3",
    category: "Analysis",
    title: "Side-by-Side Model Comparison Benchmark",
    prompt: "Compare the architectural differences between Next.js App Router server actions vs traditional REST API routes with pros, cons, and performance trade-offs.",
    icon: "GitCompare",
    recommendedModelId: "gpt-4o"
  },
  {
    id: "p4",
    category: "Writing",
    title: "Craft High-Converting Product Copy",
    prompt: "Write a high-converting, crisp product landing page hero headline, 3 benefit bullet points, and an irresistible CTA for an AI productivity tool.",
    icon: "PenTool",
    recommendedModelId: "claude-3-5-sonnet"
  },
  {
    id: "p5",
    category: "Brainstorming",
    title: "Design System Token Architecture",
    prompt: "Provide a comprehensive semantic color token structure for a modern dark/light mode SaaS web app following WCAG 2.1 AA accessibility guidelines.",
    icon: "Palette",
    recommendedModelId: "gpt-4o"
  },
  {
    id: "p6",
    category: "Productivity",
    title: "Summarize & Extract Executive Action Items",
    prompt: "Summarize this technical specification document into 5 key architectural decisions, potential risks, and a prioritized sprint roadmap.",
    icon: "ListChecks",
    recommendedModelId: "gemini-1-5-pro"
  }
];

export const PROMPT_LIBRARY: Record<string, PromptTemplate[]> = {
  "Frontend & Engineering": [
    {
      id: "fe-1",
      category: "Code",
      title: "Write Clean React Custom Hook",
      prompt: "Create a reusable, strongly-typed React custom hook `useDebounce` with full TypeScript generics and unit test specifications.",
      icon: "Code2",
      recommendedModelId: "claude-3-5-sonnet"
    },
    {
      id: "fe-2",
      category: "Code",
      title: "Design Responsive Bento Grid",
      prompt: "Generate a responsive Bento Grid layout in Tailwind CSS with micro-interaction hover states and accessible keyboard focus borders.",
      icon: "Grid",
      recommendedModelId: "claude-3-5-sonnet"
    },
    {
      id: "fe-3",
      category: "Code",
      title: "Optimize Web Vitals & Hydration",
      prompt: "Explain practical techniques to eliminate Layout Shift (CLS) and maximize Largest Contentful Paint (LCP) in modern Next.js 14+ SSR apps.",
      icon: "Gauge",
      recommendedModelId: "gpt-4o"
    }
  ],
  "Product & Strategy": [
    {
      id: "ps-1",
      category: "Brainstorming",
      title: "SaaS Go-To-Market Strategy",
      prompt: "Draft a 90-day GTM roadmap for an AI developer productivity tool targeting indie hackers and tech leads on Twitter and Product Hunt.",
      icon: "Rocket",
      recommendedModelId: "gpt-4o"
    },
    {
      id: "ps-2",
      category: "Analysis",
      title: "Competitive Feature Matrix",
      prompt: "Construct a comparative feature matrix analyzing multi-model AI aggregators vs native LLM web clients on speed, pricing, and UX.",
      icon: "Table",
      recommendedModelId: "gemini-1-5-pro"
    }
  ],
  "Writing & Research": [
    {
      id: "wr-1",
      category: "Writing",
      title: "Technical Blog Post Draft",
      prompt: "Write a high-clarity technical blog post explaining the Model Context Protocol (MCP) and how it transforms client-side AI agent workflows.",
      icon: "BookOpen",
      recommendedModelId: "claude-3-5-sonnet"
    },
    {
      id: "wr-2",
      category: "Analysis",
      title: "Research Paper Deep Dive",
      prompt: "Break down the core mathematical intuition and attention mechanisms of Mixture of Experts (MoE) architectures in plain English.",
      icon: "GraduationCap",
      recommendedModelId: "deepseek-v3"
    }
  ]
};
