// app/page.jsx
"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Trophy, Users, Zap, Award, Calendar, BarChart, Shield } from "lucide-react";

// Hero Section with Text Animation
const HeroSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
    
    // Text animation for the main title
    const titleLetters = "REKORD".split("");
    
    return (
      <section className="relative bg-black py-24 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        
        {/* Clean gradient accent */}
        <motion.div 
          className="absolute right-0 top-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.2), rgba(194, 65, 12, 0.1), rgba(0, 0, 0, 0))",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Dynamic sports field lines */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-64 origin-bottom"
          style={{
            background: "linear-gradient(transparent, rgba(194, 65, 12, 0.03))",
            backgroundSize: "60px 60px",
            backgroundImage: "linear-gradient(to right, rgba(194, 65, 12, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(194, 65, 12, 0.1) 1px, transparent 1px)",
            transform: "perspective(1000px) rotateX(60deg)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 60px"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Professional badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-block"
            >
              <span className="inline-block bg-orange-900/30 text-sm font-medium px-5 py-2 rounded-full border border-orange-700/30">
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">
                  Breaking Limits, Building Legends
                </span>
              </span>
            </motion.div>
            
            {/* Clean letter animation for main title */}
            <div className="mb-8">
              <div className="flex justify-center">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl md:text-8xl font-bold inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.07 * index,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-orange-400 to-orange-600">
                      {letter}
                    </span>
                  </motion.span>
                ))}
              </div>
              
              {/* Subtle underline */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "180px" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 bg-gradient-to-r from-orange-600 to-orange-500 mx-auto mt-2"
              />
            </div>
            
            {/* Clean tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              The professional ecosystem connecting
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mx-1">talented athletes</span>
              with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400 mx-1">their supporters</span>
            </motion.p>
            
            {/* Professional buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" className="relative overflow-hidden bg-orange-600 hover:bg-orange-700 transition-colors duration-300">
                  <span className="relative text-white font-medium px-6 py-3 block">
                    Join as Athlete
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button size="lg" variant="outline" className="border-orange-500 hover:bg-orange-900/20 transition-colors duration-300">
                  <span className="text-white font-medium px-6 py-3 block">
                    Become a Supporter
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Professional showcase section without phone */}
        <div className="mt-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative max-w-6xl mx-auto px-4"
          >
            {/* Subtle branding element */}
            <div className="relative h-16 flex items-center justify-center">
              <div className="w-full border-t border-orange-800/30"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-8 flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-2xl font-bold"
                >
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                    EXPERIENCE EXCELLENCE
                  </span>
                </motion.div>
              </div>
            </div>
            
            {/* Professional feature indicators */}
            <motion.div 
              className="flex justify-center gap-24 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-900/30 flex items-center justify-center border border-orange-700/30">
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-lg font-medium text-white">Customizable Profile</h3>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-900/30 flex items-center justify-center border border-orange-700/30">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-lg font-medium text-white">Community Support</h3>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-900/30 flex items-center justify-center border border-orange-700/30">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-lg font-medium text-white">Performance Tracking</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };
// Features Section with Bento Grid
const FeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      title: "Profile Verification System",
      description: "Three-tiered verification system ensures platform integrity and trust",
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      color: "from-blue-500/20 to-blue-600/20",
      highlight: true,
    },
    {
      title: "Unified Interface Design",
      description: "Instagram-like interface with sports-specific features",
      icon: <Users className="w-10 h-10 text-purple-500" />,
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      title: "Innovative Funding",
      description: "Unique monetization through fan-based reels revenue and micro-funding",
      icon: <Zap className="w-10 h-10 text-amber-500" />,
      color: "from-amber-500/20 to-amber-600/20",
      highlight: true,
    },
    {
      title: "Event Management",
      description: "Live streaming, organization tools, and participation opportunities",
      icon: <Calendar className="w-10 h-10 text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      title: "Specialized Profiles",
      description: "Tailored features for athletes, fundraisers, and audience",
      icon: <Users className="w-10 h-10 text-rose-500" />,
      color: "from-rose-500/20 to-rose-600/20",
    },
    {
      title: "Community Building",
      description: "Supportive ecosystem for talent discovery and growth",
      icon: <Award className="w-10 h-10 text-indigo-500" />,
      color: "from-indigo-500/20 to-indigo-600/20",
      highlight: true,
    },
    {
      title: "Dynamic Explore Page",
      description: "Promoting events, achievements, and transparency",
      icon: <BarChart className="w-10 h-10 text-cyan-500" />,
      color: "from-cyan-500/20 to-cyan-600/20",
    },
  ];

  return (
    <section className="py-40 bg-gray-950" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
          >
            🎯 Features & Benefits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A revolutionary ecosystem designed to empower athletes, connect fundraisers, and engage supporters
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative ${
                feature.highlight
                  ? "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1"
                  : "col-span-1 row-span-1"
              }`}
            >
              <Card
                className={`h-full bg-gradient-to-br ${feature.color} border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group`}
              >
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-bold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="text-blue-400 p-0 hover:text-blue-300 hover:bg-transparent transition-transform group-hover:translate-x-1"
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// FanFuel Feature Highlight Section
const FanFuelSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-950 to-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-3xl overflow-hidden border border-indigo-500/30 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text text-xl font-medium mb-6">
                  🌟 Exclusive Feature
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  🔥 <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">FanFuel</span>
                </h3>
                <p className="text-xl text-blue-100 mb-8">
                  Powering Athletes Through Community Support
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-indigo-600/30 rounded-lg">
                    <Trophy className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">Recognition & Visibility</h4>
                    <p className="text-blue-200">
                      Supporters get a "Has Fanfueled" tag, while athletes display "Fanfueled By" to showcase their backers
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-indigo-600/30 rounded-lg">
                    <Users className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">Direct Fan-to-Athlete Support</h4>
                    <p className="text-blue-200">
                      No need to rely on big brands—every contribution, big or small, makes a difference
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-2 bg-indigo-600/30 rounded-lg">
                    <Zap className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">Stronger Sports Community</h4>
                    <p className="text-blue-200">
                      Creates a network of passionate supporters who uplift athletes through meaningful assistance
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Fuel an Athlete Today
                </Button>
              </motion.div>
            </div>

            <div className="relative lg:h-auto p-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-md"
              >
                <div className="aspect-[9/16] bg-gradient-to-br from-indigo-800 to-purple-900 rounded-3xl overflow-hidden border border-indigo-500/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-10 left-0 right-0 text-center">
                    <h4 className="text-xl font-bold text-white mb-2">REKORD</h4>
                    <p className="text-blue-200 text-sm">FanFuel Profile</p>
                  </div>
                  <div className="absolute bottom-10 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                        <div>
                          <h5 className="text-lg font-bold text-white">Navdeep Singh</h5>
                          <p className="text-xs text-blue-200">Javelin Thrower</p>
                        </div>
                        <div className="ml-auto">
                          <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                            🔥 FanFueled
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-blue-200">65% Funded</span>
                          <span className="text-amber-400">₹65,000 of ₹100,000</span>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-white/10 p-2 rounded-lg">
                          <span className="block text-amber-400 text-sm">12</span>
                          <span className="text-blue-200">Supporters</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg">
                          <span className="block text-amber-400 text-sm">30d</span>
                          <span className="text-blue-200">Remaining</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg">
                          <span className="block text-amber-400 text-sm">₹5.4K</span>
                          <span className="text-blue-200">Avg. Fund</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// User Types Section
const UserTypesSection = () => {
  const userTypes = [
    {
      title: "Athletes",
      description: "Verified profiles for athletes to showcase talents, achievements, and their sports journey",
      icon: "🏃‍♂️",
      features: ["Achievement showcase", "Event participation", "Custom ranking system", "Funding eligibility"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Fundraisers",
      description: "Connect sponsors and organizations with promising athletic talents",
      icon: "💰",
      features: ["Event management", "Athlete tracking", "Sponsorship tools", "Verification system"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Audience",
      description: "Follow, support, and appreciate authentic athletic content",
      icon: "👥",
      features: ["Support mechanisms", "Content creation", "Engagement options", "FanFuel participation"],
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
          >
            👥 User Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A specialized ecosystem with distinct roles and features for different user types
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 h-full transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color}"></div>
                <div className="p-8">
                  <div className="text-4xl mb-6">{type.icon}</div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${type.color} text-transparent bg-clip-text mb-4`}>
                    {type.title}
                  </h3>
                  <p className="text-gray-300 mb-8">{type.description}</p>
                  <ul className="space-y-3">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-400">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${type.color} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      className={`bg-gradient-to-r ${type.color} text-white w-full`}
                    >
                      Join as {type.title}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Join the REKORD Revolution?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-blue-100 mb-10"
          >
            Be part of a movement that's democratizing sports support and ensuring every athlete has a fair chance at success
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-blue-100">
              Get Early Access
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                REKORD
              </span>
            </Link>
            <p className="mb-6">
              Breaking Limits, Building Legends
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-6">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">For Athletes</a></li>
              <li><a href="#" className="hover:text-white">For Fundraisers</a></li>
              <li><a href="#" className="hover:text-white">For Supporters</a></li>
              <li><a href="#" className="hover:text-white">Verification</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
              <li><a href="#" className="hover:text-white">Events</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} REKORD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


