"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Square,
  Paperclip,
  Mic,
  MicOff,
  Globe,
  Sparkles,
  X,
  FileCode,
  FileText,
  Image as ImageIcon,
  BookOpen
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Attachment } from "@/types/chat";
import { getModelById } from "@/data/models";

export function PromptComposer() {
  const {
    activeModelId,
    isStreaming,
    sendMessage,
    stopStreaming,
    webSearchEnabled,
    setWebSearchEnabled,
    setIsPromptLibraryOpen
  } = useChat();

  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeModel = getModelById(activeModelId);

  const { isListening, startListening, stopListening } = useSpeechRecognition((voiceText) => {
    setInput((prev) => (prev ? prev + " " + voiceText : voiceText));
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    sendMessage(input.trim(), attachments);
    setInput("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: Attachment[] = Array.from(files).map((file) => {
      const isImg = file.type.startsWith("image/");
      const isCode = file.name.endsWith(".ts") || file.name.endsWith(".js") || file.name.endsWith(".json") || file.name.endsWith(".py");

      return {
        id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: file.name,
        size: file.size,
        type: isImg ? "image" : isCode ? "code" : "document",
        previewUrl: isImg ? URL.createObjectURL(file) : undefined
      };
    });

    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-4 sm:p-5 max-w-4xl mx-auto w-full">
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all p-3 sm:p-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.json,.js,.ts,.tsx,.py"
        />

        {/* Attachments preview tray */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {att.type === "image" ? (
                  <ImageIcon className="h-3.5 w-3.5 text-indigo-500" />
                ) : att.type === "code" ? (
                  <FileCode className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span className="font-medium truncate max-w-[140px]">{att.name}</span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask ${activeModel.name} anything, or paste code... (Shift+Enter for newline)`}
          rows={1}
          className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none max-h-44 min-h-[44px] leading-relaxed"
        />

        {/* Composer Controls Footer */}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100 dark:border-slate-800/60">
          {/* Left Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Attachment Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Attach File (Images, PDFs, Code)"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {/* Voice Input Button */}
            <button
              onClick={() => (isListening ? stopListening() : startListening())}
              className={`p-2 rounded-xl transition-colors ${
                isListening
                  ? "bg-rose-500/10 text-rose-500 animate-pulse"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              title={isListening ? "Listening... Click to stop" : "Voice Input (Speech-to-Text)"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            {/* Prompt Library Pill */}
            <button
              onClick={() => setIsPromptLibraryOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>Prompts</span>
            </button>

            {/* Web Search Toggle Pill */}
            <button
              onClick={() => setWebSearchEnabled(!webSearchEnabled)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border transition-colors ${
                webSearchEnabled
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  : "bg-transparent text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Web Search</span>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Character / Token count hint */}
            <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
              {input.length > 0 ? `${input.length} chars` : ""}
            </span>

            {/* Send / Stop Button */}
            {isStreaming ? (
              <button
                onClick={stopStreaming}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-transform active:scale-95"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!input.trim() && attachments.length === 0}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
                title="Send Prompt (Enter)"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
