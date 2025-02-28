"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, TrophyIcon, BarChart3Icon, ShareIcon, MessageSquareIcon, CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  sponsorships?: {
    brand: string;
    logo: string;
    since: string;
    link: string;
  }[];
  socialHandles?: {
    platform: string;
    handle: string;
  }[];
}

// Mock Posts data since the API doesn't provide it
interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  date: string;
  sponsored?: boolean;
  sponsorLogo?: string;
  sponsorName?: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just finished an amazing training session! Ready for the upcoming tournament. #GameDay #Basketball",
    imageUrl: "https://cdn.prod.website-files.com/66a7ad387e177bc7c659bb45/66f1596c4edb96ed120c6e97_b21628f9-4c0e-4b9c-9304-e028609801e7.jpeg",
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
    content: "Fueling my workouts with MuscleBlaze Biozyme Whey Protein. Getting stronger every day! #Partnership #MuscleBlaze #ProteinForChampions",
    imageUrl: "https://finnsbeachclub.com/wp-content/uploads/2024/09/basketball-court-ball-and-sports-match-or-competi-2023-11-27-04-58-17-utc.jpg",
    likes: 489,
    comments: 76,
    date: "2025-02-05T16:20:00Z",
    sponsored: true,
    sponsorName: "MuscleBlaze",
    sponsorLogo: "https://cdn.labdoor.io/brand/images/npjn65sqqnrw4117kp28io.jpg"
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
        
        // Add mock sponsorship data
        const athleteData = {
          ...response.data.athlete,
          sponsorships: [
            {
              brand: "MuscleBlaze",
              logo: "https://muscleblaze.sg/cdn/shop/files/MB_Logo_76b87842-ec90-4ecd-af88-af2897792baa.png?v=1692974821&width=760",
              since: "2024-05-01",
              link: "https://muscleblaze.com"
            }
          ],
          socialHandles: [
            {
              platform: "Instagram",
              handle: "@aashi"
            }
          ]
        };
        
        setAthlete(athleteData);
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
      <Sponsorships athlete={athlete} />
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
          <Badge className="absolute bottom-0 left-4 bg-black">
            {athlete.career.level}
          </Badge>
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {athlete.socialHandles?.map((social, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-black/30 text-white hover:bg-black/50 px-3 py-1 h-8">
                  {social.handle}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Follow on {social.platform}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
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
      className="pt-20  px-4 pb-4"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{athlete.name}</h1>
            <Badge variant="outline" className="bg-black border-blue-500 text-blue-400">
              <CheckCircleIcon size={12} className="mr-1" /> Verified
            </Badge>
          </div>
          <p className="text-gray-400">@{athlete.username}</p>
        </div>
        {/* <Button className="bg-orange-500 hover:bg-orange-600">
          Follow
        </Button> */}
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

function Sponsorships({ athlete }: { athlete: Athlete }) {
  if (!athlete.sponsorships || athlete.sponsorships.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="px-4 mb-4"
    >
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Official Sponsors</h3>
          <Badge variant="outline" className="bg-black/40 border-orange-500/30 text-orange-400">
            Partnerships
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {athlete.sponsorships.map((sponsor, index) => (
            <motion.a
              key={index}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-black/30 rounded-md hover:bg-black/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="h-10 overflow-hidden rounded">
                <Image 
                  src={sponsor.logo} 
                  alt={sponsor.brand} 
                  width={120} 
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{sponsor.brand}</p>
                <p className="text-xs text-gray-400">Since {new Date(sponsor.since).getFullYear()}</p>
              </div>
              <ExternalLinkIcon size={16} className="ml-1 text-gray-400" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProfileTabs({ athlete }: { athlete: Athlete }) {
  return (
    <Tabs defaultValue="posts" className="w-full mb-[5rem]">
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
          <Card className={`bg-gray-900 border-gray-800 ${post.sponsored ? 'border-l-4 border-l-orange-500' : ''}`}>
            <CardContent className="p-4">
              {post.sponsored && (
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                  {post.sponsorLogo && (
                    <Image 
                      src={post.sponsorLogo} 
                      alt={post.sponsorName || 'Sponsor'} 
                      width={80} 
                      height={40} 
                      className="h-6 w-auto object-contain"
                    />
                  )}
                  <span className="text-xs text-gray-400">Sponsored by {post.sponsorName}</span>
                </div>
              )}
              
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
      
      <Card className="bg-gray-900 border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-orange-500 text-xs px-2 py-1 rounded-bl-md">
          Powered by MuscleBlaze
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <BarChart3Icon className="mr-2 text-orange-400" size={20} />
            Performance Metrics
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Strength Index</p>
              <p className="font-medium text-orange-400">92/100</p>
              <div className="w-full bg-gray-700 h-2 mt-1 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Endurance Rating</p>
              <p className="font-medium text-orange-400">87/100</p>
              <div className="w-full bg-gray-700 h-2 mt-1 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Recovery Rate</p>
              <p className="font-medium text-orange-400">94/100</p>
              <div className="w-full bg-gray-700 h-2 mt-1 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-gray-800 rounded-md">
              <p className="text-sm text-gray-400">Nutrition Score</p>
              <p className="font-medium text-orange-400">90/100</p>
              <div className="w-full bg-gray-700 h-2 mt-1 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 mt-3 italic text-right">
            Performance metrics powered by MuscleBlaze Sports Analytics
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
      <div className="mb-4 p-4 bg-gradient-to-r from-orange-600/20 to-orange-400/10 rounded-lg border border-orange-500/20">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">MuscleBlaze Athlete of the Month</h3>
          <Badge className="bg-orange-500">January 2025</Badge>
        </div>
        <p className="text-sm text-gray-300 mt-1">Awarded for exceptional performance and commitment to excellence</p>
      </div>
    
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
        
        <Skeleton className="h-20 w-full my-4" />
        
        <div className="mt-6">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
        </div>
      </div>
    </div>
  );
}