"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Layers,
  PanelRightClose,
  PanelRightOpen,
  Laptop,
  Smartphone,
  ExternalLink,
  Search,
  BookOpen,
  CheckCheck,
  HelpCircle,
  Code2,
  FileText,
  RotateCcw,
  Maximize2
} from "lucide-react";
import { useExtension, SIMULATED_WEBPAGES, EXTENSION_QUICK_ACTIONS } from "@/context/ExtensionContext";
import { ExtensionPopup } from "./ExtensionPopup";

export function ExtensionLayout() {
  const {
    activeWebpage,
    setActiveWebpage,
    selectedText,
    setSelectedText,
    isSidebarOpen,
    setIsSidebarOpen,
    executeQuickAction
  } = useExtension();

  const [viewMode, setViewMode] = useState<"browser" | "popup">("browser");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="h-14 px-4 sm:px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs">
              <Layers className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-white">
              EchoGPT Chrome Extension Redesign Concept
            </span>
          </div>
        </div>

        {/* Mode Selector & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode("browser")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors ${
                viewMode === "browser"
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Browser Sidebar Mode</span>
            </button>
            <button
              onClick={() => setViewMode("popup")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors ${
                viewMode === "popup"
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Toolbar Popup Mode</span>
            </button>
          </div>

          <Link
            href="/web-app"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors border border-slate-700"
          >
            <span>Launch Web App</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="flex-1 flex flex-col p-3 sm:p-6 overflow-hidden">
        {viewMode === "popup" ? (
          /* Standalone Toolbar Popup View */
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Chrome Action Popup (380 × 600)
              </span>
              <p className="text-xs text-slate-400">
                This simulates the exact overlay UI opened when a user clicks the EchoGPT extension icon in Chrome.
              </p>
            </div>
            <ExtensionPopup isSidebar={false} />
          </div>
        ) : (
          /* Full Simulated Browser Window with Docked Sidebar */
          <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Browser Window Chrome Toolbar */}
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Browser Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {SIMULATED_WEBPAGES.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setActiveWebpage(page);
                      setSelectedText(page.sampleSelection);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-colors shrink-0 ${
                      activeWebpage.id === page.id
                        ? "bg-slate-950 text-white border border-slate-800 font-semibold"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    <span className="truncate max-w-[140px] sm:max-w-[200px]">{page.title}</span>
                  </button>
                ))}
              </div>

              {/* URL Address Bar & Toggle Sidebar */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex-1 sm:w-80 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 truncate flex items-center gap-2">
                  <span className="text-emerald-400">🔒</span>
                  <span className="truncate">{activeWebpage.url}</span>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    isSidebarOpen
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                  title="Toggle EchoGPT Sidebar (Ctrl+Shift+E)"
                >
                  {isSidebarOpen ? <PanelRightClose className="h-3.5 w-3.5" /> : <PanelRightOpen className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}</span>
                </button>
              </div>
            </div>

            {/* Split View: Simulated Webpage Left, Docked Extension Sidebar Right */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Webpage Viewport */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-950/80 space-y-6">
                <div className="max-w-3xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                    <span>{activeWebpage.category}</span>
                    <span>•</span>
                    <span>{activeWebpage.domain}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeWebpage.title}
                  </h1>

                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Interactive Selection Simulation
                      </span>
                      <span className="text-[11px] text-slate-400">Click to change selection</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-indigo-950/60 p-3 rounded-xl border border-indigo-900/50">
                      &ldquo;{selectedText}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => executeQuickAction(EXTENSION_QUICK_ACTIONS[0])}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] text-white font-medium"
                      >
                        <FileText className="h-3 w-3" />
                        <span>Summarize Page</span>
                      </button>
                      <button
                        onClick={() => executeQuickAction(EXTENSION_QUICK_ACTIONS[1])}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-[11px] text-white font-medium"
                      >
                        <HelpCircle className="h-3 w-3" />
                        <span>Explain Selected Text</span>
                      </button>
                      <button
                        onClick={() => executeQuickAction(EXTENSION_QUICK_ACTIONS[2])}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[11px] text-white font-medium"
                      >
                        <Code2 className="h-3 w-3" />
                        <span>Review Code Snippet</span>
                      </button>
                    </div>
                  </div>

                  {/* Article / Repo Full text */}
                  <div className="text-sm text-slate-300 leading-relaxed space-y-4 pt-2">
                    {activeWebpage.fullContent.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Docked Extension Sidebar (380px) */}
              {isSidebarOpen && (
                <div className="w-80 sm:w-96 border-l border-slate-800 h-full flex shrink-0 animate-in slide-in-from-right-10 duration-200">
                  <ExtensionPopup isSidebar={true} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
