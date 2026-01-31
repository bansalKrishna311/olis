import type { ProfileData, PostData } from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════════════
// PROFILE SCORE UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

export interface ScoreInfo {
  label: string;
  color: string;
  bg: string;
}

/**
 * Calculate profile score (0-100) based on profile data and posts
 */
export function calculateProfileScore(profile: ProfileData | null, posts: PostData[]): number {
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
  const featuredPosts = posts.filter((p) => p.isFeatured).length;
  if (featuredPosts >= 2) score += 10;
  else if (featuredPosts >= 1) score += 5;

  const avgPostLength =
    posts.length > 0 ? posts.reduce((sum, p) => sum + p.content.length, 0) / posts.length : 0;
  if (avgPostLength > 300) score += 10;
  else if (avgPostLength > 100) score += 5;

  if (profile.headline && profile.summary) {
    score += 5; // Basic alignment bonus
  }

  return Math.min(100, score);
}

/**
 * Get score label and styling based on score value
 */
export function getScoreLabel(score: number): ScoreInfo {
  if (score >= 80) return { label: "Excellent", color: "text-green-600", bg: "bg-green-500" };
  if (score >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-500" };
  if (score >= 40) return { label: "Fair", color: "text-amber-600", bg: "bg-amber-500" };
  if (score >= 20) return { label: "Needs Work", color: "text-orange-600", bg: "bg-orange-500" };
  return { label: "Getting Started", color: "text-gray-600", bg: "bg-gray-400" };
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT ANALYSIS UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

export interface ContentStats {
  totalPosts: number;
  avgPostLength: number;
  featuredCount: number;
  longFormCount: number;
  shortFormCount: number;
  dataQuality: "High" | "Medium" | "Low";
}

/**
 * Calculate content statistics from posts
 */
export function calculateContentStats(posts: PostData[]): ContentStats {
  const totalPosts = posts.length;
  const avgPostLength =
    totalPosts > 0
      ? Math.round(posts.reduce((sum, p) => sum + p.content.length, 0) / totalPosts)
      : 0;
  const featuredCount = posts.filter((p) => p.isFeatured).length;
  const longFormCount = posts.filter((p) => p.content.length > 500).length;
  const shortFormCount = posts.filter((p) => p.content.length < 200).length;
  const dataQuality = totalPosts >= 5 ? "High" : totalPosts >= 3 ? "Medium" : "Low";

  return {
    totalPosts,
    avgPostLength,
    featuredCount,
    longFormCount,
    shortFormCount,
    dataQuality,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// PROFILE REFACTOR UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate headline suggestions based on current headline
 */
export function generateHeadlineSuggestions(current: string): string[] {
  if (!current)
    return [
      "Add a clear headline that describes what you do",
      "Include your role, expertise, and who you help",
    ];

  return [
    `${current.split("|")[0]?.trim() || current} | Helping [audience] achieve [outcome]`,
    `[Your Role] → [Key Expertise] → [Value Proposition]`,
    `${current.length < 50 ? current + " | Open to opportunities" : current.substring(0, 80) + "..."}`,
  ];
}

export interface AboutSuggestion {
  suggestion: string;
  rationale: string;
}

/**
 * Generate about section suggestions
 */
export function generateAboutSuggestions(current: string): AboutSuggestion[] {
  if (!current || current.length < 50) {
    return [
      {
        suggestion:
          "Start with a hook that captures attention in the first line.\n\nThen share:\n• What you do\n• Who you help\n• What makes your approach unique\n• A call to action",
        rationale:
          "Your About section is your chance to tell your story. Lead with value, not titles.",
      },
    ];
  }

  return [
    {
      suggestion:
        current.split(".")[0] +
        ".\n\n" +
        "Here's what I focus on:\n• [Key area 1]\n• [Key area 2]\n• [Key area 3]\n\n" +
        "Let's connect if you're working on [relevant topic].",
      rationale: "Breaking content into scannable sections increases readability by 47%.",
    },
  ];
}
