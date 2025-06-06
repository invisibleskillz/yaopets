import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from '@/store/authStore';
import { 
  Users, 
  Calendar, 
  Clock, 
  BarChart3, 
  MessageSquare, 
  Home,
  LogOut,
  Stethoscope,
  Heart
} from 'lucide-react';
import VetSidebar from '@/components/vet/VetSidebar';
import VetHeader from '@/components/vet/VetHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function VetDashboard() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock statistics
  const stats = {
    totalPatients: 156,
    pendingAppointments: 8,
    completedAppointments: 342,
    todayAppointments: 5,
    activeChats: 12,
    rating: 4.8
  };

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      petName: 'Max',
      petType: 'Dog',
      ownerName: 'John Doe',
      ownerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '2025-05-15T10:30:00Z',
      reason: 'Routine check-up',
      status: 'confirmed'
    },
    {
      id: 2,
      petName: 'Luna',
      petType: 'Cat',
      ownerName: 'Sarah Williams',
      ownerImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      date: '2025-05-15T13:15:00Z',
      reason: 'Vaccination',
      status: 'confirmed'
    },
    {
      id: 3,
      petName: 'Buddy',
      petType: 'Dog',
      ownerName: 'Mike Johnson',
      ownerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      date: '2025-05-15T15:45:00Z',
      reason: 'Injury follow-up',
      status: 'pending'
    },
    {
      id: 4,
      petName: 'Whiskers',
      petType: 'Cat',
      ownerName: 'Emily Davis',
      ownerImage: 'https://randomuser.me/api/portraits/women/8.jpg',
      date: '2025-05-16T09:00:00Z',
      reason: 'Dental cleaning',
      status: 'confirmed'
    },
    {
      id: 5,
      petName: 'Rocky',
      petType: 'Dog',
      ownerName: 'David Brown',
      ownerImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      date: '2025-05-16T11:30:00Z',
      reason: 'Skin condition',
      status: 'confirmed'
    }
  ];

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get badge color based on appointment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <VetSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <VetHeader title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Veterinarian Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. {user?.name.split(' ')[0]}</p>
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
                    <p className="text-sm font-medium text-gray-500">Total Patients</p>
                    <p className="text-3xl font-bold">{stats.totalPatients}</p>
                    <p className="text-xs text-green-500 mt-1">+12 this month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                    <p className="text-3xl font-bold">{stats.todayAppointments}</p>
                    <p className="text-xs text-blue-500 mt-1">Next: 10:30 AM</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Chats</p>
                    <p className="text-3xl font-bold">{stats.activeChats}</p>
                    <p className="text-xs text-amber-500 mt-1">3 unread messages</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Your Rating</p>
                    <p className="text-3xl font-bold">{stats.rating}/5.0</p>
                    <p className="text-xs text-green-500 mt-1">Based on 156 reviews</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        Today's Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingAppointments.slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0 mr-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={appointment.ownerImage} alt={appointment.ownerName} />
                                <AvatarFallback>{appointment.ownerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {appointment.petName} ({appointment.petType})
                                </p>
                                {getStatusBadge(appointment.status)}
                              </div>
                              <p className="text-xs text-gray-500">Owner: {appointment.ownerName}</p>
                              <p className="text-xs text-gray-500">Reason: {appointment.reason}</p>
                              <p className="text-xs text-blue-600 mt-1 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(appointment.date)}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="text-center pt-2">
                          <Button variant="outline" size="sm" className="text-blue-600">
                            View All Appointments
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                        Monthly Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">Monthly statistics chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">User{i + 10}</p>
                              <p className="text-xs text-gray-500">10:3{i} AM</p>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              Hello Dr. {user?.name.split(' ')[0]}, I have a question about my pet's medication...
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center pt-2">
                        <Button variant="outline" size="sm" className="text-purple-600">
                          View All Messages
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 mr-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.ownerImage} alt={appointment.ownerName} />
                              <AvatarFallback>{appointment.ownerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-base font-medium text-gray-900">
                                  {appointment.petName} ({appointment.petType})
                                </p>
                                <p className="text-sm text-gray-600">Owner: {appointment.ownerName}</p>
                                <p className="text-sm text-gray-600">Reason: {appointment.reason}</p>
                              </div>
                              <div className="text-right">
                                {getStatusBadge(appointment.status)}
                                <p className="text-sm text-blue-600 mt-2 flex items-center justify-end">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(appointment.date)}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Start Consultation
                              </Button>
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patients" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Users className="h-5 w-5 mr-2 text-green-500" />
                      Recent Patients
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 mr-4 relative">
                            <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <PawPrint className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 5}.jpg`} />
                                <AvatarFallback>U{i}</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-base font-medium text-gray-900">
                                  Pet Name {i}
                                </p>
                                <p className="text-sm text-gray-600">{i % 2 === 0 ? 'Cat' : 'Dog'}, {i + 2} years old</p>
                                <p className="text-xs text-gray-500">Last visit: {i} days ago</p>
                              </div>
                              <div>
                                <Badge className="bg-blue-100 text-blue-800">
                                  {i % 3 === 0 ? 'Check-up' : i % 3 === 1 ? 'Vaccination' : 'Treatment'}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" className="text-blue-600">
                                View Medical Record
                              </Button>
                              <Button size="sm" variant="outline">
                                Schedule Follow-up
                              </Button>
                            </div>
                          </div>
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

function Star(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function PawPrint(props: any) {
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
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  )
}