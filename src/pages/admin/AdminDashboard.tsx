import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from '@/store/authStore';
import { 
  Users, 
  PawPrint, 
  FileText, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut,
  Home,
  Flag,
  ShieldAlert
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock statistics
  const stats = {
    users: 1245,
    pets: 3782,
    adoptions: 892,
    donations: 456,
    reports: 23,
    newUsers: 48,
    activeUsers: 567
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name}</p>
              </div>
              
              <div className="flex space-x-2">
                <Link to="/home">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home size={16} />
                    Back to App
                  </Button>
                </Link>
                <Button variant="destructive" onClick={() => logout()} className="flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">{stats.users}</p>
                    <p className="text-xs text-green-500 mt-1">+{stats.newUsers} this week</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registered Pets</p>
                    <p className="text-3xl font-bold">{stats.pets}</p>
                    <p className="text-xs text-green-500 mt-1">+124 this week</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <PawPrint className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Successful Adoptions</p>
                    <p className="text-3xl font-bold">{stats.adoptions}</p>
                    <p className="text-xs text-green-500 mt-1">+36 this week</p>
                  </div>
                  <div className="p-3 bg-pink-100 rounded-full">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Reports</p>
                    <p className="text-3xl font-bold">{stats.reports}</p>
                    <p className="text-xs text-amber-500 mt-1">Needs attention</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <Flag className="h-6 w-6 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                        User Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">User growth chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <PawPrint className="h-5 w-5 mr-2 text-green-500" />
                        Adoption Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Adoption statistics chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-amber-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">New user registered</p>
                            <p className="text-xs text-gray-500">User123 joined the platform</p>
                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
                      Active Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start p-4 border border-red-100 rounded-lg bg-red-50">
                          <div className="p-2 bg-red-100 rounded-full mr-3">
                            <Flag className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Inappropriate content reported</p>
                              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">High Priority</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Post ID: 12345 by User456</p>
                            <p className="text-xs text-gray-500 mt-2">Reported 3 hours ago by 2 users</p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="destructive" className="text-xs">Remove Content</Button>
                              <Button size="sm" variant="outline" className="text-xs">Dismiss</Button>
                              <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                      System Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="text-xs font-mono p-2 border-b border-gray-100 last:border-0">
                          <span className="text-gray-400">[{new Date().toISOString()}]</span>{' '}
                          <span className="text-blue-600">INFO</span>{' '}
                          <span>User logged in: user{Math.floor(Math.random() * 1000)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function Heart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}