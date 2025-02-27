import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import RouteBasedComponents from "@/components/RouteBasedComponents"; // Import the wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REKORD - Athletes Social Platform",
  description: "Connect, Support, and Grow with Athletes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        {/* Use the client-side wrapper */}
        <RouteBasedComponents />

        {/* Render children */}
        {children}

        {/* Always render Toaster */}
        <Toaster />
      </body>
    </html>
  );
}