"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, ExternalLink } from "lucide-react";
import { useChat } from "@/context/ChatContext";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { setActiveArtifact, setIsArtifactPanelOpen } = useChat();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOpenSandbox = (code: string, language: string) => {
    setActiveArtifact({
      id: `art-view-${Date.now()}`,
      title: `${language.toUpperCase()} Snippet`,
      language,
      code,
      description: "Interactive Code Sandbox"
    });
    setIsArtifactPanelOpen(true);
  };

  // Parse code blocks vs regular text
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className={`text-slate-800 dark:text-slate-200 text-[15px] leading-relaxed space-y-3 font-normal ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // It's a code block
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0].trim();
          const hasLang = !firstLine.includes(" ") && firstLine.length > 0;
          const language = hasLang ? firstLine : "code";
          const codeBody = (hasLang ? lines.slice(1) : lines).join("\n");

          return (
            <div
              key={index}
              className="my-4 rounded-xl border border-slate-700/60 bg-slate-950 text-slate-100 overflow-hidden shadow-lg"
            >
              {/* Code Header Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="font-semibold uppercase text-indigo-300">{language}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenSandbox(codeBody, language)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Open in Code Studio Sandbox"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => handleCopyCode(codeBody, index)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white transition-colors border border-indigo-500/20"
                    title="Copy code to clipboard"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117]">
                <pre className="text-slate-200">
                  <code>{codeBody}</code>
                </pre>
              </div>
            </div>
          );
        }

        // Regular Markdown rendering
        return (
          <div key={index} className="space-y-2">
            {part.split("\n\n").map((block, bIdx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Headings
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={bIdx} className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={bIdx} className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={bIdx} className="text-2xl font-black text-slate-900 dark:text-white mt-6 mb-3">
                    {trimmed.replace("# ", "")}
                  </h1>
                );
              }

              // Blockquotes
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={bIdx}
                    className="border-l-4 border-indigo-500 bg-indigo-500/5 dark:bg-indigo-950/20 px-4 py-2 rounded-r-lg text-slate-700 dark:text-slate-300 italic"
                  >
                    {trimmed.replace(/^>\s?/gm, "")}
                  </blockquote>
                );
              }

              // Bullet Lists
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").filter((l) => l.trim().startsWith("* ") || l.trim().startsWith("- "));
                return (
                  <ul key={bIdx} className="list-disc pl-5 space-y-1 my-2">
                    {items.map((item, iIdx) => (
                      <li key={iIdx} className="text-slate-700 dark:text-slate-300">
                        {renderInlineFormatted(item.replace(/^[\*\-]\s+/, ""))}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Numbered Lists
              if (/^\d+\.\s/.test(trimmed)) {
                const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l.trim()));
                return (
                  <ol key={bIdx} className="list-decimal pl-5 space-y-1 my-2">
                    {items.map((item, iIdx) => (
                      <li key={iIdx} className="text-slate-700 dark:text-slate-300">
                        {renderInlineFormatted(item.replace(/^\d+\.\s+/, ""))}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Tables
              if (trimmed.includes("|") && trimmed.includes("\n|")) {
                const rows = trimmed.split("\n").filter((r) => r.trim().startsWith("|"));
                if (rows.length >= 2) {
                  const headerCols = rows[0]
                    .split("|")
                    .slice(1, -1)
                    .map((c) => c.trim());
                  const bodyRows = rows.slice(2).map((r) =>
                    r
                      .split("|")
                      .slice(1, -1)
                      .map((c) => c.trim())
                  );

                  return (
                    <div key={bIdx} className="overflow-x-auto my-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800/80 font-semibold text-slate-800 dark:text-slate-200">
                          <tr>
                            {headerCols.map((col, cIdx) => (
                              <th key={cIdx} className="px-4 py-2.5">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                          {bodyRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-2 text-slate-700 dark:text-slate-300">
                                  {renderInlineFormatted(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              // Standard Paragraph with inline formatting
              return (
                <p key={bIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {renderInlineFormatted(trimmed)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// Helper for inline markdown: bold, code, links, math
function renderInlineFormatted(text: string): React.ReactNode {
  // Replace inline math $...$
  const mathSegments = text.split(/(\$[^\$]+\$)/g);

  return mathSegments.map((segment, sIdx) => {
    if (segment.startsWith("$") && segment.endsWith("$") && segment.length > 2) {
      const formula = segment.slice(1, -1);
      return (
        <span
          key={sIdx}
          className="inline-flex items-center px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold mx-0.5 border border-indigo-500/20"
        >
          {formula}
        </span>
      );
    }

    // Split for `inline code`
    const codeParts = segment.split(/(`[^`]+`)/g);
    return codeParts.map((part, cIdx) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={`${sIdx}-${cIdx}`}
            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-medium border border-slate-200 dark:border-slate-700"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Handle **bold**
      const boldParts = part.split(/(\*\*[^\*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith("**") && bPart.endsWith("**")) {
          return (
            <strong key={`${sIdx}-${cIdx}-${bIdx}`} className="font-semibold text-slate-900 dark:text-white">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  });
}
