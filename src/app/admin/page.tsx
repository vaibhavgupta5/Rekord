// app/admin/athlete-verification/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, FileText, User, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";


// Mock data for demonstration
const mockAthletes = [
    {
        id: "1",
        name: "John Doe",
        sport: "Basketball",
        submittedAt: "2025-02-20T10:30:00",
        certificateUrl: "/certificates/john-doe.pdf",
        profileImage: "/api/placeholder/80/80",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        sport: "Swimming",
        submittedAt: "2025-02-22T14:45:00",
        certificateUrl: "/certificates/sarah-johnson.pdf",
        profileImage: "/api/placeholder/80/80",
    },
    {
        id: "3",
        name: "Michael Chen",
        sport: "Tennis",
        submittedAt: "2025-02-23T09:15:00",
        certificateUrl: "/certificates/michael-chen.pdf",
        profileImage: "/api/placeholder/80/80",
    },
    {
        id: "4",
        name: "Emily Rodriguez",
        sport: "Soccer",
        submittedAt: "2025-02-24T16:20:00",
        certificateUrl: "/certificates/emily-rodriguez.pdf",
        profileImage: "/api/placeholder/80/80",
    },
];

console.log(mockAthletes)

export default function AthleteVerificationPage() {
    const [athletes, setAthletes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedAthlete, setSelectedAthlete] = useState<typeof mockAthletes[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    
    const getUnverifiedAthletes = async () => {
        const response = await axios.get("/api/getUnverifiedAthlete");
        
        console.log(response.data.unverifiedAthlete);
        
            }
        
        useEffect(() => {
        getUnverifiedAthletes();

        }, []);

    const filteredAthletes = athletes.filter(athlete => {
        const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport = !selectedSport || athlete.sport === selectedSport;
        return matchesSearch && matchesSport;
    });

    
    // Handle athlete verification
    const handleVerify = (id: string) => {
        setAthletes(athletes.filter(athlete => athlete.id !== id));
    };
    
    // Open certificate dialog
    const openCertificateDialog = (athlete: typeof mockAthletes[0]) => {
        setSelectedAthlete(athlete);
        setIsDialogOpen(true);
    };
    
    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    // Get unique sports for filter
    const sports = Array.from(new Set(athletes.map(athlete => athlete.sport)));

    return (
        <div className="bg-white min-h-screen">
            <header className="bg-orange-600 py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-white text-2xl font-bold">Athlete Verification Dashboard</h1>
                </div>
            </header>
            
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-orange-50 rounded-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                                <Input
                                    placeholder="Search athletes..."
                                    className="pl-10 border-orange-200 focus:border-orange-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            
                            <div className="w-full md:w-64">
                                <Select value={selectedSport} onValueChange={setSelectedSport}>
                                    <SelectTrigger className="border-orange-200 focus:border-orange-500">
                                        <SelectValue placeholder="Filter by sport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Sports</SelectItem>
                                        {sports.map(sport => (
                                            <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-orange-800">
                                <span className="font-semibold">{filteredAthletes.length}</span> athletes awaiting verification
                            </p>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-orange-600 border-orange-300 hover:bg-orange-50"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedSport("");
                                }}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredAthletes.map((athlete) => (
                                <motion.div
                                    key={athlete._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="overflow-hidden border-orange-100 hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <Image
                                                        src={athlete?.profileImage}
                                                        alt={athlete?.name}
                                                        width={64}
                                                        height={64}
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                                                    />
                                                    <Badge className="absolute -top-2 -right-2 bg-orange-600">
                                                        New
                                                    </Badge>
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-lg truncate">{athlete.name}</h3>
                                                    <p className="text-orange-600">{athlete.sport}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Submitted {formatDate(athlete.submittedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 flex gap-3">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                                                    onClick={() => openCertificateDialog(athlete)}
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    View Certificate
                                                </Button>
                                            </div>
                                        </CardContent>
                                        
                                        <CardFooter className="p-0">
                                            <Button
                                                className="w-full rounded-none bg-orange-600 hover:bg-orange-700 text-white py-4"
                                                onClick={() => handleVerify(athlete.id)}
                                            >
                                                <Check className="h-5 w-5 mr-2" />
                                                Verify Athlete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                        {filteredAthletes.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500"
                            >
                                <User className="h-16 w-16 text-orange-200 mb-4" />
                                <h3 className="text-lg font-medium mb-2">No athletes found</h3>
                                <p className="text-center max-w-md">
                                    {searchQuery || selectedSport
                                        ? "Try adjusting your search or filters to find athletes awaiting verification."
                                        : "All athletes have been verified!"}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </main>
            
            {/* Certificate Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-orange-800">
                            {selectedAthlete?.name} Certificate
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="bg-orange-50 p-4 rounded-md min-h-96 flex items-center justify-center">
                        {/* Placeholder for certificate display */}
                        <div className="text-center">
                            <FileText className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                            <p className="text-orange-800 font-medium">
                                Certificate preview would appear here
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                In a real application, this would display the PDF certificate or image upload
                            </p>
                        </div>
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            className="sm:flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Close
                        </Button>
                        <Button
                            className="sm:flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={() => {
                                if (selectedAthlete) {
                                    handleVerify(selectedAthlete.id);
                                    setIsDialogOpen(false);
                                }
                            }}
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Verify Athlete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}