const TestimonialsSection = () => {
    const testimonials = [
      {
        quote: "REKORD gave me visibility I couldn't get anywhere else. The FanFuel feature helped me raise enough for my equipment and travel expenses.",
        name: "Navdeep Singh",
        role: "Javelin Thrower",
        image: "/api/placeholder/80/80",
      },
      {
        quote: "As a fundraiser, I've discovered incredible talent through REKORD that would have otherwise gone unnoticed. The verification system ensures we support genuine athletes.",
        name: "Priya Sharma",
        role: "Sports Foundation Director",
        image: "/api/placeholder/80/80",
      },
      {
        quote: "Being able to directly support athletes I believe in has been incredibly rewarding. I can actually see the impact of my contributions through their journey.",
        name: "Rahul Patel",
        role: "Sports Enthusiast",
        image: "/api/placeholder/80/80",
      },
    ];
  
    return (
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-400">
              See how REKORD is transforming the sports ecosystem and empowering athletes across the nation
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-white/10 relative"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 text-5xl text-indigo-500 opacity-20">
                  "
                </div>
                <p className="text-gray-300 mb-6 relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-700 overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default function Home() {
    return (
      <main className="min-h-screen bg-gray-950">
        <HeroSection />
        <FeaturesSection />
        <FanFuelSection />
        <UserTypesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    );
  };