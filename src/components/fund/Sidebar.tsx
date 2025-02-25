'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  BarChart3, 
  CalendarPlus, 
  Calendar, 
  LogOut,
  Settings
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/fund/dashboard' },
    { label: 'Trending Athletes', icon: <TrendingUp className="w-5 h-5" />, href: '/fund/trending-athletes' },
    { label: 'My Sponsorships', icon: <Users className="w-5 h-5" />, href: '/fund/sponsorships' },
    { label: 'Sponsorship Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/fund/analytics' },
    { label: 'Create Event', icon: <CalendarPlus className="w-5 h-5" />, href: '/fund/create-event' },
    { label: 'Ongoing Events', icon: <Calendar className="w-5 h-5" />, href: '/fund/events' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/fund/settings' },
  ];
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-orange-600">AthleteSponsors</h1>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 font-bold">AC</span>
          </div>
          <div>
            <p className="font-medium">Acme Corp</p>
            <p className="text-xs text-gray-500">Fund Provider</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link href={item.href} className="flex relative">
                  <div className={`
                    flex items-center w-full px-4 py-2 text-sm rounded-lg
                    ${isActive ? 'text-orange-600 font-medium' : 'text-gray-700 hover:bg-orange-50'}
                  `}>
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 w-1 h-full bg-orange-600 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-orange-50">
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
}