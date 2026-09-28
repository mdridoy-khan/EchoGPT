"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Globe,
  Clock,
  Zap,
  Code2,
  ArrowRight,
  ExternalLink,
  Edit2
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { getModelById } from "@/data/models";
import { PROMPT_SUGGESTIONS } from "@/data/prompts";
import { Message, Attachment } from "@/types/chat";

export function ChatMessages() {
  const {
    activeConversation,
    activeModelId,
    compareModelId,
    isCompareMode,
    isStreaming,
    sendMessage,
    regenerateMessage,
    editUserMessage,
    toggleLikeMessage,
    toggleDislikeMessage
  } = useChat();

  const { speak, stop, isPlaying, currentSpeakingId } = useTextToSpeech();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editPromptText, setEditPromptText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeModel = getModelById(activeModelId);
  const compareModel = getModelById(compareModelId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages, isStreaming]);

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStartEdit = (msg: Message) => {
    setEditingMsgId(msg.id);
    setEditPromptText(msg.content);
  };

  const handleSaveEdit = (msgId: string) => {
    if (editPromptText.trim()) {
      editUserMessage(msgId, editPromptText.trim());
      setEditingMsgId(null);
    }
  };

  // If no conversation or messages is empty, show Empty State
  if (!activeConversation || activeConversation.messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {/* Hero Card */}
        <div className="text-center space-y-3 mb-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/20 mb-2">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How can EchoGPT help you today?
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Currently active with <span className="font-semibold text-indigo-600 dark:text-indigo-400">{activeModel.name}</span>.
            {isCompareMode && (
              <span> Benchmarking against <span className="font-semibold text-purple-600 dark:text-purple-400">{compareModel.name}</span>.</span>
            )}
          </p>
        </div>

        {/* Suggested Prompts Grid */}
        <div className="w-full">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-1">
            Suggested Prompts
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => sendMessage(item.prompt)}
                className="flex items-start justify-between p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm transition-all group text-left"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.prompt}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Message Stream
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-5xl mx-auto w-full">
      {activeConversation.messages.map((msg, index) => {
        if (msg.role === "user") {
          return (
            <div key={msg.id} className="flex justify-end gap-3 group animate-in fade-in duration-200">
              <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
                {editingMsgId === msg.id ? (
                  <div className="p-3 rounded-2xl bg-slate-900 border border-indigo-500 space-y-2 shadow-xl">
                    <textarea
                      value={editPromptText}
                      onChange={(e) => setEditPromptText(e.target.value)}
                      className="w-full bg-transparent text-sm text-white focus:outline-none resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingMsgId(null)}
                        className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(msg.id)}
                        className="px-3 py-1 rounded-lg text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                      >
                        Save & Resubmit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-4 rounded-2xl rounded-tr-sm bg-indigo-600 text-white shadow-md shadow-indigo-600/10">
                    <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>

                    {/* Attachments preview */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-indigo-500/40">
                        {msg.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-700/60 text-xs text-indigo-100"
                          >
                            <span className="font-mono">{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Edit Button */}
                {editingMsgId !== msg.id && (
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(msg)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Edit prompt</span>
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div className="h-8 w-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-semibold shadow">
                <User className="h-4 w-4 text-indigo-300" />
              </div>
            </div>
          );
        }

        // Assistant Message
        const model = getModelById(msg.modelId);

        return (
          <div key={msg.id} className="flex gap-3.5 group animate-in fade-in duration-200">
            {/* Model Avatar */}
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md"
              style={{ backgroundColor: model.color }}
            >
              <Bot className="h-4 w-4" />
            </div>

            {/* Assistant Bubble Content */}
            <div className="flex-1 space-y-3 min-w-0">
              {/* Header: Model Name & Reasoning Time */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  {model.name}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {model.provider}
                </span>
                {msg.reasoningDurationSeconds && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>Thought for {msg.reasoningDurationSeconds}s</span>
                  </span>
                )}
              </div>

              {/* Web Sources Grounding (if present) */}
              {msg.webSources && msg.webSources.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Grounding Sources ({msg.webSources.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.webSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left"
                      >
                        <ExternalLink className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                            {source.title}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            {source.siteName}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Markdown Content */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                <MarkdownRenderer content={msg.content} />
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-indigo-500 animate-pulse align-middle" />
                )}
              </div>

              {/* Action Toolbar */}
              {!msg.isStreaming && (
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-slate-400">
                    {/* Text to Speech */}
                    <button
                      onClick={() =>
                        isPlaying && currentSpeakingId === msg.id
                          ? stop()
                          : speak(msg.content, msg.id)
                      }
                      title={isPlaying && currentSpeakingId === msg.id ? "Stop voice" : "Read aloud"}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        isPlaying && currentSpeakingId === msg.id
                          ? "text-indigo-500 bg-indigo-500/10"
                          : "hover:text-slate-700 dark:hover:text-slate-200"
                      }`}
                    >
                      {isPlaying && currentSpeakingId === msg.id ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>

                    {/* Copy Response */}
                    <button
                      onClick={() => handleCopyMessage(msg.content, msg.id)}
                      title="Copy response"
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    {/* Regenerate */}
                    <button
                      onClick={() => regenerateMessage(msg.id)}
                      title="Regenerate response"
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>

                    {/* Like / Dislike */}
                    <button
                      onClick={() => toggleLikeMessage(msg.id)}
                      title="Good response"
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        msg.isLiked ? "text-emerald-500 bg-emerald-500/10" : ""
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleDislikeMessage(msg.id)}
                      title="Poor response"
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        msg.isDisliked ? "text-rose-500 bg-rose-500/10" : ""
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Token Telemetry Badge */}
                  {msg.tokensUsed && (
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {msg.tokensUsed.total} tokens
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
