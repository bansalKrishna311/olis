/**
 * Shared components and utilities barrel export
 */

// Background effects
export {
  FloatingShapes,
  GradientBackground,
  GrainOverlay,
  OnboardingBackground,
} from "./BackgroundEffects";

// Icons
export {
  CheckIcon,
  XIcon,
  XCircleIcon,
  LockIcon,
  UserIcon,
  FileTextIcon,
  ShieldIcon,
  UploadIcon,
  StarIcon,
  ImageIcon,
} from "./Icons";

// Progress indicators
export { ProgressIndicator, ProgressBar } from "./ProgressIndicator";

// Trust footer
export { TrustFooter } from "./TrustFooter";

// Styles
export {
  BASE_STYLES,
  ONBOARDING_STYLES,
  PROFILE_SETUP_STYLES,
  POST_HISTORY_STYLES,
  WELCOME_STYLES,
  DASHBOARD_STYLES,
} from "./styles";

// Re-export types for convenience
export type { ProfileData, PostData, AnalysisDepth, NextAction } from "@/lib/types";
