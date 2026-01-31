// Centralized type definitions for OLIS

/**
 * Profile data structure representing a user's LinkedIn profile
 */
export interface ProfileData {
  // Core identity (read-only from PDF)
  name: string;
  fullName?: string;
  linkedinUrl: string;
  pdfFile: File | null;
  pdfFileName: string;

  // Profile sections (editable)
  headline: string;
  summary?: string;

  // Location & Industry
  location?: string;
  industry?: string;

  // Current position
  currentPosition?: string;
  currentCompany?: string;

  // Experience (array of positions)
  experience?: ExperienceEntry[];

  // Education
  education?: EducationEntry[];

  // Skills
  skills?: string[];

  // Additional sections
  languages?: LanguageEntry[];
  certifications?: CertificationEntry[];
  volunteerExperience?: VolunteerEntry[];
  publications?: PublicationEntry[];
  projects?: ProjectEntry[];
  honorsAwards?: HonorAwardEntry[];

  // Contact info
  email?: string;
  phone?: string;
  website?: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface EducationEntry {
  school: string;
  degree?: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
}

export interface LanguageEntry {
  language: string;
  proficiency?: string;
}

export interface CertificationEntry {
  name: string;
  issuer?: string;
  date?: string;
}

export interface VolunteerEntry {
  role: string;
  organization: string;
  description?: string;
}

export interface PublicationEntry {
  title: string;
  publisher?: string;
  date?: string;
}

export interface ProjectEntry {
  name: string;
  description?: string;
}

export interface HonorAwardEntry {
  title: string;
  issuer?: string;
  date?: string;
}

/**
 * Post data structure
 */
export interface PostData {
  id: string;
  content: string;
  datePosted?: string;
  engagement?: string;
  isFeatured: boolean;
  mediaDescription?: string;
  metrics?: PostMetrics;
}

export interface PostMetrics {
  likes?: number;
  comments?: number;
  reposts?: number;
  impressions?: number;
}

/**
 * Voice configuration for AI content generation
 */
export interface VoiceConfig {
  // Intent & Goals
  primaryGoal: string[];
  customPrimaryGoal: string[];
  secondaryGoals: string[];
  targetAudience: string[];
  customAudience: string[];
  audienceSeniority: string[];
  audienceAwareness: string[];
  audienceRelationship: string[];
  desiredReactions: string[];
  customReactions: string[];

  // Thinking & Expression
  thinkingStyle: string[];
  customThinkingStyle: string[];
  problemOrientation: string[];
  contentIntentRatio: ContentIntentRatio;
  emotionalBaseline: string[];
  energyLevel: string[];
  authorityExpression: string[];

  // Style & Structure
  formality: string[];
  languageComplexity: string[];
  vulnerabilityLevel: string[];
  opinionStrength: string[];
  hookPreference: string[];
  customHookPreference: string[];
  sentenceRhythm: string[];
  ctaStyle: string[];

  // Identity
  identityStatement: string;
  careerStage: string[];
  riskTolerance: string[];
  egoCalibration: string[];
  authenticityPreference: string[];
  consistencyRule: string[];

  // Boundaries
  antiVoiceRules: string[];
  customAntiVoiceRules: string[];
  comparisonSensitivity: string[];
  frequencyExpectation: string[];
  culturalContext: string[];
  customCulturalContext: string[];

  // Output
  toneName: string;
  toneManifesto: string;
  doRules: string[];
  dontRules: string[];
  approved: boolean;
}

export interface ContentIntentRatio {
  educate: number;
  inspire: number;
  entertain: number;
  promote: number;
}

/**
 * Saved voice profile for post creation
 */
export interface SavedVoice {
  id: string;
  name: string;
  description: string;
  hookStyle: string;
  ctaStyle: string;
  isPreset?: boolean;
}

/**
 * Post idea structure
 */
export interface PostIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

/**
 * Content strategy structure
 */
export interface ContentStrategy {
  id: string;
  name: string;
  duration: number;
  posts: ScheduledPost[];
  createdAt: string;
}

export interface ScheduledPost {
  id: string;
  day: number;
  title: string;
  category: string;
  status: "draft" | "scheduled" | "posted";
}

/**
 * Onboarding step types
 */
export type OnboardingStep = "welcome" | "profile-setup" | "post-history" | "confirmation" | "orientation";

/**
 * Analysis depth indicator
 */
export interface AnalysisDepth {
  level: "Strong" | "Partial" | "Limited";
  color: string;
}

/**
 * Next action recommendation
 */
export interface NextAction {
  label: string;
  action: "add-posts" | "edit-profile" | "view-insights";
  locked: boolean;
}
