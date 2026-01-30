"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProfileData } from "./ProfileSetup";
import type { PostData } from "./PostHistorySetup";

interface ConfirmationScreenProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onComplete?: () => void;
  onBack?: () => void;
  onEditProfile?: () => void;
  onEditPosts?: () => void;
}

export default function ConfirmationScreen({
  profileData,
  posts = [],
  onComplete,
  onBack,
  onEditProfile,
  onEditPosts,
}: ConfirmationScreenProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const featuredPosts = posts.filter(p => p.isFeatured);
  const regularPosts = posts.filter(p => !p.isFeatured);

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
      <div className="z-10 w-full max-w-lg px-6 py-8 overflow-y-auto max-h-screen">
        {/* Progress Indicator */}
        <div className="fade-in-1 text-center mb-6">
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground font-modern">
            Step 3 of 3
          </span>
        </div>

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Review & Confirm
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              This is what we understand
            </CardTitle>
            <p className="text-sm text-muted-foreground font-modern mt-2">
              Please review the information below before we begin analyzing your LinkedIn presence.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Profile Data Section */}
            <div className="fade-in-3 section-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-800 font-modern flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Profile Data
                </h4>
                <button 
                  onClick={onEditProfile}
                  className="text-xs text-blue-600 hover:text-blue-700 font-modern"
                >
                  Edit
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-muted-foreground font-modern">Name</span>
                  <span className="text-sm font-medium text-gray-700 font-modern">
                    {profileData?.name || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-muted-foreground font-modern">Headline</span>
                  <span className="text-sm font-medium text-gray-700 font-modern max-w-[200px] text-right truncate">
                    {profileData?.headline || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-muted-foreground font-modern">LinkedIn PDF</span>
                  <span className="text-sm font-medium text-green-600 font-modern flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {profileData?.pdfFileName || "Uploaded"}
                  </span>
                </div>
                {profileData?.linkedinUrl && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-muted-foreground font-modern">Profile URL</span>
                    <span className="text-sm text-blue-600 font-modern truncate max-w-[180px]">
                      {profileData.linkedinUrl}
                    </span>
                  </div>
                )}
              </div>

              {/* What we'll extract */}
              <div className="bg-gray-50 rounded-lg p-3 mt-3">
                <p className="text-xs font-medium text-gray-700 font-modern mb-2">From your PDF, we'll extract:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-modern text-xs">Experience</Badge>
                  <Badge variant="secondary" className="font-modern text-xs">Skills</Badge>
                  <Badge variant="secondary" className="font-modern text-xs">Education</Badge>
                  <Badge variant="secondary" className="font-modern text-xs">Profile narrative</Badge>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="fade-in-4 section-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-800 font-modern flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Content & Posts
                </h4>
                <button 
                  onClick={onEditPosts}
                  className="text-xs text-blue-600 hover:text-blue-700 font-modern"
                >
                  Edit
                </button>
              </div>

              {posts.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="font-modern">
                      {posts.length} {posts.length === 1 ? "post" : "posts"} shared
                    </Badge>
                    {featuredPosts.length > 0 && (
                      <Badge variant="secondary" className="font-modern text-amber-700 bg-amber-100">
                        {featuredPosts.length} featured
                      </Badge>
                    )}
                  </div>
                  
                  {/* Preview of posts */}
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {posts.slice(0, 3).map((post, index) => (
                      <div key={index} className={`text-xs p-2 rounded ${post.isFeatured ? "bg-amber-50" : "bg-gray-50"}`}>
                        <p className="text-gray-600 font-modern line-clamp-1">{post.content}</p>
                      </div>
                    ))}
                    {posts.length > 3 && (
                      <p className="text-xs text-muted-foreground font-modern">
                        + {posts.length - 3} more posts
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground font-modern">No posts shared yet</p>
                  <p className="text-xs text-muted-foreground font-modern mt-1">
                    You can add posts later to improve recommendations
                  </p>
                </div>
              )}
            </div>

            {/* Confirmation checkbox */}
            <div className="fade-in-5 bg-green-50/80 border border-green-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <div>
                  <p className="text-sm font-medium text-green-800 font-modern">
                    Yes, this represents my LinkedIn presence accurately
                  </p>
                  <p className="text-xs text-green-700 font-modern mt-1">
                    I understand that OLIS will use this information to analyze my profile and provide personalized insights.
                  </p>
                </div>
              </label>
            </div>

            {/* What happens next */}
            <div className="fade-in-5 space-y-2">
              <p className="text-xs font-medium text-gray-700 font-modern">What happens next?</p>
              <ul className="text-xs text-gray-600 font-modern space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  We'll analyze your profile structure and positioning
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  We'll identify your content themes and voice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">→</span>
                  We'll surface insights and niche opportunities
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="fade-in-6 flex gap-3 pt-4">
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
                disabled={!isConfirmed}
                className="flex-1 h-11 font-modern font-medium"
                size="lg"
              >
                Begin Analysis →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust reminder */}
        <div className="fade-in-6 flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4 font-modern">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>Your data is processed locally. Nothing is shared without your consent.</span>
        </div>
      </div>
    </div>
  );
}
