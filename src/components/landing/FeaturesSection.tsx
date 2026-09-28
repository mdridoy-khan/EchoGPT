"use client";

import React from "react";
import { ECOSYSTEM_FEATURES } from "@/data/features";
import {
  Boxes,
  Columns2,
  PanelRight,
  Terminal,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case "Boxes":
        return <Boxes className="h-6 w-6 text-indigo-500" />;
      case "Columns2":
        return <Columns2 className="h-6 w-6 text-purple-500" />;
      case "PanelRight":
        return <PanelRight className="h-6 w-6 text-pink-500" />;
      case "Terminal":
        return <Terminal className="h-6 w-6 text-emerald-500" />;
      case "Globe":
        return <Globe className="h-6 w-6 text-sky-500" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-amber-500" />;
    }
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Intelligent Ecosystem
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered For Frictionless Productivity.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Every feature in EchoGPT is designed to save you minutes on every interaction, from contextual web sidebar lookups to real-time code sandboxes.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                idx === 0 || idx === 3 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  {feature.highlightBadge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {feature.highlightBadge}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {feature.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bullet list */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  {feature.bulletPoints.map((bp, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 flex justify-end">
                <Link
                  href={feature.id === "browser-sidebar" ? "/extension" : "/web-app"}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors"
                >
                  <span>Experience feature</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
