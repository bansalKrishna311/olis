"use client";

import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    // Auto-play video-like experience
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <style>{`
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

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .text-line-1 {
          animation: fadeInUp 1.2s ease-out 0.3s forwards;
          opacity: 0;
        }

        .text-line-2 {
          animation: fadeInScale 1.2s ease-out 0.8s forwards;
          opacity: 0;
        }

        .text-line-3 {
          animation: slideInLeft 1.2s ease-out 1.4s forwards;
          opacity: 0;
        }

        .text-line-4 {
          animation: slideInRight 1.2s ease-out 2s forwards;
          opacity: 0;
        }

        .accent-line {
          animation: slideInLeft 1.4s ease-out 0s forwards;
          opacity: 0;
        }

        .pulse-indicator {
          animation: pulse-subtle 2s ease-in-out infinite;
          animation-delay: 2.6s;
        }
      `}</style>

      <main className="flex flex-col items-center justify-center text-center px-8 max-w-3xl py-20">
        {/* Accent line */}
        <div className="accent-line w-12 h-1 bg-navy-900 rounded-full mb-12" style={{ backgroundColor: "#001f3f" }}></div>

        {/* Welcome text */}
        <h1 className="text-line-1 text-5xl md:text-7xl font-bold mb-4" style={{ color: "#0a1428" }}>
          Welcome to
        </h1>

        {/* OLIS heading */}
        <h2 className="text-line-2 text-6xl md:text-8xl font-black mb-12 tracking-tight" style={{ color: "#001f3f" }}>
          OLIS
        </h2>

        {/* Subtitle 1 */}
        <p className="text-line-3 text-2xl md:text-3xl font-semibold mb-3 leading-relaxed" style={{ color: "#334155" }}>
          Your single step to finding your niche,
        </p>

        {/* Subtitle 2 */}
        <p className="text-line-4 text-2xl md:text-3xl font-semibold mb-12 leading-relaxed" style={{ color: "#334155" }}>
          and making the right use of LinkedIn without any cost
        </p>

        {/* Loading dots with pulse */}
        <div className="pulse-indicator mt-16 flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#001f3f", animation: "pulse-subtle 2s ease-in-out infinite", animationDelay: "0s" }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#0a1428", animation: "pulse-subtle 2s ease-in-out infinite", animationDelay: "0.3s" }}></div>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#334155", animation: "pulse-subtle 2s ease-in-out infinite", animationDelay: "0.6s" }}></div>
        </div>
      </main>
    </div>
  );
}
