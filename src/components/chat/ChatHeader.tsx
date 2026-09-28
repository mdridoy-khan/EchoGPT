"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  Sparkles,
  Columns2,
  Globe,
  Code2,
  Download,
  Trash2,
  Sun,
  Moon,
  Check,
  Zap,
  Layers,
  Search
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import { AI_MODELS, getModelById } from "@/data/models";

export function ChatHeader() {
  const {
    activeModelId,
    setActiveModelId,
    compareModelId,
    setCompareModelId,
    isCompareMode,
    setIsCompareMode,
    webSearchEnabled,
    setWebSearchEnabled,
    isArtifactPanelOpen,
    setIsArtifactPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    exportConversation,
    clearAllConversations,
    activeConversation
  } = useChat();

  const { theme, toggleTheme } = useTheme();

  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const compareDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  const activeModel = getModelById(activeModelId);
  const compareModel = getModelById(compareModelId);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
      }
      if (compareDropdownRef.current && !compareDropdownRef.current.contains(e.target as Node)) {
        setIsCompareDropdownOpen(false);
      }
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target as Node)) {
        setIsExportDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between z-10 select-none">
      {/* Left side: Mobile menu & Model Selectors */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Primary Model Dropdown */}
        <div className="relative" ref={modelDropdownRef}>
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: activeModel.color }}
            />
            <span className="font-semibold">{activeModel.name}</span>
            <span className="hidden md:inline text-[11px] text-slate-500 dark:text-slate-400">
              ({activeModel.provider})
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
          </button>

          {isModelDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                Select Primary AI Model
              </div>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {AI_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setActiveModelId(model.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-colors ${
                      model.id === activeModelId
                        ? "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: model.color }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {model.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {model.provider}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {model.tagline}
                        </p>
                      </div>
                    </div>
                    {model.id === activeModelId && (
                      <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compare Mode Toggle */}
        <button
          onClick={() => setIsCompareMode(!isCompareMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
            isCompareMode
              ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
              : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
          title="Dual-Model Split Arena Comparison"
        >
          <Columns2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Compare Mode</span>
        </button>

        {/* Compare Model Dropdown (when Compare Mode is ON) */}
        {isCompareMode && (
          <div className="relative hidden md:block" ref={compareDropdownRef}>
            <button
              onClick={() => setIsCompareDropdownOpen(!isCompareDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/60 transition-all text-xs font-medium text-purple-900 dark:text-purple-200"
            >
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">VS</span>
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: compareModel.color }}
              />
              <span className="font-semibold">{compareModel.name}</span>
              <ChevronDown className="h-3 w-3 text-purple-400 ml-0.5" />
            </button>

            {isCompareDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-purple-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  Select Competitor Model
                </div>
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setCompareModelId(model.id);
                        setIsCompareDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                        model.id === compareModelId
                          ? "bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-100"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: model.color }}
                        />
                        <span className="text-xs font-medium">{model.name}</span>
                      </div>
                      {model.id === compareModelId && (
                        <Check className="h-3.5 w-3.5 text-purple-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Web Search Toggle */}
        <button
          onClick={() => setWebSearchEnabled(!webSearchEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            webSearchEnabled
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-800 dark:hover:text-white"
          }`}
          title="Toggle Real-time Web Search Grounding"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Web Search</span>
        </button>

        {/* Artifacts Canvas Toggle */}
        <button
          onClick={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            isArtifactPanelOpen
              ? "bg-indigo-600 text-white border-indigo-500"
              : "bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-800 dark:hover:text-white"
          }`}
          title="Toggle Interactive Code Canvas"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Canvas</span>
        </button>

        {/* Export Dropdown */}
        <div className="relative" ref={exportDropdownRef}>
          <button
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Export Conversation"
          >
            <Download className="h-4 w-4" />
          </button>

          {isExportDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-50">
              <button
                onClick={() => {
                  exportConversation("markdown");
                  setIsExportDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Export as Markdown (.md)
              </button>
              <button
                onClick={() => {
                  exportConversation("json");
                  setIsExportDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Export as JSON (.json)
              </button>
              <button
                onClick={() => {
                  exportConversation("text");
                  setIsExportDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Export as Plain Text (.txt)
              </button>
            </div>
          )}
        </div>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
        </button>
      </div>
    </header>
  );
}
