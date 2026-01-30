"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Save } from "lucide-react";
import type { ProfileData } from "../../components/ProfileSetup";

// Storage keys
const STORAGE_KEYS = {
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

export default function SettingsPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  useEffect(() => {
    const savedProfile = safeJsonParse<ProfileData | null>(
      localStorage.getItem(STORAGE_KEYS.profile),
      null
    );
    
    if (savedProfile) {
      setProfileData(savedProfile);
      setFullName(savedProfile.fullName || "");
      setHeadline(savedProfile.headline || "");
      setSummary(savedProfile.summary || "");
      setLinkedinUrl(savedProfile.linkedinUrl || "");
    }

    setIsHydrated(true);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    const updatedProfile: ProfileData = {
      ...profileData,
      fullName,
      headline,
      summary,
      linkedinUrl,
      pdfFile: null,
    };

    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(updatedProfile));
    setProfileData(updatedProfile);
    
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all data? This will clear your profile and posts and take you back to onboarding.")) {
      localStorage.removeItem(STORAGE_KEYS.profile);
      localStorage.removeItem(STORAGE_KEYS.posts);
      localStorage.removeItem(STORAGE_KEYS.onboardingComplete);
      localStorage.removeItem("olis_current_step");
      router.push("/onboarding");
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }
      `}</style>

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 font-modern">
          Settings
        </h1>
        <p className="text-gray-500 font-modern mt-1">
          Manage your profile and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900 font-modern">Profile Information</h2>
          <p className="text-sm text-gray-500 font-modern">
            Update your profile details
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="font-modern text-sm text-gray-600">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 font-modern"
              />
            </div>
            <div>
              <Label htmlFor="linkedinUrl" className="font-modern text-sm text-gray-600">
                LinkedIn URL
              </Label>
              <Input
                id="linkedinUrl"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-1 font-modern"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div>
            <Label htmlFor="headline" className="font-modern text-sm text-gray-600">
              Headline
            </Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="mt-1 font-modern"
            />
          </div>

          <div>
            <Label htmlFor="summary" className="font-modern text-sm text-gray-600">
              Summary
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="mt-1 min-h-[120px] font-modern"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="font-modern"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-sm border-l-4 border-l-red-400">
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900 font-modern flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 font-modern">
            Irreversible actions
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 font-modern">Reset All Data</p>
              <p className="text-xs text-gray-500 font-modern">
                Clear your profile and posts, start fresh
              </p>
            </div>
            <Button 
              variant="destructive"
              onClick={handleResetData}
              className="font-modern"
            >
              Reset Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
