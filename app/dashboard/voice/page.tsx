"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Target,
  Users,
  MessageSquare,
  Brain,
  Palette,
  Zap,
  Shield,
  Sparkles,
  Edit3,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = "olis_voice_config";

interface VoiceConfig {
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
  thinkingStyle: string[];
  customThinkingStyle: string[];
  problemOrientation: string[];
  contentIntentRatio: { educate: number; inspire: number; entertain: number; promote: number; engage: number };
  emotionalBaseline: string[];
  energyLevel: string[];
  authorityExpression: string[];
  vulnerabilityLevel: string[];
  formality: string[];
  languageComplexity: string[];
  sentenceRhythm: string[];
  hookPreference: string[];
  customHookPreference: string[];
  ctaStyle: string[];
  opinionStrength: string[];
  identityStatement: string;
  egoCalibration: string[];
  authenticityPreference: string[];
  culturalContext: string[];
  customCulturalContext: string[];
  careerStage: string[];
  riskTolerance: string[];
  frequencyExpectation: string[];
  antiVoiceRules: string[];
  customAntiVoiceRules: string[];
  comparisonSensitivity: string[];
  consistencyRule: string[];
  toneName: string;
  toneManifesto: string;
  doRules: string[];
  dontRules: string[];
  approved: boolean;
}

const DEFAULT_CONFIG: VoiceConfig = {
  primaryGoal: [],
  customPrimaryGoal: [],
  secondaryGoals: [],
  targetAudience: [],
  customAudience: [],
  audienceSeniority: [],
  audienceAwareness: [],
  audienceRelationship: [],
  desiredReactions: [],
  customReactions: [],
  thinkingStyle: [],
  customThinkingStyle: [],
  problemOrientation: [],
  contentIntentRatio: { educate: 30, inspire: 25, entertain: 15, promote: 10, engage: 20 },
  emotionalBaseline: [],
  energyLevel: [],
  authorityExpression: [],
  vulnerabilityLevel: [],
  formality: [],
  languageComplexity: [],
  sentenceRhythm: [],
  hookPreference: [],
  customHookPreference: [],
  ctaStyle: [],
  opinionStrength: [],
  identityStatement: "",
  egoCalibration: [],
  authenticityPreference: [],
  culturalContext: [],
  customCulturalContext: [],
  careerStage: [],
  riskTolerance: [],
  frequencyExpectation: [],
  antiVoiceRules: [],
  customAntiVoiceRules: [],
  comparisonSensitivity: [],
  consistencyRule: [],
  toneName: "",
  toneManifesto: "",
  doRules: [],
  dontRules: [],
  approved: false,
};

// ═══════════════════════════════════════════════════════════════════════════
// OPTIONS DATA
// ═══════════════════════════════════════════════════════════════════════════

