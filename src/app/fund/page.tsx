'use client'
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, CalendarPlus, Trophy, ArrowUpRight, Heart } from 'lucide-react';

const FundProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const trendingAthletes = [
    { id: 1, name: 'Sarah Chen', sport: 'Swimming', reels: 245, engagement: '92%', seeking: '$5,000' },
    { id: 2, name: 'Marcus Rodriguez', sport: 'Track', reels: 189, engagement: '88%', seeking: '$3,500' },
    { id: 3, name: 'Aisha Patel', sport: 'Gymnastics', reels: 312, engagement: '95%', seeking: '$6,000' }
  ];

  const sponsoredAthletes = [
    { id: 1, name: 'James Wilson', sport: 'Basketball', amount: '$2,000', progress: '75%' },
    { id: 2, name: 'Emma Thompson', sport: 'Tennis', amount: '$3,500', progress: '40%' }
  ];

  return (
    <div className="min-h-screen bg-pink-50 text-gray-700 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Rekord - Fund Provider</h1>
          <p className="text-gray-500 text-sm">Support emerging athletes</p>
        </div>
        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
          <Users className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </div>

      {/* Main Navigation */}
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid grid-cols-3 gap-2 bg-white p-1 rounded-lg mb-6 shadow-sm">
          <TabsTrigger value="trending" onClick={() => setActiveTab('trending')}
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="sponsored" onClick={() => setActiveTab('sponsored')}
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <Trophy className="w-4 h-4 mr-2" />
            Sponsored
          </TabsTrigger>
          <TabsTrigger value="events" onClick={() => setActiveTab('events')}
            className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
            <CalendarPlus className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
        </TabsList>

        {/* Trending Athletes Tab */}
        <TabsContent value="trending" className="space-y-4">
          {trendingAthletes.map(athlete => (
            <Card key={athlete.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{athlete.name}</h3>
                    <Badge variant="outline" className="mt-1 bg-purple-50 text-purple-600 border-purple-200">
                      {athlete.sport}
                    </Badge>
                  </div>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-sm">
                    Sponsor
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm bg-purple-50 p-4 rounded-lg">
                  <div>
                    <p className="text-purple-600">Reels</p>
                    <p className="font-semibold text-gray-800">{athlete.reels}</p>
                  </div>
                  <div>
                    <p className="text-purple-600">Engagement</p>
                    <p className="font-semibold text-gray-800">{athlete.engagement}</p>
                  </div>
                  <div>
                    <p className="text-purple-600">Seeking</p>
                    <p className="font-semibold text-gray-800">{athlete.seeking}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Sponsored Athletes Tab */}
        <TabsContent value="sponsored" className="space-y-4">
          {sponsoredAthletes.map(athlete => (
            <Card key={athlete.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{athlete.name}</h3>
                    <Badge variant="outline" className="mt-1 bg-green-50 text-green-600 border-green-200">
                      {athlete.sport}
                    </Badge>
                  </div>
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    View Details
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-600">Sponsored Amount</span>
                    <span className="font-semibold text-gray-800">{athlete.amount}</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full" 
                      style={{ width: athlete.progress }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Host Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <CalendarPlus className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Host a New Event</h3>
                <p className="text-gray-500">Create opportunities for athletes to showcase their talent</p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full shadow-sm">
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center p-6 space-y-3">
                <Heart className="w-8 h-8 text-purple-500 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-800">Coming Soon</h3>
                <p className="text-gray-500 text-sm">Event management tools and analytics</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundProviderDashboard;