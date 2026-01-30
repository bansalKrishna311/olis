"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Star, 
  StarOff, 
  FileText, 
  PenLine,
  ArrowLeft,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Copy,
  RotateCcw
} from "lucide-react";
import type { PostData } from "../../components/PostHistorySetup";

// Storage keys
const STORAGE_KEYS = {
  posts: "olis_posts_data",
  profile: "olis_profile_data",
};

// Helper to safely parse JSON from localStorage
function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Simple post analysis (rule-based)
function analyzePost(content: string): { 
  strengths: string[]; 
  improvements: string[];
  score: number;
} {
  const strengths: string[] = [];
  const improvements: string[] = [];
  let score = 50;

  // Length analysis
  if (content.length > 500 && content.length < 1500) {
    strengths.push("Good length for engagement");
    score += 10;
  } else if (content.length < 100) {
    improvements.push("Consider adding more substance");
    score -= 10;
  } else if (content.length > 2000) {
    improvements.push("Consider breaking into multiple posts");
  }

  // Structure analysis
  if (content.includes("\n\n")) {
    strengths.push("Good use of whitespace");
    score += 5;
  } else {
    improvements.push("Add line breaks for readability");
  }

  // Hook analysis (first line)
  const firstLine = content.split("\n")[0];
  if (firstLine && firstLine.length < 100 && firstLine.length > 20) {
    strengths.push("Concise opening hook");
    score += 10;
  }

  // CTA analysis
  const hasQuestion = content.includes("?");
  const hasCTA = content.toLowerCase().includes("comment") || 
                 content.toLowerCase().includes("share") ||
                 content.toLowerCase().includes("thoughts");
  if (hasQuestion || hasCTA) {
    strengths.push("Includes engagement prompt");
    score += 10;
  } else {
    improvements.push("Add a question or call-to-action");
  }

  // Emoji check
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
  if (emojiRegex.test(content)) {
    strengths.push("Uses visual elements");
  }

  return { 
    strengths, 
    improvements, 
    score: Math.min(100, Math.max(0, score))
  };
}

type ViewMode = "list" | "create";

