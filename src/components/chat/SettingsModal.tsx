"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import { AI_MODELS } from "@/data/models";
import {
  Sliders,
  Key,
  MessageSquare,
  Shield,
  Keyboard,
  Moon,
  Sun,
  Trash2,
  Check,
  Cpu
} from "lucide-react";

export function SettingsModal() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    activeModelId,
    setActiveModelId,
    userApiKey,
    setUserApiKey,
    customSystemPrompt,
    setCustomSystemPrompt,
    temperature,
    setTemperature,
    exportConversation,
    clearAllConversations
  } = useChat();

  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"general" | "models" | "system" | "shortcuts" | "privacy">("general");
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    localStorage.setItem("echogpt-api-key", userApiKey);
    localStorage.setItem("echogpt-sys-prompt", customSystemPrompt);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <Modal
      isOpen={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
      title="Settings & Workspace Preferences"
      description="Configure AI models, custom instructions, themes, and Bring-Your-Own-Key parameters."
      maxWidth="2xl"
    >
      <div className="flex flex-col sm:flex-row gap-6 min-h-[380px]">
        {/* Settings Navigation Tabs */}
        <div className="w-full sm:w-48 space-y-1 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-3 sm:pb-0 sm:pr-3 shrink-0">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "general"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>General</span>
          </button>
          <button
            onClick={() => setActiveTab("models")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "models"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>Models & BYOK</span>
          </button>
          <button
            onClick={() => setActiveTab("system")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "system"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Instructions</span>
          </button>
          <button
            onClick={() => setActiveTab("shortcuts")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "shortcuts"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Keyboard className="h-4 w-4" />
            <span>Shortcuts</span>
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
              activeTab === "privacy"
                ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Privacy & Data</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 space-y-4">
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Theme Appearance
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      theme === "dark"
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      theme === "light"
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-600"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      theme === "system"
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <Sliders className="h-4 w-4" />
                    <span>System</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Default AI Model
                </label>
                <select
                  value={activeModelId}
                  onChange={(e) => setActiveModelId(e.target.value)}
                  className="w-full mt-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.provider}) - {m.contextWindow}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* MODELS & BYOK TAB */}
          {activeTab === "models" && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Creativity / Temperature ({temperature})
                  </label>
                  <span className="text-xs text-slate-400">
                    {temperature < 0.4 ? "Precise & Deterministic" : temperature > 0.8 ? "Creative & Exploratory" : "Balanced"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                  <Key className="h-4 w-4" />
                  <span>Bring Your Own Key (BYOK)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Add custom OpenAI / Anthropic / Google AI Studio API key for zero rate-limiting. Stored only in your local browser vault.
                </p>
                <input
                  type="password"
                  value={userApiKey}
                  onChange={(e) => setUserApiKey(e.target.value)}
                  placeholder="sk-ant-... or sk-proj-..."
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* SYSTEM INSTRUCTIONS TAB */}
          {activeTab === "system" && (
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Custom System Persona
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Set behavior instructions applied across all active AI models in your workspace.
              </p>
              <textarea
                value={customSystemPrompt}
                onChange={(e) => setCustomSystemPrompt(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:border-indigo-500"
                placeholder="E.g. You are an expert Principal Frontend Engineer..."
              />
            </div>
          )}

          {/* SHORTCUTS TAB */}
          {activeTab === "shortcuts" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                Keyboard Navigation
              </label>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Send Prompt</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                    Enter
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">New Line</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                    Shift + Enter
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Open Chrome Sidebar</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                    Ctrl + Shift + E
                  </kbd>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <span className="text-slate-600 dark:text-slate-400">Close Modals / Popups</span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                    Esc
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY & DATA TAB */}
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">Zero-Retention Policy</div>
                <p>EchoGPT client never uploads your prompt data or sensitive variables to third-party databases.</p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => exportConversation("json")}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  Download Full Backup (.json)
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to clear all local conversation history?")) {
                      clearAllConversations();
                      setIsSettingsOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear Local Storage History</span>
                </button>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {savedToast ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium animate-in fade-in">
                <Check className="h-3.5 w-3.5" />
                <span>Preferences saved!</span>
              </span>
            ) : (
              <span />
            )}
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
