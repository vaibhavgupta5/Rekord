// app/fan-fuel/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Zap, 
  Award, 
  DollarSign, 
  Dumbbell, 
  Mic, 
  Target, 
  Users
} from "lucide-react";

// Demo data for athletes
const athletes = [
  {
    id: 1,
    name: "Alex Morgan",
    sport: "Soccer",
    image: "/api/placeholder/150/150",
    bio: "Olympic gold medalist needing support for international tournament travel",
    supporters: 243,
    needsSupport: ["financial", "training"],
    supporterTypes: ["financial", "technical"]
  },
  {
    id: 2,
    name: "Darnell Washington",
    sport: "Track & Field",
    image: "/api/placeholder/150/150",
    bio: "Rising star sprinter seeking coaching and equipment sponsorship",
    supporters: 128,
    needsSupport: ["financial", "technical", "pr"],
    supporterTypes: ["training"]
  },
  {
    id: 3,
    name: "Naomi Chen",
    sport: "Swimming",
    image: "/api/placeholder/150/150",
    bio: "National champion working towards Olympic qualification",
    supporters: 315,
    needsSupport: ["training", "pr"],
    supporterTypes: ["financial", "pr", "training"]
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    sport: "Basketball",
    image: "/api/placeholder/150/150",
    bio: "College athlete looking for professional development resources",
    supporters: 98,
    needsSupport: ["financial", "technical"],
    supporterTypes: ["technical"]
  }
];

// Demo data for supporter posts
const supporterPosts = [
  {
    id: 1,
    supporter: {
      name: "Jane Wilson",
      image: "/api/placeholder/150/150",
      type: "financial"
    },
    athlete: {
      name: "Alex Morgan",
      sport: "Soccer"
    },
    content: "Proud to support Alex's journey to the international tournament! Let's bring home the gold! 🏆",
    timeAgo: "2h ago"
  },
  {
    id: 2,
    supporter: {
      name: "Mike Johnson",
      image: "/api/placeholder/150/150",
      type: "training"
    },
    athlete: {
      name: "Naomi Chen",
      sport: "Swimming"
    },
    content: "Just finished our 3rd training session this week. Naomi's technique is improving dramatically!",
    timeAgo: "5h ago"
  },
  {
    id: 3,
    supporter: {
      name: "Sarah Thompson",
      image: "/api/placeholder/150/150",
      type: "pr"
    },
    athlete: {
      name: "Darnell Washington",
      sport: "Track & Field"
    },
    content: "Arranged for Darnell to appear on SportsTalk next week. Can't wait for everyone to hear his story!",
    timeAgo: "1d ago"
  }
];

// Support type icons and colors
const supportTypes = {
  financial: { icon: <DollarSign className="h-4 w-4" />, color: "bg-green-500", label: "Financial" },
  training: { icon: <Dumbbell className="h-4 w-4" />, color: "bg-blue-500", label: "Training" },
  pr: { icon: <Mic className="h-4 w-4" />, color: "bg-purple-500", label: "PR Help" },
  technical: { icon: <Target className="h-4 w-4" />, color: "bg-orange-500", label: "Technical" }
};