const OPTIONS = {
  primaryGoal: ["Get a job", "Get referrals", "Build authority", "Grow network", "Get clients", "Launch product", "Share knowledge", "Build community"],
  secondaryGoals: ["Thought leadership", "Personal brand", "Industry influence", "Speaking opportunities", "Mentorship", "Collaboration"],
  targetAudience: ["Founders", "Engineers", "Designers", "Marketers", "Product Managers", "Executives", "Students", "Career changers", "Recruiters", "Investors"],
  audienceSeniority: ["Junior (0-2 yrs)", "Mid-level (3-5 yrs)", "Senior (6-10 yrs)", "Leadership (10+ yrs)", "Mixed levels"],
  audienceAwareness: ["Unaware of problem", "Problem-aware", "Solution-aware", "Product-aware", "Highly sophisticated"],
  audienceRelationship: ["Peer to peer", "Mentor to mentee", "Expert to learner", "Insider to outsider", "Fellow traveler"],
  desiredReactions: ["Save for later", "Share with others", "Comment & discuss", "DM for more", "Follow me", "Visit my profile", "Think differently", "Take action"],
  thinkingStyle: ["Analytical", "Creative", "Strategic", "Practical", "Philosophical", "Data-driven", "Intuitive", "Systems-thinking"],
  problemOrientation: ["Root cause analysis", "Quick solutions", "Framework building", "Pattern recognition", "First principles", "Experimentation"],
  emotionalBaseline: ["Calm & grounded", "Energetic & passionate", "Warm & empathetic", "Direct & confident", "Curious & exploratory", "Thoughtful & measured"],
  energyLevel: ["Low-key & subtle", "Moderate & balanced", "High-energy & bold", "Variable by topic"],
  authorityExpression: ["Humble expert", "Confident leader", "Curious learner", "Experienced guide", "Industry insider"],
  vulnerabilityLevel: ["None - purely professional", "Light - occasional lessons", "Moderate - failures & growth", "High - raw & authentic"],
  formality: ["Casual & conversational", "Professional but warm", "Formal & polished", "Adaptive to topic"],
  languageComplexity: ["Simple & accessible", "Moderate depth", "Technical when needed", "Expert-level"],
  sentenceRhythm: ["Short & punchy", "Flowing & narrative", "Mixed rhythm", "List-heavy"],
  hookPreference: ["Bold statement", "Question", "Story opener", "Statistic", "Contrarian take", "Personal anecdote", "Pattern interrupt"],
  ctaStyle: ["Soft ask", "Direct action", "Thought-provoking question", "No CTA", "Resource offer"],
  opinionStrength: ["Neutral - present all sides", "Moderate - gentle stance", "Strong - clear position", "Provocative - challenge norms"],
  egoCalibration: ["Low - insight over self", "Balanced - self as example", "High - personal brand focus"],
  authenticityPreference: ["Raw & unpolished", "Authentic but edited", "Polished & refined"],
  culturalContext: ["Global/Universal", "Western/US-centric", "European", "Asian", "Regional specific"],
  careerStage: ["Early career", "Mid-career", "Senior/Expert", "Founder/Leader", "Career transitioner"],
  riskTolerance: ["Conservative - safe topics", "Moderate - some edge", "Bold - controversial ok", "Fearless - no limits"],
  frequencyExpectation: ["Daily poster", "Few times/week", "Weekly", "Occasional"],
  antiVoiceRules: ["Salesy", "Preachy", "Humble-brag", "Generic", "Clickbait", "Virtue signaling", "Jargon-heavy", "Self-promotional", "Negative/Complaining"],
  comparisonSensitivity: ["Never compare", "Industry benchmarks ok", "Competitor mentions ok", "Direct comparisons ok"],
  consistencyRule: ["Strict - same tone always", "Flexible - topic-based", "Evolving - growth ok"],
};

// ═══════════════════════════════════════════════════════════════════════════
// STEP DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

interface Step {
  id: string;
  part: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  { id: "goals", part: 1, title: "Your Goals", subtitle: "Why do you post on LinkedIn?", icon: Target },
  { id: "audience", part: 1, title: "Your Audience", subtitle: "Who do you want to reach?", icon: Users },
  { id: "reactions", part: 1, title: "Desired Outcome", subtitle: "What should readers do?", icon: MessageSquare },
  { id: "thinking", part: 2, title: "Thinking Style", subtitle: "How do you process ideas?", icon: Brain },
  { id: "content-mix", part: 2, title: "Content Mix", subtitle: "Balance your content types", icon: Palette },
  { id: "tone", part: 3, title: "Emotional Tone", subtitle: "How should your posts feel?", icon: Zap },
  { id: "style", part: 3, title: "Writing Style", subtitle: "How do you express yourself?", icon: Edit3 },
  { id: "structure", part: 3, title: "Post Structure", subtitle: "How do you open and close?", icon: MessageSquare },
  { id: "identity", part: 4, title: "Your Identity", subtitle: "Define who you are", icon: Shield },
  { id: "boundaries", part: 4, title: "Voice Boundaries", subtitle: "What you'll never do", icon: AlertCircle },
  { id: "generate", part: 4, title: "Your Voice", subtitle: "Review & approve", icon: Sparkles },
];

const PART_INFO: Record<number, { name: string; color: string }> = {
  1: { name: "Intent", color: "#3b82f6" },
  2: { name: "Mindset", color: "#8b5cf6" },
  3: { name: "Expression", color: "#f59e0b" },
  4: { name: "Identity", color: "#10b981" },
};

// ═══════════════════════════════════════════════════════════════════════════
// CHIP COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
}

