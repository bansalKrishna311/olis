"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileSetupProps {
  onComplete?: (data: ProfileData) => void;
}

interface ProfileData {
  name: string;
  headline: string;
  linkedinUrl: string;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    headline: "",
    linkedinUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete?.(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name.trim() !== "" && formData.headline.trim() !== "";

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

        /* Abstract floating shapes */
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
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.03);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-1 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; opacity: 0; }
        .fade-in-2 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; opacity: 0; }
        .fade-in-3 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }

        /* Grain overlay */
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
      <div className="z-10 w-full max-w-md px-6">
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
              Tell us about yourself
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="fade-in-3 space-y-2">
                <Label htmlFor="name" className="font-modern text-sm">
                  Your name
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
              <div className="fade-in-3 space-y-2">
                <Label htmlFor="headline" className="font-modern text-sm">
                  Your current headline or role
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
              <div className="fade-in-3 space-y-2">
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
                  className="h-11 font-modern"
                />
              </div>

              {/* Submit Button */}
              <div className="fade-in-4 pt-2">
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

        {/* Helper Text */}
        <p className="fade-in-4 text-xs text-center text-muted-foreground mt-4 font-modern">
          This helps us personalize your experience. You can change this later.
        </p>
      </div>
    </div>
  );
}
