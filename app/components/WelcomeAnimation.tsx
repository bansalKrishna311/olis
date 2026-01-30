"use client";

import { useEffect, useState } from "react";

interface WelcomeAnimationProps {
  onAnimationComplete?: () => void;
}

export default function WelcomeAnimation({ onAnimationComplete }: WelcomeAnimationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [fade, setFade] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev + 1;
          if (next >= 4) {
            handleComplete();
            return 0;
          }
          return next;
        });
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(timer);
  }, [showIntro]);

  const handleComplete = () => {
    setShowIntro(false);
    onAnimationComplete?.();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const pages = [
    {
      title: "Welcome to",
      subtitle: "OLIS",
      description: "",
      subtitleStyle: "text-7xl md:text-8xl font-black tracking-tighter",
    },
    {
      title: "This tool thinks",
      subtitle: "with you, not for you",
      description: "",
      subtitleStyle: "text-5xl md:text-6xl font-bold",
    },
    {
      title: "Your data stays",
      subtitle: "yours only",
      description: "No auto-posting. No growth hacks.",
      subtitleStyle: "text-5xl md:text-6xl font-bold",
    },
    {
      title: "Ready?",
      subtitle: "Let's begin",
      description: "",
      subtitleStyle: "text-5xl md:text-6xl font-bold",
    },
  ];

  const page = pages[currentPage];

  if (!showIntro) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Great+Vibes&display=swap');

        .font-elegant {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
        }

        .font-modern {
          font-family: 'Poppins', sans-serif;
        }

        .font-cursive-funky {
          font-family: 'Great Vibes', cursive;
          font-weight: 400;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-40px);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .page-enter {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .page-exit {
          animation: fadeOutUp 0.5s ease-in forwards;
        }

        .accent-line {
          animation: slideInFromLeft 1s ease-out 0.1s forwards;
          opacity: 0;
        }

        .title-text {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .subtitle-text {
          animation: slideInFromRight 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .description-text {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .dot {
          transition: all 0.3s ease;
        }

        .dot.active {
          background-color: #001f3f;
          transform: scale(1.2);
        }

        .dot.inactive {
          background-color: #cbd5e1;
        }
      `}</style>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 text-sm font-modern font-medium hover:text-gray-900 transition-colors z-10"
        style={{ color: "#64748b" }}
      >
        Skip
      </button>

      <main
        className={`flex flex-col items-center justify-center text-center px-8 max-w-4xl py-20 transition-opacity duration-500 ${
          fade ? "page-enter" : "page-exit"
        }`}
      >
       

        {/* Title */}
        <p
          className="title-text text-xl md:text-2xl font-modern font-light tracking-wide mb-6"
          style={{ color: "#64748b" }}
        >
          {page.title}
        </p>

        {/* Subtitle */}
        <h1
          className={`subtitle-text ${page.subtitleStyle} font-cursive-funky leading-tight`}
          style={{ color: "#001f3f" }}
        >
          {page.subtitle}
        </h1>

        {/* Description */}
        {page.description && (
          <p
            className="description-text text-lg md:text-xl font-modern font-light mt-6"
            style={{ color: "#64748b" }}
          >
            {page.description}
          </p>
        )}

      
      </main>
    </div>
  );
}
