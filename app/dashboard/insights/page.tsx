"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TrendingUp,
  MessageSquare,
  BarChart3,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";
import {
  DASHBOARD_PAGE_STYLES,
  LoadingSpinner,
  PageHeader,
  SectionHeader,
  StatCard,
  ProgressBar,
  StatusBadge,
  RecommendationItem,
  calculateContentStats,
  useProfileData,
} from "../shared";

export default function InsightsPage() {
  const { isHydrated, profileData, posts } = useProfileData();

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  const stats = calculateContentStats(posts);

  return (
    <div className="space-y-6">
      <style>{DASHBOARD_PAGE_STYLES}</style>

      <PageHeader
        title="Insights"
        description="AI-powered analysis of your LinkedIn presence"
      />

      {/* Content Analysis */}
      <div className="fade-in-2">
        <SectionHeader title="Content Analysis" />
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={BarChart3} iconColor="text-blue-500" value={stats.totalPosts} label="Total Posts" />
          <StatCard icon={MessageSquare} iconColor="text-green-500" value={stats.avgPostLength} label="Avg. Characters" />
          <StatCard icon={Target} iconColor="text-amber-500" value={stats.featuredCount} label="Featured Posts" />
          <StatCard icon={Zap} iconColor="text-purple-500" value={stats.dataQuality} label="Data Quality" />
        </div>
      </div>

      {/* Writing Style Analysis */}
      <div className="fade-in-2">
        <SectionHeader title="Writing Style" />
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-medium text-gray-700 font-modern">Content Format</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ProgressBar
                  value={stats.longFormCount}
                  max={stats.totalPosts}
                  color="bg-blue-500"
                  showLabel
                  label="Long-form posts"
                />
                <ProgressBar
                  value={stats.shortFormCount}
                  max={stats.totalPosts}
                  color="bg-green-500"
                  showLabel
                  label="Short-form posts"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-medium text-gray-700 font-modern">Profile Strength</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">Headline</span>
                  <StatusBadge status={profileData?.headline ? "set" : "missing"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">About Section</span>
                  <StatusBadge status={profileData?.summary ? "set" : "missing"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">Content Activity</span>
                  <StatusBadge status={stats.totalPosts >= 3 ? "active" : "low"} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="fade-in-3">
        <SectionHeader title="Recommendations" />
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4">
            <ul className="space-y-3">
              {stats.totalPosts < 5 && (
                <RecommendationItem
                  icon={Lightbulb}
                  title="Add more posts for better analysis"
                  description={`You have ${stats.totalPosts} posts. Add ${5 - stats.totalPosts} more for comprehensive pattern detection.`}
                />
              )}
              {!profileData?.summary && (
                <RecommendationItem
                  icon={Lightbulb}
                  title="Complete your About section"
                  description="A strong About section helps visitors understand your value proposition."
                />
              )}
              {stats.featuredCount === 0 && posts.length > 0 && (
                <RecommendationItem
                  icon={Lightbulb}
                  title="Mark your best posts as featured"
                  description="Featured posts help us understand what content you consider your best work."
                />
              )}
              {stats.longFormCount === 0 && posts.length > 0 && (
                <RecommendationItem
                  icon={Lightbulb}
                  iconColor="text-blue-500"
                  title="Try longer-form content"
                  description="Posts with 500+ characters tend to get more engagement and establish thought leadership."
                />
              )}
              {posts.length >= 5 && profileData?.summary && stats.featuredCount > 0 && (
                <RecommendationItem
                  icon={TrendingUp}
                  iconColor="text-green-500"
                  title="Great progress!"
                  description="Your profile has strong foundations. Keep creating consistent content."
                />
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
