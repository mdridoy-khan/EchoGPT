"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useTextToSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text: string, messageId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "Code block omitted.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[#*_~\[\]\(\)]/g, "")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      (v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    );
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentSpeakingId(messageId);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeakingId(null);
    }
  }, []);

  return {
    isPlaying,
    currentSpeakingId,
    isSupported,
    speak,
    stop
  };
}
