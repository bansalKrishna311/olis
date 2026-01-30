"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WelcomeAnimation from "../components/WelcomeAnimation";
import ProfileSetup, { type ProfileData } from "../components/ProfileSetup";
import PostHistorySetup, { type PostData } from "../components/PostHistorySetup";
import ConfirmationScreen from "../components/ConfirmationScreen";
import OrientationScreen from "../components/OrientationScreen";

type OnboardingStep = "welcome" | "profile-setup" | "post-history" | "confirmation" | "orientation";

// Storage keys
const STORAGE_KEYS = {
  step: "olis_current_step",
  profile: "olis_profile_data",
  posts: "olis_posts_data",
  onboardingComplete: "olis_onboarding_complete",
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

export default function OnboardingPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  // Check if onboarding is already complete, redirect to dashboard
  useEffect(() => {
    const onboardingComplete = localStorage.getItem(STORAGE_KEYS.onboardingComplete) === "true";
    if (onboardingComplete) {
      router.push("/dashboard");
      return;
    }

    // Load persisted state
    const savedStep = localStorage.getItem(STORAGE_KEYS.step) as OnboardingStep | null;
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
    if (savedStep && savedStep !== "welcome") {
      setCurrentStep(savedStep);
    }

    setIsHydrated(true);
  }, [router]);

  // Persist step changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.step, currentStep);
  }, [currentStep, isHydrated]);

  // Persist profile data changes
  useEffect(() => {
    if (!isHydrated) return;
    if (profileData) {
      const dataToStore = { ...profileData, pdfFile: null };
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(dataToStore));
    }
  }, [profileData, isHydrated]);

  // Persist posts changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
  }, [posts, isHydrated]);

  const handleAnimationComplete = () => {
    setCurrentStep("profile-setup");
  };

  const handleProfileComplete = (data: ProfileData) => {
    setProfileData(data);
    setCurrentStep("post-history");
  };

  const handlePostHistoryComplete = (submittedPosts: PostData[]) => {
    setPosts(submittedPosts);
    setCurrentStep("confirmation");
  };

  const handleConfirmationComplete = () => {
    setCurrentStep("orientation");
  };

  const handleOrientationComplete = () => {
    localStorage.setItem(STORAGE_KEYS.onboardingComplete, "true");
    router.push("/dashboard");
  };

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Welcome Animation
  if (currentStep === "welcome") {
    return <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  // Profile Setup (Step 1)
  if (currentStep === "profile-setup") {
    return <ProfileSetup onComplete={handleProfileComplete} initialData={profileData} />;
  }

  // Post History Setup (Step 2)
  if (currentStep === "post-history") {
    return (
      <PostHistorySetup
        onComplete={handlePostHistoryComplete}
        onBack={() => setCurrentStep("profile-setup")}
        initialPosts={posts}
      />
    );
  }

  // Confirmation Screen (Step 3)
  if (currentStep === "confirmation") {
    return (
      <ConfirmationScreen
        profileData={profileData || undefined}
        posts={posts}
        onComplete={handleConfirmationComplete}
        onBack={() => setCurrentStep("post-history")}
        onEditProfile={() => setCurrentStep("profile-setup")}
        onEditPosts={() => setCurrentStep("post-history")}
      />
    );
  }

  // Orientation Screen
  return (
    <OrientationScreen
      profileData={profileData || undefined}
      posts={posts}
      onContinue={handleOrientationComplete}
    />
  );
}
