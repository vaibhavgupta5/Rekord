'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BadgeCheck, TrendingUp } from "lucide-react";

export default function TrendingAthletesPage() {
  // Mock data - would come from your API
  const athletes = [
    {
      id: '1', 
      name: 'Aarav Mehta', 
      sport: 'Basketball', 
      followers: '1.2M', 
      growth: '+12%',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWMuQoRfkGjtD5qEkn9LjXwu6iiX9WZqjGQ&s',
      verified: true,
      location: 'Mumbai, India',
      achievements: ['National Champion 2024', 'All-Star 2023']
    },
    {
      id: '2', 
      name: 'Neha Sharma', 
      sport: 'Tennis', 
      followers: '845K', 
      growth: '+15%',
      image: 'https://static.toiimg.com/thumb/imgsize-23456,msid-67322094,width-600,resizemode-4/67322094.jpg',
      verified: true,
      location: 'New Delhi, India',
      achievements: ['Grand Slam Finalist', 'Asian Games Silver Medalist']
    },
    {
      id: '3', 
      name: 'Rohan Nair', 
      sport: 'Swimming', 
      followers: '650K', 
      growth: '+9%',
      image: 'https://npr.brightspotcdn.com/dims3/default/strip/false/crop/7075x4869+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F23%2F54%2Fcadc7d254b478365f7e46711c10d%2Fgettyimages-2168460962.jpg',
      verified: false,
      location: 'Bangalore, India',
      achievements: ['Commonwealth Games Bronze', 'National Record Holder']
    },
    {
      id: '4', 
      name: 'Ananya Kapoor', 
      sport: 'Volleyball', 
      followers: '520K', 
      growth: '+18%',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGlUg6VXTEJEcQyMi5kH47VhYEVjsCKny16w&s',
      verified: true,
      location: 'Chennai, India',
      achievements: ['Professional League MVP 2024', 'National Team Captain']
    },
    {
      id: '5', 
      name: 'Vikram Singh', 
      sport: 'Track & Field', 
      followers: '780K', 
      growth: '+7%',
      image: 'https://peaklife.in/wp-content/uploads/2024/09/Building-Champions-How-Future-Indian-Athletes-Train-for-Success-Cover-Image.jpeg',
      verified: true,
      location: 'Kolkata, India',
      achievements: ['Olympic Gold Medalist', 'Asian Champion']
    },
    {
      id: '6', 
      name: 'Ishita Rao', 
      sport: 'Gymnastics', 
      followers: '930K', 
      growth: '+21%',
      image: 'https://etvbharatimages.akamaized.net/etvbharat/prod-images/17-07-2024/1200-675-21977507-24-21977507-1721224838470.jpg',
      verified: false,
      location: 'Hyderabad, India',
      achievements: ['World Cup Gold Medalist', 'National Champion']
    },
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
        <h1 className="text-2xl font-bold">Trending Athletes</h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">Search Athletes</Button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {athletes.map((athlete) => (
          <motion.div key={athlete.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-orange-100 relative">
                <img 
                  src={athlete.image} 
                  alt={athlete.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center text-xs font-medium">
                  <TrendingUp className="w-3 h-3 text-orange-600 mr-1" />
                  {athlete.growth}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold flex items-center">
                      {athlete.name}
                      {athlete.verified && <BadgeCheck className="w-4 h-4 text-orange-600 ml-1" />}
                    </h3>
                    <p className="text-sm text-gray-500">{athlete.sport} • {athlete.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{athlete.followers}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">Key Achievements:</p>
                  <div className="flex flex-wrap gap-1">
                    {athlete.achievements.map((achievement, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">Sponsor</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}