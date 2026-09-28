"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MessageSquare,
  Pin,
  Trash2,
  Edit2,
  Settings,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Crown,
  LayoutGrid
} from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { AI_MODELS, getModelById } from "@/data/models";
import { formatDate } from "@/lib/utils";

export function Sidebar() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewChat,
    deleteConversation,
    renameConversation,
    togglePinConversation,
    searchQuery,
    setSearchQuery,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsSettingsOpen,
    setIsPromptLibraryOpen
  } = useChat();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter((c) => c.isPinned);
  const unpinnedConversations = filteredConversations.filter((c) => !c.isPinned);

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    renameConversation(id, editTitle);
    setEditingId(null);
  };

  if (!isSidebarOpen) {
    return (
      <aside className="hidden md:flex flex-col items-center justify-between py-4 px-2 w-16 bg-slate-950 border-r border-slate-800/80 z-20 text-slate-400">
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            title="EchoGPT Home"
            className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"
          >
            <Sparkles className="h-5 w-5" />
          </Link>
          <button
            onClick={() => createNewChat()}
            title="New Chat"
            className="h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsPromptLibraryOpen(true)}
            title="Prompt Library"
            className="h-10 w-10 rounded-xl hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <BookOpen className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
            className="h-10 w-10 rounded-xl hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            title="Expand Sidebar"
            className="h-8 w-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-full z-20 text-slate-300 select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                EchoGPT
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Pro
                </span>
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            title="Collapse Sidebar"
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat CTA */}
        <button
          onClick={() => createNewChat()}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-md shadow-indigo-600/20 border border-indigo-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>

        {/* Search Conversations */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
          />
        </div>
      </div>

      {/* Conversations Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Pinned Section */}
        {pinnedConversations.length > 0 && (
          <div>
            <div className="flex items-center gap-1 px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <Pin className="h-3 w-3" />
              <span>Pinned Chats</span>
            </div>
            <div className="space-y-0.5">
              {pinnedConversations.map((c) => renderConversationItem(c))}
            </div>
          </div>
        )}

        {/* Recent Section */}
        <div>
          <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Recent Conversations
          </div>
          {unpinnedConversations.length === 0 && pinnedConversations.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-slate-500">
              No conversations found.
            </div>
          ) : (
            <div className="space-y-0.5">
              {unpinnedConversations.map((c) => renderConversationItem(c))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setIsPromptLibraryOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
            <span>Prompts</span>
          </button>
          <Link
            href="/extension"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>Extension</span>
          </Link>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white leading-none">AppifyDevs</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Pro Workspace</span>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Open Settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  function renderConversationItem(c: (typeof conversations)[0]) {
    const isActive = c.id === activeConversationId;
    const model = getModelById(c.modelId);

    if (editingId === c.id) {
      return (
        <div key={c.id} className="p-2 rounded-lg bg-slate-900 border border-indigo-500/50">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveRename(c.id);
              if (e.key === "Escape") setEditingId(null);
            }}
            onBlur={() => handleSaveRename(c.id)}
            autoFocus
            className="w-full bg-transparent text-xs text-white focus:outline-none"
          />
        </div>
      );
    }

    return (
      <div
        key={c.id}
        onClick={() => setActiveConversationId(c.id)}
        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
          isActive
            ? "bg-indigo-600/15 text-white border border-indigo-500/30 font-medium"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <MessageSquare className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
          <span className="truncate text-xs">{c.title}</span>
        </div>

        {/* Hover Actions */}
        <div className="hidden group-hover:flex items-center gap-1 shrink-0 ml-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePinConversation(c.id);
            }}
            title={c.isPinned ? "Unpin" : "Pin"}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <Pin className={`h-3 w-3 ${c.isPinned ? "fill-current text-indigo-400" : ""}`} />
          </button>
          <button
            onClick={(e) => handleStartRename(c.id, c.title, e)}
            title="Rename"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteConversation(c.id);
            }}
            title="Delete"
            className="p-1 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }
}
