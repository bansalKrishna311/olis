"use client";

import { useState } from "react";
import ConfirmationScreen from "./ConfirmationScreen";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostHistorySetupProps {
  onComplete?: (posts: string[]) => void;
  onBack?: () => void;
}

export default function PostHistorySetup({ onComplete, onBack }: PostHistorySetupProps) {
  const [posts, setPosts] = useState<string[]>([]);
  const [currentPost, setCurrentPost] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddPost = () => {
    if (currentPost.trim()) {
      setPosts((prev) => [...prev, currentPost.trim()]);
      setCurrentPost("");
    }
  };

  const handleRemovePost = (index: number) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For static demo, just show confirmation screen
    setShowConfirmation(true);
    // onComplete?.(posts);
  };

  const handleSkip = () => {
    onComplete?.([]);
  };

  if (showConfirmation) {
    return (
      <ConfirmationScreen
        profileData={undefined}
        postsCount={posts.length}
        onComplete={() => {}}
        onBack={() => setShowConfirmation(false)}
      />
    );
  }

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

        .post-item {
          animation: fadeInUp 0.3s ease-out forwards;
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
            Step 2 of 3
          </span>
        </div>

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Build your memory
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Share some of your posts
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Reassurance Text */}
              <div className="fade-in-3 bg-blue-50/80 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-700 font-modern text-center">
                  💡 Even 5–10 posts are enough to start. You can always add more later.
                </p>
              </div>

              {/* Textarea for pasting posts */}
              <div className="fade-in-3 space-y-2">
                <Label htmlFor="post" className="font-modern text-sm">
                  Paste a LinkedIn post
                </Label>
                <Textarea
                  id="post"
                  value={currentPost}
                  onChange={(e) => setCurrentPost(e.target.value)}
                  placeholder="Copy and paste the content of one of your LinkedIn posts here..."
                  className="min-h-[120px] font-modern resize-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddPost}
                  disabled={!currentPost.trim()}
                  className="w-full font-modern"
                >
                  + Add this post
                </Button>
              </div>

              {/* Added Posts */}
              {posts.length > 0 && (
                <div className="fade-in-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-modern text-sm">Added posts</Label>
                    <Badge variant="secondary" className="font-modern">
                      {posts.length} {posts.length === 1 ? "post" : "posts"}
                    </Badge>
                  </div>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className="post-item bg-gray-50 rounded-lg p-3 relative group"
                      >
                        <p className="text-sm text-gray-600 font-modern line-clamp-2 pr-8">
                          {post}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRemovePost(index)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Message */}
              <div className="fade-in-3 flex items-start gap-2 text-xs text-muted-foreground font-modern">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Your posts stay private and are only used to understand your writing style. We never share or publish your data.</span>
              </div>

              {/* Action Buttons */}
              <div className="fade-in-4 flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onBack}
                  className="font-modern"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 font-modern font-medium"
                  size="lg"
                >
                  {posts.length > 0 ? "Continue" : "Skip for now"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Helper Text */}
        <p className="fade-in-4 text-xs text-center text-muted-foreground mt-4 font-modern">
          You can complete this step partially and add more posts anytime.
        </p>
      </div>
    </div>
  );
}
