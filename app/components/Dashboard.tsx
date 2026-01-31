"use client";

import { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProfileData, PostData, AnalysisDepth, NextAction } from "@/lib/types";
import { DASHBOARD_STYLES, LockIcon } from "./shared";

interface DashboardProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onAddPosts?: () => void;
  onEditProfile?: () => void;
}

const MINIMUM_POSTS_FOR_VOICE = 3;
const MINIMUM_POSTS_FOR_PATTERNS = 5;

export default function Dashboard({
  profileData,
  posts = [],
  onAddPosts,
  onEditProfile,
}: DashboardProps) {
  const analysisDepth = useMemo((): AnalysisDepth => {
    if (posts.length >= MINIMUM_POSTS_FOR_PATTERNS) {
      return { level: "Strong", color: "text-green-600" };
    } else if (posts.length >= MINIMUM_POSTS_FOR_VOICE) {
      return { level: "Partial", color: "text-amber-600" };
    }
    return { level: "Limited", color: "text-gray-500" };
  }, [posts.length]);

  const todaysFocus = useMemo((): string => {
    if (posts.length === 0) {
      return "Add at least 3 posts to unlock voice analysis";
    } else if (posts.length < MINIMUM_POSTS_FOR_VOICE) {
      const remaining = MINIMUM_POSTS_FOR_VOICE - posts.length;
      return `Add ${remaining} more post${remaining > 1 ? "s" : ""} to unlock voice analysis`;
    } else if (posts.length < MINIMUM_POSTS_FOR_PATTERNS) {
      const remaining = MINIMUM_POSTS_FOR_PATTERNS - posts.length;
      return `Add ${remaining} more post${remaining > 1 ? "s" : ""} to strengthen content patterns`;
    }
    return "Review your profile summary for clarity";
  }, [posts.length]);

  const nextAction = useMemo((): NextAction => {
    if (posts.length < MINIMUM_POSTS_FOR_VOICE) {
      return { label: "Add posts", action: "add-posts", locked: false };
    } else if (posts.length < MINIMUM_POSTS_FOR_PATTERNS) {
      return { label: "Add more posts", action: "add-posts", locked: false };
    }
    return { label: "View insights", action: "view-insights", locked: true };
  }, [posts.length]);

  const observations = useMemo(() => {
    const obs: string[] = [];

    if (posts.length < MINIMUM_POSTS_FOR_VOICE) {
      obs.push("You haven't shared enough posts to analyze tone");
    } else if (posts.length < MINIMUM_POSTS_FOR_PATTERNS) {
      obs.push("Voice analysis is available but pattern detection needs more data");
    }

    const longPosts = posts.filter((p) => p.content.length > 500);
    if (longPosts.length > posts.length / 2) {
      obs.push("Your posts are mostly long-form");
    }

    const shortPosts = posts.filter((p) => p.content.length < 200);
    if (shortPosts.length > posts.length / 2) {
      obs.push("Your posts are mostly short-form");
    }

    const featuredPosts = posts.filter((p) => p.isFeatured);
    if (featuredPosts.length === 0 && posts.length > 0) {
      obs.push("No featured posts marked — consider highlighting your best work");
    } else if (featuredPosts.length > 0) {
      obs.push(
        `${featuredPosts.length} post${featuredPosts.length > 1 ? "s" : ""} marked as featured`
      );
    }

    return obs;
  }, [posts]);

  const handleNextAction = useCallback(() => {
    if (nextAction.action === "add-posts") {
      onAddPosts?.();
    } else if (nextAction.action === "edit-profile") {
      onEditProfile?.();
    }
  }, [nextAction.action, onAddPosts, onEditProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{DASHBOARD_STYLES}</style>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold font-modern text-gray-900">OLIS</span>
          <span className="text-sm text-gray-500 font-modern">{profileData?.name}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Current Status */}
          <Card className="fade-in-1 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <SectionTitle>Current Status</SectionTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatusRow label="Profile" value="Imported" valueColor="text-green-600" />
              <StatusRow
                label="Posts"
                value={`${posts.length} / 5 added`}
                hasBorder
              />
              <StatusRow
                label="Analysis depth"
                value={analysisDepth.level}
                valueColor={analysisDepth.color}
                hasBorder={false}
              />
            </CardContent>
          </Card>

          {/* Today's Focus */}
          <Card className="fade-in-2 border-0 shadow-sm bg-blue-50/50">
            <CardHeader className="pb-2">
              <SectionTitle>Today&apos;s Focus</SectionTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-800 font-modern">{todaysFocus}</p>
            </CardContent>
          </Card>

          {/* Next Best Action */}
          <Card className="fade-in-3 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <SectionTitle>Next Best Action</SectionTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleNextAction}
                disabled={nextAction.locked}
                className="w-full h-11 font-modern font-medium"
                size="lg"
              >
                {nextAction.label}
                {nextAction.locked && <LockIcon className="ml-2" />}
              </Button>
              {nextAction.locked && (
                <p className="text-xs text-gray-500 font-modern text-center mt-2">
                  Insights unlock after deeper analysis
                </p>
              )}
            </CardContent>
          </Card>

          {/* Observations */}
          {posts.length > 0 && (
            <Card className="fade-in-4 border-0 shadow-sm bg-gray-50">
              <CardHeader className="pb-2">
                <SectionTitle>Observations</SectionTitle>
                <p className="text-xs text-gray-400 font-modern">
                  Rule-based observations (no AI yet)
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 font-modern">
                  {observations.map((obs, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper components
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
      {children}
    </h2>
  );
}

interface StatusRowProps {
  label: string;
  value: string;
  valueColor?: string;
  hasBorder?: boolean;
}

function StatusRow({ label, value, valueColor = "text-gray-700", hasBorder = true }: StatusRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        hasBorder ? "border-b border-gray-100" : ""
      }`}
    >
      <span className="text-sm text-gray-600 font-modern">{label}</span>
      <span className={`text-sm font-medium font-modern ${valueColor}`}>{value}</span>
    </div>
  );
}
