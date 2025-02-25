'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Video, Calendar, MessageCircle, Flame, 
  Users, Plus, Share2, Heart, MessageSquare, 
  Bookmark, Play, Pause, X,
  ImageIcon,
  Camera,
  Upload
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {  CheckCheck } from 'lucide-react';
import {  MapPin, Medal, Timer, Instagram, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';

const athletePosts = [
  {
    id: 1,
    user: "Navdeep Singh",
    sport: "Javelin",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/1/10/Navdeep_Singh_in_September_2024.jpg",
    content: "Won 2024 ParaOlmpics Gold Medal 🥇",
    image: "https://img.etimg.com/thumb/msid-113161808,width-640,resizemode-4/news/sports/from-silver-to-gold-the-story-behind-navdeep-singhs-javelin-medal-upgrade/historic-victory.jpg",
    likes: 3242,
    comments: 156
  },

  {
    id: 2,
    user: "Vanshika Teotia",
    sport: "Boxer",
    avatar: "/api/placeholder/40/40",
    content: "Ready up for NCC Training",
    image: "https://assets.thehansindia.com/h-upload/2023/01/06/1328756-ncc.webp",
    likes: 1567,
    comments: 89
  },

 
  {
    id: 3,
    user: "Vaibhav Gupta",
    sport: "Cricket",
    avatar: "/api/placeholder/40/40",
    content: "Morning training - 20 laps done! 🏊‍♂️ Ready for championships",
    image: "https://media.newyorker.com/photos/6579d39668872af306a7c711/1:1/w_1703,h_1703,c_limit/Webster-Shouts-Cricket.jpg",
    likes: 1567,
    comments: 89
  },

  {
    id: 4,
    user: "Aashi Chaudharyy",
    sport: "Racer",
    avatar: "/api/placeholder/40/40",
    content: "Morning training - 20 laps done! 🏊‍♂️ Ready for championships",
    image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 1567,
    comments: 89
  },
  {
    id: 5,
    user: "Murali Bajaj",
    sport: "Badminton",
    avatar: "/api/placeholder/40/40",
    content: "Perfecting the balance beam routine for nationals 🤸‍♀️",
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 2891,
    comments: 203
  },

 
];

const athleteStrides = [
  {
    id: 1,
    user: "Aarav Sharma",
    sport: "High Jump",
    avatar: "/api/placeholder/40/40",
    video: "v1.mp4",
    likes: 4521,
    comments: 234,
    description: "New technique practice - cleared 2.05m! 🇮🇳🎯"
  },
  {
    id: 2,
    user: "Meera Iyer",
    sport: "Table Tennis",
    avatar: "/api/placeholder/40/40",
    video: "v2.mp4",
    likes: 3892,
    comments: 167,
    description: "Spin and backhand drills in today's practice 🏓🔥"
  },
  {
    id: 3,
    user: "Rohan Patel",
    sport: "Kabaddi",
    avatar: "/api/placeholder/40/40",
    video: "v3.webm",
    likes: 5234,
    comments: 298,
    description: "Mastering the ‘Toe Touch’ raid! 🏆💪"
  }
];


const sportsEvents = [
  {
    id: 1,
    title: "World Athletics Championship",
    date: "July 15, 2025",
    location: "Olympic Stadium",
    participants: 2500,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Beijing_2008%2C_Beijing_National_Stadium.jpg",
    category: "International"
  },
  {
    id: 2,
    title: "National Swimming Meet",
    date: "August 2, 2025",
    location: "Aquatics Center",
    participants: 850,
    image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/piultz6nngltq541xmju",
    category: "National"
  },
  {
    id: 3,
    title: "Regional Gymnastics Competition",
    date: "September 10, 2025",
    location: "Sports Complex",
    participants: 400,
    image: "https://images.javatpoint.com/gk/images/major-sports-events-in-the-world2.jpg",
    category: "Regional"
  }
];

const coachMessages = [
  {
    id: 1,
    user: "Coach Sharma",
    sport: "Track & Field",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Great progress on your sprint technique!",
    time: "1h ago",
    unread: true
  },
  {
    id: 2,
    user: "Coach Iyer",
    sport: "Gymnastics",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Team practice tomorrow at 8am",
    time: "3h ago",
    unread: true
  },
  {
    id: 3,
    user: "Coach Reddy",
    sport: "Swimming",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Let's review your lap times",
    time: "5h ago",
    unread: false
  },
  {
    id: 4,
    user: "Coach Verma",
    sport: "Basketball",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Work on your three-point shots!",
    time: "8h ago",
    unread: true
  },
  {
    id: 5,
    user: "Coach Desai",
    sport: "Tennis",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Remember to follow through on your serve",
    time: "10h ago",
    unread: false
  },
  {
    id: 6,
    user: "Coach Menon",
    sport: "Soccer",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Defensive drills at next practice",
    time: "12h ago",
    unread: true
  },
  {
    id: 7,
    user: "Coach Banerjee",
    sport: "Baseball",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Your swing looks much better!",
    time: "15h ago",
    unread: false
  },
  {
    id: 8,
    user: "Coach Mehta",
    sport: "Volleyball",
    avatar: "/api/placeholder/40/40",
    lastMessage: "We need to focus on our blocking",
    time: "18h ago",
    unread: true
  },
  {
    id: 9,
    user: "Coach Rao",
    sport: "Wrestling",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Practice takedowns tomorrow",
    time: "1 day ago",
    unread: false
  },
  {
    id: 10,
    user: "Coach Joshi",
    sport: "Fencing",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Keep refining your footwork",
    time: "2 days ago",
    unread: true
  },
  {
    id: 11,
    user: "Coach Kulkarni",
    sport: "Rowing",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Improve your stroke efficiency",
    time: "3 days ago",
    unread: false
  },
  {
    id: 12,
    user: "Coach Thakur",
    sport: "Boxing",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Keep your hands up!",
    time: "4 days ago",
    unread: true
  }
];


const liveEvents = [
  {
    id: 1,
    title: "Olympic Trials - 100m Sprint",
    viewers: 15234,
    thumbnail: "https://images.theconversation.com/files/624910/original/file-20241010-15-harxul.jpg?ixlib=rb-4.1.0&rect=18%2C9%2C3007%2C1501&q=45&auto=format&w=668&h=324&fit=crop",
    status: "LIVE"
  },
  {
    id: 2,
    title: "National Swimming Finals",
    viewers: 8921,
    thumbnail: "/api/placeholder/400/200",
    status: "LIVE"
  },
  {
    id: 3,
    title: "World Gymnastics Championship",
    viewers: 12456,
    thumbnail: "/api/placeholder/400/200",
    status: "LIVE"
  }
];

const RekordApp = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [activeTab, setActiveTab] = useState('feed');
  const [isPlaying, setIsPlaying] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const ProfileContent = () => {
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 }
    };
  
    const achievements = [
      { icon: Trophy, text: "Olympic Qualifier 2024" },
      { icon: Medal, text: "National Champion 2023" },
      { icon: Timer, text: "100m PR: 10.2s" }
    ];
  
    return (
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        {...fadeInUp}
      >
        <Card className="max-w-md w-full bg-white rounded-2xl shadow-2xl">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full">
                <X onClick={() => router.push("/")} className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
  
            {/* Profile Info */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-purple-500/30 hover:ring-purple-500 transition-all duration-200">
                  <AvatarImage src="https://i.pravatar.cc/96" className="object-cover" />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xl">AT</AvatarFallback>
                </Avatar>
                <Badge className="absolute bottom-0 right-0 bg-green-500">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </Badge>
              </div>
  
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-gray-900">Pratyush Mehra</h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Jumper
                  </Badge>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Muradnagar
                  </span>
                </div>
              </div>
  
              {/* Stats */}
              <div className="flex justify-between w-full mt-6 px-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">245</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15.2k</div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">892</div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
              </div>
  
              {/* Achievements */}
              <div className="w-full mt-6 space-y-2">
                {achievements.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <Icon className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
  
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" size="sm" className="gap-2">
                  <Instagram className="w-4 h-4" />
                  @pratyush.mm
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  @pratyush-who
                </Button>
              </div>
  
              {/* Actions */}
              <div className="flex gap-3 w-full mt-6">
                <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const CreatePostModal = () => (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto bg-white/10 rounded-2xl p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Post</h2>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => setShowCreatePost(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger 
              value="post"
              className="text-white data-[state=active]:bg-purple-500"
            >
              Regular Post
            </TabsTrigger>
            <TabsTrigger 
              value="stride"
              className="text-white data-[state=active]:bg-purple-500"
            >
              Stride
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Content</Label>
                <Textarea 
                  placeholder="Share your achievement..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  rows={4}
                />
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-purple-500/20 p-4 rounded-full">
                    <ImageIcon className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">Add Photos</p>
                    <p className="text-sm text-white/60">or drag and drop</p>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    Select Files
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Camera className="w-4 h-4" />
                <span>Supported formats: JPG, PNG, GIF</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stride" className="mt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Description</Label>
                <Textarea 
                  placeholder="Describe your Stride..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  rows={2}
                />
              </div>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-purple-500/20 p-4 rounded-full">
                    <Upload className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">Upload Video</p>
                    <p className="text-sm text-white/60">Maximum duration: 60 seconds</p>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    Select Video
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Video className="w-4 h-4" />
                <span>Supported formats: MP4, MOV</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500">
              {activeTab === 'stride' ? 'Stride' : 'Post'}
            </Badge>
            <span className="text-white/60">Draft</span>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Save Draft
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              Post Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const FeedContent = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [selectedPost, setSelectedPost] = useState(null);
  
    // Hardcoded comments for each post
    const commentsData = {
      1: [
        { id: 1, user: "Sarah Miller", avatar: "https://i.pravatar.cc/150?u=sarah", content: "Amazing form! Keep it up 💪", time: "1h ago" },
        { id: 2, user: "John Davis", avatar: "https://i.pravatar.cc/150?u=john", content: "What's your training schedule like?", time: "45m ago" },
        { id: 3, user: "Emma Wilson", avatar: "https://i.pravatar.cc/150?u=emma", content: "This is inspiring!", time: "30m ago" }
      ],
      2: [
        { id: 4, user: "Mike Thompson", avatar: "https://i.pravatar.cc/150?u=mike", content: "Great progress!", time: "2h ago" },
        { id: 5, user: "Lisa Chen", avatar: "https://i.pravatar.cc/150?u=lisa", content: "Can't wait to see more 🔥", time: "1h ago" }
      ]
    };
  
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 }
    };
  
    const handleLike = (postId) => {
      setLikedPosts(prev => {
        const newLiked = new Set(prev);
        if (newLiked.has(postId)) {
          newLiked.delete(postId);
        } else {
          newLiked.add(postId);
        }
        return newLiked;
      });
    };
  
    // Comments Modal Component
    const CommentsModal = ({ post, onClose }) => (
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col"
          {...fadeInUp}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-lg">Comments</h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
  
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            {commentsData[post.id]?.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="font-medium text-sm">{comment.user}</div>
                    <p className="text-gray-700 text-sm mt-1">{comment.content}</p>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>{comment.time}</span>
                    <button className="hover:text-gray-700">Reply</button>
                    <button className="hover:text-gray-700">Like</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="p-4 border-t">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=user" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <input 
                type="text" 
                placeholder="Write a comment..." 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  
    return (
      <>
        <motion.div className="max-w-2xl mx-auto space-y-6" {...fadeInUp}>
          {athletePosts.map((post) => (
            <Card 
              key={post.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <CardContent className="p-4 pb-2">
                {/* Header section remains the same */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-purple-500/30 transition-all duration-200 hover:ring-purple-500">
                      <AvatarImage src={post.avatar} className="object-cover" />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {post.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{post.user}</h4>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {post.sport}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
  
                {/* Content and Image sections remain the same */}
                <p className="mt-3 text-gray-700 leading-relaxed">{post.content}</p>
                <div className="mt-4 -mx-4">
                  <div className="relative aspect-video">
                    <img 
                      src={post.image}
                      alt="Post content"
                      className="w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
                    />
                  </div>
                </div>
  
                {/* Updated Interaction Buttons */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`${
                        likedPosts.has(post.id) 
                          ? 'text-red-500 bg-red-50' 
                          : 'text-gray-700 hover:text-red-500 hover:bg-red-50'
                      } transition-colors`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart 
                        className={`w-5 h-5 mr-2 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} 
                      />
                      <span className="font-medium">
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                      onClick={() => setSelectedPost(post)}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      <span className="font-medium">{post.comments}</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-700 hover:text-purple-500 hover:bg-purple-50 transition-colors"
                  >
                    <Bookmark className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
  
        <AnimatePresence>
          {selectedPost && (
            <CommentsModal 
              post={selectedPost} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </AnimatePresence>
      </>
    );
  };
  


  const StridesContent = () => {
    const [activeStride, setActiveStride] = useState(null);
    const [thumbnails, setThumbnails] = useState({});
  
    useEffect(() => {
      athleteStrides.forEach((stride) => {
        extractThumbnail(stride.video, (thumbnail) => {
          setThumbnails((prev) => ({ ...prev, [stride.id]: thumbnail }));
        });
      });
    }, []);
  
    const extractThumbnail = (videoSrc, callback) => {
      const video = document.createElement("video");
      video.src = videoSrc;
      video.crossOrigin = "anonymous";
      video.currentTime = 1;
      video.muted = true;
      video.playsInline = true;
  
      video.onloadeddata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
  
        video.play().then(() => {
          setTimeout(() => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            callback(canvas.toDataURL("image/png"));
          }, 500);
        });
      };
    };
  
    return (
      <motion.div className="grid grid-cols-1 gap-6 h-[calc(100vh-12rem)] overflow-y-auto px-2">
        {athleteStrides.map((stride, index) => (
          <motion.div
            key={stride.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-none h-[85vh] relative overflow-hidden rounded-2xl shadow-xl">
              <CardContent className="p-0 h-full relative">
                {/* Background Image from Video Thumbnail */}
                <div className="absolute inset-0">
                  <img
                    src={thumbnails[stride.id] || "/api/placeholder/400/700"}
                    alt="Stride video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
                </div>
  
                {/* Content Above Thumbnail */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  {/* Top Section (Avatar, Name, Sport, Time) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="ring-2 ring-purple-500 w-12 h-12">
                        <AvatarImage src={stride.avatar} />
                        <AvatarFallback>{stride.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold text-lg">{stride.user}</span>
                        </div>
                        <div className="text-white/80 text-sm">2h ago</div>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
  
                  {/* Middle Section (Description) */}
                  <motion.p 
                    className="text-white text-lg absolute bottom-20 font-medium  line-clamp-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {stride.description}
                  </motion.p>
  
                  {/* Bottom Section (Icons) */}
                  <motion.div 
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex space-x-6">
                      <Button variant="ghost" className="text-white hover:bg-white/10 space-x-2">
                        <Heart className="w-6 h-6" fill={activeStride === stride ? "#ec4899" : "none"} />
                        <span>{stride.likes}</span>
                      </Button>
                      <Button variant="ghost" className="text-white hover:bg-white/10 space-x-2">
                        <MessageSquare className="w-6 h-6" />
                        <span>{stride.comments}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      <Bookmark className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </div>
  
                {/* Play Button Overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveStride(stride)}
                >
                  <div className="w-16 h-16 bg-purple-500/80 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
  
        {/* Fullscreen Video Modal */}
        <AnimatePresence>
          {activeStride && (
            <motion.div
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-white z-10"
                onClick={() => setActiveStride(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              <video src={activeStride.video} controls autoPlay className="w-full h-full object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
  
  
  const liveEvents = [
    {
      id: 1,
      title: "Olympic Trials - 100m Sprint",
      viewers: 15234,
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_vkqsW0SYDdNhK6CdztMPXl6rT1SEai-yA&s",
      status: "LIVE"
    },
    {
      id: 2,
      title: "National Swimming Finals",
      viewers: 8921,
      thumbnail: "https://cdn.roadtrips.com/wp-content/uploads/2016/11/swim-1.jpg",
      status: "LIVE"
    },
    {
      id: 3,
      title: "World Gymnastics Championship",
      viewers: 12456,
      thumbnail: "https://images.ctfassets.net/rxqefefl3t5b/1W1RgkJB2MOnl9Dru658y3/3b5ed0c01622b109fefa9407f1917336/vs_hackney_festival_17_221.jpg?fl=progressive&q=80",
      status: "LIVE"
    }
  ];
  
  const EventsContent = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const scrollRef = React.useRef(null);
  
    return (
      <motion.div className="space-y-8" {...fadeInUp}>
        {/* Live Events Banner */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-purple-800">Live Now</h2>
            </div>
            <Button variant="ghost" className="text-purple-800 hover:bg-purple-200/50">
              View All
            </Button>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {liveEvents.map((event) => (
              <motion.div
                key={event.id}
                className="relative flex-shrink-0 w-72"
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-black/5 border-none overflow-hidden">
                  <div className="relative">
                    <img 
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex items-center space-x-2">
                      <Badge className="bg-red-500">LIVE</Badge>
                      <Badge className="bg-black/50 backdrop-blur-sm">
                        <Users className="w-3 h-3 mr-1" />
                        {event.viewers.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-purple-800 line-clamp-1">{event.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
  
        {/* Upcoming Events Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">Upcoming Events</h2>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
  
          {/* Category Filters */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {['all', 'International', 'National', 'Regional'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`${
                  selectedCategory === category 
                  ? 'bg-purple-500 text-white' 
                  : 'text-purple-800 border-purple-200'
                } capitalize`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
  
          <div className="grid md:grid-cols-2 gap-6">
            {sportsEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-purple-500">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-purple-800 mb-3">{event.title}</h3>
                      <div className="grid grid-cols-2 gap-4 text-purple-800/80 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.participants} athletes</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
                          Register Now
                        </Button>
                        <Button variant="outline" className="text-purple-800 border-purple-200">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  

  const MessagesContent = () => {
    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 }
    };
  
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-purple-50">
          <h2 className="text-lg font-semibold text-purple-900">Messages</h2>
          <Badge variant="outline" className="bg-purple-100">
            {coachMessages.filter(m => m.unread).length} unread
          </Badge>
        </div>
  
        {/* Messages List */}
        <motion.div 
          className="divide-y divide-gray-100"
          {...fadeInUp}
        >
          {coachMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start p-4 hover:bg-purple-50 transition-colors cursor-pointer ${
                message.unread ? 'bg-purple-50/50' : ''
              }`}
            >
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage src={message.avatar} className="object-cover" />
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {message.user[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium text-gray-900 truncate">
                    {message.user}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {message.time}
                  </span>
                </div>
                
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-500 truncate flex-1">
                    {message.lastMessage}
                  </span>
                  {message.unread ? (
                    <Badge className="bg-purple-500 text-white text-xs">New</Badge>
                  ) : (
                    <CheckCheck className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <Badge variant="outline" className="bg-transparent">
                    {message.sport}
                  </Badge>
                  {message.unread && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      Awaiting response
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
  
        {/* Empty State */}
        {coachMessages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No messages yet</p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* Header */}
      <motion.header 
        className="bg-white/20 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.h1 
            className="text-3xl font-bold text-purple-800"
            whileHover={{ scale: 1.05 }}
          >
            REKORD
          </motion.h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-purple-800 hover:bg-purple-200/50">
              <Flame className="w-5 h-5 mr-2 text-orange-500" />
              FanFuel
            </Button>
            <Avatar 
              className="ring-2 ring-purple-500 cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>PM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && <FeedContent />}
          {activeTab === 'strides' && <StridesContent />}
          {activeTab === 'events' && <EventsContent />}
          {activeTab === 'messages' && <MessagesContent />}
        </AnimatePresence>
      </main>


      <motion.button
        className="fixed right-6 bottom-24 bg-purple-500 text-white p-4 rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCreatePost(true)}
      >
        <Plus className="w-6 h-6" />
      </motion.button>


      <AnimatePresence>
        {showProfile && <ProfileContent />}
        {showCreatePost && <CreatePostModal />}
      </AnimatePresence>

      {/* Navigation Bar */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white/40 backdrop-blur-lg border-t border-white/20 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { icon: <Trophy className="w-6 h-6" />, label: 'Feed', id: 'feed' },
              { icon: <Video className="w-6 h-6" />, label: 'Strides', id: 'strides' },
              { icon: <Calendar className="w-6 h-6" />, label: 'Events', id: 'events' },
              { icon: <MessageCircle className="w-6 h-6" />, label: 'ALLY', id: 'messages' }
            ].map((item) => (
              <motion.button
                key={item.id}
                className={`text-purple-800 flex flex-col items-center ${
                  activeTab === item.id ? 'opacity-100' : 'opacity-60'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    className="absolute -bottom-2 w-12 h-1 bg-purple-500 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && <ProfileContent />}
      </AnimatePresence>

      {/* Video Player */}
      <AnimatePresence>
        {Object.keys(isPlaying).length > 0 && (
          <motion.div 
            className="fixed inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <video 
              src={isPlaying.video} 
              controls 
              className="w-full h-full object-cover"
              autoPlay
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsPlaying({})}
            >
              <Pause className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>





    </div>

    
  );


  
}

export default RekordApp;