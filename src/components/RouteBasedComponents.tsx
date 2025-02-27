"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/parts/Header";
import ResponsiveNavigation from "@/components/parts/Navigation";

export default function RouteBasedComponents() {
  const pathname = usePathname();

  // Check if the current route is under /fund/*
  const isFundRoute = pathname?.startsWith("/fund") || pathname?.startsWith("/admin");

  // Conditionally render Header and Navigation
  return (
    <>
      {!isFundRoute && <Header />}
      {!isFundRoute && <ResponsiveNavigation />}
    </>
  );
}