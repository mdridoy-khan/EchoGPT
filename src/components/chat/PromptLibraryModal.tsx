"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useChat } from "@/context/ChatContext";
import { PROMPT_LIBRARY, PromptTemplate } from "@/data/prompts";
import { Search, Sparkles, ArrowRight, Code2, Rocket, BookOpen } from "lucide-react";
import { getModelById } from "@/data/models";

export function PromptLibraryModal() {
  const { isPromptLibraryOpen, setIsPromptLibraryOpen, sendMessage, setActiveModelId } = useChat();
  const [activeCategory, setActiveCategory] = useState<string>("Frontend & Engineering");
  const [filterQuery, setFilterQuery] = useState("");

  const categories = Object.keys(PROMPT_LIBRARY);
  const currentPrompts = PROMPT_LIBRARY[activeCategory] || [];

  const filteredPrompts = currentPrompts.filter(
    (p) =>
      p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleUsePrompt = (item: PromptTemplate) => {
    setActiveModelId(item.recommendedModelId);
    setIsPromptLibraryOpen(false);
    sendMessage(item.prompt);
  };

  return (
    <Modal
      isOpen={isPromptLibraryOpen}
      onClose={() => setIsPromptLibraryOpen(false)}
      title="Production Prompt Library"
      description="Select battle-tested engineering, strategy, and research prompts optimized for each LLM."
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search prompts by keyword..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prompt List */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {filteredPrompts.map((item) => {
            const recModel = getModelById(item.recommendedModelId);
            return (
              <div
                key={item.id}
                onClick={() => handleUsePrompt(item)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {recModel.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.prompt}
                    </p>
                  </div>
                  <button className="h-8 w-8 rounded-lg bg-indigo-600/10 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
