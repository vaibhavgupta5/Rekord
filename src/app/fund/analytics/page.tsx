'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

export default function AnalyticsPage() {
  // Mock data - would come from your API
  const reachData = [
    { name: 'Jan', reach: 240000 },
    { name: 'Feb', reach: 310000 },
    { name: 'Mar', reach: 350000 },
    { name: 'Apr', reach: 420000 },
    { name: 'May', reach: 480000 },
    { name: 'Jun', reach: 520000 },
    { name: 'Jul', reach: 690000 },
    { name: 'Aug', reach: 820000 },
  ];
  
  const engagementData = [
    { name: 'Instagram', value: 45 },
    { name: 'Twitter', value: 25 },
    { name: 'TikTok', value: 20 },
    { name: 'YouTube', value: 10 },
  ];
  
  const COLORS = ['#ff8c00', '#ffa500', '#ffb347', '#ffc87c'];
  
  const roiData = [
    { name: 'Jan', investment: 12000, returns: 15000 },
    { name: 'Feb', investment: 15000, returns: 18500 },
    { name: 'Mar', investment: 18000, returns: 22000 },
    { name: 'Apr', investment: 20000, returns: 26000 },
    { name: 'May', investment: 22000, returns: 30000 },
    { name: 'Jun', investment: 25000, returns: 32000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sponsorship Analytics</h1>
        
        <div className="flex items-center gap-2">
          <select className="p-2 border rounded-md text-sm">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>Year to date</option>
          </select>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reach">Reach & Engagement</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Total Audience Reach</CardTitle>
                  <CardDescription>Growth over time across all sponsored athletes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reachData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} 
                      />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString()} followers`, 'Reach']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="reach" 
                        stroke="#ff8c00" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Engagement by Platform</CardTitle>
                  <CardDescription>Distribution of engagement across social platforms</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Engagement']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-1 md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Investment vs. Returns</CardTitle>
                  <CardDescription>Financial performance of your sponsorships</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={roiData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Legend />
                      <Bar dataKey="investment" name="Investment" fill="#ffc87c" />
                      <Bar dataKey="returns" name="Returns" fill="#ff8c00" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="reach">
          <div className="grid grid-cols-1 gap-6">
            {/* Detailed reach analytics would go here */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Reach Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed reach analytics content would be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="roi">
          <div className="grid grid-cols-1 gap-6">
            {/* Detailed ROI analytics would go here */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed ROI Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Detailed ROI analytics content would be implemented here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}