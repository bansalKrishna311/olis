"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfileData, PostData } from "@/lib/types";
import {
  OnboardingBackground,
  ONBOARDING_STYLES,
  CheckIcon,
  XCircleIcon,
  XIcon,
} from "./shared";

interface OrientationScreenProps {
  profileData?: ProfileData;
  posts?: PostData[];
  onContinue?: () => void;
}

export default function OrientationScreen({
  profileData,
  posts = [],
  onContinue,
}: OrientationScreenProps) {
  const { hasPosts, hasMultiplePosts, featuredCount } = useMemo(
    () => ({
      hasPosts: posts.length > 0,
      hasMultiplePosts: posts.length >= 3,
      featuredCount: posts.filter((p) => p.isFeatured).length,
    }),
    [posts]
  );

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden relative">
      <style>{ONBOARDING_STYLES}</style>

      <OnboardingBackground shapeCount={4} />

      <div className="z-10 w-full max-w-2xl px-6 py-4">
        <Card className="fade-in-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 pt-6">
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Your LinkedIn data is ready to be analyzed
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pb-6">
            {/* What we have */}
            <Section title="What we have" className="fade-in-2">
              <ListItem icon="check">
                Profile data: <strong>{profileData?.name || "Available"}</strong>
              </ListItem>
              <ListItem icon="check">
                LinkedIn PDF: <strong>Uploaded</strong>
              </ListItem>
              <ListItem icon={hasPosts ? "check" : "x-circle"}>
                Posts shared:{" "}
                <strong>
                  {hasPosts
                    ? `${posts.length}${featuredCount > 0 ? ` (${featuredCount} featured)` : ""}`
                    : "None"}
                </strong>
              </ListItem>
            </Section>

            {/* What we can do */}
            <Section title="What we can do" className="fade-in-3">
              <ListItem icon="check">Analyze your profile structure</ListItem>
              <ListItem icon="check">Extract experience, skills, and education</ListItem>
              {hasPosts && (
                <>
                  <ListItem icon="check">Identify your content themes</ListItem>
                  <ListItem icon="check">Understand your voice and tone</ListItem>
                </>
              )}
              {hasMultiplePosts && (
                <ListItem icon="check">Detect patterns across your content</ListItem>
              )}
            </Section>

            {/* What we cannot do */}
            <Section title="What we cannot do" className="fade-in-4 bg-gray-50/50">
              <ListItem icon="x">Auto-post to LinkedIn on your behalf</ListItem>
              <ListItem icon="x">Predict post virality or engagement</ListItem>
              {!hasMultiplePosts && (
                <ListItem icon="x">
                  Generate deep insights without more content history
                </ListItem>
              )}
            </Section>

            {/* CTA */}
            <div className="fade-in-5 pt-2">
              <Button
                onClick={onContinue}
                className="w-full h-11 font-modern font-medium"
                size="lg"
              >
                Go to dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper components
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ title, children, className = "" }: SectionProps) {
  return (
    <div className={`section-card p-4 space-y-3 ${className}`}>
      <h4 className="text-sm font-medium text-gray-800 font-modern">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

interface ListItemProps {
  icon: "check" | "x" | "x-circle";
  children: React.ReactNode;
}

function ListItem({ icon, children }: ListItemProps) {
  const IconComponent = {
    check: () => <CheckIcon className="check-icon flex-shrink-0" />,
    x: () => <XIcon className="x-icon flex-shrink-0" />,
    "x-circle": () => <XCircleIcon className="x-icon flex-shrink-0" />,
  }[icon];

  return (
    <li className="flex items-center gap-3 text-sm font-modern">
      <IconComponent />
      <span className="text-gray-700">{children}</span>
    </li>
  );
}
