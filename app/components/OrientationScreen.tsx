"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfileData } from "./ProfileSetup";
import type { PostData } from "./PostHistorySetup";

interface OrientationScreenProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onContinue?: () => void;
}

export default function OrientationScreen({
  profileData,
  posts = [],
  onContinue,
}: OrientationScreenProps) {
  const hasPosts = posts.length > 0;
  const hasMultiplePosts = posts.length >= 3;
  const featuredCount = posts.filter(p => p.isFeatured).length;

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden relative">
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

        .fade-in-1 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }
        .fade-in-5 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }
        .fade-in-6 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards; opacity: 0; }

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

        .section-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .check-icon {
          color: #22c55e;
        }

        .x-icon {
          color: #9ca3af;
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
      <div className="z-10 w-full max-w-2xl px-6 py-4">
        <Card className="fade-in-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 pt-6">
            {/* Section A — Title */}
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Your LinkedIn data is ready to be analyzed
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pb-6">
            {/* Section B — What the system knows */}
            <div className="fade-in-2 section-card p-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-800 font-modern">
                What we have
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">
                    Profile data: <span className="font-medium">{profileData?.name || "Available"}</span>
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">
                    LinkedIn PDF: <span className="font-medium">Uploaded</span>
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm font-modern">
                  {hasPosts ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-icon flex-shrink-0">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  )}
                  <span className="text-gray-700">
                    Posts shared: <span className="font-medium">
                      {hasPosts ? `${posts.length}${featuredCount > 0 ? ` (${featuredCount} featured)` : ""}` : "None"}
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Section C — What the system can do now */}
            <div className="fade-in-3 section-card p-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-800 font-modern">
                What we can do
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">Analyze your profile structure</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="text-gray-700">Extract experience, skills, and education</span>
                </li>
                {hasPosts && (
                  <>
                    <li className="flex items-center gap-3 text-sm font-modern">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-gray-700">Identify your content themes</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-modern">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-gray-700">Understand your voice and tone</span>
                    </li>
                  </>
                )}
                {hasMultiplePosts && (
                  <li className="flex items-center gap-3 text-sm font-modern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-gray-700">Detect patterns across your content</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Section D — What the system cannot do yet */}
            <div className="fade-in-4 section-card p-4 space-y-3 bg-gray-50/50">
              <h4 className="text-sm font-medium text-gray-800 font-modern">
                What we cannot do
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-icon flex-shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-600">Auto-post to LinkedIn on your behalf</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-modern">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-icon flex-shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="text-gray-600">Predict post virality or engagement</span>
                </li>
                {!hasMultiplePosts && (
                  <li className="flex items-center gap-3 text-sm font-modern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-icon flex-shrink-0">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="text-gray-600">Generate deep insights without more content history</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Section E — Single CTA */}
            <div className="fade-in-5 pt-2">
              <Button
                onClick={onContinue}
                className="w-full h-11 font-modern font-medium"
                size="lg"
              >
                Go to dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
