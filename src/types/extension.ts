export type ExtensionMode = "popup" | "sidebar";

export interface QuickAction {
  id: string;
  label: string;
  iconName: string;
  promptTemplate: string;
  description: string;
  category: "reading" | "writing" | "coding" | "translation";
}

export interface SimulatedWebpage {
  id: string;
  title: string;
  url: string;
  domain: string;
  favicon: string;
  category: "Engineering" | "AI Research" | "Documentation" | "News";
  contentSnippet: string;
  fullContent: string;
  sampleSelection: string;
}

export interface ExtensionSettings {
  defaultModelId: string;
  theme: "system" | "dark" | "light";
  enableFloatingButton: boolean;
  autoExtractPageContent: boolean;
  shortcut: string;
  responseLength: "concise" | "balanced" | "detailed";
  streamSpeed: "normal" | "fast" | "instant";
}
