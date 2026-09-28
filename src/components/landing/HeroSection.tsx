"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  Columns2,
  Terminal,
  Layers,
  ChevronRight,
  Send,
  Cpu
} from "lucide-react";
import { AI_MODELS } from "@/data/models";

export function HeroSection() {
  const [activeModelId, setActiveModelId] = useState("claude-3-5-sonnet");
  const [demoPrompt, setDemoPrompt] = useState("Explain how EchoGPT unifies GPT-4o and Claude 3.5 without context loss.");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState(
    "EchoGPT maintains a unified conversation graph. When you hot-swap between Claude 3.5 Sonnet and GPT-4o, the system dynamically tokenizes the transcript to ensure uninterrupted conversational continuity and side-by-side benchmarking."
  );

  const selectedModel = AI_MODELS.find((m) => m.id === activeModelId) || AI_MODELS[0];

  const handleTestPrompt = (modelId: string) => {
    setActiveModelId(modelId);
    setIsSimulating(true);
    setSimulatedResponse("");

    const model = AI_MODELS.find((m) => m.id === modelId) || AI_MODELS[0];
    const newText = `[${model.name} (${model.provider}) Output]: EchoGPT provides instant access to my ${model.contextWindow} context window with synchronized arena comparison, web grounding, and browser sidebar integration!`;

    let i = 0;
    const interval = setInterval(() => {
      i += 6;
      if (i >= newText.length) {
        clearInterval(interval);
        setSimulatedResponse(newText);
        setIsSimulating(false);
      } else {
        setSimulatedResponse(newText.slice(0, i));
      }
    }, 20);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:border-indigo-500/40 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>EchoGPT 2.0 Ecosystem Redesign</span>
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5">
              AppifyDevs Official
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            One Unified Workspace.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Every Frontier AI Model.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop juggling multiple $20/month AI subscriptions. Access GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek V3 in one high-velocity web app and browser sidebar extension.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/web-app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Launch Web App (Free)</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>

            <Link
              href="/extension"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-800 transition-all shadow-sm"
            >
              <Layers className="h-4 w-4 text-purple-500" />
              <span>Explore Chrome Extension Concept</span>
            </Link>
          </div>

          {/* Key Metrics / Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>6+ Frontier AI Models</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Columns2 className="h-4 w-4 text-indigo-500" />
              <span>Side-by-Side Arena Compare</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Zero Data Training & BYOK</span>
            </div>
          </div>
        </div>

        {/* Interactive Product Preview Widget */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 via-slate-100 to-slate-200/50 dark:from-slate-800/80 dark:via-slate-900 dark:to-slate-950 border border-slate-300 dark:border-slate-800 shadow-2xl">
          {/* Mock Browser Header */}
          <div className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Top Bar with simulated model tabs */}
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                  https://echogpt.live/app
                </span>
              </div>

              {/* Model Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 text-xs">
                {AI_MODELS.slice(0, 4).map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleTestPrompt(model.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                      activeModelId === model.id
                        ? "bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm font-semibold"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: model.color }}
                    />
                    <span>{model.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Live Playground Body */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* User Prompt */}
              <div className="flex justify-end gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-600 text-white text-xs sm:text-sm font-medium max-w-md shadow-md">
                  {demoPrompt}
                </div>
              </div>

              {/* Assistant Stream Response */}
              <div className="flex gap-3">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow"
                  style={{ backgroundColor: selectedModel.color }}
                >
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {selectedModel.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {selectedModel.provider}
                    </span>
                    <span className="text-[10px] text-emerald-500 font-mono">
                      ● Active Stream
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {simulatedResponse}
                    {isSimulating && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 bg-indigo-500 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>

              {/* Prompt Input in Mock */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                <span>Click any model pill above to test instantaneous response routing!</span>
                <Link
                  href="/web-app"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open in Full Web App</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
