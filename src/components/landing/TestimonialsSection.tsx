"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { Star, Sparkles, CheckCircle2, Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            Loved By Engineers & Creators
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by 50,000+ Developers Worldwide
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Discover why developers, researchers, and technical founders have switched their daily AI workflows to EchoGPT.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all group"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* User Info */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shrink-0">
                  <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-white uppercase">
                    {t.name.slice(0, 2)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {t.name}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
