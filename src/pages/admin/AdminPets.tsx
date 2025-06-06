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
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle,
  PawPrint
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

// Mock pet data
const mockPets = [
  {
    id: 1,
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    status: 'adoption',
    userId: 1,
    userName: 'John Doe',
    location: 'New York, NY',
    createdAt: '2025-03-15T10:30:00Z',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200'
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Siamese',
    status: 'lost',
    userId: 2,
    userName: 'Jane Smith',
    location: 'Los Angeles, CA',
    createdAt: '2025-04-20T09:15:00Z',
    photo: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200'
  },
  {
    id: 3,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Labrador',
    status: 'found',
    userId: 3,
    userName: 'Mike Johnson',
    location: 'Chicago, IL',
    createdAt: '2025-05-05T14:20:00Z',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200'
  },
  {
    id: 4,
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Maine Coon',
    status: 'adoption',
    userId: 4,
    userName: 'Sarah Williams',
    location: 'Boston, MA',
    createdAt: '2025-05-10T11:45:00Z',
    photo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200'
  },
  {
    id: 5,
    name: 'Rocky',
    species: 'Dog',
    breed: 'Bulldog',
    status: 'adoption',
    userId: 1,
    userName: 'John Doe',
    location: 'New York, NY',
    createdAt: '2025-05-12T16:30:00Z',
    photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200'
  }
];

export default function AdminPets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPets, setFilteredPets] = useState(mockPets);
  
  // Filter pets based on search query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredPets(mockPets);
      return;
    }
    
    const filtered = mockPets.filter(pet => 
      pet.name.toLowerCase().includes(query) ||
      pet.species.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query) ||
      pet.userName.toLowerCase().includes(query) ||
      pet.location.toLowerCase().includes(query)
    );
    
    setFilteredPets(filtered);
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
  
  // Get badge color based on pet status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'adoption':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Adoption</Badge>;
      case 'lost':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Lost</Badge>;
      case 'found':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Found</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Pet Management" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Pets</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search pets..."
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filter
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
                      <TableHead>Species</TableHead>
                      <TableHead>Breed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell className="font-medium">{pet.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md overflow-hidden">
                              {pet.photo ? (
                                <img src={pet.photo} alt={pet.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                  <PawPrint className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="font-medium">{pet.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>{getStatusBadge(pet.status)}</TableCell>
                        <TableCell>{pet.userName}</TableCell>
                        <TableCell>{pet.location}</TableCell>
                        <TableCell>{formatDate(pet.createdAt)}</TableCell>
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
                                <Eye size={16} />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit size={16} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Trash2 size={16} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredPets.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No pets found matching your search criteria.</p>
                </div>
              )}
              
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredPets.length}</span> of{" "}
                  <span className="font-medium">{mockPets.length}</span> pets
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