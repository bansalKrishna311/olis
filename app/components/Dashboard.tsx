"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProfileData } from "./ProfileSetup";
import type { PostData } from "./PostHistorySetup";

interface DashboardProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onAddPosts?: () => void;
  onEditProfile?: () => void;
}

export default function Dashboard({
  profileData,
  posts = [],
  onAddPosts,
  onEditProfile,
}: DashboardProps) {
  // Compute analysis depth
  const getAnalysisDepth = (): { level: string; color: string } => {
    if (posts.length >= 5) {
      return { level: "Strong", color: "text-green-600" };
    } else if (posts.length >= 3) {
      return { level: "Partial", color: "text-amber-600" };
    } else {
      return { level: "Limited", color: "text-gray-500" };
    }
  };

  // Compute today's focus (rule-based)
  const getTodaysFocus = (): string => {
    if (posts.length === 0) {
      return "Add at least 3 posts to unlock voice analysis";
    } else if (posts.length < 3) {
      return `Add ${3 - posts.length} more post${3 - posts.length > 1 ? "s" : ""} to unlock voice analysis`;
    } else if (posts.length < 5) {
      return `Add ${5 - posts.length} more post${5 - posts.length > 1 ? "s" : ""} to strengthen content patterns`;
    } else {
      return "Review your profile summary for clarity";
    }
  };

  // Compute next best action (single action only)
  const getNextAction = (): { label: string; action: "add-posts" | "edit-profile" | "view-insights"; locked: boolean } => {
    if (posts.length < 3) {
      return { label: "Add posts", action: "add-posts", locked: false };
    } else if (posts.length < 5) {
      return { label: "Add more posts", action: "add-posts", locked: false };
    } else {
      return { label: "View insights", action: "view-insights", locked: true };
    }
  };

  const analysisDepth = getAnalysisDepth();
  const todaysFocus = getTodaysFocus();
  const nextAction = getNextAction();

  const handleNextAction = () => {
    if (nextAction.action === "add-posts") {
      onAddPosts?.();
    } else if (nextAction.action === "edit-profile") {
      onEditProfile?.();
    }
    // view-insights is locked, do nothing
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-in-1 { animation: fadeInUp 0.5s ease-out 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.5s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.5s ease-out 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.5s ease-out 0.4s forwards; opacity: 0; }
      `}</style>

      {/* Simple header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold font-modern text-gray-900">OLIS</span>
          <span className="text-sm text-gray-500 font-modern">{profileData?.name}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Block 1 — Current Status */}
          <Card className="fade-in-1 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <h2 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
                Current Status
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600 font-modern">Profile</span>
                <span className="text-sm font-medium text-green-600 font-modern">Imported</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600 font-modern">Posts</span>
                <span className="text-sm font-medium text-gray-700 font-modern">
                  {posts.length} / 5 added
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 font-modern">Analysis depth</span>
                <span className={`text-sm font-medium font-modern ${analysisDepth.color}`}>
                  {analysisDepth.level}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Block 2 — Today's Focus */}
          <Card className="fade-in-2 border-0 shadow-sm bg-blue-50/50">
            <CardHeader className="pb-2">
              <h2 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
                Today's Focus
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-800 font-modern">
                {todaysFocus}
              </p>
            </CardContent>
          </Card>

          {/* Block 3 — Next Best Action */}
          <Card className="fade-in-3 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <h2 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
                Next Best Action
              </h2>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleNextAction}
                disabled={nextAction.locked}
                className="w-full h-11 font-modern font-medium"
                size="lg"
              >
                {nextAction.label}
                {nextAction.locked && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                )}
              </Button>
              {nextAction.locked && (
                <p className="text-xs text-gray-500 font-modern text-center mt-2">
                  Insights unlock after deeper analysis
                </p>
              )}
            </CardContent>
          </Card>

          {/* Rule-based observations (placeholder for Step 4) */}
          {posts.length > 0 && (
            <Card className="fade-in-4 border-0 shadow-sm bg-gray-50">
              <CardHeader className="pb-2">
                <h2 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
                  Observations
                </h2>
                <p className="text-xs text-gray-400 font-modern">
                  Rule-based observations (no AI yet)
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 font-modern">
                  {posts.length < 3 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>You haven't shared enough posts to analyze tone</span>
                    </li>
                  )}
                  {posts.length >= 3 && posts.length < 5 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Voice analysis is available but pattern detection needs more data</span>
                    </li>
                  )}
                  {posts.filter(p => p.content.length > 500).length > posts.length / 2 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Your posts are mostly long-form</span>
                    </li>
                  )}
                  {posts.filter(p => p.content.length < 200).length > posts.length / 2 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>Your posts are mostly short-form</span>
                    </li>
                  )}
                  {posts.filter(p => p.isFeatured).length === 0 && posts.length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>No featured posts marked — consider highlighting your best work</span>
                    </li>
                  )}
                  {posts.filter(p => p.isFeatured).length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{posts.filter(p => p.isFeatured).length} post{posts.filter(p => p.isFeatured).length > 1 ? "s" : ""} marked as featured</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
