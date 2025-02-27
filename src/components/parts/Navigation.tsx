'use client'
import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { Home, Activity, Plus, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const ResponsiveNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const athlete = JSON.parse(localStorage.getItem('athlete') || '{}');
  const [userId, setUserId] = useState(athlete._id);
console.log(userId)
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', link: "home" },
    { icon: <Activity className="w-5 h-5" />, label: 'Strides', link: "strides" },
    { icon: <Plus className="w-5 h-5" />, label: 'Add Post', link: "add-post" },
    { icon: <Calendar className="w-5 h-5" />, label: 'Events', link: "events" },
    { icon: <User className="w-5 h-5" />, label: 'Profile', link: `profile/${userId}` },
  ];

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkViewport();

    // Add resize listener
    window.addEventListener('resize', checkViewport);

    // Cleanup
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Set active item based on current path
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    const activeIndex = navItems.findIndex(item => item.link === currentPath);
    setActiveItem(activeIndex !== -1 ? activeIndex : 0);
  }, [pathname]);

  const MobileNavigation = () => (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-20 bg-black text-white border-t border-orange-500 flex items-center justify-around px-4 md:hidden z-10 shadow-lg"
    >
      {navItems.map((item, index) => (
        <motion.div
          key={index}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center justify-center"
          onClick={() => {
            setActiveItem(index);
            router.push(`/athlete/${item.link}`);
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 ${activeItem === index ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-400'} rounded-full transition-all duration-300 ease-in-out`}
          >
            {item.icon}
          </Button>
          <span className={`text-xs mt-1 ${activeItem === index ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );

  const DesktopNavigation = () => (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 bottom-0 w-64 bg-black text-white border-r border-orange-500 p-4 hidden md:flex flex-col space-y-6 z-10 shadow-lg"
    >
      <div className="text-xl font-bold p-2 text-orange-500 border-b border-orange-500/30 pb-4">
        <span className="bg-orange-500 text-black px-2 py-1 rounded mr-2">REKORD</span>
      </div>

      <div className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 5, backgroundColor: 'rgba(249, 115, 22, 0.1)' }}
            className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer transition-all duration-300 ${
              activeItem === index ? 'bg-orange-500/20 border-l-4 border-orange-500' : ''
            }`}
            onClick={() => {
              setActiveItem(index);
              router.push(`/athlete/${item.link}`);
            }}
          >
            <div className={`rounded-full p-2 ${activeItem === index ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>
              {item.icon}
            </div>
            <span className={activeItem === index ? 'text-orange-500 font-medium' : 'text-gray-400'}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
    </>
  );
};

export default ResponsiveNavigation;