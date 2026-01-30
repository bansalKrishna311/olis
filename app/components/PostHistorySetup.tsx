"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PostData {
  content: string;
  isFeatured: boolean;
}

interface PostHistorySetupProps {
  onComplete?: (posts: PostData[]) => void;
  onBack?: () => void;
}

export default function PostHistorySetup({ onComplete, onBack }: PostHistorySetupProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPost, setCurrentPost] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleAddPost = () => {
    if (currentPost.trim()) {
      setPosts((prev) => [...prev, { content: currentPost.trim(), isFeatured }]);
      setCurrentPost("");
      setIsFeatured(false);
    }
  };

  const handleRemovePost = (index: number) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleFeatured = (index: number) => {
    setPosts((prev) => 
      prev.map((post, i) => 
        i === index ? { ...post, isFeatured: !post.isFeatured } : post
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete?.(posts);
  };

  const featuredCount = posts.filter(p => p.isFeatured).length;
  const regularCount = posts.length - featuredCount;

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

        .post-item {
          animation: fadeInUp 0.3s ease-out forwards;
        }

        .featured-badge {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 1px solid #f59e0b;
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
      <div className="z-10 w-full max-w-3xl px-6 py-8">
        {/* Progress Indicator */}
        <div className="fade-in-1 text-center mb-6">
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground font-modern">
            Step 2 of 3
          </span>
        </div>

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Your content history
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Share your LinkedIn posts
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Two column layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Post Input */}
                <div className="space-y-4">
                  {/* Purpose explanation */}
                  <div className="fade-in-3 bg-blue-50/80 border border-blue-100 rounded-lg p-3 space-y-1">
                    <p className="text-xs font-medium text-blue-800 font-modern">
                      Why share your posts?
                    </p>
                    <p className="text-xs text-blue-700 font-modern">
                      This helps us understand your voice, content themes, and engagement style.
                    </p>
                  </div>

                  {/* Textarea for pasting posts */}
                  <div className="fade-in-3 space-y-3">
                    <Label htmlFor="post" className="font-modern text-sm">
                      Paste a LinkedIn post
                    </Label>
                    <Textarea
                      id="post"
                      value={currentPost}
                      onChange={(e) => setCurrentPost(e.target.value)}
                      placeholder="Copy and paste the content of one of your LinkedIn posts here..."
                      className="min-h-[140px] font-modern resize-none"
                    />
                    
                    {/* Featured toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-600 font-modern">
                        Mark as featured post
                      </span>
                    </label>

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
                </div>

                {/* Right Column - Added Posts */}
                <div className="space-y-4">
                  {/* Recommendation */}
                  <div className="fade-in-3 flex items-start gap-3 text-sm text-gray-600 font-modern bg-amber-50/50 rounded-lg p-3">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">We recommend 5+ posts</p>
                      <p className="text-xs text-muted-foreground">
                        Even a few is a great start.
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator for posts */}
                  <div className="fade-in-4 space-y-2">
                    <div className="flex justify-between text-xs font-modern">
                      <span className="text-muted-foreground">Posts added</span>
                      <span className={posts.length >= 5 ? "text-green-600" : "text-gray-600"}>
                        {posts.length} / 5 recommended
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          posts.length >= 5 ? "bg-green-500" : "bg-blue-400"
                        }`}
                        style={{ width: `${Math.min((posts.length / 5) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Added Posts */}
                  {posts.length > 0 ? (
                    <div className="fade-in-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="font-modern text-sm">Added posts</Label>
                        <div className="flex gap-2">
                          {featuredCount > 0 && (
                            <Badge variant="secondary" className="font-modern text-amber-700 bg-amber-100">
                              {featuredCount} featured
                            </Badge>
                          )}
                          <Badge variant="secondary" className="font-modern">
                            {posts.length} total
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2">
                        {posts.map((post, index) => (
                          <div
                            key={index}
                            className={`post-item rounded-lg p-3 relative group ${
                              post.isFeatured ? "bg-amber-50 border border-amber-200" : "bg-gray-50"
                            }`}
                          >
                            {post.isFeatured && (
                              <span className="text-[10px] uppercase tracking-wider text-amber-600 font-medium font-modern">
                                Featured
                              </span>
                            )}
                            <p className="text-sm text-gray-600 font-modern line-clamp-2 pr-12">
                              {post.content}
                            </p>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handleToggleFeatured(index)}
                                className={`p-1 rounded ${post.isFeatured ? "text-amber-500" : "text-gray-400 hover:text-amber-500"}`}
                                title={post.isFeatured ? "Remove from featured" : "Mark as featured"}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={post.isFeatured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemovePost(index)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="fade-in-3 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground font-modern">No posts added yet</p>
                      <p className="text-xs text-muted-foreground font-modern mt-1">Paste your first post on the left</p>
                    </div>
                  )}

                  {/* Safety Message */}
                  <div className="fade-in-4 flex items-start gap-2 text-xs text-muted-foreground font-modern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Posts are only used to understand your style. Never shared externally.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="fade-in-5 flex gap-3 pt-2">
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
        <p className="fade-in-5 text-xs text-center text-muted-foreground mt-4 font-modern">
          You can always add more posts later. This step improves recommendations but isn't mandatory.
        </p>
      </div>
    </div>
  );
}
