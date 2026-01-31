"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PostData } from "@/lib/types";
import {
  OnboardingBackground,
  POST_HISTORY_STYLES,
  ProgressIndicator,
  ProgressBar,
  TrustFooter,
  StarIcon,
  XIcon,
  ImageIcon,
} from "./shared";

// Re-export PostData for consumers who import from this file
export type { PostData } from "@/lib/types";

interface PostHistorySetupProps {
  onComplete?: (posts: PostData[]) => void;
  onBack?: () => void;
  initialPosts?: PostData[];
}

const RECOMMENDED_POST_COUNT = 5;

export default function PostHistorySetup({
  onComplete,
  onBack,
  initialPosts = [],
}: PostHistorySetupProps) {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);
  const [currentPost, setCurrentPost] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [mediaDescription, setMediaDescription] = useState("");
  const [hasMedia, setHasMedia] = useState(false);

  const featuredCount = useMemo(
    () => posts.filter((p) => p.isFeatured).length,
    [posts]
  );

  const resetForm = useCallback(() => {
    setCurrentPost("");
    setIsFeatured(false);
    setMediaDescription("");
    setHasMedia(false);
  }, []);

  const handleAddPost = useCallback(() => {
    if (!currentPost.trim()) return;

    const newPost: PostData = {
      id: Date.now().toString(),
      content: currentPost.trim(),
      isFeatured,
      mediaDescription: hasMedia ? mediaDescription.trim() : undefined,
    };

    setPosts((prev) => [...prev, newPost]);
    resetForm();
  }, [currentPost, isFeatured, hasMedia, mediaDescription, resetForm]);

  const handleRemovePost = useCallback((index: number) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleToggleFeatured = useCallback((index: number) => {
    setPosts((prev) =>
      prev.map((post, i) => (i === index ? { ...post, isFeatured: !post.isFeatured } : post))
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onComplete?.(posts);
    },
    [posts, onComplete]
  );

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden relative">
      <style>{POST_HISTORY_STYLES}</style>

      <OnboardingBackground shapeCount={3} />

      <div className="z-10 w-full max-w-3xl px-6 py-4">
        <ProgressIndicator currentStep={2} totalSteps={3} />

        <Card className="fade-in-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 pt-4">
            <CardDescription className="text-xs uppercase tracking-widest font-modern">
              Your content history
            </CardDescription>
            <CardTitle className="text-2xl font-medium tracking-tight font-modern">
              Share your LinkedIn posts
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Left Column - Post Input */}
                <div className="space-y-3">
                  <div className="fade-in-3 bg-blue-50/80 border border-blue-100 rounded-lg p-2.5 space-y-1">
                    <p className="text-xs font-medium text-blue-800 font-modern">
                      Why share your posts?
                    </p>
                    <p className="text-xs text-blue-700 font-modern">
                      This helps us understand your voice, content themes, and engagement style.
                    </p>
                  </div>

                  <div className="fade-in-3 space-y-2">
                    <Label htmlFor="post" className="font-modern text-sm">
                      Paste a LinkedIn post
                    </Label>
                    <Textarea
                      id="post"
                      value={currentPost}
                      onChange={(e) => setCurrentPost(e.target.value)}
                      placeholder="Copy and paste the content of one of your LinkedIn posts here..."
                      className="min-h-[100px] font-modern resize-none"
                    />

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasMedia}
                          onChange={(e) => setHasMedia(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 font-modern">
                          Post has photos/videos
                        </span>
                      </label>

                      {hasMedia && (
                        <Textarea
                          value={mediaDescription}
                          onChange={(e) => setMediaDescription(e.target.value)}
                          placeholder="Describe the image/video (e.g., 'Screenshot of dashboard metrics', 'Team photo at conference')..."
                          className="min-h-[60px] font-modern resize-none text-sm"
                        />
                      )}
                    </div>

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
                <div className="space-y-3">
                  <div className="fade-in-3 flex items-start gap-2 text-sm text-gray-600 font-modern bg-amber-50/50 rounded-lg p-2.5">
                    <span className="text-base">💡</span>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">
                        We recommend {RECOMMENDED_POST_COUNT}+ posts
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Even a few is a great start.
                      </p>
                    </div>
                  </div>

                  <ProgressBar
                    current={posts.length}
                    max={RECOMMENDED_POST_COUNT}
                    label="Posts added"
                    className="fade-in-4"
                  />

                  {posts.length > 0 ? (
                    <div className="fade-in-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-modern text-sm">Added posts</Label>
                        <div className="flex gap-2">
                          {featuredCount > 0 && (
                            <Badge
                              variant="secondary"
                              className="font-modern text-amber-700 bg-amber-100"
                            >
                              {featuredCount} featured
                            </Badge>
                          )}
                          <Badge variant="secondary" className="font-modern">
                            {posts.length} total
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-[180px] overflow-y-auto posts-scroll pr-1">
                        {posts.map((post, index) => (
                          <div
                            key={post.id}
                            className={`post-item rounded-lg p-2.5 relative group ${
                              post.isFeatured
                                ? "bg-amber-50 border border-amber-200"
                                : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {post.isFeatured && (
                                <span className="text-[10px] uppercase tracking-wider text-amber-600 font-medium font-modern">
                                  Featured
                                </span>
                              )}
                              {post.mediaDescription && (
                                <span className="text-[10px] uppercase tracking-wider text-blue-600 font-medium font-modern flex items-center gap-1">
                                  <ImageIcon size={10} />
                                  Media
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 font-modern line-clamp-2 pr-10">
                              {post.content}
                            </p>

                            {post.mediaDescription && (
                              <p className="text-xs text-blue-600 font-modern mt-1 line-clamp-1">
                                📷 {post.mediaDescription}
                              </p>
                            )}

                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => handleToggleFeatured(index)}
                                className={`p-1 rounded ${
                                  post.isFeatured
                                    ? "text-amber-500"
                                    : "text-gray-400 hover:text-amber-500"
                                }`}
                                title={
                                  post.isFeatured ? "Remove from featured" : "Mark as featured"
                                }
                              >
                                <StarIcon filled={post.isFeatured} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemovePost(index)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <XIcon size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="fade-in-3 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground font-modern">
                        No posts added yet
                      </p>
                      <p className="text-xs text-muted-foreground font-modern mt-1">
                        Paste your first post on the left
                      </p>
                    </div>
                  )}

                  <TrustFooter
                    message="Posts are only used to understand your style."
                    variant="lock"
                    className="fade-in-4"
                  />
                </div>
              </div>

              <div className="fade-in-5 flex gap-3">
                <Button type="button" variant="ghost" onClick={onBack} className="font-modern">
                  Back
                </Button>
                <Button type="submit" className="flex-1 h-10 font-modern font-medium" size="lg">
                  {posts.length > 0 ? "Continue" : "Skip for now"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="fade-in-5 text-xs text-center text-muted-foreground mt-3 font-modern">
          You can always add more posts later.
        </p>
      </div>
    </div>
  );
}
