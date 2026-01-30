"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("olis_onboarding_complete") === "true";
    
    if (onboardingComplete) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  }, [router]);

  // Loading state while checking
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
}
