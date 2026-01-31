"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Lightbulb,
  Calendar,
  PenTool,
  Check,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Mic,
  ThumbsUp,
  MessageCircle,
  Send,
  Trophy,
  Briefcase,
  Rocket,
  Users,
  Heart,
  BookOpen,
} from "lucide-react";
import type {
  VoiceConfig,
  SavedVoice,
  PostIdea,
  ScheduledPost,
  ContentStrategy,
} from "@/lib/types";
import { STORAGE_KEYS, getStorageItem, setStorageItem } from "@/lib/storage";
import { DASHBOARD_PAGE_STYLES, LoadingSpinner, PageHeader } from "../shared";

// ═══════════════════════════════════════════════════════════════════════════
// PRESET VOICES (Generic LinkedIn Templates)
// ═══════════════════════════════════════════════════════════════════════════

const PRESET_VOICES: SavedVoice[] = [
  {
    id: "preset-achievement",
    name: "Achievement",
    description: "For wins, awards, hackathons, competitions. Bold and celebratory.",
    hookStyle: "Bold statement",
    ctaStyle: "Thought-provoking question",
  },
  {
    id: "preset-learning",
    name: "Learning Journey",
    description: "For sharing lessons, insights, and growth moments. Reflective and genuine.",
    hookStyle: "Story opener",
    ctaStyle: "Soft ask",
  },
  {
    id: "preset-milestone",
    name: "Milestone",
    description: "100 days of code, streaks, goals reached. Inspiring and consistent.",
    hookStyle: "Statistic",
    ctaStyle: "Thought-provoking question",
    isPreset: true,
  },
  {
    id: "preset-career",
    name: "Career Update",
    description: "New job, promotion, role change. Professional and grateful.",
    hookStyle: "Bold statement",
    ctaStyle: "Soft ask",
    isPreset: true,
  },
  {
    id: "preset-project",
    name: "Project Launch",
    description: "Shipped something new. Excited and inviting feedback.",
    hookStyle: "Story opener",
    ctaStyle: "Direct action",
    isPreset: true,
  },
  {
    id: "preset-event",
    name: "Event Recap",
    description: "Conferences, meetups, networking. Energetic and connecting.",
    hookStyle: "Personal anecdote",
    ctaStyle: "Thought-provoking question",
    isPreset: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// IDEA CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════

const IDEA_CATEGORIES = [
  { id: "achievement", label: "Achievement", icon: Trophy },
  { id: "learning", label: "Learning", icon: BookOpen },
  { id: "project", label: "Project", icon: Rocket },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "story", label: "Story", icon: Heart },
  { id: "insight", label: "Insight", icon: Lightbulb },
  { id: "event", label: "Event", icon: Users },
];

// ═══════════════════════════════════════════════════════════════════════════
// STRATEGY TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const STRATEGY_TEMPLATES = [
  { id: "30days", name: "30-Day Sprint", duration: 30, postsPerWeek: 3, total: 12 },
  { id: "60days", name: "60-Day Growth", duration: 60, postsPerWeek: 4, total: 34 },
  { id: "90days", name: "90-Day Authority", duration: 90, postsPerWeek: 5, total: 64 },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CreatePostPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<"create" | "ideas" | "strategy">("create");
  
  // Voice & Intent
  const [userVoice, setUserVoice] = useState<VoiceConfig | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SavedVoice | null>(null);
  
  // Post Creation
  const [postContext, setPostContext] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Ideas
  const [ideas, setIdeas] = useState<PostIdea[]>([]);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDesc, setNewIdeaDesc] = useState("");
  const [newIdeaCategory, setNewIdeaCategory] = useState("insight");
  
  // Strategy
  const [strategies, setStrategies] = useState<ContentStrategy[]>([]);
  const [activeStrategy, setActiveStrategy] = useState<ContentStrategy | null>(null);
  const [showStrategyCreator, setShowStrategyCreator] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof STRATEGY_TEMPLATES[0] | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadData = () => {
      // Load user's Voice & Intent
      const voiceData = getStorageItem<VoiceConfig | null>(STORAGE_KEYS.voiceConfig, null);
      if (voiceData?.approved) {
        setUserVoice(voiceData);
      }
      
      // Load ideas
      const savedIdeas = getStorageItem<PostIdea[]>(STORAGE_KEYS.postIdeas, []);
      setIdeas(savedIdeas);
      
      // Load strategies
      const savedStrategies = getStorageItem<ContentStrategy[]>(STORAGE_KEYS.contentStrategies, []);
      setStrategies(savedStrategies);
      
      setIsHydrated(true);
    };
    
    loadData();
  }, []);

  // Generate post
  const generatePost = async () => {
    if (!postContext.trim() || !selectedVoice) return;
    
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    
    const context = postContext.toLowerCase();
    const voice = selectedVoice;
    
    // Generate hook based on voice hookStyle
    let hook = "";
    if (voice.hookStyle === "Bold statement") {
      if (context.includes("won") || context.includes("hackathon")) {
        hook = "I just did something I never thought possible.";
      } else if (context.includes("job") || context.includes("role")) {
        hook = "Plot twist: I said yes to the opportunity that scared me most.";
      } else {
        hook = "This changed everything for me.";
      }
    } else if (voice.hookStyle === "Story opener" || voice.hookStyle === "Personal anecdote") {
      hook = "Let me tell you about something that happened recently...";
    } else if (voice.hookStyle === "Statistic") {
      hook = context.includes("100") || context.includes("days")
        ? "Day 100. The number that changed my perspective on consistency."
        : "87% of people quit before they see results. Here's why I didn't.";
    } else if (voice.hookStyle === "Question") {
      hook = "What would you do if you had nothing to lose?";
    } else {
      hook = "Here's something I've been thinking about...";
    }
    
    // Generate body based on context
    let body = "";
    if (context.includes("hackathon") || context.includes("won") || context.includes("competition")) {
      body = `\n\nHere's the story:\n\n`;
      body += `• Spent 24 hours building something from scratch\n`;
      body += `• Collaborated with an amazing team\n`;
      body += `• Pushed through when things got tough\n`;
      body += `• ${context.includes("won") ? "And yes, we took home the win 🏆" : "Learned more than any course could teach"}\n\n`;
      body += `The real prize? The skills, connections, and confidence I gained.`;
    } else if (context.includes("job") || context.includes("role") || context.includes("career")) {
      body = `\n\nAfter much reflection, I'm thrilled to share:\n\n`;
      body += `I'm starting a new chapter in my career.\n\n`;
      body += `What this means:\n`;
      body += `→ New challenges to tackle\n`;
      body += `→ Amazing people to learn from\n`;
      body += `→ Opportunities to make an impact\n\n`;
      body += `Grateful for everyone who supported me.`;
    } else if (context.includes("100") || context.includes("days") || context.includes("streak")) {
      body = `\n\nWhen I started, I had no idea if I'd make it past day 10.\n\n`;
      body += `But here we are.\n\n`;
      body += `What I've learned:\n`;
      body += `📌 Consistency beats intensity\n`;
      body += `📌 Small wins compound\n`;
      body += `📌 The community keeps you accountable\n\n`;
      body += `This is just the beginning.`;
    } else if (context.includes("project") || context.includes("launch") || context.includes("shipped")) {
      body = `\n\nI've been working on something special.\n\n`;
      body += `After weeks of late nights, it's finally live.\n\n`;
      body += `What it does:\n`;
      body += `✅ Solves a real problem I faced\n`;
      body += `✅ Built with passion and purpose\n`;
      body += `✅ Open for feedback\n\n`;
      body += `Sometimes you just have to ship it.`;
    } else {
      body = `\n\nHere's what I've been thinking about:\n\n`;
      body += `${postContext}\n\n`;
      body += `Sometimes the biggest lessons come from unexpected places.`;
    }
    
    // Generate CTA based on voice ctaStyle
    let cta = "\n\n";
    if (voice.ctaStyle === "Thought-provoking question") {
      cta += "What's your experience with this? I'd love to hear your thoughts 👇";
    } else if (voice.ctaStyle === "Soft ask") {
      cta += "If this resonates, feel free to share your own story.";
    } else if (voice.ctaStyle === "Direct action") {
      cta += "Drop a 🔥 if you're on a similar journey. Let's connect!";
    } else {
      cta += "Thanks for reading.";
    }
    
    setGeneratedPost(hook + body + cta);
    setIsGenerating(false);
  };

  // Copy post
  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save idea
  const saveIdea = () => {
    if (!newIdeaTitle.trim()) return;
    const idea: PostIdea = {
      id: `idea-${Date.now()}`,
      title: newIdeaTitle,
      description: newIdeaDesc,
      category: newIdeaCategory,
      createdAt: new Date().toISOString(),
    };
    const updated = [...ideas, idea];
    setIdeas(updated);
    setStorageItem(STORAGE_KEYS.postIdeas, updated);
    setNewIdeaTitle("");
    setNewIdeaDesc("");
    setShowIdeaForm(false);
  };

  // Delete idea
  const deleteIdea = (id: string) => {
    const updated = ideas.filter(i => i.id !== id);
    setIdeas(updated);
    setStorageItem(STORAGE_KEYS.postIdeas, updated);
  };

  // Apply idea to post creation
  const applyIdea = (idea: PostIdea) => {
    setPostContext(`${idea.title}\n\n${idea.description}`);
    setActiveTab("create");
  };

  // Create strategy
  const createStrategy = () => {
    if (!strategyName.trim() || !selectedTemplate) return;
    
    const posts: ScheduledPost[] = [];
    const categories = ["achievement", "learning", "project", "story", "insight", "career"];
    
    for (let i = 0; i < selectedTemplate.total; i++) {
      const dayGap = Math.floor(selectedTemplate.duration / selectedTemplate.total);
      posts.push({
        id: `post-${Date.now()}-${i}`,
        day: (i + 1) * dayGap,
        title: `Post ${i + 1}`,
        category: categories[i % categories.length],
        status: "draft",
      });
    }
    
    const strategy: ContentStrategy = {
      id: `strategy-${Date.now()}`,
      name: strategyName,
      duration: selectedTemplate.duration,
      posts,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...strategies, strategy];
    setStrategies(updated);
    setStorageItem(STORAGE_KEYS.contentStrategies, updated);
    setActiveStrategy(strategy);
    setShowStrategyCreator(false);
    setStrategyName("");
    setSelectedTemplate(null);
  };

  // Update post status
  const updatePostStatus = (strategyId: string, postId: string, status: ScheduledPost["status"]) => {
    const updated = strategies.map(s => {
      if (s.id === strategyId) {
        return { ...s, posts: s.posts.map(p => p.id === postId ? { ...p, status } : p) };
      }
      return s;
    });
    setStrategies(updated);
    setStorageItem(STORAGE_KEYS.contentStrategies, updated);
    if (activeStrategy?.id === strategyId) {
      setActiveStrategy(updated.find(s => s.id === strategyId) || null);
    }
  };

  // Delete strategy
  const deleteStrategy = (id: string) => {
    const updated = strategies.filter(s => s.id !== id);
    setStrategies(updated);
    setStorageItem(STORAGE_KEYS.contentStrategies, updated);
    if (activeStrategy?.id === id) setActiveStrategy(null);
  };

  // Convert user's Voice & Intent to a SavedVoice format
  const userVoiceAsSaved: SavedVoice | null = userVoice ? {
    id: "user-voice",
    name: userVoice.toneName || "My Voice",
    description: userVoice.toneManifesto?.slice(0, 100) + "..." || "Your personalized voice & intent",
    hookStyle: userVoice.hookPreference?.[0] || "Story opener",
    ctaStyle: userVoice.ctaStyle?.[0] || "Soft ask",
  } : null;

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <style>{DASHBOARD_PAGE_STYLES}</style>

      {/* Header */}
      <PageHeader
        title="Create Post"
        description="Generate LinkedIn posts using your Voice & Intent"
        className="fade-in-1"
      />

      {/* Tabs */}
      <div className="fade-in-1 flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { id: "create", label: "Create", icon: PenTool },
          { id: "ideas", label: "Ideas", icon: Lightbulb },
          { id: "strategy", label: "Strategy", icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-md font-modern text-sm font-medium flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CREATE TAB */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "create" && (
        <div className="fade-in-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Voice Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 font-modern uppercase tracking-wide">
                Select Voice
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard/voice")}
                className="text-blue-600 hover:text-blue-700 font-modern text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                New Voice
              </Button>
            </div>

            {/* User's Voice (if exists) */}
            {userVoiceAsSaved && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-modern uppercase tracking-wider mb-2">Your Voice</p>
                <Card
                  className={`border cursor-pointer transition-all hover:shadow-md ${
                    selectedVoice?.id === userVoiceAsSaved.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedVoice(userVoiceAsSaved)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 font-modern text-sm">{userVoiceAsSaved.name}</p>
                        <p className="text-xs text-gray-500 font-modern truncate">{userVoiceAsSaved.description}</p>
                      </div>
                      {selectedVoice?.id === userVoiceAsSaved.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preset Voices */}
            <div>
              <p className="text-xs text-gray-400 font-modern uppercase tracking-wider mb-2">Preset Voices</p>
              <div className="space-y-2">
                {PRESET_VOICES.map((voice) => (
                  <Card
                    key={voice.id}
                    className={`border cursor-pointer transition-all hover:shadow-sm ${
                      selectedVoice?.id === voice.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedVoice(voice)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 font-modern text-sm">{voice.name}</p>
                          <p className="text-xs text-gray-500 font-modern mt-0.5">{voice.description}</p>
                        </div>
                        {selectedVoice?.id === voice.id && (
                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* No voice prompt */}
            {!userVoice && (
              <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
                <CardContent className="p-4 text-center">
                  <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-modern mb-2">
                    Create your personalized voice
                  </p>
                  <Button
                    size="sm"
                    onClick={() => router.push("/dashboard/voice")}
                    className="font-modern"
                  >
                    Set Up Voice & Intent
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Post Creation */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 font-modern mb-3">What happened?</h3>
                <Textarea
                  placeholder="Example: I won first place at the college AI hackathon. Built a resume analyzer using GPT-4 in 24 hours with my team of 3."
                  value={postContext}
                  onChange={(e) => setPostContext(e.target.value)}
                  className="min-h-[120px] font-modern text-sm resize-none"
                />
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500 font-modern">
                    {selectedVoice ? (
                      <span>Using: <span className="text-gray-900 font-medium">{selectedVoice.name}</span></span>
                    ) : (
                      <span className="text-amber-600">← Select a voice first</span>
                    )}
                  </div>
                  <Button
                    onClick={generatePost}
                    disabled={!postContext.trim() || !selectedVoice || isGenerating}
                    className="font-modern"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Post
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Post */}
            {generatedPost && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900 font-modern">Generated Post</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generatePost}
                        className="font-modern"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Regenerate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyPost}
                        className="font-modern"
                      >
                        {copied ? <><Check className="w-3 h-3 mr-1" /> Copied!</> : <><Copy className="w-3 h-3 mr-1" /> Copy</>}
                      </Button>
                    </div>
                  </div>

                  {/* LinkedIn Preview */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold font-modern">
                        U
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 font-modern text-sm">You</p>
                        <p className="text-xs text-gray-500 font-modern">Just now • 🌐</p>
                      </div>
                    </div>
                    
                    <div className="whitespace-pre-wrap text-sm text-gray-800 font-modern leading-relaxed mb-4">
                      {generatedPost}
                    </div>
                    
                    <div className="border-t pt-3 flex items-center gap-6 text-gray-500 text-sm font-modern">
                      <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                        <ThumbsUp className="w-4 h-4" /> Like
                      </span>
                      <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                        <MessageCircle className="w-4 h-4" /> Comment
                      </span>
                      <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                        <Send className="w-4 h-4" /> Send
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* IDEAS TAB */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "ideas" && (
        <div className="fade-in-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 font-modern uppercase tracking-wide">
              Post Ideas
            </h2>
            <Button onClick={() => setShowIdeaForm(true)} className="font-modern" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Idea
            </Button>
          </div>

          {/* Idea Form */}
          {showIdeaForm && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 font-modern mb-4">New Post Idea</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="What's your idea about?"
                    value={newIdeaTitle}
                    onChange={(e) => setNewIdeaTitle(e.target.value)}
                    className="font-modern"
                  />
                  <Textarea
                    placeholder="Add more details..."
                    value={newIdeaDesc}
                    onChange={(e) => setNewIdeaDesc(e.target.value)}
                    className="font-modern min-h-[80px]"
                  />
                  <div className="flex flex-wrap gap-2">
                    {IDEA_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setNewIdeaCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium font-modern flex items-center gap-1.5 transition-all ${
                          newIdeaCategory === cat.id
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <cat.icon className="w-3 h-3" />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveIdea} className="font-modern">Save Idea</Button>
                    <Button variant="ghost" onClick={() => setShowIdeaForm(false)} className="font-modern">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ideas List */}
          {ideas.length === 0 && !showIdeaForm ? (
            <Card className="border-dashed border-2 border-gray-200">
              <CardContent className="p-12 text-center">
                <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 font-modern mb-2">No ideas yet</h3>
                <p className="text-sm text-gray-500 font-modern mb-4">
                  Save post ideas to write about later
                </p>
                <Button onClick={() => setShowIdeaForm(true)} className="font-modern">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Your First Idea
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ideas.map((idea) => {
                const cat = IDEA_CATEGORIES.find(c => c.id === idea.category);
                const Icon = cat?.icon || Lightbulb;
                return (
                  <Card key={idea.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-600 font-modern">
                          <Icon className="w-3 h-3" />
                          {cat?.label || idea.category}
                        </span>
                        <button
                          onClick={() => deleteIdea(idea.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="font-medium text-gray-900 font-modern mb-1">{idea.title}</h3>
                      {idea.description && (
                        <p className="text-sm text-gray-500 font-modern line-clamp-2 mb-3">{idea.description}</p>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => applyIdea(idea)}
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-modern"
                      >
                        <PenTool className="w-3 h-3 mr-1" />
                        Write Post
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* STRATEGY TAB */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "strategy" && (
        <div className="fade-in-2 space-y-6">
          {!activeStrategy && !showStrategyCreator && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700 font-modern uppercase tracking-wide">
                  Content Strategies
                </h2>
                <Button onClick={() => setShowStrategyCreator(true)} className="font-modern" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  New Strategy
                </Button>
              </div>

              {strategies.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 font-modern mb-2">No strategies yet</h3>
                    <p className="text-sm text-gray-500 font-modern mb-4">
                      Create a content calendar to stay consistent
                    </p>
                    <Button onClick={() => setShowStrategyCreator(true)} className="font-modern">
                      <Plus className="w-4 h-4 mr-1" />
                      Create Strategy
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {strategies.map((strategy) => {
                    const completed = strategy.posts.filter(p => p.status === "posted").length;
                    const total = strategy.posts.length;
                    const progress = Math.round((completed / total) * 100);
                    
                    return (
                      <Card
                        key={strategy.id}
                        className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setActiveStrategy(strategy)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-500 font-modern">{strategy.duration} Days</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteStrategy(strategy.id); }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h3 className="font-medium text-gray-900 font-modern mb-2">{strategy.name}</h3>
                          <p className="text-sm text-gray-500 font-modern mb-3">
                            {completed}/{total} posts completed
                          </p>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Strategy Creator */}
          {showStrategyCreator && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <button
                  onClick={() => setShowStrategyCreator(false)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-modern text-sm mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <h2 className="text-xl font-semibold text-gray-900 font-modern mb-6">Create Content Strategy</h2>
                
                <div className="space-y-6">
                  <Input
                    placeholder="Strategy name (e.g., Q1 Growth)"
                    value={strategyName}
                    onChange={(e) => setStrategyName(e.target.value)}
                    className="font-modern"
                  />
                  
                  <div>
                    <label className="text-sm text-gray-600 font-modern mb-3 block">Choose Duration</label>
                    <div className="grid grid-cols-3 gap-4">
                      {STRATEGY_TEMPLATES.map((template) => (
                        <Card
                          key={template.id}
                          className={`cursor-pointer transition-all ${
                            selectedTemplate?.id === template.id
                              ? "border-2 border-blue-500 bg-blue-50"
                              : "border border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-gray-900 font-modern">{template.duration}</p>
                            <p className="text-xs text-gray-500 font-modern">Days</p>
                            <p className="font-medium text-gray-900 font-modern mt-2 text-sm">{template.name}</p>
                            <p className="text-xs text-gray-500 font-modern">{template.total} posts</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={createStrategy}
                    disabled={!strategyName.trim() || !selectedTemplate}
                    className="w-full font-modern"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Strategy View */}
          {activeStrategy && !showStrategyCreator && (
            <div className="space-y-4">
              <button
                onClick={() => setActiveStrategy(null)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-modern text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Strategies
              </button>
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 font-modern">{activeStrategy.name}</h2>
                  <p className="text-sm text-gray-500 font-modern">
                    {activeStrategy.duration} days • {activeStrategy.posts.length} posts
                  </p>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Draft", count: activeStrategy.posts.filter(p => p.status === "draft").length, color: "text-gray-600" },
                  { label: "Scheduled", count: activeStrategy.posts.filter(p => p.status === "scheduled").length, color: "text-amber-600" },
                  { label: "Posted", count: activeStrategy.posts.filter(p => p.status === "posted").length, color: "text-green-600" },
                ].map((stat) => (
                  <Card key={stat.label} className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                      <p className={`text-2xl font-bold font-modern ${stat.color}`}>{stat.count}</p>
                      <p className="text-xs text-gray-500 font-modern">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Posts List */}
              <div className="space-y-2">
                {activeStrategy.posts.map((post) => {
                  const cat = IDEA_CATEGORIES.find(c => c.id === post.category);
                  return (
                    <Card key={post.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-500 font-modern">D{post.day}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 font-modern text-sm">{post.title}</p>
                            <p className="text-xs text-gray-500 font-modern">{cat?.label || post.category}</p>
                          </div>
                          <select
                            value={post.status}
                            onChange={(e) => updatePostStatus(activeStrategy.id, post.id, e.target.value as ScheduledPost["status"])}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-modern border-0 ${
                              post.status === "posted"
                                ? "bg-green-100 text-green-700"
                                : post.status === "scheduled"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="posted">Posted</option>
                          </select>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
