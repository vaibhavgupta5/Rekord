'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Activity, Plus, Calendar, User, ChevronRight, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const ResponsiveNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  // Safely get athlete data with error handling
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('Athlete');
  
  useEffect(() => {
    try {
      const athlete = JSON.parse(localStorage.getItem('athlete') || '{}');
      setUserId(athlete._id || '');
      setUsername(athlete.name || 'Athlete');
    } catch (error) {
      console.error('Error parsing athlete data:', error);
    }
  }, []);
  
  let navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', link: "home" },
    { icon: <Activity className="w-5 h-5" />, label: 'Strides', link: "strides" },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events', link: "events" },
    { icon: <User className="w-5 h-5" />, label: 'Profile', link: `profile/${userId}` },
  ];
  
  if (!pathname.startsWith('/user/')) {
    navItems.splice(2, 0, { icon: <Plus className="w-5 h-5" />, label: 'Add Post', link: "add-post" });
  }
  
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);
  
  useEffect(() => {
    // Handle profile URLs with the pattern athlete/profile/*
    if (pathname.includes('profile/')) {
      const activeIndex = navItems.findIndex(item => item.link.startsWith('profile/'));
      setActiveItem(activeIndex !== -1 ? activeIndex : 0);
      return;
    }
    
    const currentPath = pathname.split('/').pop();
    const activeIndex = navItems.findIndex(item => item.link === currentPath);
    setActiveItem(activeIndex !== -1 ? activeIndex : 0);
  }, [pathname, navItems]);
  
  const MobileNavigation = () => (
    <motion.div
      initial={{ y: 20, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-black/95 to-black/90 backdrop-blur-md text-white border-t border-orange-500/30 flex items-center justify-around px-2 md:hidden z-50 shadow-xl"
    >
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center relative"
          onClick={() => {
            setActiveItem(index);
            router.push(`/athlete/${item.link}`);
          }}
        >
          <AnimatePresence mode="wait">
            {activeItem === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -top-3 w-8 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            className={`h-10 w-10 rounded-full transition-all duration-300 ${
              activeItem === index 
                ? 'text-orange-500 scale-110' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {item.icon}
          </Button>
          
          <span 
            className={`text-xs mt-0.5 transition-colors duration-200 ${
              activeItem === index 
                ? 'text-orange-500 font-medium' 
                : 'text-gray-500'
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
  
  const DesktopNavigation = () => (
    <motion.div
      initial={{ x: -20, opacity: 0.9 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isExpanded ? 240 : 80 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 bottom-0 bg-gradient-to-b from-black to-gray-900 text-white border-r border-orange-500/20 hidden md:flex flex-col z-10 shadow-xl"
    >
      <div className="flex items-center justify-between p-4 border-b border-orange-500/30">
        {isExpanded ? (
          <div className="text-xl font-bold text-orange-500">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-2 py-1 rounded mr-1">R</span>EKORD
          </div>
        ) : (
          <div className="text-xl font-bold text-orange-500 mx-auto">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-2 py-1 rounded">R</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {isExpanded && (
        <div className="px-4 py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
              {username.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-white truncate">{username}</p>
              <p className="text-xs text-gray-400">Athlete</p>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                x: 3,
                backgroundColor: "rgba(251, 146, 60, 0.1)"
              }}
              transition={{ duration: 0.2 }}
              className={`flex items-center ${isExpanded ? 'px-3' : 'justify-center'} py-3 rounded-lg cursor-pointer ${
                activeItem === index 
                  ? 'bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-l-2 border-orange-500' 
                  : 'hover:bg-gray-800/30 border-l-2 border-transparent'
              }`}
              onClick={() => {
                setActiveItem(index);
                router.push(`/athlete/${item.link}`);
              }}
            >
              <div className={`p-2 rounded-md ${
                activeItem === index 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-400'
              }`}>
                {item.icon}
              </div>
              
              {isExpanded && (
                <span className={`ml-3 ${
                  activeItem === index 
                    ? 'text-orange-500 font-medium' 
                    : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              )}
              
              {isExpanded && activeItem === index && (
                <motion.div
                  layoutId="sideActiveIndicator"
                  className="ml-auto w-1 h-4 bg-orange-500 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-orange-500/20">
        <motion.div
          whileHover={{ 
            x: 3,
            backgroundColor: "rgba(251, 146, 60, 0.1)"
          }}
          className={`flex items-center ${isExpanded ? 'px-3' : 'justify-center'} py-3 rounded-lg cursor-pointer hover:bg-gray-800/30`}
        >
          <div className="p-2 rounded-md text-gray-400">
            <LogOut className="w-5 h-5" />
          </div>
          
          {isExpanded && (
            <span className="ml-3 text-gray-400">Logout</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
  
  return <>{isMobile ? <MobileNavigation /> : <DesktopNavigation />}</>;
};

export default ResponsiveNavigation;