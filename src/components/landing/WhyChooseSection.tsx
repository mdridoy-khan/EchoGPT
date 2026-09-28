"use client";

import React from "react";
import { Check, X, Sparkles, Minus } from "lucide-react";

export function WhyChooseSection() {
  const comparisonRows = [
    {
      feature: "Access Multiple Frontier LLMs (OpenAI, Anthropic, Google)",
      echogpt: true,
      chatgpt: false,
      claude: false,
      note: "EchoGPT unifies 6+ frontier model providers"
    },
    {
      feature: "Real-Time Side-by-Side Dual Arena Benchmarking",
      echogpt: true,
      chatgpt: false,
      claude: false,
      note: "Directly compare code and reasoning"
    },
    {
      feature: "In-Browser Sidebar Chrome Extension with Web Context",
      echogpt: true,
      chatgpt: false,
      claude: false,
      note: "Extract active webpage summaries with Ctrl+Shift+E"
    },
    {
      feature: "Bring Your Own Key (BYOK) - Pay Wholesale Token Rates",
      echogpt: true,
      chatgpt: false,
      claude: false,
      note: "Save up to 80% on monthly expenses"
    },
    {
      feature: "Client-Side Privacy Vault & Zero Data Retention",
      echogpt: true,
      chatgpt: "partial",
      claude: "partial",
      note: "Keys & chats stored only in your local browser vault"
    },
    {
      feature: "Interactive Code Sandbox & Live Component Canvas",
      echogpt: true,
      chatgpt: "partial",
      claude: true,
      note: "Full React & Tailwind component previews"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Head-to-Head Comparison
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Choose EchoGPT?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            See how the redesigned EchoGPT ecosystem compares to legacy single-model subscriptions.
          </p>
        </div>

        {/* Responsive Table */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/80">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Feature & Capability
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 text-center">
                    EchoGPT Ecosystem
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">
                    ChatGPT Plus ($20)
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">
                    Claude Pro ($20)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">
                      <div>{row.feature}</div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.note}</div>
                    </td>

                    {/* EchoGPT Cell */}
                    <td className="py-4 px-6 bg-indigo-50/20 dark:bg-indigo-950/20 text-center">
                      <div className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                    </td>

                    {/* ChatGPT Plus Cell */}
                    <td className="py-4 px-6 text-center">
                      {row.chatgpt === true ? (
                        <div className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-600">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : row.chatgpt === "partial" ? (
                        <div className="inline-flex p-1 rounded-full bg-amber-500/10 text-amber-600">
                          <Minus className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <X className="h-4 w-4" />
                        </div>
                      )}
                    </td>

                    {/* Claude Pro Cell */}
                    <td className="py-4 px-6 text-center">
                      {row.claude === true ? (
                        <div className="inline-flex p-1 rounded-full bg-emerald-500/10 text-emerald-600">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : row.claude === "partial" ? (
                        <div className="inline-flex p-1 rounded-full bg-amber-500/10 text-amber-600">
                          <Minus className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="inline-flex p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <X className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
