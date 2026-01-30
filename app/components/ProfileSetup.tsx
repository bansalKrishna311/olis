"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileSetupProps {
  onComplete?: (data: ProfileData) => void;
}

export interface ProfileData {
  name: string;
  headline: string;
  linkedinUrl: string;
  pdfFile: File | null;
  pdfFileName: string;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    headline: "",
    linkedinUrl: "",
    pdfFile: null,
    pdfFileName: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete?.(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdfFile: file, pdfFileName: file.name }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdfFile: file, pdfFileName: file.name }));
    }
  };

  const handleRemovePdf = () => {
    setFormData((prev) => ({ ...prev, pdfFile: null, pdfFileName: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isFormValid = 
    formData.name.trim() !== "" && 
    formData.headline.trim() !== "" && 
    formData.pdfFile !== null;

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .setup-bg {
          background: linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf5ff 100%);
        }

        .font-modern {
          font-family: 'Sora', sans-serif;
        }

        .abstract-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
          top: -80px;
          right: -80px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 280px;
          height: 280px;
          background: linear-gradient(135deg, #fecaca 0%, #fcd6bb 100%);
          bottom: -40px;
          left: -40px;
          animation-delay: -2s;
        }

        .shape-3 {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 100%);
          top: 50%;
          left: 5%;
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-in-1 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }
        .fade-in-5 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }

        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .upload-zone {
          border: 2px dashed #d1d5db;
          transition: all 0.2s ease;
        }

        .upload-zone:hover {
          border-color: #a5b4fc;
          background: rgba(165, 180, 252, 0.05);
        }

        .upload-zone.dragging {
          border-color: #818cf8;
          background: rgba(129, 140, 248, 0.1);
        }

        .upload-zone.has-file {
          border-color: #22c55e;
          border-style: solid;
          background: rgba(34, 197, 94, 0.05);
        }
      `}</style>

      {/* Gradient Background */}
      <div className="absolute inset-0 setup-bg"></div>

      {/* Abstract floating shapes */}
      <div className="abstract-shape shape-1"></div>
      <div className="abstract-shape shape-2"></div>
      <div className="abstract-shape shape-3"></div>

      {/* Grain texture */}
      <div className="grain-overlay"></div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-lg px-6 py-8">
        {/* Progress Indicator */}
        <div className="fade-in-1 text-center mb-6">
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground font-modern">
            Step 1 of 3
          </span>
        </div>

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Let's get started
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Import your LinkedIn profile
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* PDF Upload Zone - Primary */}
              <div className="fade-in-3 space-y-3">
                <Label className="font-modern text-sm flex items-center gap-2">
                  LinkedIn Profile PDF
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Required</span>
                </Label>
                
                <div
                  className={`upload-zone rounded-lg p-6 text-center cursor-pointer ${
                    isDragging ? "dragging" : ""
                  } ${formData.pdfFile ? "has-file" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {formData.pdfFile ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700 font-modern">{formData.pdfFileName}</p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRemovePdf(); }}
                        className="text-xs text-red-500 hover:text-red-600 font-modern"
                      >
                        Remove and upload a different file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 font-modern">
                          Drop your LinkedIn PDF here
                        </p>
                        <p className="text-xs text-muted-foreground font-modern mt-1">
                          or click to browse
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Why PDF explanation */}
                <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-medium text-blue-800 font-modern">
                    Why do we need your LinkedIn PDF?
                  </p>
                  <ul className="text-xs text-blue-700 font-modern space-y-1.5">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span><strong>Accuracy:</strong> We get your real experience, skills & education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span><strong>No scraping:</strong> You provide the data yourself, with full consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span><strong>Privacy first:</strong> Nothing is posted or accessed on your behalf</span>
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
                    <p>2. Click the "More" button below your photo</p>
                    <p>3. Select "Save to PDF"</p>
                    <p>4. Upload the downloaded file here</p>
                  </div>
                </details>
              </div>

              {/* Divider */}
              <div className="fade-in-3 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-muted-foreground font-modern">Confirm your identity</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Name Field */}
              <div className="fade-in-4 space-y-2">
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
                  className="h-11 font-modern"
                />
              </div>

              {/* Headline Field */}
              <div className="fade-in-4 space-y-2">
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
                  className="h-11 font-modern"
                />
              </div>

              {/* LinkedIn URL Field */}
              <div className="fade-in-4 space-y-2">
                <Label htmlFor="linkedinUrl" className="font-modern text-sm">
                  LinkedIn profile URL
                  <span className="text-xs text-muted-foreground ml-2">(optional, for reference)</span>
                </Label>
                <Input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="h-11 font-modern"
                />
              </div>

              {/* What happens next */}
              <div className="fade-in-5 bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-xs font-medium text-gray-700 font-modern">What happens next?</p>
                <ul className="text-xs text-gray-600 font-modern space-y-1">
                  <li>• We'll extract your experience, skills, and profile structure</li>
                  <li>• You'll be able to review everything before we proceed</li>
                  <li>• Nothing is shared or posted without your explicit approval</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="fade-in-5 pt-2">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full h-11 font-modern font-medium"
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust footer */}
        <div className="fade-in-5 flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4 font-modern">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Your data stays on your device until you choose to proceed</span>
        </div>
      </div>
    </div>
  );
}
