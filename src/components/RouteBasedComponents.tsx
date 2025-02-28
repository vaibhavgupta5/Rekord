"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/parts/Header";
import ResponsiveNavigation from "@/components/parts/Navigation";

export default function RouteBasedComponents() {
  const pathname = usePathname();

  const isFundRoute = pathname?.startsWith("/fund") || pathname?.startsWith("/admin") || pathname?.startsWith("/landing") || pathname?.startsWith("/login");

  return (
    <>
      {!isFundRoute && <Header />}
      {!isFundRoute && <ResponsiveNavigation />}
    </>
  );
}