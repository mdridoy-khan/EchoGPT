"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Columns2, ArrowRight, Check, X, Sparkles, DollarSign, Zap } from "lucide-react";

export function ComparisonArena() {
  const [selectedPrompt, setSelectedPrompt] = useState(
    "Write a TypeScript debounce function with proper generics and unit tests."
  );

  return (
    <section id="arena" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            Real-Time Dual Arena
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pit Models Side-by-Side. Stop Guessing.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Send one prompt to two models at the exact same moment. Observe variations in precision, tone, and algorithm depth in synchronized dual columns.
          </p>
        </div>

        {/* Live Arena Dual Column Preview */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6 mb-16">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px]">PROMPT</span>
              <span className="truncate">&ldquo;{selectedPrompt}&rdquo;</span>
            </div>
            <Link
              href="/web-app"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
            >
              <span>Try Live</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Dual Split Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model A: GPT-4o */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#10A37F]" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">GPT-4o</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                    0.8s TTFT
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">420 tokens</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono bg-slate-100 dark:bg-slate-900 p-3 rounded-xl">
                {`function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                ✓ Concise single-file implementation with Node typing.
              </div>
            </div>

            {/* Model B: Claude 3.5 Sonnet */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#D97706]" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Claude 3.5 Sonnet</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                    1.1s TTFT
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">510 tokens</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono bg-slate-100 dark:bg-slate-900 p-3 rounded-xl">
                {`interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: { immediate?: boolean } = {}
): DebouncedFunction<T> { ... }`}
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                ✓ Full production utility with cancel, flush, and immediate invocation controls!
              </div>
            </div>
          </div>
        </div>

        {/* Cost Savings Comparison Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900 border border-indigo-500/30 p-6 sm:p-10 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 80% on Monthly AI Expenses
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Why Pay $80/mo For 4 Disjointed Subscriptions?
              </h3>
              <p className="text-sm text-indigo-200 max-w-lg">
                ChatGPT Plus ($20) + Claude Pro ($20) + Gemini Advanced ($20) + Perplexity ($20) = $80/mo.
                EchoGPT unifies them all into one workspace for just $12/mo or Bring-Your-Own-Key.
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0 text-center w-full md:w-auto">
              <span className="text-xs text-indigo-200 uppercase tracking-wider font-semibold">
                EchoGPT All-in-One
              </span>
              <div className="text-4xl sm:text-5xl font-black my-1 text-white">
                $12<span className="text-base font-normal text-indigo-200">/mo</span>
              </div>
              <span className="text-xs text-emerald-300 font-medium mb-4">
                Unlimited Model Switching
              </span>
              <Link
                href="/web-app"
                className="w-full py-2.5 px-6 rounded-xl bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Start Saving Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
