"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Trash2,
  Settings as SettingsIcon,
  Layers,
  ChevronDown,
  Maximize2,
  FileText,
  HelpCircle,
  Code2,
  Languages,
  CheckCheck,
  Check,
  RotateCcw,
  Copy,
  ExternalLink,
  Bot,
  User,
  X
} from "lucide-react";
import { useExtension } from "@/context/ExtensionContext";
import { AI_MODELS, getModelById } from "@/data/models";
import { EXTENSION_QUICK_ACTIONS } from "@/context/ExtensionContext";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

export function ExtensionPopup({ isSidebar = false }: { isSidebar?: boolean }) {
  const {
    activeModelId,
    setActiveModelId,
    activeWebpage,
    selectedText,
    setSelectedText,
    extensionChatMessages,
    isStreaming,
    executeQuickAction,
    sendExtensionMessage,
    clearExtensionChat,
    settings,
    updateSettings
  } = useExtension();

  const [input, setInput] = useState("");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeModel = getModelById(activeModelId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extensionChatMessages, isStreaming]);

  const handleSend = () => {
    if (!input.trim() || isStreaming) return;
    sendExtensionMessage(input.trim());
    setInput("");
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getActionIcon = (name: string) => {
    switch (name) {
      case "FileText":
        return <FileText className="h-3.5 w-3.5 text-indigo-400" />;
      case "HelpCircle":
        return <HelpCircle className="h-3.5 w-3.5 text-purple-400" />;
      case "Code2":
        return <Code2 className="h-3.5 w-3.5 text-emerald-400" />;
      case "Languages":
        return <Languages className="h-3.5 w-3.5 text-pink-400" />;
      default:
        return <CheckCheck className="h-3.5 w-3.5 text-amber-400" />;
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-slate-950 text-slate-100 font-sans border-slate-800 ${
        isSidebar ? "w-full" : "w-[380px] h-[600px] rounded-2xl shadow-2xl border"
      } overflow-hidden`}
    >
      {/* Extension Header */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white">EchoGPT</span>
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400">
                Sidebar
              </span>
            </div>
          </div>
        </div>

        {/* Model Selector & Header Actions */}
        <div className="flex items-center gap-1.5">
          {/* Model Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium border border-slate-700 transition-colors"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeModel.color }}
              />
              <span className="truncate max-w-[90px]">{activeModel.name}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {isModelDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Select AI Assistant
                </div>
                {AI_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModelId(m.id);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      m.id === activeModelId
                        ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      <span>{m.name}</span>
                    </div>
                    {m.id === activeModelId && <Check className="h-3 w-3 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Extension Settings"
          >
            <SettingsIcon className="h-3.5 w-3.5" />
          </button>

          <Link
            href="/web-app"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Expand to Full Web App"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Active Webpage Context Bar */}
      <div className="px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-1.5 truncate max-w-[260px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="truncate">{activeWebpage.domain}</span>
        </div>
        <button
          onClick={clearExtensionChat}
          className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="h-2.5 w-2.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Action Pills Slider */}
      <div className="px-3 py-2 bg-slate-950 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {EXTENSION_QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => executeQuickAction(action)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-medium text-slate-300 hover:text-white border border-slate-800 whitespace-nowrap transition-colors"
            title={action.description}
          >
            {getActionIcon(action.iconName)}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Modal Drawer (inside Extension) */}
      {isSettingsOpen && (
        <div className="p-4 bg-slate-900 border-b border-slate-800 text-xs space-y-3 shrink-0 animate-in fade-in">
          <div className="flex items-center justify-between font-semibold text-white">
            <span>Extension Preferences</span>
            <button onClick={() => setIsSettingsOpen(false)}>
              <X className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Shortcut</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-indigo-300">
                {settings.shortcut}
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Floating Select Pill</span>
              <input
                type="checkbox"
                checked={settings.enableFloatingButton}
                onChange={(e) => updateSettings({ enableFloatingButton: e.target.checked })}
                className="accent-indigo-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Page Context Injection</span>
              <input
                type="checkbox"
                checked={settings.autoExtractPageContent}
                onChange={(e) => updateSettings({ autoExtractPageContent: e.target.checked })}
                className="accent-indigo-600 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {extensionChatMessages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end gap-2">
                <div className="p-2.5 rounded-xl rounded-tr-none bg-indigo-600 text-white text-xs max-w-[85%] leading-relaxed">
                  {msg.content}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex gap-2">
              <div
                className="h-6 w-6 rounded-lg flex items-center justify-center text-white shrink-0 text-xs shadow"
                style={{ backgroundColor: activeModel.color }}
              >
                <Bot className="h-3 w-3" />
              </div>
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-200 leading-relaxed shadow-sm">
                  <MarkdownRenderer content={msg.content} />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy(msg.content, msg.id)}
                    className="p-1 rounded text-slate-500 hover:text-slate-300"
                    title="Copy text"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Text Selection Floating Reminder */}
      {selectedText && (
        <div className="px-3 py-1.5 bg-indigo-950/40 border-t border-indigo-900/50 flex items-center justify-between text-[10px] text-indigo-300 shrink-0">
          <span className="truncate max-w-[220px]">
            Selected: &ldquo;{selectedText}&rdquo;
          </span>
          <button
            onClick={() => executeQuickAction(EXTENSION_QUICK_ACTIONS[1], selectedText)}
            className="font-bold underline hover:text-white"
          >
            Explain
          </button>
        </div>
      )}

      {/* Input Composer */}
      <div className="p-2.5 bg-slate-900 border-t border-slate-800 shrink-0">
        <div className="flex items-center gap-2 bg-slate-950 rounded-xl px-3 py-2 border border-slate-800 focus-within:border-indigo-500">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask about this page..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="p-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white transition-colors"
          >
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
