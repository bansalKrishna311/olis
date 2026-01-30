"use client";

import { useState } from "react";
import WelcomeAnimation from "./components/WelcomeAnimation";
import ProfileSetup, { type ProfileData } from "./components/ProfileSetup";
import PostHistorySetup, { type PostData } from "./components/PostHistorySetup";
import ConfirmationScreen from "./components/ConfirmationScreen";

type AppStep = "welcome" | "profile-setup" | "post-history" | "confirmation" | "main";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("welcome");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

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
    setCurrentStep("main");
  };

  // Welcome Animation
  if (currentStep === "welcome") {
    return <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />;
  }

  // Profile Setup (Step 1)
  if (currentStep === "profile-setup") {
    return <ProfileSetup onComplete={handleProfileComplete} />;
  }

  // Post History Setup (Step 2)
  if (currentStep === "post-history") {
    return (
      <PostHistorySetup
        onComplete={handlePostHistoryComplete}
        onBack={() => setCurrentStep("profile-setup")}
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

  // Main App (placeholder for now)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <h1
        className="text-4xl md:text-5xl font-medium font-modern tracking-tight"
        style={{ color: "#0f172a", animation: "fadeInUp 0.8s ease-out forwards" }}
      >
        Welcome, {profileData?.name || "User"}!
      </h1>
      <p
        className="text-lg font-modern mt-4"
        style={{ color: "#64748b", animation: "fadeInUp 0.8s ease-out 0.1s forwards", opacity: 0 }}
      >
        {profileData?.headline}
      </p>
      <p
        className="text-sm font-modern mt-2"
        style={{ color: "#94a3b8", animation: "fadeInUp 0.8s ease-out 0.2s forwards", opacity: 0 }}
      >
        {posts.length > 0 ? `${posts.length} posts loaded` : "No posts shared yet"}
      </p>
    </div>
  );
}
