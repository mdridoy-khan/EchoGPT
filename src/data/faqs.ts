export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Models & Arena" | "Chrome Extension" | "Privacy & Security" | "Billing";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is EchoGPT and how is it different from ChatGPT or Claude?",
    answer: "EchoGPT is an all-in-one multi-model AI ecosystem that unifies OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google (Gemini 1.5 Pro), DeepSeek V3, and Meta (Llama 3.3) under a single intuitive interface and Chrome extension. Instead of paying $20/month separately for 4 different subscriptions ($80/month total), EchoGPT lets you switch between models dynamically in the same conversation, compare them side-by-side, and invoke them on any webpage via our browser sidebar."
  },
  {
    id: "faq-2",
    category: "Models & Arena",
    question: "How does the Side-by-Side Arena Comparison work?",
    answer: "With Compare Mode enabled, when you submit a prompt, EchoGPT executes requests to two chosen models concurrently in a dual-pane layout. You can evaluate their answers side-by-side, view generation speed and token telemetry, and choose which branch of thought you want to continue conversation with."
  },
  {
    id: "faq-3",
    category: "Chrome Extension",
    question: "How do I use the EchoGPT Chrome Extension while browsing?",
    answer: "Install the verified EchoGPT extension from the Chrome Web Store and press Ctrl+Shift+E (or Command+Shift+E on macOS) on any page. You can instantly summarize the active webpage, explain highlighted technical terms, draft email replies in Gmail, or review code on GitHub without opening a new tab."
  },
  {
    id: "faq-4",
    category: "Privacy & Security",
    question: "Is my conversation data used to train AI models?",
    answer: "No. EchoGPT uses zero-retention enterprise API endpoints and client-side encryption. If you use Bring-Your-Own-Key (BYOK), your requests route directly from your client to the provider API. Your proprietary documents, prompts, and credentials are never sold, collected, or used for model training."
  },
  {
    id: "faq-5",
    category: "Billing",
    question: "Can I use EchoGPT for free?",
    answer: "Yes! The Starter Free tier provides access to fast frontier models with daily free token quotas and full access to the Chrome extension sidebar. Power users, developers, and teams can upgrade to Pro ($12/month) for unlimited fast-lane queries, multi-model arena comparisons, and 2M token context windows."
  },
  {
    id: "faq-6",
    category: "General",
    question: "Can I bring my own API keys (BYOK)?",
    answer: "Absolutely. In the EchoGPT Settings panel, you can insert your own OpenAI, Anthropic, Google AI Studio, or DeepSeek API keys. You will only pay the raw wholesale token cost directly to providers, and EchoGPT serves as your lightning-fast frontend client."
  }
];
