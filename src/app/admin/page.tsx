'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { VerifiedIcon, UserIcon, AlertTriangleIcon, CheckCircle2Icon, XCircleIcon, FilterIcon } from "lucide-react";
import axios from 'axios';

export default function AthletesVerificationPage() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await fetch('/api/getUnverifiedAthlete');
        const data = await response.json();
        
        if (data.unverifiedAthlete) {
          setAthletes(data.unverifiedAthlete);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching athletes:", error);
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const handleVerify = async (id: string) => {
    try {

      const response = axios.put('/api/verifyAthlete', {
        athleteId: id, adminId:"huhd"})

    console.log(response)
      
      // Optimistic UI update
      setAthletes(athletes.map(athlete => 
        athlete._id === id 
          ? {...athlete, verificationStatus: status} 
          : athlete
      ));
    } catch (error) {
      console.error("Error verifying athlete:", error);
    }
  };

  const filteredAthletes = filter === 'all' 
    ? athletes 
    : athletes.filter(athlete => athlete.verificationStatus === filter);

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
    <div className="container px-4 py-6 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Athlete Verification</h1>
          <p className="text-gray-500 mt-1">Review and verify athlete profiles</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
          <FilterIcon size={16} className="text-gray-500" />
          <select 
            className="bg-transparent text-sm border-none focus:ring-0 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Athletes</option>
            <option value="unverified">Unverified</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
          </select>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-gray-100 rounded-lg h-64 animate-pulse"
            />
          ))
        ) : filteredAthletes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg"
          >
            <AlertTriangleIcon className="h-12 w-12 text-orange-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No athletes found</h3>
            <p className="text-gray-500 text-center mt-2">
              {filter === 'all' 
                ? "There are no athletes in the system." 
                : `No athletes with ${filter} status found.`}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAthletes.map((athlete) => (
              <motion.div key={athlete._id} variants={item}>
                <Card className="overflow-hidden border-orange-100 hover:shadow-md transition-shadow duration-300">
                  <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600 relative">
                    {athlete.coverImage && (
                      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${athlete.coverImage})` }} />
                    )}
                  </div>
                  
                  <div className="flex justify-between px-6">
                    <Avatar className="h-16 w-16 ring-4 ring-white -mt-8">
                      <AvatarImage src={athlete.profileImage} />
                      <AvatarFallback className="bg-orange-200 text-orange-700">
                        {athlete.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <Badge className={`mt-2 ${
                      athlete.verificationStatus === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : athlete.verificationStatus === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {athlete.verificationStatus === 'verified' && <CheckCircle2Icon className="mr-1 h-3 w-3" />}
                      {athlete.verificationStatus.charAt(0).toUpperCase() + athlete.verificationStatus.slice(1)}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pt-2">
                    <CardTitle className="text-xl flex items-center gap-1">
                      {athlete.name}
                      {athlete.featuredAthlete && (
                        <VerifiedIcon className="h-4 w-4 text-blue-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      @{athlete.username} • 
                      <span className="font-medium text-orange-600">{athlete.career.sport}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-gray-500">Level</div>
                        <div className="font-medium">{athlete.career.level.charAt(0).toUpperCase() + athlete.career.level.slice(1)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Position</div>
                        <div className="font-medium">{athlete.career.position || '-'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Matches</div>
                        <div className="font-medium">{athlete.stats.totalMatches}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="text-gray-500 mb-1">Certifications</div>
                      <div className="flex flex-wrap gap-1">
                        {athlete.certifications && athlete.certifications.length > 0 ? (
                          athlete.certifications.map((cert, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {cert.type}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No certifications</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    {athlete.verificationStatus !== 'verified' && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleVerify(athlete._id, 'verified')}
                      >
                        <CheckCircle2Icon className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                    )}
                    
                    {athlete.verificationStatus !== 'rejected' && athlete.verificationStatus !== 'verified' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleVerify(athlete._id, 'rejected')}
                      >
                        <XCircleIcon className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    )}
                    
                    {athlete.verificationStatus === 'verified' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}