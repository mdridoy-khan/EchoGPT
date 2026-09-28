"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { PromptComposer } from "./PromptComposer";
import { SettingsModal } from "./SettingsModal";
import { PromptLibraryModal } from "./PromptLibraryModal";
import { ArtifactsPanel } from "./ArtifactsPanel";
import { useChat } from "@/context/ChatContext";

export function ChatLayout() {
  const { isSidebarOpen } = useChat();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Collapsible / Responsive Sidebar */}
      <Sidebar />

      {/* Main Chat Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        <ChatHeader />

        <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden relative">
          {/* Scrollable messages container */}
          <ChatMessages />

          {/* Sticky Bottom Prompt Composer */}
          <div className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-slate-50 via-slate-50/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent pt-4">
            <PromptComposer />
          </div>
        </main>
      </div>

      {/* Code Studio / Artifacts Drawer */}
      <ArtifactsPanel />

      {/* Modals */}
      <SettingsModal />
      <PromptLibraryModal />
    </div>
  );
}
