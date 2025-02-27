// app/athletes/[athleteId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, TrophyIcon, BarChart3Icon, ShareIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

// Define types based on your API response
interface Athlete {
  _id: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  location: string;
  profileImage: string;
  bio: string;
  career: {
    sport: string;
    level: string;
    activeYears: {
      from: string;
      to: string;
    };
  };
  stats: {
    totalMatches: number;
    achievements: string[];
    rankings: {
      category: string;
      rank: number;
      date: string;
    }[];
  };
}

// Mock Posts data since the API doesn't provide it
interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  date: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just finished an amazing training session! Ready for the upcoming tournament. #GameDay #Basketball",
    imageUrl: "/api/placeholder/600/400",
    likes: 352,
    comments: 48,
    date: "2025-02-15T14:30:00Z"
  },
  {
    id: "2",
    content: "Reflecting on our team's journey this season. So proud of what we've accomplished together!",
    likes: 218,
    comments: 23,
    date: "2025-02-10T09:45:00Z"
  },
  {
    id: "3",
    content: "New sponsorship announcement coming soon! Stay tuned for some exciting news this week.",
    imageUrl: "/api/placeholder/600/400",
    likes: 489,
    comments: 76,
    date: "2025-02-05T16:20:00Z"
  }
];

export default function AthletePage() {
  const { athleteId } = useParams();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAthleteData() {
      try {
        const response = await axios.post("/api/fetchAthleteProfile", { athleteId });
        
        setAthlete(response.data.athlete);
      } catch (err) {
        setError("Failed to load athlete profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (athleteId) {
      fetchAthleteData();
    }
  }, [athleteId]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !athlete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Oops!</h1>
        <p className="text-gray-200">{error || "Athlete not found"}</p>
        <Button variant="outline" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header athlete={athlete} />
      <ProfileInfo athlete={athlete} />
      <ProfileTabs athlete={athlete} />
    </div>
  );
}

function Header({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-48 bg-gradient-to-r from-orange-600 to-orange-400"
    >
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white">
          <ShareIcon size={20} />
        </Button>
      </div>
      <div className="absolute -bottom-16 left-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage src={athlete.profileImage} alt={athlete.name} />
            <AvatarFallback className="bg-orange-500 text-xl">
              {athlete.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Badge className="absolute bottom-0 right-0 bg-orange-500">
            {athlete.career.level}
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProfileInfo({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="pt-20 px-4 pb-4"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-2xl font-bold">{athlete.name}</h1>
          <p className="text-gray-400">@{athlete.username}</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Follow
        </Button>
      </div>
      
      <p className="text-gray-200 my-3">{athlete.bio}</p>
      
      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-300">
        <div className="flex items-center gap-1">
          <MapPinIcon size={16} className="text-orange-400" />
          <span>{athlete.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarIcon size={16} className="text-orange-400" />
          <span>Active since {new Date(athlete.career.activeYears.from).getFullYear()}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrophyIcon size={16} className="text-orange-400" />
          <span>{athlete.stats.achievements.length} achievements</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 py-3 border-y border-gray-800">
        <div className="text-center">
          <p className="text-2xl font-bold">{athlete.stats.totalMatches}</p>
          <p className="text-sm text-gray-400">Matches</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{athlete.stats.rankings[0]?.rank || "-"}</p>
          <p className="text-sm text-gray-400">Rank</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{athlete.career.sport}</p>
          <p className="text-sm text-gray-400">Sport</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileTabs({ athlete }: { athlete: Athlete }) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-900">
        <TabsTrigger value="posts" className="data-[state=active]:bg-orange-600">Posts</TabsTrigger>
        <TabsTrigger value="stats" className="data-[state=active]:bg-orange-600">Stats</TabsTrigger>
        <TabsTrigger value="achievements" className="data-[state=active]:bg-orange-600">Achievements</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="p-4">
        <PostsFeed />
      </TabsContent>
      
      <TabsContent value="stats" className="p-4">
        <StatsTab athlete={athlete} />
      </TabsContent>
      
      <TabsContent value="achievements" className="p-4">
        <AchievementsTab athlete={athlete} />
      </TabsContent>
    </Tabs>
  );
}

function PostsFeed() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="space-y-4"
    >
      {mockPosts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <p className="text-gray-200 mb-3">{post.content}</p>
              
              {post.imageUrl && (
                <div className="rounded-md overflow-hidden mb-3">
                  <Image 
                    src={post.imageUrl} 
                    alt="Post image" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                <span>{formatDistanceToNow(new Date(post.date))} ago</span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-400">
                      <TrophyIcon size={16} />
                    </Button>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquareIcon size={16} />
                    </Button>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatsTab({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <BarChart3Icon className="mr-2 text-orange-400" size={20} />
            Rankings
          </h3>
          
          <div className="space-y-3">
            {athlete.stats.rankings.map((ranking, index) => (
              <motion.div 
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-3 bg-gray-800 rounded-md"
              >
                <div>
                  <p className="font-medium">{ranking.category}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(ranking.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-orange-400">#{ranking.rank}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <TrophyIcon className="mr-2 text-orange-400" size={20} />
            Career Summary
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Sport</p>
              <p className="font-medium">{athlete.career.sport}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Level</p>
              <p className="font-medium capitalize">{athlete.career.level}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Active Since</p>
              <p className="font-medium">{new Date(athlete.career.activeYears.from).getFullYear()}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Experience</p>
              <p className="font-medium">
                {new Date().getFullYear() - new Date(athlete.career.activeYears.from).getFullYear()} years
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AchievementsTab({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-3">
        {athlete.stats.achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg"
          >
            <div className="flex-shrink-0 bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center">
              <TrophyIcon size={20} />
            </div>
            <div>
              <h3 className="font-medium">{achievement}</h3>
              <p className="text-sm text-gray-400">Basketball</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-48 bg-gray-800"></div>
      <div className="px-4 pt-20 pb-4">
        <div className="absolute -translate-y-16 left-4">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
        
        <Skeleton className="h-4 w-full my-3" />
        <Skeleton className="h-4 w-full mb-3" />
        
        <div className="flex gap-4 my-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <div className="flex justify-between py-3 border-y border-gray-800 my-4">
          <Skeleton className="h-16 w-16" />
          <Skeleton className="h-16 w-16" />
          <Skeleton className="h-16 w-16" />
        </div>
        
        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
        </div>
      </div>
    </div>
  );
}