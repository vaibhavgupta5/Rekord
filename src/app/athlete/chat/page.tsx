"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

interface Athlete {
  id: string
  name: string
  sport: string
  image: string
  online: boolean
}

export default function ChatsPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating fetching athletes from an API
    setTimeout(() => {
      setAthletes([
        { id: '1', name: 'Michael Jordan', sport: 'Basketball', image: '/athletes/mj.jpg', online: true },
        { id: '2', name: 'Serena Williams', sport: 'Tennis', image: '/athletes/serena.jpg', online: true },
        { id: '3', name: 'Usain Bolt', sport: 'Track & Field', image: '/athletes/bolt.jpg', online: false },
        { id: '4', name: 'Megan Rapinoe', sport: 'Soccer', image: '/athletes/rapinoe.jpg', online: true },
        { id: '5', name: 'LeBron James', sport: 'Basketball', image: '/athletes/lebron.jpg', online: false },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-orange-500">Ally</h1>
          <p className="text-gray-400">Select an athlete or fan to start chatting</p>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {athletes.map((athlete) => (
              <motion.div key={athlete.id} variants={item}>
                <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-all">
                  <CardHeader className="flex flex-row items-center gap-4 p-3">
                    <Avatar className="h-10 w-10 border-2 border-orange-500">
                      <AvatarImage src={athlete.image} alt={athlete.name} />
                      <AvatarFallback className="bg-orange-500 text-black">
                        {athlete.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-white text-md">{athlete.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm">{athlete.sport}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full ${athlete.online ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-3 pt-0">
                    <Button 
                      asChild 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black text-sm"
                      disabled={!athlete.online}
                    >
                      <Link href={`/chat/${athlete.id}`}>
                        {athlete.online ? 'Message' : 'Offline'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}