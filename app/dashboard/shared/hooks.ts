/**
 * Shared hooks for dashboard pages
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ProfileData, PostData } from "@/lib/types";
import {
  STORAGE_KEYS,
  getStorageItem,
  isOnboardingComplete,
  clearAllStorageData,
} from "@/lib/storage";

interface UseProfileDataResult {
  isHydrated: boolean;
  profileData: ProfileData | null;
  posts: PostData[];
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
}

/**
 * Hook to load profile and posts data from localStorage
 */
export function useProfileData(): UseProfileDataResult {
  const [isHydrated, setIsHydrated] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const savedProfile = getStorageItem<ProfileData | null>(STORAGE_KEYS.profile, null);
    const savedPosts = getStorageItem<PostData[]>(STORAGE_KEYS.posts, []);

    if (savedProfile) {
      // Ensure pdfFile is null (not serializable)
      setProfileData({ ...savedProfile, pdfFile: null });
    }
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }

    setIsHydrated(true);
  }, []);

  return { isHydrated, profileData, posts, setProfileData, setPosts };
}

interface UseDashboardAuthResult {
  userName: string;
  handleLogout: () => void;
}

/**
 * Hook to handle dashboard authentication and user info
 */
export function useDashboardAuth(): UseDashboardAuthResult {
  const router = useRouter();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Check if onboarding is complete
    if (!isOnboardingComplete()) {
      router.push("/onboarding");
      return;
    }

    // Get user name from profile data
    const profileData = getStorageItem<ProfileData | null>(STORAGE_KEYS.profile, null);
    if (profileData?.fullName) {
      setUserName(profileData.fullName.split(" ")[0]);
    } else if (profileData?.name) {
      setUserName(profileData.name.split(" ")[0]);
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    clearAllStorageData();
    router.push("/onboarding");
  }, [router]);

  return { userName, handleLogout };
}
