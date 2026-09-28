export type MessageRole = "user" | "assistant" | "system";

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: "image" | "pdf" | "code" | "document" | "audio";
  previewUrl?: string;
  extractedText?: string;
}

export interface WebSource {
  title: string;
  url: string;
  snippet: string;
  siteName: string;
  favicon?: string;
}

export interface CodeArtifact {
  id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  modelId: string;
  modelName?: string;
  attachments?: Attachment[];
  webSources?: WebSource[];
  artifacts?: CodeArtifact[];
  reasoningDurationSeconds?: number;
  tokensUsed?: {
    prompt: number;
    completion: number;
    total: number;
  };
  isStreaming?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
  feedbackNote?: string;
  branchFromMessageId?: string;
}

export interface CompareMessagePair {
  userMessage: Message;
  assistantModelA: Message;
  assistantModelB: Message;
}

export interface Conversation {
  id: string;
  title: string;
  modelId: string;
  compareModelId?: string;
  isCompareMode?: boolean;
  systemPrompt?: string;
  temperature?: number;
  webSearchEnabled?: boolean;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
  tags?: string[];
  tokensTotal?: number;
}

export type ConversationGroup = "Pinned" | "Today" | "Yesterday" | "Previous 7 Days" | "Older";
