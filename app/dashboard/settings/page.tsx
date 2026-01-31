"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import type { ProfileData } from "@/lib/types";
import { STORAGE_KEYS, setStorageItem, clearAllStorageData } from "@/lib/storage";
import { DASHBOARD_PAGE_STYLES, LoadingSpinner, useProfileData } from "../shared";

type ExpandedSection = "basic" | "experience" | "education" | "skills" | "contact" | "other" | null;

export default function SettingsPage() {
  const router = useRouter();
  const { isHydrated, profileData, setProfileData } = useProfileData();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>("basic");

  // Editable fields
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [experience, setExperience] = useState<ProfileData["experience"]>([]);
  const [education, setEducation] = useState<ProfileData["education"]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [languages, setLanguages] = useState<ProfileData["languages"]>([]);
  const [certifications, setCertifications] = useState<ProfileData["certifications"]>([]);

  // Initialize form fields when profile data loads
  useEffect(() => {
    if (profileData) {
      setHeadline(profileData.headline || "");
      setSummary(profileData.summary || "");
      setLocation(profileData.location || "");
      setIndustry(profileData.industry || "");
      setCurrentPosition(profileData.currentPosition || "");
      setCurrentCompany(profileData.currentCompany || "");
      setExperience(profileData.experience || []);
      setEducation(profileData.education || []);
      setSkills(profileData.skills || []);
      setEmail(profileData.email || "");
      setPhone(profileData.phone || "");
      setWebsite(profileData.website || "");
      setLanguages(profileData.languages || []);
      setCertifications(profileData.certifications || []);
    }
  }, [profileData]);

  const handleSave = () => {
    setIsSaving(true);

    const updatedProfile: ProfileData = {
      ...profileData,
      name: profileData?.name || profileData?.fullName || "",
      fullName: profileData?.fullName,
      linkedinUrl: profileData?.linkedinUrl || "",
      pdfFile: null,
      pdfFileName: profileData?.pdfFileName || "",
      headline,
      summary,
      location,
      industry,
      currentPosition,
      currentCompany,
      experience,
      education,
      skills,
      email,
      phone,
      website,
      languages,
      certifications,
    };

    setStorageItem(STORAGE_KEYS.profile, updatedProfile);
    setProfileData(updatedProfile);

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all data? This will clear your profile and posts and take you back to onboarding.")) {
      clearAllStorageData();
      router.push("/onboarding");
    }
  };

  const addExperience = () => {
    setExperience([
      ...(experience || []),
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updated = [...(experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const removeExperience = (index: number) => {
    setExperience(experience?.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([
      ...(education || []),
      {
        school: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...(education || [])];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const removeEducation = (index: number) => {
    setEducation(education?.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  if (!isHydrated) {
    return <LoadingSpinner />;
  }

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      <style>{DASHBOARD_PAGE_STYLES}</style>

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 font-modern">
            Profile Settings
          </h1>
          <p className="text-gray-500 font-modern mt-1">
            View and edit your LinkedIn profile data extracted from your PDF
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="font-modern"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* PDF Source Info */}
      {profileData?.pdfFileName && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="py-3 px-4">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-700 font-modern">
                Data extracted from: <span className="font-medium">{profileData.pdfFileName}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BASIC INFO (Read-only fields + editable) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection("basic")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 font-modern">Basic Information</h2>
                <p className="text-xs text-gray-500 font-modern">Name, headline, about, location</p>
              </div>
            </div>
            {expandedSection === "basic" ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        
        {expandedSection === "basic" && (
          <CardContent className="space-y-4 pt-0">
            {/* Read-only fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-modern text-sm text-gray-600 flex items-center gap-2">
                  Full Name
                  <Badge variant="secondary" className="text-[10px]">Read-only</Badge>
                </Label>
                <Input
                  value={profileData?.fullName || profileData?.name || ""}
                  disabled
                  className="mt-1 font-modern bg-gray-50 cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 font-modern mt-1">
                  Extracted from LinkedIn PDF
                </p>
              </div>
              <div>
                <Label className="font-modern text-sm text-gray-600 flex items-center gap-2">
                  LinkedIn URL
                  <Badge variant="secondary" className="text-[10px]">Read-only</Badge>
                </Label>
                <Input
                  value={profileData?.linkedinUrl || ""}
                  disabled
                  className="mt-1 font-modern bg-gray-50 cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 font-modern mt-1">
                  Cannot be changed
                </p>
              </div>
            </div>

            {/* Editable fields */}
            <div>
              <Label htmlFor="headline" className="font-modern text-sm text-gray-600">
                Headline
              </Label>
              <Input
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Your professional headline"
                className="mt-1 font-modern"
              />
            </div>

            <div>
              <Label htmlFor="summary" className="font-modern text-sm text-gray-600">
                About
              </Label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Tell your professional story..."
                className="mt-1 min-h-[150px] font-modern"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="font-modern text-sm text-gray-600">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="mt-1 font-modern pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="industry" className="font-modern text-sm text-gray-600">
                  Industry
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g., Technology, Finance"
                    className="mt-1 font-modern pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentPosition" className="font-modern text-sm text-gray-600">
                  Current Position
                </Label>
                <Input
                  id="currentPosition"
                  value={currentPosition}
                  onChange={(e) => setCurrentPosition(e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="mt-1 font-modern"
                />
              </div>
              <div>
                <Label htmlFor="currentCompany" className="font-modern text-sm text-gray-600">
                  Current Company
                </Label>
                <Input
                  id="currentCompany"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                  placeholder="e.g., Google"
                  className="mt-1 font-modern"
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* EXPERIENCE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 font-modern">Experience</h2>
                <p className="text-xs text-gray-500 font-modern">
                  {experience?.length || 0} position{(experience?.length || 0) !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {expandedSection === "experience" ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        
        {expandedSection === "experience" && (
          <CardContent className="space-y-4 pt-0">
            {experience?.map((exp, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-modern">Position {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(index, "title", e.target.value)}
                      placeholder="Job Title"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Company Name"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Location</Label>
                    <Input
                      value={exp.location || ""}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                      placeholder="City, Country"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Start Date</Label>
                    <Input
                      value={exp.startDate || ""}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      placeholder="Jan 2020"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-modern text-xs text-gray-500">End Date</Label>
                    <Input
                      value={exp.current ? "Present" : (exp.endDate || "")}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      placeholder="Present"
                      disabled={exp.current}
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-modern text-xs text-gray-500">Description</Label>
                  <Textarea
                    value={exp.description || ""}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="mt-1 font-modern text-sm min-h-[80px]"
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addExperience}
              className="w-full font-modern"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardContent>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* EDUCATION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection("education")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 font-modern">Education</h2>
                <p className="text-xs text-gray-500 font-modern">
                  {education?.length || 0} entr{(education?.length || 0) !== 1 ? "ies" : "y"}
                </p>
              </div>
            </div>
            {expandedSection === "education" ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        
        {expandedSection === "education" && (
          <CardContent className="space-y-4 pt-0">
            {education?.map((edu, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-modern">Education {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Label className="font-modern text-xs text-gray-500">School</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                    placeholder="University or School Name"
                    className="mt-1 font-modern text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Degree</Label>
                    <Input
                      value={edu.degree || ""}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="e.g., Bachelor's"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Field of Study</Label>
                    <Input
                      value={edu.field || ""}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      placeholder="e.g., Computer Science"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="font-modern text-xs text-gray-500">Start Year</Label>
                    <Input
                      value={edu.startYear || ""}
                      onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                      placeholder="2016"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-modern text-xs text-gray-500">End Year</Label>
                    <Input
                      value={edu.endYear || ""}
                      onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                      placeholder="2020"
                      className="mt-1 font-modern text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addEducation}
              className="w-full font-modern"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SKILLS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection("skills")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Award className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 font-modern">Skills</h2>
                <p className="text-xs text-gray-500 font-modern">
                  {skills.length} skill{skills.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {expandedSection === "skills" ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        
        {expandedSection === "skills" && (
          <CardContent className="space-y-4 pt-0">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="font-modern text-sm py-1 px-3 flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="font-modern"
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill} variant="outline" className="font-modern">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CONTACT INFO */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm">
        <CardHeader 
          className="cursor-pointer"
          onClick={() => toggleSection("contact")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Mail className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 font-modern">Contact Information</h2>
                <p className="text-xs text-gray-500 font-modern">Email, phone, website</p>
              </div>
            </div>
            {expandedSection === "contact" ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardHeader>
        
        {expandedSection === "contact" && (
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="font-modern text-sm text-gray-600">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1 font-modern pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="font-modern text-sm text-gray-600">
                  Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="mt-1 font-modern pl-10"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="website" className="font-modern text-sm text-gray-600">
                Website
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="mt-1 font-modern pl-10"
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* DANGER ZONE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="border-0 shadow-sm border-l-4 border-l-red-400">
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900 font-modern flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-500 font-modern">
            Irreversible actions
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 font-modern">Reset All Data</p>
              <p className="text-xs text-gray-500 font-modern">
                Clear your profile and posts, start fresh with new PDF upload
              </p>
            </div>
            <Button 
              variant="destructive"
              onClick={handleResetData}
              className="font-modern"
            >
              Reset Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
