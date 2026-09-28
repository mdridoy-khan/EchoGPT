"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      id: "starter",
      name: "Starter Free",
      description: "Perfect for testing and lightweight daily AI assistance.",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever free",
      isPopular: false,
      ctaText: "Start Free",
      ctaLink: "/web-app",
      features: [
        "Access to fast frontier models (GPT-4o mini, Llama 3.3)",
        "EchoGPT Chrome Sidebar extension",
        "50 free daily standard requests",
        "Local conversation history & Markdown export",
        "Community Discord support"
      ]
    },
    {
      id: "pro",
      name: "Pro Creator",
      description: "For engineers, researchers, and power users demanding top-tier LLMs.",
      priceMonthly: "$15",
      priceAnnual: "$12",
      period: "per month, billed annually",
      isPopular: true,
      ctaText: "Get Pro Access",
      ctaLink: "/web-app",
      features: [
        "Everything in Starter, plus:",
        "Unlimited access to Claude 3.5 Sonnet & GPT-4o",
        "Side-by-Side Dual Arena Benchmarking",
        "2M Token context window (Gemini 1.5 Pro)",
        "Live Code Studio sandbox & React canvas preview",
        "Web search intelligence grounding & citations",
        "BYOK (Bring Your Own Key) zero-rate-limit support",
        "Priority latency & zero throttling"
      ]
    },
    {
      id: "team",
      name: "Team & Enterprise",
      description: "Dedicated workspace for engineering teams with shared prompt vaults.",
      priceMonthly: "$35",
      priceAnnual: "$29",
      period: "per user / month",
      isPopular: false,
      ctaText: "Deploy for Team",
      ctaLink: "/web-app",
      features: [
        "Everything in Pro, plus:",
        "Centralized team billing & seat management",
        "Shared custom prompt templates & personas",
        "Enterprise SSO (Okta, Google Workspace)",
        "Audit logs & compliance reporting",
        "Dedicated account manager & SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-100/60 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            One Plan. Every Frontier AI Model.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Choose the plan that fits your workflow. Cancel or switch anytime.
          </p>

          {/* Billing Interval Switcher */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 rounded-full bg-slate-300 dark:bg-slate-700 p-0.5 transition-colors focus:outline-none"
            >
              <div
                className={`h-5 w-5 rounded-full bg-indigo-600 shadow-md transform transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              <span>Yearly</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isPopular
                  ? "bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-2xl scale-105 z-10"
                  : "bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-lg"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-[11px] shadow-md uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">
                    {tier.description}
                  </p>
                </div>

                <div className="py-2 border-y border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {isAnnual ? tier.priceAnnual : tier.priceMonthly}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {tier.priceMonthly === "$0" ? "" : isAnnual ? "/mo" : "/mo"}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {tier.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    What&apos;s Included
                  </span>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={tier.ctaLink}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    tier.isPopular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
