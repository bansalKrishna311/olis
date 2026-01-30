"use client";

import { useState } from "react";
import WelcomeAnimation from "./components/WelcomeAnimation";

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <>
      {showAnimation && (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      )}

      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Great+Vibes&display=swap');

          .font-modern {
            font-family: 'Poppins', sans-serif;
          }

          .font-cursive-funky {
            font-family: 'Great Vibes', cursive;
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
        `}</style>

        <h1
          className="text-6xl md:text-7xl font-bold font-modern"
          style={{ color: "#001f3f", animation: "fadeInUp 1s ease-out forwards" }}
        >
          Hello World
        </h1>
      </div>
    </>
  );
}
