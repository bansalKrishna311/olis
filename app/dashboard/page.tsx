"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  TrendingUp, 
  Eye, 
  Search, 
  Zap, 
  Target,
  ArrowRight,
  Sparkles,
  FileText,
  RefreshCw,
  ChevronRight
} from "lucide-react";
import type { ProfileData } from "../components/ProfileSetup";
import type { PostData } from "../components/PostHistorySetup";

// Storage keys
const STORAGE_KEYS = {
  profile: "olis_profile_data",
  posts: "olis_posts_data",
};

// Helper to safely parse JSON from localStorage
function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Calculate profile score (0-100)
function calculateProfileScore(profile: ProfileData | null, posts: PostData[]): number {
  if (!profile) return 0;
  
  let score = 0;
  
  // Headline clarity (0-25 points)
  if (profile.headline) {
    const headlineLength = profile.headline.length;
    if (headlineLength > 50 && headlineLength < 150) score += 25;
    else if (headlineLength > 20) score += 15;
    else if (headlineLength > 0) score += 8;
  }
  
  // Profile completeness (0-25 points)
  if (profile.summary && profile.summary.length > 100) score += 15;
  else if (profile.summary && profile.summary.length > 0) score += 8;
  if (profile.linkedinUrl) score += 5;
  if (profile.fullName) score += 5;
  
  // Content activity (0-25 points)
  if (posts.length >= 5) score += 25;
  else if (posts.length >= 3) score += 18;
  else if (posts.length >= 1) score += 10;
  
  // Consistency & quality signals (0-25 points)
  const featuredPosts = posts.filter(p => p.isFeatured).length;
  if (featuredPosts >= 2) score += 10;
  else if (featuredPosts >= 1) score += 5;
  
  const avgPostLength = posts.length > 0 
    ? posts.reduce((sum, p) => sum + p.content.length, 0) / posts.length 
    : 0;
  if (avgPostLength > 300) score += 10;
  else if (avgPostLength > 100) score += 5;
  
  if (profile.headline && profile.summary) {
    score += 5; // Basic alignment bonus
  }
  
  return Math.min(100, score);
}

function getScoreLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 80) return { label: "Excellent", color: "text-green-600", bg: "bg-green-500" };
  if (score >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-500" };
  if (score >= 40) return { label: "Fair", color: "text-amber-600", bg: "bg-amber-500" };
  if (score >= 20) return { label: "Needs Work", color: "text-orange-600", bg: "bg-orange-500" };
  return { label: "Getting Started", color: "text-gray-600", bg: "bg-gray-400" };
}

export default function DashboardPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const savedProfile = safeJsonParse<ProfileData | null>(
      localStorage.getItem(STORAGE_KEYS.profile),
      null
    );
    const savedPosts = safeJsonParse<PostData[]>(
      localStorage.getItem(STORAGE_KEYS.posts),
      []
    );

    if (savedProfile) {
      setProfileData({ ...savedProfile, pdfFile: null });
    }
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }

    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const profileScore = calculateProfileScore(profileData, posts);
  const scoreInfo = getScoreLabel(profileScore);

  return (
    <div className="space-y-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-in-1 { animation: fadeInUp 0.4s ease-out 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.4s ease-out 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.4s ease-out 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.4s ease-out 0.4s forwards; opacity: 0; }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 1; }
        }

        .score-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
      `}</style>

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
                <div className={`score-ring w-24 h-24 rounded-full ${scoreInfo.bg} bg-opacity-20 flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold font-modern">{profileScore}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-modern mt-3 uppercase tracking-wider">
                Profile Strength
              </p>
              <p className={`text-sm font-medium font-modern mt-1 ${scoreInfo.color.replace('text-', 'text-').replace('-600', '-400')}`}>
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
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${profileData?.headline ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-600 font-modern">Headline clarity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${profileData?.summary ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-600 font-modern">Profile completeness</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${posts.length >= 3 ? 'bg-green-500' : posts.length > 0 ? 'bg-amber-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-600 font-modern">Content activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${posts.filter(p => p.isFeatured).length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-600 font-modern">Content quality</span>
                </div>
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
        <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide mb-3">
          Profile Insights
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400 font-modern">30d</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">—</p>
              <p className="text-xs text-gray-500 font-modern mt-1">Profile Views</p>
              <p className="text-[10px] text-gray-400 font-modern mt-2">
                Manually trackable
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400 font-modern">7d</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">—</p>
              <p className="text-xs text-gray-500 font-modern mt-1">Search Appearances</p>
              <p className="text-[10px] text-gray-400 font-modern mt-2">
                Manually trackable
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">
                {posts.length >= 3 ? 'Active' : posts.length > 0 ? 'Low' : '—'}
              </p>
              <p className="text-xs text-gray-500 font-modern mt-1">Post Consistency</p>
              <p className="text-[10px] text-gray-400 font-modern mt-2">
                Based on {posts.length} post{posts.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">
                {profileScore >= 60 ? 'High' : profileScore >= 40 ? 'Medium' : 'Low'}
              </p>
              <p className="text-xs text-gray-500 font-modern mt-1">Engagement Potential</p>
              <p className="text-[10px] text-gray-400 font-modern mt-2">
                Estimated from profile
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 3: Action Center */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fade-in-3">
        <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide mb-3">
          Action Center
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => router.push('/dashboard/refactor')}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-modern">Refactor Profile</h4>
                    <p className="text-xs text-gray-500 font-modern mt-0.5">
                      Improve headline, about, experience
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 font-modern">
                  Get AI-powered suggestions to strengthen your profile
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => router.push('/dashboard/posts?mode=create')}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-modern">Create New Post</h4>
                    <p className="text-xs text-gray-500 font-modern mt-0.5">
                      Write your next LinkedIn post
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-600 font-modern">
                  Use your profile data and goals to craft content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ZONE 4: Posts & Content Workspace (Preview) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fade-in-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide">
            Content Workspace
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/dashboard/posts')}
            className="font-modern text-xs"
          >
            View All Posts
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        {posts.length === 0 ? (
          <Card className="border-0 shadow-sm border-dashed border-2 border-gray-200">
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
              <Card key={post.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-modern">Post {index + 1}</span>
                    {post.isFeatured && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-modern">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 font-modern line-clamp-3">
                    {post.content}
                  </p>
                  <p className="text-[10px] text-gray-400 font-modern mt-2">
                    {post.content.length} characters
                  </p>
                </CardContent>
              </Card>
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
