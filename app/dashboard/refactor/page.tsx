"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Check,
  Edit3,
  Target,
  Briefcase,
  User,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ProfileData } from "@/lib/types";
import { STORAGE_KEYS, setStorageItem } from "@/lib/storage";
import {
  DASHBOARD_PAGE_STYLES,
  LoadingSpinner,
  PageHeader,
  generateHeadlineSuggestions,
  generateAboutSuggestions,
  useProfileData,
} from "../shared";

type RefactorSection = "headline" | "about" | "experience" | null;

export default function RefactorPage() {
  const { isHydrated, profileData, setProfileData } = useProfileData();
  const [activeSection, setActiveSection] = useState<RefactorSection>(null);
  const [optimizationGoal, setOptimizationGoal] = useState<string>("");

  // Editable states
  const [editedHeadline, setEditedHeadline] = useState("");
  const [editedAbout, setEditedAbout] = useState("");

  // Initialize editable values when profile data loads
  useEffect(() => {
    if (profileData) {
      setEditedHeadline(profileData.headline || "");
      setEditedAbout(profileData.summary || "");
    }
  }, [profileData]);

  const handleSaveSection = (section: RefactorSection) => {
    if (!profileData) return;

    const updatedProfile: ProfileData = {
      ...profileData,
      headline: section === "headline" ? editedHeadline : profileData.headline,
      summary: section === "about" ? editedAbout : profileData.summary,
    };

    setStorageItem(STORAGE_KEYS.profile, updatedProfile);
    setProfileData(updatedProfile);
    setActiveSection(null);
  };

  const handleAcceptSuggestion = (section: RefactorSection, suggestion: string) => {
    if (section === "headline") {
      setEditedHeadline(suggestion);
    } else if (section === "about") {
      setEditedAbout(suggestion);
    }
  };

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  const headlineSuggestions = generateHeadlineSuggestions(profileData?.headline || "");
  const aboutSuggestions = generateAboutSuggestions(profileData?.summary || "");

  return (
    <div className="space-y-6">
      <style>{DASHBOARD_PAGE_STYLES}</style>

      {/* Header */}
      <PageHeader
        title="Profile Refactor"
        description="Improve your profile section by section. We suggest, you decide."
        className="fade-in"
      />

      {/* Optimization Goal */}
      <Card className="fade-in border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 font-modern mb-2">
                What are you optimizing for?
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Job Search", "Freelance/Consulting", "Personal Brand", "Thought Leadership", "Networking"].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setOptimizationGoal(goal)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium font-modern transition-all ${
                      optimizationGoal === goal
                        ? "bg-purple-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Refactor Sections */}
      <div className="space-y-4">
        {/* Headline Section */}
        <Card className={`border-0 shadow-sm transition-all ${activeSection === "headline" ? "ring-2 ring-purple-500" : ""}`}>
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setActiveSection(activeSection === "headline" ? null : "headline")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-modern">Headline</h3>
                  <p className="text-xs text-gray-500 font-modern">
                    {profileData?.headline ? `${profileData.headline.length} characters` : "Not set"}
                  </p>
                </div>
              </div>
              {activeSection === "headline" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          
          {activeSection === "headline" && (
            <CardContent className="pt-0 space-y-4">
              {/* Current Value */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide">
                  Current
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-modern">
                    {profileData?.headline || "No headline set"}
                  </p>
                </div>
              </div>

              {/* Editable */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide">
                  Edit Headline
                </Label>
                <Input
                  value={editedHeadline}
                  onChange={(e) => setEditedHeadline(e.target.value)}
                  placeholder="Enter your headline..."
                  className="mt-1 font-modern"
                />
                <p className="text-xs text-gray-400 font-modern mt-1">
                  {editedHeadline.length}/220 characters
                </p>
              </div>

              {/* Suggestions */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Suggestions
                </Label>
                <div className="mt-2 space-y-2">
                  {headlineSuggestions.map((suggestion, i) => (
                    <div 
                      key={i}
                      className="p-3 bg-purple-50 rounded-lg border border-purple-100 flex items-start justify-between gap-3"
                    >
                      <p className="text-sm text-gray-700 font-modern flex-1">
                        {suggestion}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAcceptSuggestion("headline", suggestion)}
                        className="shrink-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditedHeadline(profileData?.headline || "");
                    setActiveSection(null);
                  }}
                  className="font-modern"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSaveSection("headline")}
                  className="font-modern"
                  disabled={editedHeadline === profileData?.headline}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* About Section */}
        <Card className={`border-0 shadow-sm transition-all ${activeSection === "about" ? "ring-2 ring-purple-500" : ""}`}>
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setActiveSection(activeSection === "about" ? null : "about")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Edit3 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-modern">About Section</h3>
                  <p className="text-xs text-gray-500 font-modern">
                    {profileData?.summary ? `${profileData.summary.length} characters` : "Not set"}
                  </p>
                </div>
              </div>
              {activeSection === "about" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          
          {activeSection === "about" && (
            <CardContent className="pt-0 space-y-4">
              {/* Current Value */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide">
                  Current
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                  <p className="text-sm text-gray-700 font-modern whitespace-pre-wrap">
                    {profileData?.summary || "No about section set"}
                  </p>
                </div>
              </div>

              {/* Editable */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide">
                  Edit About
                </Label>
                <Textarea
                  value={editedAbout}
                  onChange={(e) => setEditedAbout(e.target.value)}
                  placeholder="Write your about section..."
                  className="mt-1 font-modern min-h-[150px]"
                />
                <p className="text-xs text-gray-400 font-modern mt-1">
                  {editedAbout.length}/2,600 characters
                </p>
              </div>

              {/* Suggestions */}
              <div>
                <Label className="text-xs text-gray-500 font-modern uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Suggestions
                </Label>
                <div className="mt-2 space-y-2">
                  {aboutSuggestions.map((item, i) => (
                    <div 
                      key={i}
                      className="p-3 bg-purple-50 rounded-lg border border-purple-100"
                    >
                      <p className="text-sm text-gray-700 font-modern whitespace-pre-wrap">
                        {item.suggestion}
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-100">
                        <p className="text-xs text-purple-600 font-modern">
                          💡 {item.rationale}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAcceptSuggestion("about", item.suggestion)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditedAbout(profileData?.summary || "");
                    setActiveSection(null);
                  }}
                  className="font-modern"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleSaveSection("about")}
                  className="font-modern"
                  disabled={editedAbout === profileData?.summary}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Experience Section */}
        <Card className={`border-0 shadow-sm transition-all ${activeSection === "experience" ? "ring-2 ring-purple-500" : ""}`}>
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setActiveSection(activeSection === "experience" ? null : "experience")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 font-modern">Experience Bullets</h3>
                  <p className="text-xs text-gray-500 font-modern">Improve your role descriptions</p>
                </div>
              </div>
              {activeSection === "experience" ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardHeader>
          
          {activeSection === "experience" && (
            <CardContent className="pt-0 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <Briefcase className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-modern">
                  Experience data will be extracted from your LinkedIn PDF
                </p>
                <p className="text-xs text-gray-400 font-modern mt-1">
                  Upload your profile PDF in Settings to enable this feature
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Trust Note */}
      <Card className="border-0 shadow-sm bg-gray-50">
        <CardContent className="py-4 px-5">
          <div className="flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-purple-500 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600 font-modern">
              <span className="font-medium">We never auto-change your profile.</span> All suggestions are just that — suggestions. 
              You review, edit, and decide what to copy back to LinkedIn.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
