"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProfileData, PostData } from "@/lib/types";
import {
  OnboardingBackground,
  ONBOARDING_STYLES,
  ProgressIndicator,
  TrustFooter,
  UserIcon,
  FileTextIcon,
  CheckIcon,
} from "./shared";

interface ConfirmationScreenProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onComplete?: () => void;
  onBack?: () => void;
  onEditProfile?: () => void;
  onEditPosts?: () => void;
}

export default function ConfirmationScreen({
  profileData,
  posts = [],
  onComplete,
  onBack,
  onEditProfile,
  onEditPosts,
}: ConfirmationScreenProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const featuredPosts = useMemo(
    () => posts.filter((p) => p.isFeatured),
    [posts]
  );

  const handleConfirmChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConfirmed(e.target.checked);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden relative">
      <style>{ONBOARDING_STYLES}</style>

      <OnboardingBackground shapeCount={4} />

      <div className="z-10 w-full max-w-3xl px-6 py-4">
        <ProgressIndicator currentStep={3} totalSteps={3} />

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 pt-4">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Review & Confirm
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              This is what we understand
            </CardTitle>
            <p className="text-sm text-muted-foreground font-modern mt-2">
              Please review the information below before we begin analyzing your LinkedIn
              presence.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Profile Data Section */}
              <div className="fade-in-3 section-card p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-800 font-modern flex items-center gap-2">
                    <UserIcon size={16} />
                    Profile Data
                  </h4>
                  <button
                    onClick={onEditProfile}
                    className="text-xs text-blue-600 hover:text-blue-700 font-modern"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-1">
                  <ProfileField label="Name" value={profileData?.name || "Not provided"} />
                  <ProfileField
                    label="Headline"
                    value={profileData?.headline || "Not provided"}
                    truncate
                  />
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-xs text-muted-foreground font-modern">
                      LinkedIn PDF
                    </span>
                    <span className="text-sm font-medium text-green-600 font-modern flex items-center gap-1">
                      <CheckIcon size={14} />
                      Uploaded
                    </span>
                  </div>
                  {profileData?.linkedinUrl && (
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-xs text-muted-foreground font-modern">
                        Profile URL
                      </span>
                      <span className="text-sm text-blue-600 font-modern truncate max-w-[140px]">
                        {profileData.linkedinUrl}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-700 font-modern mb-1.5">
                    From your PDF, we&apos;ll extract:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="font-modern text-xs">
                      Experience
                    </Badge>
                    <Badge variant="secondary" className="font-modern text-xs">
                      Skills
                    </Badge>
                    <Badge variant="secondary" className="font-modern text-xs">
                      Education
                    </Badge>
                    <Badge variant="secondary" className="font-modern text-xs">
                      Narrative
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Posts Section */}
              <div className="fade-in-4 section-card p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-800 font-modern flex items-center gap-2">
                    <FileTextIcon size={16} />
                    Content & Posts
                  </h4>
                  <button
                    onClick={onEditPosts}
                    className="text-xs text-blue-600 hover:text-blue-700 font-modern"
                  >
                    Edit
                  </button>
                </div>

                {posts.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="font-modern">
                        {posts.length} {posts.length === 1 ? "post" : "posts"} shared
                      </Badge>
                      {featuredPosts.length > 0 && (
                        <Badge
                          variant="secondary"
                          className="font-modern text-amber-700 bg-amber-100"
                        >
                          {featuredPosts.length} featured
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1.5 max-h-[100px] overflow-y-auto posts-scroll pr-1">
                      {posts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className={`text-xs p-1.5 rounded ${
                            post.isFeatured ? "bg-amber-50" : "bg-gray-50"
                          }`}
                        >
                          <p className="text-gray-600 font-modern line-clamp-1">
                            {post.content}
                          </p>
                        </div>
                      ))}
                      {posts.length > 2 && (
                        <p className="text-xs text-muted-foreground font-modern">
                          + {posts.length - 2} more posts
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-sm text-muted-foreground font-modern">No posts shared</p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-gray-700 font-modern mb-1.5">
                    What we&apos;ll analyze:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="font-modern text-xs">
                      Content themes
                    </Badge>
                    <Badge variant="secondary" className="font-modern text-xs">
                      Voice & tone
                    </Badge>
                    <Badge variant="secondary" className="font-modern text-xs">
                      Engagement
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="fade-in-5 bg-green-50/80 border border-green-200 rounded-lg p-2.5">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={handleConfirmChange}
                  className="w-4 h-4 mt-0.5 rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                <div>
                  <p className="text-sm font-medium text-green-800 font-modern">
                    Yes, this represents my LinkedIn presence accurately
                  </p>
                  <p className="text-xs text-green-700 font-modern">
                    OLIS will use this to analyze your profile and provide personalized insights.
                  </p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="fade-in-6 flex gap-3">
              <Button type="button" variant="ghost" onClick={onBack} className="font-modern">
                Back
              </Button>
              <Button
                onClick={onComplete}
                disabled={!isConfirmed}
                className="flex-1 h-10 font-modern font-medium"
                size="lg"
              >
                Begin Analysis →
              </Button>
            </div>
          </CardContent>
        </Card>

        <TrustFooter
          message="Your data is processed locally. Nothing is shared without your consent."
          variant="shield"
          className="fade-in-6"
        />
      </div>
    </div>
  );
}

// Helper component for profile fields
interface ProfileFieldProps {
  label: string;
  value: string;
  truncate?: boolean;
}

function ProfileField({ label, value, truncate }: ProfileFieldProps) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
      <span className="text-xs text-muted-foreground font-modern">{label}</span>
      <span
        className={`text-sm font-medium text-gray-700 font-modern ${
          truncate ? "max-w-[160px] text-right truncate" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
