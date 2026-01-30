"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Star, StarOff } from "lucide-react";
import type { PostData } from "../../components/PostHistorySetup";

// Storage keys
const STORAGE_KEYS = {
  posts: "olis_posts_data",
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

export default function PostsPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const savedPosts = safeJsonParse<PostData[]>(
      localStorage.getItem(STORAGE_KEYS.posts),
      []
    );
    if (savedPosts.length > 0) {
      setPosts(savedPosts);
    }
    setIsHydrated(true);
  }, []);

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
  };

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    ));
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

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 font-modern">
            My Posts
          </h1>
          <p className="text-gray-500 font-modern mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} • {posts.filter(p => p.isFeatured).length} featured
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="font-modern"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Button>
      </div>

      {/* Add post form */}
      {showAddForm && (
        <Card className="border-2 border-blue-200 shadow-sm">
          <CardHeader className="pb-3">
            <h3 className="text-sm font-medium text-gray-700 font-modern">New Post</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newPost" className="font-modern text-sm text-gray-600">
                Paste your LinkedIn post content
              </Label>
              <Textarea
                id="newPost"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Paste your LinkedIn post here..."
                className="mt-2 min-h-[150px] font-modern"
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
            <p className="text-gray-500 font-modern">
              No posts yet. Add your first post to get started.
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              variant="outline"
              className="mt-4 font-modern"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Card key={post.id} className="border-0 shadow-sm">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-400 font-modern">
                        Post {index + 1}
                      </span>
                      {post.isFeatured && (
                        <Badge variant="secondary" className="text-xs font-modern">
                          Featured
                        </Badge>
                      )}
                      <span className="text-xs text-gray-400 font-modern">
                        {post.content.length} chars
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-modern whitespace-pre-wrap line-clamp-4">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
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
          ))}
        </div>
      )}

      {/* Progress indicator */}
      {posts.length > 0 && posts.length < 5 && (
        <Card className="border-0 shadow-sm bg-blue-50/50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-modern">
                {posts.length < 3 
                  ? `Add ${3 - posts.length} more post${3 - posts.length > 1 ? "s" : ""} to unlock voice analysis`
                  : `Add ${5 - posts.length} more post${5 - posts.length > 1 ? "s" : ""} for full pattern detection`
                }
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`h-2 w-6 rounded-full ${
                      n <= posts.length ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
