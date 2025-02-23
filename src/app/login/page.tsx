"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Medal, User, Trophy } from 'lucide-react';

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState<"user" | "athlete" | "sponsor">("user");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const tabAnimation = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const backgroundVariants: { [key in "user" | "athlete" | "sponsor"]: string } = {
    user: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50",
    athlete: "bg-gradient-to-br from-blue-50 via-teal-50 to-green-50",
    sponsor: "bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50"
  };

  const LoginForm = ({ userType }: { userType: string }) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="space-y-6"
    >
      <motion.div 
        className="text-2xl font-bold text-gray-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome {userType}!
      </motion.div>

      <div className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200 bg-white/70"
            placeholder="Enter your email"
          />
        </motion.div>

        {userType === "Sponsor" && (
          <motion.div variants={fadeInUp} className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Company Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200 bg-white/70"
              placeholder="Enter company name"
            />
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200 bg-white/70"
            placeholder="Enter your password"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-lg font-medium shadow-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
        >
          Sign In
        </motion.button>
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'user' as const, icon: User, label: 'User', color: 'text-purple-400' },
    { id: 'athlete' as const, icon: Medal, label: 'Athlete', color: 'text-teal-400' },
    { id: 'sponsor' as const, icon: Trophy, label: 'Sponsor', color: 'text-orange-400' }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${backgroundVariants[selectedTab]} transition-all duration-500`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Sports Platform</h1>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-around p-1 bg-white/50 rounded-xl mb-8 backdrop-blur-sm shadow-inner">
            {tabs.map(({ id, icon: Icon, label, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedTab === id 
                    ? 'bg-white shadow-md ' + color
                    : 'text-gray-500 hover:bg-white/50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabAnimation}
              transition={{ duration: 0.3 }}
            >
              <LoginForm userType={tabs.find(t => t.id === selectedTab)?.label || 'User'} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;