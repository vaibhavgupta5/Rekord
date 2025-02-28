// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

// Types
interface Media {
  url: string;
  type: "image" | "video" | "other";
}

interface Author {
  _id: string;
  name: string;
  username: string;
  profileImage?: string;
  verified?: boolean;
}

interface Post {
  _id: string;
  author: Author;
  content: string;
  media?: Media[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  tags?: string[];
}

// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Components
const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div variants={itemVariants} layout>
      <Card className="overflow-hidden mb-6 border-none bg-zinc-900 shadow-lg hover:shadow-orange-900/20 transition-all duration-300">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-orange-500 ring-2 ring-black">
                <AvatarImage
                  src={post.author.profileImage || "/api/placeholder/40/40"}
                  alt={post.author.name}
                />
                <AvatarFallback className="bg-orange-900 text-orange-100">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-white">@{post.author.username}</span>
                  {post.author.verified && (
                    <Badge variant="outline" className="bg-orange-500 text-white text-[10px] px-1 py-0 h-4">
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-400">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-white transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          {post.media && post.media.length > 0 && (
            <div className="relative overflow-hidden bg-zinc-800">
              <img
                src={post.media[0].url}
                alt="Post content"
                className="w-full aspect-video object-cover"
              />
            </div>
          )}
          
          <div className="p-4 pt-3">
            <p className="text-zinc-200 text-sm md:text-base whitespace-pre-line mb-2">{post.content}</p>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="text-orange-500 text-sm hover:text-orange-400 cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <Separator className="my-3 bg-zinc-800" />
            
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className={`flex items-center gap-1.5 ${liked ? 'text-orange-500' : 'text-zinc-400'} hover:text-orange-500 transition-colors`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-orange-500' : ''}`} />
                  <span className="text-sm">{formatNumber(liked ? post.likeCount + 1 : post.likeCount)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-400 hover:text-orange-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{formatNumber(post.commentCount)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-zinc-400 hover:text-orange-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <button 
                className={`${saved ? 'text-orange-500' : 'text-zinc-400'} hover:text-orange-500 transition-colors`}
                onClick={() => setSaved(!saved)}
              >
                <Bookmark className={`h-5 w-5 ${saved ? 'fill-orange-500' : ''}`} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Skeleton loaders
const PostSkeleton = () => (
  <Card className="overflow-hidden mb-6 border-none bg-zinc-900 shadow-lg">
    <CardContent className="p-0">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-zinc-800" />
            <Skeleton className="h-3 w-24 bg-zinc-800" />
          </div>
        </div>
      </div>
      <Skeleton className="h-64 w-full bg-zinc-800" />
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-full bg-zinc-800" />
          <Skeleton className="h-4 w-2/3 bg-zinc-800" />
        </div>
        <Separator className="my-3 bg-zinc-800" />
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-16 bg-zinc-800" />
            <Skeleton className="h-5 w-16 bg-zinc-800" />
            <Skeleton className="h-5 w-8 bg-zinc-800" />
          </div>
          <Skeleton className="h-5 w-5 bg-zinc-800" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main component
export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real app, this would be an actual API call
        // const postsResponse = await fetch('/api/posts');
        // const postsData = await postsResponse.json();

        const response = await axios.get('/api/fetch/allPosts');

        console.log(response.data.posts);

      
        // Simulate network delay
        setTimeout(() => {
          setPosts(response.data.posts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with logo and navigation */}
  

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">Feed</h1>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-orange-500 text-white border-orange-500">
              Popular
            </Badge>
            <Badge variant="outline" className="bg-transparent text-zinc-400 border-zinc-700 hover:border-orange-500 cursor-pointer">
              Latest
            </Badge>
            <Badge variant="outline" className="bg-transparent text-zinc-400 border-zinc-700 hover:border-orange-500 cursor-pointer">
              Following
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}