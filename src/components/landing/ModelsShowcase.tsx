"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AI_MODELS } from "@/data/models";
import {
  Sparkles,
  Zap,
  BrainCircuit,
  Cpu,
  Layers,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Shield,
  Code2
} from "lucide-react";

export function ModelsShowcase() {
  const [selectedModelId, setSelectedModelId] = useState("claude-3-5-sonnet");
  const activeModel = AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];

  return (
    <section id="models" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Multi-Model AI Infrastructure
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The World&apos;s Most Capable LLMs. Synchronized.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            No single AI model is best at everything. EchoGPT lets you dynamically leverage each model&apos;s unique superpowers in the same workflow.
          </p>
        </div>

        {/* Model Tabs Bar */}
        <div className="flex justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8">
          {AI_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                selectedModelId === model.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: model.color }}
              />
              <span>{model.name}</span>
            </button>
          ))}
        </div>

        {/* Active Model Deep-Dive Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-md text-xl font-bold"
                style={{ backgroundColor: activeModel.color }}
              >
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {activeModel.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                    {activeModel.providerBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  Cutoff: {activeModel.knowledgeCutoff} • Version: {activeModel.version}
                </p>
              </div>
            </div>

            <Link
              href="/web-app"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 self-start sm:self-auto"
            >
              <span>Chat with {activeModel.name}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Description & Tagline */}
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              {activeModel.tagline}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModel.description}
            </p>
          </div>

          {/* Performance Radar & Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Context Window</span>
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                {activeModel.contextWindow}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Coding Rating</span>
              <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {activeModel.codingRating} / 5.0
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Reasoning</span>
              <div className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {activeModel.reasoningRating} / 5.0
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Inference Speed</span>
              <div className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 font-mono">
                {activeModel.speedRating} / 5.0
              </div>
            </div>
          </div>

          {/* Recommended Use Cases */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Ideal Workloads & Strengths
            </span>
            <div className="flex flex-wrap gap-2">
              {activeModel.recommendedFor.map((rec, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
