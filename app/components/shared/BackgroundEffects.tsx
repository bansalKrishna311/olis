"use client";

import { FC } from "react";

interface FloatingShapesProps {
  /** Number of shapes to render (1-4) */
  shapeCount?: 1 | 2 | 3 | 4;
  /** Additional CSS class for customization */
  className?: string;
}

/**
 * Floating gradient shapes background effect
 * Used across onboarding screens for consistent visual design
 */
export const FloatingShapes: FC<FloatingShapesProps> = ({ shapeCount = 4, className = "" }) => (
  <div className={className}>
    {shapeCount >= 1 && <div className="abstract-shape shape-1" />}
    {shapeCount >= 2 && <div className="abstract-shape shape-2" />}
    {shapeCount >= 3 && <div className="abstract-shape shape-3" />}
    {shapeCount >= 4 && <div className="abstract-shape shape-4" />}
  </div>
);

/**
 * Gradient background layer
 * Provides the soft gradient foundation for screens
 */
export const GradientBackground: FC<{ variant?: "setup" | "welcome" }> = ({
  variant = "setup",
}) => <div className={`absolute inset-0 ${variant === "welcome" ? "welcome-bg" : "setup-bg"}`} />;

/**
 * Grain texture overlay
 * Adds subtle texture to the background
 */
export const GrainOverlay: FC = () => <div className="grain-overlay" />;

interface OnboardingBackgroundProps {
  variant?: "setup" | "welcome";
  shapeCount?: 1 | 2 | 3 | 4;
}

/**
 * Complete background composition for onboarding screens
 * Combines gradient, floating shapes, and grain overlay
 */
export const OnboardingBackground: FC<OnboardingBackgroundProps> = ({
  variant = "setup",
  shapeCount = 4,
}) => (
  <>
    <GradientBackground variant={variant} />
    <FloatingShapes shapeCount={shapeCount} />
    <GrainOverlay />
  </>
);
