"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileData {
  name: string;
  headline: string;
  linkedinUrl: string;
}

interface ConfirmationScreenProps {
  profileData?: ProfileData;
  postsCount?: number;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function ConfirmationScreen({
  profileData,
  postsCount = 0,
  onComplete,
  onBack,
}: ConfirmationScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .setup-bg {
          background: linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf5ff 100%);
        }

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        .abstract-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
          top: -80px;
          right: -80px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 280px;
          height: 280px;
          background: linear-gradient(135deg, #fecaca 0%, #fcd6bb 100%);
          bottom: -40px;
          left: -40px;
          animation-delay: -2s;
        }

        .shape-3 {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 100%);
          top: 50%;
          left: 5%;
          animation-delay: -4s;
        }

        .shape-4 {
          width: 220px;
          height: 220px;
          background: linear-gradient(135deg, #bbf7d0 0%, #a7f3d0 100%);
          top: 15%;
          right: 15%;
          animation-delay: -6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .fade-in-1 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }
        .fade-in-5 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }

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

        .ready-indicator {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>

      {/* Gradient Background */}
      <div className="absolute inset-0 setup-bg"></div>

      {/* Abstract floating shapes */}
      <div className="abstract-shape shape-1"></div>
      <div className="abstract-shape shape-2"></div>
      <div className="abstract-shape shape-3"></div>
      <div className="abstract-shape shape-4"></div>

      {/* Grain texture */}
      <div className="grain-overlay"></div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-lg px-6 py-8">
        {/* Progress Indicator */}
        <div className="fade-in-1 text-center mb-6">
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground font-modern">
            Step 3 of 3
          </span>
        </div>

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="ready-indicator flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              You're all set
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Ready to begin
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Status Message */}
            <div className="fade-in-3 text-center">
              <p className="text-sm text-muted-foreground font-modern leading-relaxed">
                Based on your inputs, OLIS is ready to start understanding your LinkedIn presence.
              </p>
            </div>

            {/* What we know */}
            <div className="fade-in-3 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-modern flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                What we know
              </h4>
              <div className="space-y-2">
                {profileData?.name && (
                  <div className="flex items-center justify-between bg-green-50/80 rounded-lg p-3">
                    <span className="text-sm font-modern text-gray-600">Your name</span>
                    <Badge variant="secondary" className="font-modern bg-white">
                      {profileData.name}
                    </Badge>
                  </div>
                )}
                {profileData?.headline && (
                  <div className="flex items-center justify-between bg-green-50/80 rounded-lg p-3">
                    <span className="text-sm font-modern text-gray-600">Your focus area</span>
                    <Badge variant="secondary" className="font-modern bg-white max-w-[180px] truncate">
                      {profileData.headline}
                    </Badge>
                  </div>
                )}
                {postsCount > 0 && (
                  <div className="flex items-center justify-between bg-green-50/80 rounded-lg p-3">
                    <span className="text-sm font-modern text-gray-600">Posts shared</span>
                    <Badge variant="secondary" className="font-modern bg-white">
                      {postsCount} {postsCount === 1 ? "post" : "posts"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* What we can do */}
            <div className="fade-in-4 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-modern flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                What OLIS can analyze
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 font-modern">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-blue-500 flex-shrink-0">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  Your writing patterns and voice
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-blue-500 flex-shrink-0">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  Topics you care about
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-blue-500 flex-shrink-0">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  Potential niche directions
                </li>
              </ul>
            </div>

            {/* What we can't know yet */}
            <div className="fade-in-4 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-modern flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                What we can't know yet
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 font-modern">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-amber-500 flex-shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  How your audience responds (we'll learn this together)
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 text-amber-500 flex-shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Your deeper goals (share when you're ready)
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="fade-in-5 flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="font-modern"
              >
                Back
              </Button>
              <Button
                onClick={onComplete}
                className="flex-1 h-11 font-modern font-medium"
                size="lg"
              >
                Let's go →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust reminder */}
        <p className="fade-in-5 text-xs text-center text-muted-foreground mt-4 font-modern">
          Remember: OLIS thinks with you, not for you.
        </p>
      </div>
    </div>
  );
}
