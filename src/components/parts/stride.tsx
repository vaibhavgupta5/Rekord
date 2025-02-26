// app/components/Reel.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Media {
  url: string;
  type: "image" | "video" | "other";
}

interface ReelProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    media: Media[];
    likeCount: number;
    commentCount: number;
  };
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const Reel: React.FC<ReelProps> = ({ post, onLike, onComment, onShare }) => {
  const [liked, setLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Find the first video in media array
  const videoMedia = post.media.find(item => item.type === "video");
  
  // If no video is found, use the first item regardless of type
  const mediaToShow = videoMedia || post.media[0];

  useEffect(() => {
    // Create intersection observer to detect when video is in viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 } // 60% of the element must be visible
    );

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle autoplay/pause based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden bg-black text-white rounded-lg h-full">
      <CardContent className="p-0 relative h-full">
        {/* Video Element */}
        {mediaToShow.type === "video" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full"
          >
            <video
              ref={videoRef}
              src={mediaToShow.url}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full"
          >
            <img
              src={mediaToShow.url}
              alt="Reel content"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Reels UI Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Content and interaction buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <div className="flex-1">
            {/* Author info */}
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-medium">{post.author.name}</span>
            </div>
            
            {/* Post caption */}
            <p className="text-sm opacity-90 line-clamp-2">{post.content}</p>
          </div>

          {/* Interaction buttons */}
          <div className="flex flex-col space-y-4 ml-4">
            <AnimatePresence>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                  onClick={handleLike}
                >
                  <Heart
                    className={cn("h-6 w-6", liked ? "fill-red-500 text-red-500" : "text-white")}
                  />
                </Button>
                <span className="text-xs mt-1">{liked ? post.likeCount + 1 : post.likeCount}</span>
              </motion.div>
            </AnimatePresence>

            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                onClick={onComment}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
              <span className="text-xs mt-1">{post.commentCount}</span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                onClick={onShare}
              >
                <Share2 className="h-6 w-6 text-white" />
              </Button>
              <span className="text-xs mt-1">Share</span>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reel;