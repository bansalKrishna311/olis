/**
 * Shared storage utilities for OLIS
 * Centralized localStorage keys and helper functions
 */

// ═══════════════════════════════════════════════════════════════════════════
// STORAGE KEYS
// ═══════════════════════════════════════════════════════════════════════════

export const STORAGE_KEYS = {
  step: "olis_current_step",
  profile: "olis_profile_data",
  posts: "olis_posts_data",
  onboardingComplete: "olis_onboarding_complete",
  voiceConfig: "olis_voice_config",
  postIdeas: "olis_post_ideas",
  contentStrategies: "olis_content_strategies",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Safely parse JSON from localStorage
 * Returns fallback value if parsing fails or value is null
 */
export function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * Get a value from localStorage with type safety
 */
export function getStorageItem<T>(key: StorageKey, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return safeJsonParse(localStorage.getItem(key), fallback);
}

/**
 * Set a value in localStorage with automatic JSON serialization
 */
export function setStorageItem<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove a value from localStorage
 */
export function removeStorageItem(key: StorageKey): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

/**
 * Clear all OLIS-related data from localStorage
 */
export function clearAllStorageData(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

/**
 * Check if onboarding is complete
 */
export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.onboardingComplete) === "true";
}

/**
 * Mark onboarding as complete
 */
export function setOnboardingComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.onboardingComplete, "true");
}
