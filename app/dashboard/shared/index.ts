/**
 * Barrel export for dashboard shared utilities
 */

// Styles
export { DASHBOARD_PAGE_STYLES, LOADING_SPINNER_CLASSES } from "./styles";

// Components
export {
  LoadingSpinner,
  PageHeader,
  SectionHeader,
  StatCard,
  ActionCard,
  RecommendationItem,
  Chip,
  ChipSelector,
  PostPreviewCard,
  ProgressBar,
  StatusBadge,
} from "./components";

// Utilities
export {
  calculateProfileScore,
  getScoreLabel,
  calculateContentStats,
  generateHeadlineSuggestions,
  generateAboutSuggestions,
  type ScoreInfo,
  type ContentStats,
  type AboutSuggestion,
} from "./utils";

// Hooks
export { useProfileData, useDashboardAuth } from "./hooks";
