'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, ClockIcon, Edit } from "lucide-react";

export default function SponsorshipsPage() {
  // Mock data - would come from your API
  const sponsorships = [
    {
      id: '1',
      athlete: 'Marcus Johnson',
      sport: 'Basketball',
      image: '/api/placeholder/300/300',
      amount: 25000,
      startDate: 'Jan 15, 2024',
      endDate: 'Jan 15, 2025',
      status: 'active',
      paymentSchedule: 'quarterly',
      milestones: [
        { description: 'Social media campaign', dueDate: 'Mar 20, 2025', status: 'completed' },
        { description: 'Product photoshoot', dueDate: 'Apr 15, 2025', status: 'pending' },
        { description: 'Community event', dueDate: 'Jun 10, 2025', status: 'pending' }
      ]
    },
    {
      id: '2',
      athlete: 'Emma Wilson',
      sport: 'Swimming',
      image: '/api/placeholder/300/300',
      amount: 18500,
      startDate: 'Feb 10, 2024',
      endDate: 'Feb 10, 2025',
      status: 'active',
      paymentSchedule: 'monthly',
      milestones: [
        { description: 'Brand ambassador launch', dueDate: 'Mar 01, 2025', status: 'completed' },
        { description: 'Instagram takeover', dueDate: 'Apr 25, 2025', status: 'pending' }
      ]
    },
    {
      id: '3',
      athlete: 'Carlos Mendez',
      sport: 'Soccer',
      image: '/api/placeholder/300/300',
      amount: 30000,
      startDate: 'Nov 05, 2023',
      endDate: 'Nov 05, 2024',
      status: 'active',
      paymentSchedule: 'quarterly',
      milestones: [
        { description: 'Promotional video', dueDate: 'Mar 10, 2025', status: 'pending' },
        { description: 'Charity tournament', dueDate: 'May 22, 2025', status: 'pending' }
      ]
    },
    {
      id: '4',
      athlete: 'Aisha Rahman',
      sport: 'Track & Field',
      image: '/api/placeholder/300/300',
      amount: 15000,
      startDate: 'Jun 20, 2024',
      endDate: 'Jun 20, 2025',
      status: 'pending',
      paymentSchedule: 'one-time',
      milestones: [
        { description: 'Contract signing event', dueDate: 'Jul 01, 2025', status: 'pending' }
      ]
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
        <h1 className="text-2xl font-bold">My Sponsorships</h1>
        
        <Button className="bg-orange-600 hover:bg-orange-700">New Sponsorship</Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active (3)</TabsTrigger>
          <TabsTrigger value="pending">Pending (1)</TabsTrigger>
          <TabsTrigger value="completed">Completed (2)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <motion.div 
            className="grid grid-cols-1 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {sponsorships
              .filter(s => s.status === 'active')
              .map((sponsorship) => (
                <motion.div key={sponsorship.id} variants={item}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 flex-shrink-0">
                          <img 
                            src={sponsorship.image} 
                            alt={sponsorship.athlete} 
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{sponsorship.athlete}</h3>
                              <p className="text-sm text-gray-600">{sponsorship.sport}</p>
                              
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                  {sponsorship.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold">${sponsorship.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">{sponsorship.paymentSchedule} payment</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center text-sm text-gray-600">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            <span>{sponsorship.startDate} - {sponsorship.endDate}</span>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Upcoming Milestones</h4>
                            <div className="space-y-2">
                              {sponsorship.milestones
                                .filter(m => m.status === 'pending')
                                .slice(0, 2)
                                .map((milestone, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div className="w-4 h-4 rounded-full bg-orange-100 flex-shrink-0 mt-1 border border-orange-300"></div>
                                    <div className="ml-2">
                                      <div className="text-sm">{milestone.description}</div>
                                      <div className="text-xs text-gray-500 flex items-center">
                                        <ClockIcon className="w-3 h-3 mr-1" />
                                        Due: {milestone.dueDate}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="default" size="sm" className="bg-orange-600 hover:bg-orange-700">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="pending">
          <motion.div 
            className="grid grid-cols-1 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {sponsorships
              .filter(s => s.status === 'pending')
              .map((sponsorship) => (
                <motion.div key={sponsorship.id} variants={item}>
                  <Card>
                    <CardContent className="p-6">
                      {/* Same content structure as active tab */}
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 flex-shrink-0">
                          <img 
                            src={sponsorship.image} 
                            alt={sponsorship.athlete} 
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{sponsorship.athlete}</h3>
                              <p className="text-sm text-gray-600">{sponsorship.sport}</p>
                              
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                                  {sponsorship.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold">${sponsorship.amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">{sponsorship.paymentSchedule} payment</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center text-sm text-gray-600">
                            <CalendarDays className="w-4 h-4 mr-1" />
                            <span>{sponsorship.startDate} - {sponsorship.endDate}</span>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Upcoming Milestones</h4>
                            <div className="space-y-2">
                              {sponsorship.milestones
                                .filter(m => m.status === 'pending')
                                .slice(0, 2)
                                .map((milestone, idx) => (
                                  <div key={idx} className="flex items-start">
                                    <div className="w-4 h-4 rounded-full bg-orange-100 flex-shrink-0 mt-1 border border-orange-300"></div>
                                    <div className="ml-2">
                                      <div className="text-sm">{milestone.description}</div>
                                      <div className="text-xs text-gray-500 flex items-center">
                                        <ClockIcon className="w-3 h-3 mr-1" />
                                        Due: {milestone.dueDate}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="default" size="sm" className="bg-orange-600 hover:bg-orange-700">
                              Sign Contract
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-12 text-gray-500">
            <p>No completed sponsorships to display.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}