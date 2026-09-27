import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider } from "@/context/ChatContext";
import { ExtensionProvider } from "@/context/ExtensionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoGPT — Unified Multi-Model AI Ecosystem | AppifyDevs",
  description:
    "Redesigned EchoGPT ecosystem featuring a next-generation web app, Chrome extension sidebar, side-by-side LLM arena comparison, live code studio, and BYOK privacy.",
  keywords: [
    "EchoGPT",
    "Multi-AI Chat",
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "Gemini 1.5 Pro",
    "DeepSeek V3",
    "AppifyDevs",
    "Frontend Redesign",
    "Chrome Extension AI Sidebar"
  ],
  authors: [{ name: "AppifyDevs Candidate", url: "https://appifydevs.com" }],
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        <ThemeProvider>
          <ChatProvider>
            <ExtensionProvider>{children}</ExtensionProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
