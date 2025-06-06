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
  FileText, 
  Calendar, 
  MessageSquare,
  PlusCircle
} from 'lucide-react';
import VetSidebar from '@/components/vet/VetSidebar';
import VetHeader from '@/components/vet/VetHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    ownerName: 'John Doe',
    ownerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastVisit: '2025-05-01T10:30:00Z',
    nextVisit: '2025-06-01T10:30:00Z',
    medicalConditions: ['Allergies'],
    status: 'healthy'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: 2,
    gender: 'Female',
    ownerName: 'Sarah Williams',
    ownerImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    lastVisit: '2025-04-15T13:15:00Z',
    nextVisit: '2025-05-15T13:15:00Z',
    medicalConditions: [],
    status: 'healthy'
  },
  {
    id: 3,
    name: 'Buddy',
    type: 'Dog',
    breed: 'Labrador',
    age: 5,
    gender: 'Male',
    ownerName: 'Mike Johnson',
    ownerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastVisit: '2025-05-10T15:45:00Z',
    nextVisit: '2025-05-24T15:45:00Z',
    medicalConditions: ['Paw injury'],
    status: 'treatment'
  },
  {
    id: 4,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Maine Coon',
    age: 7,
    gender: 'Male',
    ownerName: 'Emily Davis',
    ownerImage: 'https://randomuser.me/api/portraits/women/8.jpg',
    lastVisit: '2025-04-20T09:00:00Z',
    nextVisit: '2025-05-16T09:00:00Z',
    medicalConditions: ['Dental issues'],
    status: 'treatment'
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    breed: 'Bulldog',
    age: 4,
    gender: 'Male',
    ownerName: 'David Brown',
    ownerImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    lastVisit: '2025-05-05T11:30:00Z',
    nextVisit: '2025-05-16T11:30:00Z',
    medicalConditions: ['Skin condition', 'Allergies'],
    status: 'treatment'
  },
  {
    id: 6,
    name: 'Mittens',
    type: 'Cat',
    breed: 'Domestic Shorthair',
    age: 1,
    gender: 'Female',
    ownerName: 'Jessica Wilson',
    ownerImage: 'https://randomuser.me/api/portraits/women/12.jpg',
    lastVisit: '2025-04-10T14:00:00Z',
    nextVisit: '2025-05-16T14:00:00Z',
    medicalConditions: ['Weight loss'],
    status: 'critical'
  },
  {
    id: 7,
    name: 'Charlie',
    type: 'Dog',
    breed: 'Beagle',
    age: 6,
    gender: 'Male',
    ownerName: 'Robert Taylor',
    ownerImage: 'https://randomuser.me/api/portraits/men/15.jpg',
    lastVisit: '2025-04-25T10:00:00Z',
    nextVisit: '2025-05-17T10:00:00Z',
    medicalConditions: ['Ear infection'],
    status: 'treatment'
  }
];

export default function VetPatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter patients based on search query and status
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPatients(query, statusFilter);
  };
  
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    filterPatients(searchQuery, status);
  };
  
  const filterPatients = (query: string, status: string | null) => {
    let filtered = mockPatients;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(query) ||
        patient.type.toLowerCase().includes(query) ||
        patient.breed.toLowerCase().includes(query) ||
        patient.ownerName.toLowerCase().includes(query) ||
        patient.medicalConditions.some(condition => condition.toLowerCase().includes(query))
      );
    }
    
    // Apply status filter
    if (status) {
      filtered = filtered.filter(patient => patient.status === status);
    }
    
    setFilteredPatients(filtered);
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Get badge color based on patient status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Healthy</Badge>;
      case 'treatment':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">In Treatment</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical</Badge>;
      case 'recovered':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Recovered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <VetSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <VetHeader title="Patients" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search patients..."
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
                      <DropdownMenuItem onClick={() => handleStatusFilter('healthy')}>
                        Healthy
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('treatment')}>
                        In Treatment
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('critical')}>
                        Critical
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusFilter('recovered')}>
                        Recovered
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    Add Patient
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
                      <TableHead>Name</TableHead>
                      <TableHead>Type/Breed</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Medical Conditions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Next Visit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>
                          <div>
                            <p>{patient.type}</p>
                            <p className="text-xs text-gray-500">{patient.breed}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{patient.age} years</p>
                            <p className="text-xs text-gray-500">{patient.gender}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={patient.ownerImage} alt={patient.ownerName} />
                              <AvatarFallback>{patient.ownerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{patient.ownerName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {patient.medicalConditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {patient.medicalConditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">None</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(patient.status)}</TableCell>
                        <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                        <TableCell>{formatDate(patient.nextVisit)}</TableCell>
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
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileText size={16} />
                                Medical Records
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Calendar size={16} />
                                Schedule Appointment
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                Message Owner
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredPatients.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No patients found matching your criteria.</p>
                </div>
              )}
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredPatients.length}</span> of{" "}
                  <span className="font-medium">{mockPatients.length}</span> patients
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