export default function PostsPage() {
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  
  // Create mode state
  const [draftContent, setDraftContent] = useState("");
  const [postGoal, setPostGoal] = useState("");

  useEffect(() => {
    const savedPosts = safeJsonParse<PostData[]>(
      localStorage.getItem(STORAGE_KEYS.posts),
      []
    );
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }
    
    // Check if opened in create mode
    const mode = searchParams.get("mode");
    if (mode === "create") {
      setViewMode("create");
    }
    
    setIsHydrated(true);
  }, [searchParams]);

  // Persist posts changes
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(posts));
  }, [posts, isHydrated]);

  const handleAddPost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: PostData = {
      id: Date.now().toString(),
      content: newPostContent.trim(),
      isFeatured: false,
    };
    
    setPosts([...posts, newPost]);
    setNewPostContent("");
    setShowAddForm(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    if (expandedPostId === id) setExpandedPostId(null);
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftContent);
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

        .font-modern {
          font-family: 'Sora', sans-serif;
        }
      `}</style>

      {/* Mode Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-modern transition-all ${
              viewMode === "list"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            My Posts
          </button>
          <button
            onClick={() => setViewMode("create")}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-modern transition-all ${
              viewMode === "create"
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PenLine className="h-4 w-4 inline mr-2" />
            Create New Post
          </button>
        </div>
        
        {viewMode === "list" && (
          <Button 
            onClick={() => setShowAddForm(true)}
            size="sm"
            variant="outline"
            className="font-modern"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Existing Post
          </Button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MY POSTS VIEW */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {viewMode === "list" && (
        <>
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 font-modern">
              My Posts
            </h1>
            <p className="text-gray-500 font-modern mt-1">
              Understand what you have already done. {posts.length} post{posts.length !== 1 ? "s" : ""} • {posts.filter(p => p.isFeatured).length} featured
            </p>
          </div>

          {/* Add post form */}
          {showAddForm && (
            <Card className="border-2 border-blue-200 shadow-sm">
              <CardHeader className="pb-3">
                <h3 className="text-sm font-medium text-gray-700 font-modern">Add Existing Post</h3>
                <p className="text-xs text-gray-500 font-modern">
                  Paste a LinkedIn post you have already published
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    id="newPost"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Paste your LinkedIn post here..."
                    className="min-h-[150px] font-modern"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setNewPostContent("");
                    }}
                    className="font-modern"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddPost}
                    disabled={!newPostContent.trim()}
                    className="font-modern"
                  >
                    Add Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts list */}
          {posts.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-modern mb-2">
                  No posts yet
                </p>
                <p className="text-sm text-gray-400 font-modern mb-4">
                  Add your published LinkedIn posts to analyze your content patterns
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  className="font-modern"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post, index) => {
                const analysis = analyzePost(post.content);
                const isExpanded = expandedPostId === post.id;
                
                return (
                  <Card key={post.id} className="border-0 shadow-sm">
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-400 font-modern">
                              Post {index + 1}
                            </span>
                            {post.isFeatured && (
                              <Badge variant="secondary" className="text-xs font-modern">
                                Featured
                              </Badge>
                            )}
                            <span className={`text-xs font-modern px-2 py-0.5 rounded-full ${
                              analysis.score >= 70 ? "bg-green-100 text-green-700" :
                              analysis.score >= 50 ? "bg-amber-100 text-amber-700" :
                              "bg-gray-100 text-gray-600"
                            }`}>
                              Score: {analysis.score}
                            </span>
                          </div>
                          
                          {/* Content preview */}
                          <p className={`text-sm text-gray-700 font-modern whitespace-pre-wrap ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}>
                            {post.content}
                          </p>
                          
                          {/* Expand/Collapse */}
                          {post.content.length > 200 && (
                            <button
                              onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                              className="text-xs text-blue-600 font-modern mt-2 hover:underline"
                            >
                              {isExpanded ? "Show less" : "Show more"}
                            </button>
                          )}

                          {/* Analysis (when expanded) */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-medium text-gray-500 font-modern mb-2 flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                  Strengths
                                </p>
                                <ul className="space-y-1">
                                  {analysis.strengths.length > 0 ? analysis.strengths.map((s, i) => (
                                    <li key={i} className="text-xs text-gray-600 font-modern flex items-start gap-1">
                                      <span className="text-green-500">•</span>
                                      {s}
                                    </li>
                                  )) : (
                                    <li className="text-xs text-gray-400 font-modern">No strengths identified</li>
                                  )}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 font-modern mb-2 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3 text-amber-500" />
                                  Improvements
                                </p>
                                <ul className="space-y-1">
                                  {analysis.improvements.length > 0 ? analysis.improvements.map((s, i) => (
                                    <li key={i} className="text-xs text-gray-600 font-modern flex items-start gap-1">
                                      <span className="text-amber-500">•</span>
                                      {s}
                                    </li>
                                  )) : (
                                    <li className="text-xs text-gray-400 font-modern">Looking good!</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleFeatured(post.id)}
                            className="h-8 w-8"
                            title={post.isFeatured ? "Remove from featured" : "Mark as featured"}
                          >
                            {post.isFeatured ? (
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            ) : (
                              <StarOff className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePost(post.id)}
                            className="h-8 w-8 text-gray-400 hover:text-red-500"
                            title="Delete post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CREATE POST VIEW */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {viewMode === "create" && (
        <>
          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 font-modern">
              Create New Post
            </h1>
            <p className="text-gray-500 font-modern mt-1">
              Help me write my next LinkedIn post
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left: Composer */}
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 font-modern">Post Goal</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {["Share insight", "Tell a story", "Announce something", "Ask a question", "Share a win"].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setPostGoal(goal)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium font-modern transition-all ${
                          postGoal === goal
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700 font-modern">Draft</h3>
                    <span className="text-xs text-gray-400 font-modern">
                      {draftContent.length} characters
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    placeholder="Start writing your post..."
                    className="min-h-[300px] font-modern"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDraftContent("")}
                      disabled={!draftContent}
                      className="font-modern"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCopyDraft}
                      disabled={!draftContent}
                      className="font-modern"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Analysis & Tips */}
            <div className="space-y-4">
              {draftContent.length > 20 ? (
                <>
                  {/* Live Analysis */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <h3 className="text-sm font-medium text-gray-700 font-modern flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        Live Analysis
                      </h3>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const analysis = analyzePost(draftContent);
                        return (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 font-modern">Estimated Score</span>
                              <span className={`text-lg font-semibold font-modern ${
                                analysis.score >= 70 ? "text-green-600" :
                                analysis.score >= 50 ? "text-amber-600" :
                                "text-gray-600"
                              }`}>
                                {analysis.score}/100
                              </span>
                            </div>
                            
                            {analysis.strengths.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-green-600 font-modern mb-1">
                                  ✓ Strengths
                                </p>
                                <ul className="space-y-1">
                                  {analysis.strengths.map((s, i) => (
                                    <li key={i} className="text-xs text-gray-600 font-modern">• {s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {analysis.improvements.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-amber-600 font-modern mb-1">
                                  ⚡ Consider
                                </p>
                                <ul className="space-y-1">
                                  {analysis.improvements.map((s, i) => (
                                    <li key={i} className="text-xs text-gray-600 font-modern">• {s}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-0 shadow-sm bg-gray-50">
                  <CardContent className="py-8 text-center">
                    <Lightbulb className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 font-modern">
                      Start writing to see live analysis
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Writing Tips */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <h3 className="text-sm font-medium text-gray-700 font-modern flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Quick Tips
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-xs text-gray-600 font-modern">
                    <li>• Start with a hook in the first line</li>
                    <li>• Use whitespace — break up long paragraphs</li>
                    <li>• End with a question to boost comments</li>
                    <li>• Keep it under 1,300 characters for full visibility</li>
                    <li>• Be authentic — write like you talk</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
