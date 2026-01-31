"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ProfileData, PostData, OnboardingStep } from "@/lib/types";
import {
  STORAGE_KEYS,
  getStorageItem,
  setStorageItem,
  isOnboardingComplete,
  setOnboardingComplete,
} from "@/lib/storage";
import WelcomeAnimation from "../components/WelcomeAnimation";
import ProfileSetup from "../components/ProfileSetup";
import PostHistorySetup from "../components/PostHistorySetup";
import ConfirmationScreen from "../components/ConfirmationScreen";
import OrientationScreen from "../components/OrientationScreen";

export default function OnboardingPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  // Check if onboarding is already complete, redirect to dashboard
  useEffect(() => {
    if (isOnboardingComplete()) {
      router.push("/dashboard");
      return;
    }

    // Load persisted state
    const savedStep = getStorageItem<OnboardingStep>(STORAGE_KEYS.step, "welcome");
    const savedProfile = getStorageItem<ProfileData | null>(STORAGE_KEYS.profile, null);
    const savedPosts = getStorageItem<PostData[]>(STORAGE_KEYS.posts, []);

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
    setStorageItem(STORAGE_KEYS.step, currentStep);
  }, [currentStep, isHydrated]);

  // Persist profile data changes
  useEffect(() => {
    if (!isHydrated) return;
    if (profileData) {
      const dataToStore = { ...profileData, pdfFile: null };
      setStorageItem(STORAGE_KEYS.profile, dataToStore);
    }
  }, [profileData, isHydrated]);

  // Persist posts changes
  useEffect(() => {
    if (!isHydrated) return;
    setStorageItem(STORAGE_KEYS.posts, posts);
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
    setOnboardingComplete();
    router.push("/dashboard");
  };

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
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
