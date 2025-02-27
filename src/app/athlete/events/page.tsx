// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, DollarSign, Video, Users } from "lucide-react";

// Define the event types based on the API response
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Location {
  coordinates: Coordinates;
  address: string;
  city: string;
  country: string;
}

interface Ticketing {
  price: number;
  available: boolean;
  soldTickets: number;
}

interface Streaming {
  platform: string;
  viewerCount: number;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: "live" | "upcoming" | "past";
  location: Location;
  ticketing: Ticketing;
  streaming: Streaming;
  participants: any[];
  budget: number;
}

// API response interface
interface ApiResponse {
  success: boolean;
  events: Event[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/fetch/allEvents');
        const data: ApiResponse = await response.json();
        
        if (data.success) {
          // For testing purposes, let's create some "live" events since your sample only has upcoming
          const modifiedEvents = data.events.map((event, index) => {
            if (index % 3 === 0) { // Just to have some live events
              return { ...event, status: "live" };
            }
            return event;
          });
          setEvents(modifiedEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Filter events by status
  const liveEvents = events.filter(event => event.status === "live");
  const upcomingEvents = events.filter(event => event.status === "upcoming");

  // Auto-advance carousel
  useEffect(() => {
    if (liveEvents.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % liveEvents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [liveEvents.length]);

  // Animation variants for Framer Motion
  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  // Function to format date
  const formatEventDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy • h:mm a");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-4xl text-orange-500">Events</h1>
      
      {/* Live Events Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
          <Badge className="mr-2 bg-orange-600 text-white">LIVE</Badge> Happening Now
        </h2>
        
        {loading ? (
          <Skeleton className="w-full h-64 rounded-lg bg-gray-800" />
        ) : liveEvents.length > 0 ? (
          <div className="relative overflow-hidden rounded-lg h-64 md:h-96 border border-orange-600">
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
              {liveEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-orange-500" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
            
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(/api/placeholder/1200/600)`, 
                  backgroundSize: 'cover'
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Badge className="mb-2 bg-orange-600 text-white border-none">LIVE NOW</Badge>
                <h3 className="text-2xl font-bold mb-2">{liveEvents[currentSlide].title}</h3>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-orange-400" />
                  <span className="text-sm">{liveEvents[currentSlide].location.city}, {liveEvents[currentSlide].location.country}</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-1 text-orange-400" />
                  <span className="text-sm">{liveEvents[currentSlide].streaming.platform}</span>
                </div>
                <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white border-none">
                  Watch Now
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-900 rounded-lg border border-orange-600/30">
            <h3 className="text-xl font-medium text-white">No live events at the moment</h3>
            <p className="text-gray-400 mt-2">Check back later for live streams</p>
          </div>
        )}
      </section>
      
      {/* Upcoming Events Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-white">Upcoming Events</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg bg-gray-800" />
            ))}
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event._id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full flex flex-col overflow-hidden bg-gray-900 border-orange-600/40 text-white">
                  <div 
                    className="h-40 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(/api/placeholder/400/200)`,
                      backgroundSize: 'cover'
                    }} 
                  />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1 text-white">{event.title}</CardTitle>
                      <Badge variant="outline" className="capitalize border-orange-500 text-orange-400">
                        {event.type}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 text-gray-400">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                        <span className="text-gray-300">{formatEventDate(event.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                        <span className="text-gray-300">{event.location.city}, {event.location.country}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-orange-400" />
                        <span className="text-gray-300">{event.ticketing.price > 0 ? `$${event.ticketing.price}` : 'Free'}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-800 pt-4">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-none">
                      {event.ticketing.available ? 'Register Now' : 'Join Waitlist'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-900 rounded-lg border border-orange-600/30">
            <h3 className="text-xl font-medium text-white">No upcoming events</h3>
            <p className="text-gray-400 mt-2">Check back later for new events</p>
          </div>
        )}
      </section>
    </div>
  );
}