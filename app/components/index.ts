/**
 * Barrel export for onboarding components
 */

export { default as WelcomeAnimation } from "./WelcomeAnimation";
export { default as ProfileSetup } from "./ProfileSetup";
export { default as PostHistorySetup } from "./PostHistorySetup";
export { default as ConfirmationScreen } from "./ConfirmationScreen";
export { default as OrientationScreen } from "./OrientationScreen";
export { default as Dashboard } from "./Dashboard";

// Re-export types for consumers
export type { ProfileData, PostData } from "@/lib/types";
