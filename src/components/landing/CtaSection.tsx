"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Layers, ShieldCheck } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-16 bg-gradient-to-tr from-indigo-950 via-purple-950 to-slate-950 border border-indigo-500/30 overflow-hidden shadow-2xl text-center space-y-6">
          {/* Background Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Supercharge Your AI Engineering Workflow?
          </h2>

          <p className="text-sm sm:text-base text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers using EchoGPT to eliminate context switching, compare leading LLMs, and boost reading velocity with our Chrome extension.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/web-app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Launch EchoGPT Web App</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>

            <Link
              href="/extension"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              <Layers className="h-4 w-4 text-purple-300" />
              <span>Explore Extension Concept</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-indigo-300 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>No credit card required. Free starter tier included.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
