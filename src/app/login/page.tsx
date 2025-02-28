'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AtSign, Lock, User, Medal, Users, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('/');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const roles = [
    { id: '/', label: 'Athlete', icon: Medal, description: 'Track your progress and connect with coaches' },
    { id: 'home', label: 'User', icon: Wallet, description: 'Sports Lover Viewer' },
    { id: 'fund', label: 'Fund Provider', icon: User, description: 'Support and invest in athletic talent' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Replace 
      // with your actual API endpoint
      const response = await axios.post('/api/loginAthlete', {
        email,
        password,
      });
      
      // Handle successful login

      localStorage.setItem('athlete', JSON.stringify(response.data.data));

      localStorage.setItem('role', "athlete");

      router.push('/athlete/home');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Rekord</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedRole === role.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${
                      selectedRole === role.id ? 'text-orange-500' : 'text-gray-500'
                    }`} />
                    <div className="mt-2">
                      <div className="font-medium text-gray-900">{role.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{role.description}</div>
                    </div>
                    {selectedRole === role.id && (
                      <Badge className="absolute top-2 right-2 bg-orange-500">
                        Selected
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-2 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/50"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-orange-500 bg-white/50"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </a>
              </div>
              
              <Button 
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 h-11"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                  Create account
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Footer Links */}
        <div className="text-center mt-6 text-sm text-gray-600 space-x-4">
          <a href="#" className="hover:text-orange-600">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-orange-600">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-orange-600">Contact Support</a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;