export default function FanFuelPage() {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-orange-600 to-orange-800 p-6 pt-16 pb-12 text-center"
      >
        <Zap className="h-12 w-12 mx-auto mb-4 text-white" />
        <h1 className="text-3xl font-bold mb-2">FanFuel</h1>
        <p className="text-lg font-medium mb-6">Powering Athletes Through Community Support</p>
        <div className="flex justify-center gap-4 mb-4">
          <Badge variant="secondary" className="bg-black/30 text-white hover:bg-black/40 flex gap-1 items-center px-3 py-1">
            <DollarSign className="h-3 w-3" /> Financial
          </Badge>
          <Badge variant="secondary" className="bg-black/30 text-white hover:bg-black/40 flex gap-1 items-center px-3 py-1">
            <Dumbbell className="h-3 w-3" /> Training
          </Badge>
          <Badge variant="secondary" className="bg-black/30 text-white hover:bg-black/40 flex gap-1 items-center px-3 py-1">
            <Mic className="h-3 w-3" /> PR
          </Badge>
        </div>
        <Button className="bg-white text-orange-600 hover:bg-orange-100">Start Supporting</Button>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-900">
            <TabsTrigger value="discover" onClick={() => setActiveTab("discover")}>
              Discover
            </TabsTrigger>
            <TabsTrigger value="activity" onClick={() => setActiveTab("activity")}>
              Activity
            </TabsTrigger>
            <TabsTrigger value="my-support" onClick={() => setActiveTab("my-support")}>
              My Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-orange-500" /> Athletes Seeking Support
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {athletes.map((athlete) => (
                  <motion.div
                    key={athlete.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full"
                  >
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-16 w-16 border-2 border-orange-500">
                          <AvatarImage src={athlete.image} alt={athlete.name} />
                          <AvatarFallback>{athlete.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-white">{athlete.name}</CardTitle>
                          <CardDescription className="text-gray-400">{athlete.sport}</CardDescription>
                          <div className="flex mt-1">
                            {athlete.needsSupport.map((type) => (
                              <span 
                                key={type} 
                                className={`${supportTypes[type].color} p-1 rounded-full mr-1`}
                                title={supportTypes[type].label}
                              >
                                {supportTypes[type].icon}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-2">
                        <p className="text-gray-300 text-sm">{athlete.bio}</p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <div className="flex items-center text-sm text-gray-400">
                          <Users className="h-4 w-4 mr-1" /> 
                          <span>{athlete.supporters} supporters</span>
                        </div>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Fuel This Athlete
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-500" /> Recent Support Activity
              </h2>
              
              <div className="space-y-4">
                {supporterPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader className="flex flex-row items-center gap-3 pb-2">
                        <Avatar>
                          <AvatarImage src={post.supporter.image} alt={post.supporter.name} />
                          <AvatarFallback>{post.supporter.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-base text-white mr-2">{post.supporter.name}</CardTitle>
                            <Badge variant="outline" className={`text-xs flex items-center gap-1 border-${supportTypes[post.supporter.type].color.split('-')[1]}-500`}>
                              {supportTypes[post.supporter.type].icon}
                              <span className="text-xs">{supportTypes[post.supporter.type].label}</span>
                            </Badge>
                          </div>
                          <CardDescription className="text-sm text-gray-400">
                            Supporting {post.athlete.name} • {post.athlete.sport}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <p className="text-gray-300 text-sm">{post.content}</p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-1 text-xs text-gray-500">
                        <span>{post.timeAgo}</span>
                        <div className="flex gap-3">
                          <Button variant="ghost" size="sm" className="text-xs px-2 py-0 h-auto text-gray-400">
                            Like
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs px-2 py-0 h-auto text-gray-400">
                            Comment
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="my-support" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <Zap className="h-12 w-12 mb-4 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">Start Your FanFuel Journey</h3>
              <p className="text-gray-400 max-w-md mb-6">
                Connect with athletes and provide the support they need to succeed. Every contribution makes a difference!
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700">Browse Athletes</Button>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-900 py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">How FanFuel Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 p-3 rounded-full mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Direct Fan-to-Athlete Support</h3>
              <p className="text-sm text-gray-400">
                Connect directly with athletes and provide the specific support they need
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 p-3 rounded-full mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Recognition & Visibility</h3>
              <p className="text-sm text-gray-400">
                Get recognized with "Has Fanfueled" tags and be part of the athlete's success story
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-orange-600 p-3 rounded-full mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-2">Stronger Sports Community</h3>
              <p className="text-sm text-gray-400">
                Build a network of passionate supporters who uplift athletes through meaningful assistance
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-600 to-orange-800 py-8 px-4 text-center"
      >
        <h2 className="text-xl font-bold mb-4">Ready to Fuel Champions?</h2>
        <p className="mb-6 max-w-md mx-auto">
          Join the FanFuel community today and make a real difference in an athlete's journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-black hover:bg-gray-900 text-white">
            Start Supporting
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Athlete Sign Up
          </Button>
        </div>
      </motion.div>
    </div>
  );
}