"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Sparkles,
  Command,
  FileText,
  HelpCircle,
  Code2,
  CheckCheck,
  Languages,
  ExternalLink
} from "lucide-react";

export function ExtensionShowcase() {
  const [activeAction, setActiveAction] = useState("summarize");

  return (
    <section id="extension" className="py-20 sm:py-28 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Chrome Extension Redesign
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              AI That Lives Right Where You Browse.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Never copy-paste long articles, GitHub repos, or documentation into a separate tab again. The reimagined EchoGPT Chrome extension injects multi-model intelligence directly into your browser viewport.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                  <Command className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Instant Keyboard Trigger (Ctrl+Shift+E)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Summons the sidebar on any active tab without breaking your reading flow.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Smart Text-Selection Floating Pill
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Highlight any phrase to explain jargon, review code syntax, or translate instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/extension"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Layers className="h-4 w-4" />
                <span>Test Interactive Extension Simulator</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Interactive Mock Browser with Docked Sidebar */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden p-2 sm:p-3">
              {/* Browser Window frame */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                {/* Browser Tab Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-slate-900 text-[11px] font-mono text-slate-400 border border-slate-800">
                      https://github.com/facebook/react
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider">
                    Sidebar Docked (380px)
                  </span>
                </div>

                {/* Simulated Webpage + Docked Sidebar */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
                  {/* Left simulated page content */}
                  <div className="md:col-span-6 p-4 sm:p-6 bg-slate-950/60 border-r border-slate-800/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-slate-800 flex items-center justify-center font-bold text-xs text-white">
                        ⚛
                      </span>
                      <span className="font-semibold text-xs text-white">facebook / react</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-200">
                      React: The Library for Web Interfaces
                    </h3>
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[11px] text-indigo-300">
                      ✨ <span className="underline font-medium">Selected text:</span> &ldquo;useOptimistic for immediate state feedback and Server Actions&rdquo;
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      React lets you build user interfaces out of individual pieces called components. Create your own components like Thumbnail and LikeButton...
                    </p>
                  </div>

                  {/* Right docked EchoGPT sidebar */}
                  <div className="md:col-span-6 p-4 bg-slate-900 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Sidebar Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-purple-400" />
                          <span className="font-bold text-xs text-white">EchoGPT Sidebar</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                          Claude 3.5 Sonnet
                        </span>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <button className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-medium transition-colors text-left">
                          <FileText className="h-3 w-3 text-indigo-400" />
                          <span>Summarize</span>
                        </button>
                        <button className="flex items-center gap-1.5 p-2 rounded-lg bg-purple-600/20 text-purple-300 text-[11px] font-medium border border-purple-500/30 text-left">
                          <HelpCircle className="h-3 w-3" />
                          <span>Explain Selected</span>
                        </button>
                      </div>

                      {/* Simulated AI Answer */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                        <p className="font-semibold text-purple-400 text-[11px]">
                          ⚡ Instant Explanation:
                        </p>
                        <p className="text-[11px] text-slate-300">
                          <code className="text-purple-300 font-mono">useOptimistic</code> is a React 19 hook that updates the UI immediately before network confirmation, giving the illusion of instant responsiveness.
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Ask follow-up question...</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Enter ↵
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
