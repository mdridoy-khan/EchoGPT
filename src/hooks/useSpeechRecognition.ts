"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useSpeechRecognition(onResult?: (text: string) => void): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          if (onResult && currentTranscript) {
            onResult(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }
  }, [onResult]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Could not start recognition:", err);
      }
    } else {
      // Simulated voice input for environments without mic permissions
      setIsListening(true);
      const simulatedVoices = [
        "Explain how EchoGPT optimizes context window switching across multiple LLMs.",
        "Refactor this React component with TypeScript generics and clean modular Tailwind classes.",
        "Compare GPT-4o vs Claude 3.5 Sonnet on frontend system architecture design."
      ];
      const randomPrompt = simulatedVoices[Math.floor(Math.random() * simulatedVoices.length)];
      let i = 0;
      const interval = setInterval(() => {
        if (i <= randomPrompt.length) {
          const current = randomPrompt.slice(0, i);
          setTranscript(current);
          if (onResult) onResult(current);
          i += 3;
        } else {
          clearInterval(interval);
          setIsListening(false);
        }
      }, 40);
    }
  }, [isListening, onResult]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
    }
    setIsListening(false);
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
}
