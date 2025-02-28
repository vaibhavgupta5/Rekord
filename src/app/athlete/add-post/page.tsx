"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, SendHorizontal, ImagePlus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");
  const [athleteId, setAthleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get athlete info from localStorage
    if (typeof window !== "undefined") {
      const athleteData = localStorage.getItem("athlete");
      if (athleteData) {
        const athlete = JSON.parse(athleteData);
        setAthleteId(athlete._id);
      } else {
        // Redirect if not authenticated
        toast("Authentication required", {
          description: "Please login to create a post",
        });
        router.push("/login");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim() === "") {
      toast("Error", {
        description: "Post content cannot be empty",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/createPost", {
        content, media, athleteId,
      });
      if (response.data.success) {
        toast("Success", {
          description: "Post created successfully",
        });
        router.push("/athlete/home");
      } else {
        toast("Error", {
          description: "Failed to create post",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIContent = async () => {
    if (content.trim() === "") {
      toast("Error", {
        description: "Please provide some initial text to generate content from",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generateContent", {
        prompt: content,
      });
      
      if (response.data.text) {
        // Append the generated content to existing content with spacing
        setContent(prev => prev.trim() + "\n\n" + response.data.text.trim());
        toast("Success", {
          description: "AI content generated successfully",
        });
      } else {
        toast("Error", {
          description: "Failed to generate content",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Failed to generate AI content",
      });
      console.error("Error generating AI content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black border-orange-500 text-white shadow-lg shadow-orange-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-orange-500">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="content" className="text-orange-400">What's on your mind?</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateAIContent}
                    disabled={isGenerating}
                    className="border-orange-500 text-orange-500 hover:bg-orange-950"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, achievements or updates..."
                  className="min-h-32 bg-black border-orange-500 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500"
                />
              </div>
              <Separator className="bg-orange-800/50" />
              <div className="space-y-2">
                <Label htmlFor="media" className="text-orange-400">Add Media (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="media"
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                    placeholder="Add image URL (optional)"
                    className="bg-black border-orange-500 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-950"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              {media && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-md overflow-hidden border border-orange-500"
                >
                  {/* Preview container with fixed height */}
                  <div className="w-full h-64 bg-gray-900 relative">
                    <img
                      src={media}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-orange-500 border border-orange-500"
                    onClick={() => setMedia("")}
                  >
                    Remove
                  </Button>
                </motion.div>
              )}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-orange-500 text-orange-500 hover:bg-orange-950"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}