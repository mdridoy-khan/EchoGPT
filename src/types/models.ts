export type AIProvider = "OpenAI" | "Anthropic" | "Google" | "DeepSeek" | "Meta" | "Mistral";

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  providerBadge: string;
  version: string;
  icon: string; // Lucide icon or brand identifier
  color: string;
  accentGradient: string;
  badgeBg: string;
  description: string;
  tagline: string;
  contextWindow: string; // e.g. "128k tokens", "200k tokens", "2M tokens"
  maxOutputTokens: number;
  speedRating: number; // 1-5
  reasoningRating: number; // 1-5
  codingRating: number; // 1-5
  knowledgeCutoff: string;
  isVisionSupported: boolean;
  isWebSupported: boolean;
  isCodeInterpreterSupported: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  recommendedFor: string[];
}

export type ModelCategory = "all" | "flagship" | "fast" | "reasoning" | "coding" | "open-source";
