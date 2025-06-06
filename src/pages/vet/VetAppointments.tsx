import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  FileText,
  CalendarPlus
} from 'lucide-react';
import VetSidebar from '@/components/vet/VetSidebar';
import VetHeader from '@/components/vet/VetHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    petName: 'Max',
    petType: 'Dog',
    petBreed: 'Golden Retriever',
    ownerName: 'John Doe',
    ownerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: '2025-05-15T10:30:00Z',
    reason: 'Routine check-up',
    status: 'confirmed',
    notes: 'Annual check-up and vaccinations'
  },
  {
    id: 2,
    petName: 'Luna',
    petType: 'Cat',
    petBreed: 'Siamese',
    ownerName: 'Sarah Williams',
    ownerImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: '2025-05-15T13:15:00Z',
    reason: 'Vaccination',
    status: 'confirmed',
    notes: 'Due for rabies vaccine'
  },
  {
    id: 3,
    petName: 'Buddy',
    petType: 'Dog',
    petBreed: 'Labrador',
    ownerName: 'Mike Johnson',
    ownerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2025-05-15T15:45:00Z',
    reason: 'Injury follow-up',
    status: 'pending',
    notes: 'Check healing progress on paw injury'
  },
  {
    id: 4,
    petName: 'Whiskers',
    petType: 'Cat',
    petBreed: 'Maine Coon',
    ownerName: 'Emily Davis',
    ownerImage: 'https://randomuser.me/api/portraits/women/8.jpg',
    date: '2025-05-16T09:00:00Z',
    reason: 'Dental cleaning',
    status: 'confirmed',
    notes: 'Dental cleaning under anesthesia'
  },
  {
    id: 5,
    petName: 'Rocky',
    petType: 'Dog',
    petBreed: 'Bulldog',
    ownerName: 'David Brown',
    ownerImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: '2025-05-16T11:30:00Z',
    reason: 'Skin condition',
    status: 'confirmed',
    notes: 'Recurring skin rash, possible allergies'
  },
  {
    id: 6,
    petName: 'Mittens',
    petType: 'Cat',
    petBreed: 'Domestic Shorthair',
    ownerName: 'Jessica Wilson',
    ownerImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: '2025-05-16T14:00:00Z',
    reason: 'Weight loss',
    status: 'confirmed',
    notes: 'Gradual weight loss over past month'
  },
  {
    id: 7,
    petName: 'Charlie',
    petType: 'Dog',
    petBreed: 'Beagle',
    ownerName: 'Robert Taylor',
    ownerImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    date: '2025-05-17T10:00:00Z',
    reason: 'Ear infection',
    status: 'cancelled',
    notes: 'Recurring ear infection, needs medication'
  }
];

export default function VetAppointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter appointments based on search query and status
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterAppointments(query, statusFilter);
  };
  
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    filterAppointments(searchQuery, status);
  };
  
  const filterAppointments = (query: string, status: string | null) => {
    let filtered = mockAppointments;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(appointment => 
        appointment.petName.toLowerCase().includes(query) ||
        appointment.petType.toLowerCase().includes(query) ||
        appointment.petBreed.toLowerCase().includes(query) ||
        appointment.ownerName.toLowerCase().includes(query) ||
        appointment.reason.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (status) {
      filtered = filtered.filter(appointment => appointment.status === status);
    }
    
    setFilteredAppointments(filtered);
  };
  
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <VetSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <VetHeader title="Appointments" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        {statusFilter ? `Status: ${statusFilter}` : 'Filter by Status'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('confirmed')}>
                        Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('pending')}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('cancelled')}>
                        Cancelled
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('completed')}>
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button className="flex items-center gap-2">
                    <CalendarPlus size={16} />
                    New Appointment
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.petName}</p>
                            <p className="text-xs text-gray-500">{appointment.petType} - {appointment.petBreed}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={appointment.ownerImage} alt={appointment.ownerName} />
                              <AvatarFallback>{appointment.ownerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{appointment.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{formatDate(appointment.date)}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {appointment.status === 'confirmed' && (
                                <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                  <CheckCircle size={16} />
                                  Start Consultation
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileText size={16} />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                Message Owner
                              </DropdownMenuItem>
                              {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <XCircle size={16} />
                                  Cancel Appointment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredAppointments.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No appointments found matching your criteria.</p>
                </div>
              )}
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredAppointments.length}</span> of{" "}
                  <span className="font-medium">{mockAppointments.length}</span> appointments
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}