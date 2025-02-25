'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CalendarClock, DollarSign, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  // This would come from your API in a real app
  const stats = [
    { label: 'Total Investment', value: '$124,500', icon: <DollarSign className="w-5 h-5" />, change: '+12%' },
    { label: 'Sponsored Athletes', value: '14', icon: <Users className="w-5 h-5" />, change: '+2' },
    { label: 'Total Reach', value: '1.2M', icon: <TrendingUp className="w-5 h-5" />, change: '+15%' },
    { label: 'Active Events', value: '3', icon: <CalendarClock className="w-5 h-5" />, change: '-1' },
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: Today, 2:30 PM</div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-green-600 mt-1">{stat.change}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Performance</CardTitle>
              <CardDescription>Overview of your sponsorship ROI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { athlete: 'Sarah Johnson', sport: 'Tennis', reach: '450K', progress: 78 },
                { athlete: 'Michael Lee', sport: 'Basketball', reach: '320K', progress: 65 },
                { athlete: 'Emma Wilson', sport: 'Swimming', reach: '280K', progress: 52 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{item.athlete}</div>
                      <div className="text-xs text-gray-500">{item.sport}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.reach}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2 bg-orange-100" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Summer Sports Festival', date: 'Mar 15, 2025', location: 'Chicago, USA', type: 'tournament' },
                  { title: 'Youth Basketball Camp', date: 'Apr 2, 2025', location: 'Miami, USA', type: 'training' },
                  { title: 'Charity Swimming Gala', date: 'Apr 18, 2025', location: 'Los Angeles, USA', type: 'exhibition' },
                ].map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {event.date.split(',')[0].split(' ')[0]}
                    </div>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.date} • {event.location}</div>
                      <div className="mt-1 inline-block px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}