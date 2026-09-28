"use client";

import React, { useState } from "react";
import { X, Play, Copy, Check, Terminal, ExternalLink, RefreshCw } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export function ArtifactsPanel() {
  const { activeArtifact, isArtifactPanelOpen, setIsArtifactPanelOpen } = useChat();
  const [viewTab, setViewTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  if (!isArtifactPanelOpen) return null;

  const handleCopy = () => {
    if (activeArtifact?.code) {
      navigator.clipboard.writeText(activeArtifact.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="w-full md:w-96 lg:w-[460px] h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col z-20 shadow-2xl transition-all">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-500" />
          <span className="font-semibold text-sm text-slate-900 dark:text-white">
            {activeArtifact?.title || "Code Canvas"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Tab buttons */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-900 p-0.5 text-xs">
            <button
              onClick={() => setViewTab("preview")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewTab === "preview"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewTab("code")}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewTab === "code"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Source
            </button>
          </div>

          <button
            onClick={() => setIsArtifactPanelOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
        {viewTab === "preview" ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Play className="h-8 w-8 ml-1" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Interactive Canvas Active
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                Rendering live preview for {activeArtifact?.title || "React Component"} with isolated CSS sandbox.
              </p>
            </div>

            {/* Interactive Demo UI preview card */}
            <div className="w-full p-4 rounded-xl bg-slate-900 text-left space-y-3 border border-slate-800 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-400">Sample Widget Output</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                  Online
                </span>
              </div>
              <div className="text-2xl font-bold">1,420 QPS</div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 w-3/4 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col space-y-2">
            <div className="flex justify-end">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-white"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy Source"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed flex-1">
              <code>{activeArtifact?.code || "// No code artifact selected."}</code>
            </pre>
          </div>
        )}
      </div>
    </aside>
  );
}
