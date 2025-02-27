"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Search, Bell, Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-800/30 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/athlete/home" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500 tracking-tight">REKORD</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavButton href="/athlete/home" icon={<Home className="h-5 w-5" />} label="Feed" />
            <NavButton href="/search" icon={<Search className="h-5 w-5" />} label="Search" />
            <NavButton href="/athlete/fan-fuel" icon={<Zap className="h-5 w-5" />} label="Fan Fuel" />
            <NavButton 
              href="/notifications" 
              icon={<Bell className="h-5 w-5" />} 
              label="Notifications" 
              badge={3} 
            />
            <NavButton 
              href="/athlete/chat" 
              icon={<MessageCircle className="h-5 w-5" />} 
              label="Messages" 
              badge={5} 
            />
          </nav>
          
          {/* Mobile - Logo and buttons */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Fan Fuel Button - Added to the left of DM */}
            <Button
              onClick={() => router.push('/athlete/fan-fuel')}
              variant="ghost"
              size="icon"
              className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/30"
            >
              <Zap className="h-6 w-6" />
            </Button>
            
            {/* Messages/DM Button */}
            <Button
              onClick={() => router.push('/athlete/chat')}
              variant="ghost"
              size="icon"
              className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/30"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Menu Button - Desktop only */}
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="icon"
            className="hidden md:flex text-orange-500 hover:text-orange-400 hover:bg-orange-950/30"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu - Desktop only */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden md:block border-t border-orange-800/30 bg-black"
          >
            <div className="container mx-auto py-3 px-4">
              <nav className="flex flex-col space-y-2">
                <MobileNavLink href="/profile" label="My Profile" />
                <MobileNavLink href="/settings" label="Settings" />
                <MobileNavLink href="/help" label="Help Center" />
                <MobileNavLink href="/logout" label="Logout" />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Desktop navigation button
function NavButton({ 
  href, 
  icon, 
  label, 
  badge 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  badge?: number;
}) {
  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        className="relative flex flex-col items-center justify-center h-12 px-3 text-gray-300 hover:text-orange-500 hover:bg-orange-950/30"
      >
        <span className="relative">
          {icon}
          {badge && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs bg-orange-500 text-white rounded-full">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </span>
        <span className="text-xs mt-1">{label}</span>
      </Button>
    </Link>
  );
}

// Mobile menu link
function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href}
      className="text-gray-300 hover:text-orange-500 py-2 px-3 rounded-md hover:bg-orange-950/30 transition-colors"
    >
      {label}
    </Link>
  );
}