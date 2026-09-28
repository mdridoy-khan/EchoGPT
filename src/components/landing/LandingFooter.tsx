"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ExternalLink, Layers } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                EchoGPT Ecosystem
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              The unified multi-model AI platform bridging web productivity and browser intelligence. Developed by AppifyDevs for elite software engineering workflows.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Frontier API Systems Operational</span>
            </div>
          </div>

          {/* Deliverables Col */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/web-app" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Web App Redesign
                </Link>
              </li>
              <li>
                <Link href="/extension" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Chrome Extension Simulator
                </Link>
              </li>
              <li>
                <a href="#arena" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Arena Benchmark
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  Supported AI Models
                </a>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Organization
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://appifydevs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AppifyDevs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://echogpt.live/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>EchoGPT Live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Chrome Web Store</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Privacy Col */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Privacy & Quality
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-500 dark:text-slate-400">WCAG 2.1 AA Compliant</span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400">Zero Prompt Logging</span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400">Client-Side BYOK Vault</span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-slate-400">Next.js 15+ App Router</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-500">
            © 2026 EchoGPT Ecosystem by AppifyDevs. Software Engineering Frontend Assignment Submission.
          </p>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>using Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
