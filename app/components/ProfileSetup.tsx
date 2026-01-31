"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfileData } from "@/lib/types";
import {
  OnboardingBackground,
  PROFILE_SETUP_STYLES,
  ProgressIndicator,
  TrustFooter,
  CheckIcon,
  UploadIcon,
} from "./shared";

// Re-export ProfileData for consumers who import from this file
export type { ProfileData } from "@/lib/types";

interface ProfileSetupProps {
  onComplete?: (data: ProfileData) => void;
  initialData?: ProfileData | null;
}

const DEFAULT_PROFILE_DATA: ProfileData = {
  name: "",
  headline: "",
  linkedinUrl: "",
  pdfFile: null,
  pdfFileName: "",
};

export default function ProfileSetup({ onComplete, initialData }: ProfileSetupProps) {
  const [formData, setFormData] = useState<ProfileData>(() => ({
    ...DEFAULT_PROFILE_DATA,
    ...initialData,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = useMemo(
    () =>
      formData.name.trim() !== "" &&
      formData.headline.trim() !== "" &&
      formData.pdfFile !== null,
    [formData.name, formData.headline, formData.pdfFile]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isFormValid) {
        onComplete?.(formData);
      }
    },
    [formData, isFormValid, onComplete]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdfFile: file, pdfFileName: file.name }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdfFile: file, pdfFileName: file.name }));
    }
  }, []);

  const handleRemovePdf = useCallback(() => {
    setFormData((prev) => ({ ...prev, pdfFile: null, pdfFileName: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{PROFILE_SETUP_STYLES}</style>

      <OnboardingBackground shapeCount={3} />

      <div className="z-10 w-full max-w-3xl px-6 py-8">
        <ProgressIndicator currentStep={1} totalSteps={3} className="fade-in-1 mb-6" />

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Let&apos;s get started
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Import your LinkedIn profile
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Left Column - PDF Upload */}
                <div className="fade-in-3 space-y-3">
                  <Label className="font-modern text-sm flex items-center gap-2">
                    LinkedIn Profile PDF
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  </Label>

                  <div
                    className={`upload-zone rounded-lg p-6 text-center cursor-pointer h-36 flex items-center justify-center ${
                      isDragging ? "dragging" : ""
                    } ${formData.pdfFile ? "has-file" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {formData.pdfFile ? (
                      <div className="space-y-1">
                        <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                          <CheckIcon size={20} stroke="#22c55e" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 font-modern">
                          {formData.pdfFileName}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePdf();
                          }}
                          className="text-xs text-red-500 hover:text-red-600 font-modern"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                          <UploadIcon size={20} stroke="#6b7280" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 font-modern">
                            Drop your LinkedIn PDF here
                          </p>
                          <p className="text-xs text-muted-foreground font-modern">
                            or click to browse
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Why PDF explanation */}
                  <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-blue-800 font-modern">
                      Why do we need your LinkedIn PDF?
                    </p>
                    <ul className="text-xs text-blue-700 font-modern space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckIcon size={12} className="mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Accuracy:</strong> Real experience, skills & education
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon size={12} className="mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>No scraping:</strong> You provide data with consent
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckIcon size={12} className="mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Privacy first:</strong> Nothing posted on your behalf
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* How to get PDF */}
                  <details className="text-xs text-muted-foreground font-modern">
                    <summary className="cursor-pointer hover:text-gray-700">
                      How do I get my LinkedIn PDF?
                    </summary>
                    <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
                      <p>1. Go to your LinkedIn profile</p>
                      <p>2. Click &quot;More&quot; button below your photo</p>
                      <p>3. Select &quot;Save to PDF&quot;</p>
                      <p>4. Upload the file here</p>
                    </div>
                  </details>
                </div>

                {/* Right Column - Form Fields */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-1 h-px bg-gray-200 md:hidden" />
                    <span className="text-xs text-muted-foreground font-modern">
                      Confirm your identity
                    </span>
                    <div className="flex-1 h-px bg-gray-200 md:hidden" />
                  </div>

                  <div className="fade-in-4 space-y-1">
                    <Label htmlFor="name" className="font-modern text-sm">
                      Full name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Priya Sharma"
                      className="h-10 font-modern"
                    />
                  </div>

                  <div className="fade-in-4 space-y-1">
                    <Label htmlFor="headline" className="font-modern text-sm">
                      Current headline or role
                    </Label>
                    <Input
                      type="text"
                      id="headline"
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      placeholder="e.g. Product Designer at Figma"
                      className="h-10 font-modern"
                    />
                  </div>

                  <div className="fade-in-4 space-y-1">
                    <Label htmlFor="linkedinUrl" className="font-modern text-sm">
                      LinkedIn profile URL
                      <span className="text-xs text-muted-foreground ml-2">(optional)</span>
                    </Label>
                    <Input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-profile"
                      className="h-10 font-modern"
                    />
                  </div>

                  <div className="fade-in-5 bg-gray-50 rounded-lg p-2.5 space-y-1">
                    <p className="text-xs font-medium text-gray-700 font-modern">
                      What happens next?
                    </p>
                    <ul className="text-xs text-gray-600 font-modern space-y-0.5">
                      <li>• We&apos;ll extract your experience, skills, and profile structure</li>
                      <li>• You&apos;ll review everything before we proceed</li>
                      <li>• Nothing shared without your approval</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="fade-in-5">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-10 font-modern font-medium"
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <TrustFooter
          message="Your data stays on your device until you choose to proceed"
          variant="lock"
          className="fade-in-5 mt-4"
        />
      </div>
    </div>
  );
}
