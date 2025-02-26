import { Inter } from "next/font/google"
import "./globals.css"
import ResponsiveNavigation from "@/components/parts/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "REKORD - Athletes Social Platform",
  description: "Connect, Support, and Grow with Athletes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
{children}
<ResponsiveNavigation/>
</body>
    </html>
  )
}