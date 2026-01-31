"use client";

import { useEffect, useState, useCallback } from "react";
import { OnboardingBackground, WELCOME_STYLES } from "./shared";

interface WelcomeAnimationProps {
  onAnimationComplete?: () => void;
}

interface WelcomePage {
  title: string;
  subtitle: string;
  description: string;
  subtitleStyle: string;
}

const WELCOME_PAGES: WelcomePage[] = [
  {
    title: "Welcome to",
    subtitle: "OLIS",
    description: "",
    subtitleStyle: "text-6xl md:text-7xl font-medium tracking-tight",
  },
  {
    title: "This tool thinks",
    subtitle: "with you, not for you",
    description: "",
    subtitleStyle: "text-4xl md:text-5xl font-medium tracking-tight",
  },
  {
    title: "Your data stays",
    subtitle: "yours only",
    description: "No auto-posting. No growth hacks.",
    subtitleStyle: "text-4xl md:text-5xl font-medium tracking-tight",
  },
  {
    title: "Ready?",
    subtitle: "Let's begin",
    description: "",
    subtitleStyle: "text-4xl md:text-5xl font-medium tracking-tight",
  },
];

const AUTO_ADVANCE_DELAY = 3500;
const TRANSITION_DURATION = 500;

export default function WelcomeAnimation({ onAnimationComplete }: WelcomeAnimationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const handleComplete = useCallback(() => {
    setShowIntro(false);
    onAnimationComplete?.();
  }, [onAnimationComplete]);

  useEffect(() => {
    if (!showIntro) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev + 1;
          if (next >= WELCOME_PAGES.length) {
            handleComplete();
            return 0;
          }
          return next;
        });
        setFade(true);
      }, TRANSITION_DURATION);
    }, AUTO_ADVANCE_DELAY);

    return () => clearInterval(timer);
  }, [showIntro, handleComplete]);

  if (!showIntro) {
    return null;
  }

  const page = WELCOME_PAGES[currentPage];

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{WELCOME_STYLES}</style>

      <OnboardingBackground variant="welcome" shapeCount={4} />

      <button
        onClick={handleComplete}
        className="skip-button absolute top-8 right-8 font-modern z-20"
        style={{ color: "#64748b" }}
      >
        Skip
      </button>

      <main
        className={`flex flex-col items-center justify-center text-center px-8 max-w-3xl py-20 z-10 ${
          fade ? "page-enter" : "page-exit"
        }`}
      >
        <p
          className="title-text text-sm md:text-base font-modern uppercase"
          style={{ color: "#64748b", letterSpacing: "0.15em" }}
        >
          {page.title}
        </p>

        <h1
          className={`subtitle-text ${page.subtitleStyle} font-modern leading-tight mt-3`}
          style={{ color: "#0f172a" }}
        >
          {page.subtitle}
        </h1>

        {page.description && (
          <p
            className="description-text text-sm md:text-base font-modern mt-6"
            style={{ color: "#64748b" }}
          >
            {page.description}
          </p>
        )}
      </main>
    </div>
  );
}
