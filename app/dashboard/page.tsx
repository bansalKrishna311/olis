"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  Eye,
  Search,
  Zap,
  ArrowRight,
  Sparkles,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  DASHBOARD_PAGE_STYLES,
  LoadingSpinner,
  SectionHeader,
  StatCard,
  ActionCard,
  PostPreviewCard,
  calculateProfileScore,
  getScoreLabel,
  useProfileData,
} from "./shared";

export default function DashboardPage() {
  const router = useRouter();
  const { isHydrated, profileData, posts } = useProfileData();

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  const profileScore = calculateProfileScore(profileData, posts);
  const scoreInfo = getScoreLabel(profileScore);

  return (
    <div className="space-y-8">
      <style>{DASHBOARD_PAGE_STYLES}</style>

      {/* Header */}
      <div className="fade-in-1">
        <p className="text-gray-500 font-modern text-sm">
          Your LinkedIn profile evolves. This dashboard evolves with it.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 1: Profile Health & Score */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="fade-in-1 border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            {/* Score Display */}
            <div className="flex-shrink-0 w-48 bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col items-center justify-center text-white">
              <div className="relative">
                <div
                  className={`score-ring w-24 h-24 rounded-full ${scoreInfo.bg} bg-opacity-20 flex items-center justify-center`}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold font-modern">{profileScore}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-modern mt-3 uppercase tracking-wider">
                Profile Strength
              </p>
              <p
                className={`text-sm font-medium font-modern mt-1 ${scoreInfo.color.replace("-600", "-400")}`}
              >
                {scoreInfo.label}
              </p>
            </div>

            {/* Score Explanation */}
            <div className="flex-1 p-6">
              <h2 className="text-lg font-semibold text-gray-900 font-modern mb-2">
                LinkedIn Profile Score
              </h2>
              <p className="text-sm text-gray-600 font-modern mb-4">
                Based on your headline, experience, skills, and recent activity.
              </p>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Headline clarity", active: !!profileData?.headline },
                  { label: "Profile completeness", active: !!profileData?.summary },
                  { label: "Content activity", active: posts.length >= 3, warning: posts.length > 0 && posts.length < 3 },
                  { label: "Content quality", active: posts.filter(p => p.isFeatured).length > 0 },
                ].map(({ label, active, warning }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${active ? "bg-green-500" : warning ? "bg-amber-500" : "bg-gray-300"}`} />
                    <span className="text-xs text-gray-600 font-modern">{label}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => router.push('/dashboard/refactor')}
                className="mt-4 font-modern"
                size="sm"
              >
                Improve Score
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 2: Profile Insights & Metrics */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fade-in-2">
        <SectionHeader title="Profile Insights" />
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={Eye}
            value="—"
            label="Profile Views"
            sublabel="Manually trackable"
            timeRange="30d"
          />
          <StatCard
            icon={Search}
            value="—"
            label="Search Appearances"
            sublabel="Manually trackable"
            timeRange="7d"
          />
          <StatCard
            icon={TrendingUp}
            value={posts.length >= 3 ? 'Active' : posts.length > 0 ? 'Low' : '—'}
            label="Post Consistency"
            sublabel={`Based on ${posts.length} post${posts.length !== 1 ? 's' : ''}`}
          />
          <StatCard
            icon={Zap}
            value={profileScore >= 60 ? 'High' : profileScore >= 40 ? 'Medium' : 'Low'}
            label="Engagement Potential"
            sublabel="Estimated from profile"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 3: Action Center */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fade-in-3">
        <SectionHeader title="Action Center" />
        <div className="grid grid-cols-2 gap-4">
          <ActionCard
            icon={Sparkles}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            title="Refactor Profile"
            subtitle="Improve headline, about, experience"
            description="Get AI-powered suggestions to strengthen your profile"
            onClick={() => router.push('/dashboard/refactor')}
          />
          <ActionCard
            icon={FileText}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            title="Create New Post"
            subtitle="Write your next LinkedIn post"
            description="Use your profile data and goals to craft content"
            onClick={() => router.push('/dashboard/posts?mode=create')}
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 4: Posts & Content Workspace (Preview) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fade-in-4">
        <SectionHeader
          title="Content Workspace"
          actions={
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/dashboard/posts')}
              className="font-modern text-xs"
            >
              View All Posts
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          }
        />

        {posts.length === 0 ? (
          <Card className="shadow-sm border-dashed border-2 border-gray-200">
            <CardContent className="py-8 text-center">
              <FileText className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-modern mb-3">
                No posts added yet
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/posts')}
                className="font-modern"
              >
                Add Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {posts.slice(0, 3).map((post, index) => (
              <PostPreviewCard
                key={post.id}
                content={post.content}
                index={index}
                isFeatured={post.isFeatured}
              />
            ))}
            {posts.length > 3 && (
              <div className="flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/dashboard/posts')}
                  className="font-modern text-gray-500"
                >
                  +{posts.length - 3} more
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Update Data CTA */}
      <Card className="fade-in-4 border-0 shadow-sm bg-gray-50">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-600 font-modern">
                Profile outdated? Upload a newer LinkedIn PDF or add more posts anytime.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/dashboard/settings')}
              className="font-modern"
            >
              Update Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
