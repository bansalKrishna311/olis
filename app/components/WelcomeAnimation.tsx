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

  const page = pages[currentPage];

  if (!showIntro) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
        }

        .welcome-bg {
          background: linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf5ff 100%);
          position: relative;
        }

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        /* Abstract floating shapes */
        .abstract-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #fecaca 0%, #fcd6bb 100%);
          bottom: -50px;
          left: -50px;
          animation-delay: -2s;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 100%);
          top: 40%;
          left: 10%;
          animation-delay: -4s;
        }

        .shape-4 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #bbf7d0 0%, #a5f3fc 100%);
          bottom: 20%;
          right: 5%;
          animation-delay: -6s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.05);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutDown {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(16px);
          }
        }

        .page-enter {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .page-exit {
          animation: fadeOutDown 0.5s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        .title-text {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          opacity: 0;
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .subtitle-text {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
          opacity: 0;
          font-weight: 500;
          letter-spacing: -0.03em;
        }

        .description-text {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
          opacity: 0;
          font-weight: 400;
          letter-spacing: 0;
        }

        .skip-button {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out 0.3s forwards;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .skip-button:hover {
          background: rgba(255, 255, 255, 0.8);
          color: #1e293b !important;
        }

        /* Grain overlay for texture */
        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Gradient Background */}
      <div className="absolute inset-0 welcome-bg"></div>

      {/* Abstract floating shapes */}
      <div className="abstract-shape shape-1"></div>
      <div className="abstract-shape shape-2"></div>
      <div className="abstract-shape shape-3"></div>
      <div className="abstract-shape shape-4"></div>

      {/* Subtle grain texture */}
      <div className="grain-overlay"></div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
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
        {/* Title */}
        <p
          className="title-text text-sm md:text-base font-modern uppercase"
          style={{ color: "#64748b", letterSpacing: "0.15em" }}
        >
          {page.title}
        </p>

        {/* Subtitle */}
        <h1
          className={`subtitle-text ${page.subtitleStyle} font-modern leading-tight mt-3`}
          style={{ color: "#0f172a" }}
        >
          {page.subtitle}
        </h1>

        {/* Description */}
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
