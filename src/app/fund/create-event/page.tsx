'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Check, Map, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function CreateEventPage() {
  return (
    <motion.div 
      className="space-y-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Event</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter event title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tournament">Tournament</SelectItem>
                      <SelectItem value="exhibition">Exhibition</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your event" className="min-h-20" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4">Date & Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <div className="relative">
                    <Input id="date" placeholder="Select date" />
                    <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Start Time</Label>
                  <Input id="time" placeholder="Select time" type="time" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Country" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4">Participants & Budget</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input id="budget" placeholder="0.00" type="number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input id="max-participants" placeholder="0" type="number" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Invite Sponsored Athletes</Label>
                  <div className="border rounded-md p-4 space-y-3">
                    {['Marcus Johnson', 'Emma Wilson', 'Carlos Mendez'].map((name, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Checkbox id={`athlete-${idx}`} />
                        <Label htmlFor={`athlete-${idx}`} className="font-normal text-sm cursor-pointer">
                          {name}
                        </Label>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <Users className="w-4 h-4 mr-2" />
                      View All Athletes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4">Ticketing & Streaming</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ticketing" />
                      <Label htmlFor="ticketing" className="font-medium cursor-pointer">
                        Enable Ticketing
                      </Label>
                    </div>
                    
                    <div className="pl-6 space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="ticket-price">Ticket Price (USD)</Label>
                        <Input id="ticket-price" placeholder="0.00" type="number" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="total-tickets">Total Tickets</Label>
                        <Input id="total-tickets" placeholder="0" type="number" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="streaming" />
                      <Label htmlFor="streaming" className="font-medium cursor-pointer">
                        Enable Streaming
                      </Label>
                    </div>
                    
                    <div className="pl-6 space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="streaming-platform">Platform</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="twitch">Twitch</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="streaming-url">Streaming URL</Label>
                        <Input id="streaming-url" placeholder="https://" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Check className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}