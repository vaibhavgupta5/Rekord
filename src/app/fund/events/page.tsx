'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ChevronRight,
  Edit, 
  MapPin,
  MoreHorizontal, 
  Share2,
  Ticket, 
  Video
} from "lucide-react";

export default function EventsPage() {
  // Mock data - would come from your API
  const events = [
    {
      id: '1',
      title: 'Summer Sports Festival',
      description: 'A celebration of summer sports featuring competitions and exhibitions.',
      date: 'Mar 15, 2025',
      location: {
        city: 'Chicago',
        country: 'USA',
      },
      type: 'tournament',
      status: 'upcoming',
      image: '/api/placeholder/400/200',
      participants: 24,
      budget: 35000,
      ticketing: {
        available: true,
        price: 25,
        totalTickets: 500,
        soldTickets: 320,
      },
      streaming: {
        platform: 'YouTube',
        url: 'https://youtube.com',
      },
    },
    {
      id: '2',
      title: 'Youth Basketball Camp',
      description: 'Training camp for young basketball players featuring professional athletes.',
      date: 'Apr 2, 2025',
      location: {
        city: 'Miami',
        country: 'USA',
      },
      type: 'training',
      status: 'upcoming',
      image: '/api/placeholder/400/200',
      participants: 50,
      budget: 15000,
      ticketing: {
        available: true,
        price: 10,
        totalTickets: 100,
        soldTickets: 42,
      },
    },
    {
      id: '3',
      title: 'Charity Swimming Gala',
      description: 'Fundraising event featuring swimming competitions and exhibitions.',
      date: 'Apr 18, 2025',
      location: {
        city: 'Los Angeles',
        country: 'USA',
      },
      type: 'exhibition',
      status: 'upcoming',
      image: '/api/placeholder/400/200',
      participants: 30,
      budget: 25000,
      ticketing: {
        available: true,
        price: 15,
        totalTickets: 200,
        soldTickets: 98,
      },
      streaming: {
        platform: 'Twitch',
        url: 'https://twitch.tv',
      },
    },
    {
      id: '4',
      title: 'Winter Sports Championship',
      description: 'Annual winter sports competition featuring sponsored athletes.',
      date: 'Feb 10, 2025',
      location: {
        city: 'Denver',
        country: 'USA',
      },
      type: 'tournament',
      status: 'ongoing',
      image: '/api/placeholder/400/200',
      participants: 45,
      budget: 40000,
      ticketing: {
        available: true,
        price: 30,
        totalTickets: 600,
        soldTickets: 580,
      },
      streaming: {
        platform: 'YouTube',
        url: 'https://youtube.com',
        viewerCount: 12500,
      },
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        
        <Button className="bg-orange-600 hover:bg-orange-700">Create New Event</Button>
      </div>
      
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="ongoing">Ongoing (1)</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming (3)</TabsTrigger>
          <TabsTrigger value="past">Past (2)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing">
          <motion.div 
            className="grid grid-cols-1 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {events
              .filter(e => e.status === 'ongoing')
              .map((event) => (
                <motion.div key={event.id} variants={item}>
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-64 bg-orange-50 flex-shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-6 flex-grow">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-100 text-green-600 border-green-200 hover:bg-green-200">
                                Live Now
                              </Badge>
                              <Badge variant="outline">
                                {event.type}
                              </Badge>
                            </div>
                            
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p className="text-gray-500 mt-1 line-clamp-2">{event.description}</p>
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{event.location.city}, {event.location.country}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Current viewers</div>
                              <div className="text-2xl font-bold text-orange-600">{event.streaming?.viewerCount?.toLocaleString()}</div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-2 justify-end">
                              <Button size="sm" variant="outline" className="flex items-center">
                                <Video className="h-4 w-4 mr-1" />
                                Live Stream
                              </Button>
                              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                Manage Event
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Participants</div>
                            <div className="font-bold">{event.participants} athletes</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Tickets Sold</div>
                            <div className="font-bold">
                              {event.ticketing.soldTickets}/{event.ticketing.totalTickets}
                              <span className="text-sm text-gray-500 ml-1">
                                ({Math.round(event.ticketing.soldTickets / event.ticketing.totalTickets * 100)}%)
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Budget</div>
                            <div className="font-bold">${event.budget.toLocaleString()}</div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {events
              .filter(e => e.status === 'upcoming')
              .map((event) => (
                <motion.div key={event.id} variants={item}>
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Badge className="bg-orange-100 text-orange-600 border-orange-200">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold line-clamp-1">{event.title}</h3>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{event.description}</p>
                      
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{event.location.city}, {event.location.country}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Participants:</span> {event.participants}
                        </div>
                        {event.ticketing.available && (
                          <div>
                            <span className="text-gray-500">Ticket:</span> ${event.ticketing.price}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        {event.ticketing.available && (
                          <Button variant="outline" size="sm" className="flex-1">
                            <Ticket className="h-3 w-3 mr-1" />
                            Tickets
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-12 text-gray-500">
            <p>No past events to display.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}