function Chip({ label, selected, onClick, variant = "default" }: ChipProps) {
  const colorClasses = variant === "danger"
    ? selected
      ? "bg-red-50 border-red-400 text-red-700 shadow-sm"
      : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50/50"
    : selected
      ? "bg-blue-50 border-blue-400 text-blue-700 shadow-sm"
      : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50";

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${colorClasses}`}
    >
      {label}
      {selected && <Check className="h-3.5 w-3.5" />}
    </button>
  );
}

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  customValues?: string[];
  onAddCustom?: (value: string) => void;
  onRemoveCustom?: (value: string) => void;
  variant?: "default" | "danger";
}

function ChipSelector({
  options,
  selected,
  onToggle,
  customValues = [],
  onAddCustom,
  onRemoveCustom,
  variant = "default",
}: ChipSelectorProps) {
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    if (customInput.trim() && onAddCustom && !customValues.includes(customInput.trim())) {
      onAddCustom(customInput.trim());
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => onToggle(option)}
            variant={variant}
          />
        ))}
        {customValues.map((value) => (
          <span
            key={value}
            className={`px-3 py-1.5 rounded-full border text-sm font-medium flex items-center gap-1.5 ${
              variant === "danger"
                ? "bg-red-50 border-red-400 text-red-700"
                : "bg-blue-50 border-blue-400 text-blue-700"
            }`}
          >
            {value}
            <Check className="h-3.5 w-3.5" />
            {onRemoveCustom && (
              <button onClick={() => onRemoveCustom(value)} className="ml-0.5 hover:opacity-60">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </span>
        ))}
      </div>
      {onAddCustom && (
        <div className="flex gap-2 max-w-xs">
          <Input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
            placeholder="Add your own..."
            className="h-9 text-sm"
          />
          <Button onClick={handleAddCustom} size="sm" variant="outline" className="h-9 px-3">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function VoicePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<VoiceConfig>(DEFAULT_CONFIG);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        if (parsed.approved) setShowOutput(true);
      } catch {
        // Use default
      }
    }
    setIsHydrated(true);
  }, []);

  const saveConfig = (updates: Partial<VoiceConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const toggleValue = (field: keyof VoiceConfig, value: string) => {
    const current = config[field] as string[];
    if (current.includes(value)) {
      saveConfig({ [field]: current.filter((v) => v !== value) });
    } else {
      saveConfig({ [field]: [...current, value] });
    }
  };

  const addCustom = (field: keyof VoiceConfig, value: string) => {
    const current = config[field] as string[];
    if (!current.includes(value)) {
      saveConfig({ [field]: [...current, value] });
    }
  };

  const removeCustom = (field: keyof VoiceConfig, value: string) => {
    const current = config[field] as string[];
    saveConfig({ [field]: current.filter((v) => v !== value) });
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (index: number) => setCurrentStep(index);

  const generateVoice = () => {
    const toneWords = [...config.emotionalBaseline, ...config.authorityExpression, ...config.thinkingStyle].slice(0, 3);
    const toneName = toneWords.length > 0
      ? `The ${toneWords.map((w) => w.split(" ")[0]).join(" ")} Voice`
      : "Your Unique Voice";

    const goal = config.primaryGoal[0] || "share insights";
    const audience = config.targetAudience.slice(0, 2).join(" and ") || "professionals";
    const style = config.thinkingStyle[0] || "thoughtful";
    const emotion = config.emotionalBaseline[0] || "balanced";

    const manifesto = `I write on LinkedIn to ${goal.toLowerCase()}. My content is crafted for ${audience}. My thinking is ${style.toLowerCase()}, and my posts carry a ${emotion.toLowerCase()} energy.\n\nEvery post I create serves my audience first. I don't write to impress—I write to connect, to clarify, and to contribute.`;

    const doRules = [
      config.primaryGoal[0] ? `Align every post with: ${config.primaryGoal[0]}` : null,
      config.emotionalBaseline[0] ? `Maintain ${config.emotionalBaseline[0].toLowerCase()} tone` : null,
      config.thinkingStyle[0] ? `Lead with ${config.thinkingStyle[0].toLowerCase()} thinking` : null,
      config.hookPreference[0] ? `Open with ${config.hookPreference[0].toLowerCase()} hooks` : null,
      "Write for your specific audience",
      "End posts with clear value",
    ].filter(Boolean) as string[];

    const dontRules = [
      ...config.antiVoiceRules.map((r) => `Never sound ${r.toLowerCase()}`),
      ...config.customAntiVoiceRules.map((r) => `Never sound ${r.toLowerCase()}`),
      "Never sacrifice clarity for cleverness",
      "Don't write generic content",
    ].slice(0, 8);

    saveConfig({ toneName, toneManifesto: manifesto, doRules, dontRules });
  };

  const approveVoice = () => {
    saveConfig({ approved: true });
    setShowOutput(true);
  };

  const resetVoice = () => {
    if (confirm("Reset voice configuration? This cannot be undone.")) {
      setConfig(DEFAULT_CONFIG);
      localStorage.removeItem(STORAGE_KEY);
      setCurrentStep(0);
      setShowOutput(false);
    }
  };

  const step = STEPS[currentStep];
  const partInfo = PART_INFO[step?.part];
  const stepsInPart = STEPS.filter((s) => s.part === step?.part);
  const stepIndexInPart = stepsInPart.findIndex((s) => s.id === step?.id);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // OUTPUT VIEW
  // ═══════════════════════════════════════════════════════════════════════════

  if (showOutput && config.toneName) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap'); .font-modern { font-family: 'Sora', sans-serif; }`}</style>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-modern">Your Voice System</h1>
            <p className="text-gray-500 font-modern text-sm mt-1">AI will use this for all content</p>
          </div>
          <Button onClick={() => setShowOutput(false)} variant="outline" size="sm" className="font-modern">
            <Edit3 className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
          <CardContent className="p-8 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
            <div className="relative">
              <p className="text-white/60 text-xs uppercase tracking-widest font-modern mb-2">Your Voice</p>
              <h2 className="text-4xl font-bold font-modern">{config.toneName}</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-modern mb-4">Manifesto</h3>
            <p className="text-gray-700 font-modern leading-relaxed whitespace-pre-line text-lg">{config.toneManifesto}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide font-modern mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                DO
              </h3>
              <ul className="space-y-2.5">
                {config.doRules.map((rule, i) => (
                  <li key={i} className="text-sm text-green-800 font-modern flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-rose-50">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wide font-modern mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="h-4 w-4 text-white" />
                </div>
                DON'T
              </h3>
              <ul className="space-y-2.5">
                {config.dontRules.map((rule, i) => (
                  <li key={i} className="text-sm text-red-800 font-modern flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-md">
          <CardContent className="p-5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-modern mb-3">Profile Summary</h3>
            <div className="flex flex-wrap gap-2">
              {config.targetAudience.slice(0, 4).map((a, i) => (
                <Badge key={i} variant="secondary" className="font-modern text-xs">{a}</Badge>
              ))}
              {config.primaryGoal.slice(0, 2).map((g, i) => (
                <Badge key={i} className="bg-blue-100 text-blue-700 font-modern text-xs">{g}</Badge>
              ))}
              {config.thinkingStyle.slice(0, 2).map((s, i) => (
                <Badge key={i} className="bg-purple-100 text-purple-700 font-modern text-xs">{s}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {config.approved ? (
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <p className="text-green-700 font-modern font-semibold">Voice Approved & Active</p>
            </div>
            <Button onClick={resetVoice} variant="ghost" className="w-full font-modern text-gray-400 hover:text-red-500">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset & Start Over
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button onClick={approveVoice} className="flex-1 font-modern h-12 text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <Check className="h-5 w-5 mr-2" /> Approve Voice
            </Button>
            <Button onClick={generateVoice} variant="outline" className="font-modern h-12 px-6">
              <RotateCcw className="h-4 w-4 mr-2" /> Regenerate
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // STEP CONTENT RENDERER
  // ═══════════════════════════════════════════════════════════════════════════

  const renderStepContent = () => {
    switch (step?.id) {
      case "goals":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">Primary Goal — Why are you on LinkedIn?</h3>
              <ChipSelector
                options={OPTIONS.primaryGoal}
                selected={config.primaryGoal}
                onToggle={(v) => toggleValue("primaryGoal", v)}
                customValues={config.customPrimaryGoal}
                onAddCustom={(v) => addCustom("customPrimaryGoal", v)}
                onRemoveCustom={(v) => removeCustom("customPrimaryGoal", v)}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">Secondary Goals (Optional)</h3>
              <ChipSelector
                options={OPTIONS.secondaryGoals}
                selected={config.secondaryGoals}
                onToggle={(v) => toggleValue("secondaryGoals", v)}
              />
            </div>
          </div>
        );

      case "audience":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">Who do you want to reach?</h3>
              <ChipSelector
                options={OPTIONS.targetAudience}
                selected={config.targetAudience}
                onToggle={(v) => toggleValue("targetAudience", v)}
                customValues={config.customAudience}
                onAddCustom={(v) => addCustom("customAudience", v)}
                onRemoveCustom={(v) => removeCustom("customAudience", v)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Seniority Level</h3>
                <ChipSelector
                  options={OPTIONS.audienceSeniority}
                  selected={config.audienceSeniority}
                  onToggle={(v) => toggleValue("audienceSeniority", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Awareness Level</h3>
                <ChipSelector
                  options={OPTIONS.audienceAwareness}
                  selected={config.audienceAwareness}
                  onToggle={(v) => toggleValue("audienceAwareness", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Your Relationship</h3>
                <ChipSelector
                  options={OPTIONS.audienceRelationship}
                  selected={config.audienceRelationship}
                  onToggle={(v) => toggleValue("audienceRelationship", v)}
                />
              </div>
            </div>
          </div>
        );

      case "reactions":
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">What should readers do after reading your posts?</h3>
            <ChipSelector
              options={OPTIONS.desiredReactions}
              selected={config.desiredReactions}
              onToggle={(v) => toggleValue("desiredReactions", v)}
              customValues={config.customReactions}
              onAddCustom={(v) => addCustom("customReactions", v)}
              onRemoveCustom={(v) => removeCustom("customReactions", v)}
            />
          </div>
        );

      case "thinking":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">How do you naturally think?</h3>
              <ChipSelector
                options={OPTIONS.thinkingStyle}
                selected={config.thinkingStyle}
                onToggle={(v) => toggleValue("thinkingStyle", v)}
                customValues={config.customThinkingStyle}
                onAddCustom={(v) => addCustom("customThinkingStyle", v)}
                onRemoveCustom={(v) => removeCustom("customThinkingStyle", v)}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">How do you approach problems?</h3>
              <ChipSelector
                options={OPTIONS.problemOrientation}
                selected={config.problemOrientation}
                onToggle={(v) => toggleValue("problemOrientation", v)}
              />
            </div>
          </div>
        );

      case "content-mix":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 font-modern">Content Intent Distribution</h3>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                Object.values(config.contentIntentRatio).reduce((a, b) => a + b, 0) === 100
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                Total: {Object.values(config.contentIntentRatio).reduce((a, b) => a + b, 0)}%
              </span>
            </div>
            <div className="space-y-5">
              {Object.entries(config.contentIntentRatio).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 font-modern capitalize">{key}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) =>
                          saveConfig({
                            contentIntentRatio: { ...config.contentIntentRatio, [key]: parseInt(e.target.value) || 0 },
                          })
                        }
                        className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-900 w-10 text-right">{value}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "tone":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">Emotional Baseline — How should your posts feel?</h3>
              <ChipSelector
                options={OPTIONS.emotionalBaseline}
                selected={config.emotionalBaseline}
                onToggle={(v) => toggleValue("emotionalBaseline", v)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Energy Level</h3>
                <ChipSelector
                  options={OPTIONS.energyLevel}
                  selected={config.energyLevel}
                  onToggle={(v) => toggleValue("energyLevel", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Authority Expression</h3>
                <ChipSelector
                  options={OPTIONS.authorityExpression}
                  selected={config.authorityExpression}
                  onToggle={(v) => toggleValue("authorityExpression", v)}
                />
              </div>
            </div>
          </div>
        );

      case "style":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Formality Level</h3>
                <ChipSelector
                  options={OPTIONS.formality}
                  selected={config.formality}
                  onToggle={(v) => toggleValue("formality", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Language Complexity</h3>
                <ChipSelector
                  options={OPTIONS.languageComplexity}
                  selected={config.languageComplexity}
                  onToggle={(v) => toggleValue("languageComplexity", v)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Vulnerability Level</h3>
                <ChipSelector
                  options={OPTIONS.vulnerabilityLevel}
                  selected={config.vulnerabilityLevel}
                  onToggle={(v) => toggleValue("vulnerabilityLevel", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Opinion Strength</h3>
                <ChipSelector
                  options={OPTIONS.opinionStrength}
                  selected={config.opinionStrength}
                  onToggle={(v) => toggleValue("opinionStrength", v)}
                />
              </div>
            </div>
          </div>
        );

      case "structure":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">Hook Preference — How do you open posts?</h3>
              <ChipSelector
                options={OPTIONS.hookPreference}
                selected={config.hookPreference}
                onToggle={(v) => toggleValue("hookPreference", v)}
                customValues={config.customHookPreference}
                onAddCustom={(v) => addCustom("customHookPreference", v)}
                onRemoveCustom={(v) => removeCustom("customHookPreference", v)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Sentence Rhythm</h3>
                <ChipSelector
                  options={OPTIONS.sentenceRhythm}
                  selected={config.sentenceRhythm}
                  onToggle={(v) => toggleValue("sentenceRhythm", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Call-to-Action Style</h3>
                <ChipSelector
                  options={OPTIONS.ctaStyle}
                  selected={config.ctaStyle}
                  onToggle={(v) => toggleValue("ctaStyle", v)}
                />
              </div>
            </div>
          </div>
        );

      case "identity":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Complete this statement:</h3>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 font-modern mb-2 italic">"On LinkedIn, I am someone who...</p>
                <Textarea
                  value={config.identityStatement}
                  onChange={(e) => saveConfig({ identityStatement: e.target.value })}
                  placeholder="...shares lessons from building products, helping others avoid the mistakes I made."
                  className="min-h-[100px] font-modern text-base border-0 bg-transparent resize-none focus:ring-0 p-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Career Stage</h3>
                <ChipSelector
                  options={OPTIONS.careerStage}
                  selected={config.careerStage}
                  onToggle={(v) => toggleValue("careerStage", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Risk Tolerance</h3>
                <ChipSelector
                  options={OPTIONS.riskTolerance}
                  selected={config.riskTolerance}
                  onToggle={(v) => toggleValue("riskTolerance", v)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Ego Calibration</h3>
                <ChipSelector
                  options={OPTIONS.egoCalibration}
                  selected={config.egoCalibration}
                  onToggle={(v) => toggleValue("egoCalibration", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Polish Level</h3>
                <ChipSelector
                  options={OPTIONS.authenticityPreference}
                  selected={config.authenticityPreference}
                  onToggle={(v) => toggleValue("authenticityPreference", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Consistency</h3>
                <ChipSelector
                  options={OPTIONS.consistencyRule}
                  selected={config.consistencyRule}
                  onToggle={(v) => toggleValue("consistencyRule", v)}
                />
              </div>
            </div>
          </div>
        );

      case "boundaries":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-4">
                Your voice should <span className="text-red-600 font-bold">NEVER</span> sound like this:
              </h3>
              <ChipSelector
                options={OPTIONS.antiVoiceRules}
                selected={config.antiVoiceRules}
                onToggle={(v) => toggleValue("antiVoiceRules", v)}
                customValues={config.customAntiVoiceRules}
                onAddCustom={(v) => addCustom("customAntiVoiceRules", v)}
                onRemoveCustom={(v) => removeCustom("customAntiVoiceRules", v)}
                variant="danger"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Comparison Sensitivity</h3>
                <ChipSelector
                  options={OPTIONS.comparisonSensitivity}
                  selected={config.comparisonSensitivity}
                  onToggle={(v) => toggleValue("comparisonSensitivity", v)}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Posting Frequency</h3>
                <ChipSelector
                  options={OPTIONS.frequencyExpectation}
                  selected={config.frequencyExpectation}
                  onToggle={(v) => toggleValue("frequencyExpectation", v)}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 font-modern mb-3">Cultural Context</h3>
              <ChipSelector
                options={OPTIONS.culturalContext}
                selected={config.culturalContext}
                onToggle={(v) => toggleValue("culturalContext", v)}
                customValues={config.customCulturalContext}
                onAddCustom={(v) => addCustom("customCulturalContext", v)}
                onRemoveCustom={(v) => removeCustom("customCulturalContext", v)}
              />
            </div>
          </div>
        );

      case "generate":
        if (!config.toneName) generateVoice();
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl border border-blue-100">
              <p className="text-xs text-gray-500 uppercase tracking-widest font-modern mb-2">Generated Voice</p>
              <h3 className="text-3xl font-bold text-gray-900 font-modern">{config.toneName || "Generating..."}</h3>
            </div>

            <div className="p-5 bg-gray-50 rounded-xl">
              <p className="text-gray-700 font-modern leading-relaxed whitespace-pre-line">{config.toneManifesto}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase mb-3 font-modern flex items-center gap-2">
                  <Check className="h-4 w-4" /> DO
                </p>
                <ul className="space-y-2">
                  {config.doRules.slice(0, 5).map((r, i) => (
                    <li key={i} className="text-sm text-green-800 font-modern">• {r}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs font-bold text-red-700 uppercase mb-3 font-modern flex items-center gap-2">
                  <X className="h-4 w-4" /> DON'T
                </p>
                <ul className="space-y-2">
                  {config.dontRules.slice(0, 5).map((r, i) => (
                    <li key={i} className="text-sm text-red-800 font-modern">• {r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
              <p className="text-sm text-gray-500 font-modern italic">
                "This tool doesn't write posts. It builds a thinking system for you."
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap'); .font-modern { font-family: 'Sora', sans-serif; }`}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-modern">Voice & Intent System</h1>
        <p className="text-gray-500 font-modern mt-1">Build your personal LinkedIn voice</p>
      </div>

      {/* Part Progress */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((part) => {
            const info = PART_INFO[part];
            const isActive = step?.part === part;
            const isComplete = step?.part > part;
            const partSteps = STEPS.filter((s) => s.part === part);
            const completedInPart = isComplete ? partSteps.length : isActive ? stepIndexInPart : 0;

            return (
              <div key={part} className="flex-1">
                <button
                  onClick={() => {
                    const firstStepInPart = STEPS.findIndex((s) => s.part === part);
                    if (firstStepInPart >= 0) goToStep(firstStepInPart);
                  }}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    isActive
                      ? "border-blue-500 bg-blue-50"
                      : isComplete
                      ? "border-green-200 bg-green-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? "text-white" : isComplete ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                      style={{ backgroundColor: isActive ? info.color : undefined }}
                    >
                      {isComplete ? <Check className="h-3.5 w-3.5" /> : part}
                    </div>
                    <span className={`text-sm font-semibold font-modern ${isActive ? "text-gray-900" : isComplete ? "text-green-700" : "text-gray-400"}`}>
                      {info.name}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {partSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < completedInPart
                            ? isComplete
                              ? "bg-green-400"
                              : "bg-blue-400"
                            : i === completedInPart && isActive
                            ? "bg-blue-400"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Card */}
      <Card className="border-0 shadow-xl mb-6 overflow-hidden">
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, ${partInfo?.color}10 0%, ${partInfo?.color}05 100%)` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: `${partInfo?.color}20` }}
          >
            {step && <step.icon className="h-7 w-7" style={{ color: partInfo?.color }} />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider font-modern">
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs font-medium uppercase tracking-wider font-modern" style={{ color: partInfo?.color }}>
                Part {step?.part}: {partInfo?.name}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 font-modern">{step?.title}</h2>
            <p className="text-sm text-gray-500 font-modern">{step?.subtitle}</p>
          </div>
        </div>

        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="font-modern h-12 px-6 text-base"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep ? "w-6 bg-blue-500" : i < currentStep ? "bg-blue-300" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={approveVoice}
            className="font-modern h-12 px-8 text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Check className="h-5 w-5 mr-2" />
            Approve Voice
          </Button>
        ) : (
          <Button onClick={nextStep} className="font-modern h-12 px-6 text-base">
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
