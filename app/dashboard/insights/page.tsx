"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Clock,
  BarChart3,
  Lightbulb,
  Target,
  Zap
} from "lucide-react";
import type { PostData } from "../../components/PostHistorySetup";
import type { ProfileData } from "../../components/ProfileSetup";

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

export default function InsightsPage() {
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

    if (savedProfile) setProfileData(savedProfile);
    if (savedPosts.length > 0) setPosts(savedPosts);
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate insights
  const avgPostLength = posts.length > 0 
    ? Math.round(posts.reduce((sum, p) => sum + p.content.length, 0) / posts.length)
    : 0;
  
  const featuredCount = posts.filter(p => p.isFeatured).length;
  const longFormCount = posts.filter(p => p.content.length > 500).length;
  const shortFormCount = posts.filter(p => p.content.length < 200).length;

  return (
    <div className="space-y-6">
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
      `}</style>

      {/* Page header */}
      <div className="fade-in-1">
        <h1 className="text-2xl font-semibold text-gray-900 font-modern">
          Insights
        </h1>
        <p className="text-gray-500 font-modern mt-1">
          AI-powered analysis of your LinkedIn presence
        </p>
      </div>

      {/* Content Analysis */}
      <div className="fade-in-2">
        <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide mb-3">
          Content Analysis
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">{posts.length}</p>
              <p className="text-xs text-gray-500 font-modern mt-1">Total Posts</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">{avgPostLength}</p>
              <p className="text-xs text-gray-500 font-modern mt-1">Avg. Characters</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-4 w-4 text-amber-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">{featuredCount}</p>
              <p className="text-xs text-gray-500 font-modern mt-1">Featured Posts</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-modern">
                {posts.length >= 5 ? "High" : posts.length >= 3 ? "Medium" : "Low"}
              </p>
              <p className="text-xs text-gray-500 font-modern mt-1">Data Quality</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Writing Style Analysis */}
      <div className="fade-in-2">
        <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide mb-3">
          Writing Style
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-medium text-gray-700 font-modern">Content Format</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">Long-form posts</span>
                  <span className="text-sm font-medium text-gray-900 font-modern">{longFormCount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: posts.length > 0 ? `${(longFormCount / posts.length) * 100}%` : '0%' }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">Short-form posts</span>
                  <span className="text-sm font-medium text-gray-900 font-modern">{shortFormCount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: posts.length > 0 ? `${(shortFormCount / posts.length) * 100}%` : '0%' }}
                  />
                </div>
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
                  <span className={`text-xs px-2 py-0.5 rounded-full font-modern ${
                    profileData?.headline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {profileData?.headline ? "Set" : "Missing"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">About Section</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-modern ${
                    profileData?.summary ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {profileData?.summary ? "Set" : "Missing"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-modern">Content Activity</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-modern ${
                    posts.length >= 3 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {posts.length >= 3 ? "Active" : "Low"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="fade-in-3">
        <h3 className="text-sm font-medium text-gray-500 font-modern uppercase tracking-wide mb-3">
          Recommendations
        </h3>
        <Card className="border-0 shadow-sm">
          <CardContent className="py-4">
            <ul className="space-y-3">
              {posts.length < 5 && (
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-modern">Add more posts for better analysis</p>
                    <p className="text-xs text-gray-500 font-modern">
                      You have {posts.length} posts. Add {5 - posts.length} more for comprehensive pattern detection.
                    </p>
                  </div>
                </li>
              )}
              {!profileData?.summary && (
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-modern">Complete your About section</p>
                    <p className="text-xs text-gray-500 font-modern">
                      A strong About section helps visitors understand your value proposition.
                    </p>
                  </div>
                </li>
              )}
              {featuredCount === 0 && posts.length > 0 && (
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-modern">Mark your best posts as featured</p>
                    <p className="text-xs text-gray-500 font-modern">
                      Featured posts help us understand what content you consider your best work.
                    </p>
                  </div>
                </li>
              )}
              {longFormCount === 0 && posts.length > 0 && (
                <li className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-modern">Try longer-form content</p>
                    <p className="text-xs text-gray-500 font-modern">
                      Posts with 500+ characters tend to get more engagement and establish thought leadership.
                    </p>
                  </div>
                </li>
              )}
              {posts.length >= 5 && profileData?.summary && featuredCount > 0 && (
                <li className="flex items-start gap-3">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-modern">Great progress!</p>
                    <p className="text-xs text-gray-500 font-modern">
                      Your profile has strong foundations. Keep creating consistent content.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
