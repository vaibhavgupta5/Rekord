"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface User {
  id: string
  name: string
  type: 'athlete' | 'fan'
  detail: string
  image: string
  online: boolean
  lastActive?: string
  lastMessage?: string
}

export default function ChatsPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulating fetching users from an API
    setTimeout(() => {
      setUsers([
        // Athletes
        { 
          id: '1', 
          name: 'Virat Kohli', 
          type: 'athlete', 
          detail: 'Cricket', 
          image: '/athletes/virat.jpg', 
          online: true, 
          lastActive: '2m ago', 
          lastMessage: 'Thanks for the amazing support!' 
        },
        { 
          id: '2', 
          name: 'PV Sindhu', 
          type: 'athlete', 
          detail: 'Badminton', 
          image: '/athletes/sindhu.jpg', 
          online: true, 
          lastActive: 'Just now', 
          lastMessage: 'Looking forward to the next tournament!' 
        },
        { 
          id: '3', 
          name: 'Neeraj Chopra', 
          type: 'athlete', 
          detail: 'Javelin Throw', 
          image: '/athletes/neeraj.jpg', 
          online: false, 
          lastActive: '1h ago', 
          lastMessage: 'Proud moment for India!' 
        },
        { 
          id: '4', 
          name: 'Sunil Chhetri', 
          type: 'athlete', 
          detail: 'Football', 
          image: '/athletes/chhetri.jpg', 
          online: true, 
          lastActive: '5m ago', 
          lastMessage: 'Training hard for the next match!' 
        },
        { 
          id: '5', 
          name: 'Mary Kom', 
          type: 'athlete', 
          detail: 'Boxing', 
          image: '/athletes/marykom.jpg', 
          online: false, 
          lastActive: '3h ago', 
          lastMessage: 'Hard work always pays off!' 
        },
      
        // Fans
        { 
          id: '6', 
          name: 'Aarav Sharma', 
          type: 'fan', 
          detail: 'Mumbai', 
          image: '/fans/aarav.jpg', 
          online: true, 
          lastActive: 'Just now', 
          lastMessage: 'You inspire an entire generation!' 
        },
        { 
          id: '7', 
          name: 'Priya Patel', 
          type: 'fan', 
          detail: 'Delhi', 
          image: '/fans/priya.jpg', 
          online: true, 
          lastActive: '10m ago', 
          lastMessage: 'That last match was incredible!' 
        },
        { 
          id: '8', 
          name: 'Rohan Verma', 
          type: 'fan', 
          detail: 'Bangalore', 
          image: '/fans/rohan.jpg', 
          online: false, 
          lastActive: '2d ago', 
          lastMessage: 'Waiting to see you in action again!' 
        },
        { 
          id: '9', 
          name: 'Ananya Iyer', 
          type: 'fan', 
          detail: 'Chennai', 
          image: '/fans/ananya.jpg', 
          online: true, 
          lastActive: '30m ago', 
          lastMessage: 'Just booked tickets for your next event!' 
        },
        { 
          id: '10', 
          name: 'Kabir Mehta', 
          type: 'fan', 
          detail: 'Kolkata', 
          image: '/fans/kabir.jpg', 
          online: false, 
          lastActive: '1d ago', 
          lastMessage: 'Your journey is truly inspiring!' 
        },
      ]);
      
      setLoading(false)
    }, 1000)
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.detail.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const athletes = filteredUsers.filter(user => user.type === 'athlete')
  const fans = filteredUsers.filter(user => user.type === 'fan')
  const activeChats = filteredUsers.filter(user => user.lastMessage)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen mb-20 bg-black p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">Ally</h1>
            <p className="text-gray-400">Connect with your favorite athletes & fans</p>
          </div>
          <Avatar className="h-10 w-10 bg-gray-800 border border-gray-700">
            <AvatarFallback className="bg-orange-500 text-black font-bold">YO</AvatarFallback>
          </Avatar>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search athletes and fans..."
            className="pl-10 pr-4 py-2 w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="w-10 h-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mb-4"></div>
            <p className="text-gray-400">Loading conversations...</p>
          </div>
        ) : (
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-gray-900 p-1 rounded-lg">
              <TabsTrigger value="recent" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black rounded-md">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="athletes" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black rounded-md">
                <span className="mr-1">🏆</span>
                Athletes
              </TabsTrigger>
              <TabsTrigger value="fans" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black rounded-md">
                <span className="mr-1">👤</span>
                Fans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              {activeChats.length > 0 ? (
                <motion.div 
                  className="space-y-2"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {activeChats.map(user => (
                    <motion.div key={user.id} variants={item}>
                      <Link href={`/chat/${user.id}`} className="block">
                        <Card className="border-0 bg-gray-900 hover:bg-gray-800 transition-all">
                          <CardContent className="flex items-center p-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12 border-2 border-orange-500">
                                <AvatarImage src={user.image} alt={user.name} className="object-cover" />
                                <AvatarFallback className="bg-orange-500 text-black font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {user.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
                              )}
                            </div>
                            
                            <div className="ml-3 flex-1 overflow-hidden">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-white truncate">{user.name}</h3>
                                  <p className="text-xs text-gray-400 flex items-center gap-1">
                                    {user.type === 'athlete' ? '🏆 ' : '👤 '}
                                    {user.detail}
                                  </p>
                                </div>
                                {user.lastActive && (
                                  <span className="text-xs text-gray-500">{user.lastActive}</span>
                                )}
                              </div>
                              
                              {user.lastMessage && (
                                <p className="text-sm text-gray-400 truncate mt-1">{user.lastMessage}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-10 w-10 mx-auto text-gray-600 mb-3" />
                  <h3 className="text-gray-400 mb-1">No conversations yet</h3>
                  <p className="text-gray-600 text-sm">Start chatting with athletes and fans</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="athletes">
              <motion.div 
                className="space-y-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {athletes.map(athlete => (
                  <motion.div key={athlete.id} variants={item}>
                    <Link href={`/chat/${athlete.id}`} className="block">
                      <Card className="border-0 bg-gray-900 hover:bg-gray-800 transition-all">
                        <CardContent className="flex items-center p-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-orange-500">
                              <AvatarImage src={athlete.image} alt={athlete.name} className="object-cover" />
                              <AvatarFallback className="bg-orange-500 text-black font-medium">
                                {athlete.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {athlete.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
                            )}
                          </div>
                          
                          <div className="ml-3 flex-1 overflow-hidden">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-white truncate">{athlete.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  🏆 {athlete.detail}
                                </p>
                              </div>
                              {athlete.lastActive && (
                                <span className="text-xs text-gray-500">{athlete.lastActive}</span>
                              )}
                            </div>
                            
                            {athlete.lastMessage && (
                              <p className="text-sm text-gray-400 truncate mt-1">{athlete.lastMessage}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="fans">
              <motion.div 
                className="space-y-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {fans.map(fan => (
                  <motion.div key={fan.id} variants={item}>
                    <Link href={`/chat/${fan.id}`} className="block">
                      <Card className="border-0 bg-gray-900 hover:bg-gray-800 transition-all">
                        <CardContent className="flex items-center p-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-orange-500">
                              <AvatarImage src={fan.image} alt={fan.name} className="object-cover" />
                              <AvatarFallback className="bg-orange-500 text-black font-medium">
                                {fan.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {fan.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
                            )}
                          </div>
                          
                          <div className="ml-3 flex-1 overflow-hidden">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-white truncate">{fan.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  👤 {fan.detail}
                                </p>
                              </div>
                              {fan.lastActive && (
                                <span className="text-xs text-gray-500">{fan.lastActive}</span>
                              )}
                            </div>
                            
                            {fan.lastMessage && (
                              <p className="text-sm text-gray-400 truncate mt-1">{fan.lastMessage}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  )
}